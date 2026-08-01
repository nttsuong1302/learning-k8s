// Simulateur kubectl minimal pour les questions pratiques du CKA Trainer.
// Un "cluster" = un ensemble d'objets en mémoire. On parse un sous-ensemble de
// kubectl et on fait évoluer l'état. Rien de réel n'est exécuté.
// API utilisée par les scénarios (data/practical.js) :
//   c.getObj(kind, name, ns)  c.list(kind, ns)  c.node(name)
//   c.add(kind, name, ns, spec)  c.remove(kind, name, ns)

(function () {
  "use strict";

  const suffix = (() => { let i = 100; return () => (++i).toString(36) + "x" + (i * 7 % 97).toString(36); })();

  // Normalisation kind (pluriel / abréviations -> Kind canonique)
  const KIND = {
    po: "Pod", pod: "Pod", pods: "Pod",
    deploy: "Deployment", deployment: "Deployment", deployments: "Deployment",
    rs: "ReplicaSet", replicaset: "ReplicaSet", replicasets: "ReplicaSet",
    svc: "Service", service: "Service", services: "Service",
    ns: "Namespace", namespace: "Namespace", namespaces: "Namespace",
    no: "Node", node: "Node", nodes: "Node",
    cm: "ConfigMap", configmap: "ConfigMap", configmaps: "ConfigMap",
    secret: "Secret", secrets: "Secret",
    pv: "PersistentVolume", persistentvolume: "PersistentVolume", persistentvolumes: "PersistentVolume",
    pvc: "PersistentVolumeClaim", persistentvolumeclaim: "PersistentVolumeClaim", persistentvolumeclaims: "PersistentVolumeClaim",
    sa: "ServiceAccount", serviceaccount: "ServiceAccount", serviceaccounts: "ServiceAccount",
    ds: "DaemonSet", daemonset: "DaemonSet", daemonsets: "DaemonSet",
    sts: "StatefulSet", statefulset: "StatefulSet", statefulsets: "StatefulSet",
    ing: "Ingress", ingress: "Ingress",
    job: "Job", jobs: "Job", cj: "CronJob", cronjob: "CronJob",
  };
  const CLUSTER_SCOPED = new Set(["Node", "Namespace", "PersistentVolume"]);
  const kindOf = (w) => KIND[(w || "").toLowerCase()] || null;

  function Cluster() {
    this.objs = [];
    this.history = [];
  }
  Cluster.prototype.add = function (kind, name, ns, spec) {
    const o = Object.assign({ kind, name, ns: CLUSTER_SCOPED.has(kind) ? null : (ns || "default") }, spec || {});
    this.objs.push(o);
    return o;
  };
  Cluster.prototype.list = function (kind, ns) {
    return this.objs.filter((o) => o.kind === kind && (ns == null ? true : o.ns === ns));
  };
  Cluster.prototype.getObj = function (kind, name, ns) {
    return this.objs.find((o) => o.kind === kind && o.name === name &&
      (CLUSTER_SCOPED.has(kind) || ns == null ? true : o.ns === ns)) || null;
  };
  Cluster.prototype.remove = function (kind, name, ns) {
    const before = this.objs.length;
    this.objs = this.objs.filter((o) => !(o.kind === kind && o.name === name &&
      (CLUSTER_SCOPED.has(kind) ? true : o.ns === (ns || "default"))));
    return this.objs.length < before;
  };
  Cluster.prototype.node = function (name) { return this.getObj("Node", name, null); };

  Cluster.prototype.makePods = function (base, ns, n, image, labels) {
    for (let i = 0; i < n; i++) {
      this.add("Pod", base + "-" + suffix(), ns, {
        status: "Running", ready: "1/1", restarts: 0, image: image || "nginx",
        owner: base, node: "node01", labels: labels || { app: base }, age: "10s",
      });
    }
  };
  Cluster.prototype.syncDeployPods = function (d) {
    this.objs = this.objs.filter((o) => !(o.kind === "Pod" && o.owner === d.name && o.ns === d.ns));
    this.makePods(d.name, d.ns, d.replicas, d.image, { app: d.name });
  };

  // Cluster de base : 4 namespaces + 2 nœuds
  Cluster.prototype.seedBase = function () {
    ["default", "kube-system", "kube-public", "kube-node-lease"].forEach((n) =>
      this.add("Namespace", n, null, { status: "Active", age: "20d" }));
    this.add("Node", "controlplane", null, {
      roles: "control-plane", status: "Ready", version: "v1.31.1", schedulable: true,
      taints: [{ key: "node-role.kubernetes.io/control-plane", effect: "NoSchedule" }], labels: {}, internalIP: "172.30.1.2",
    });
    this.add("Node", "node01", null, {
      roles: "<none>", status: "Ready", version: "v1.31.1", schedulable: true,
      taints: [], labels: {}, internalIP: "172.30.2.2",
    });
    return this;
  };

  // ---------- parsing des flags ----------
  function parseFlags(tokens) {
    const flags = {}, pos = [];
    for (let i = 0; i < tokens.length; i++) {
      let t = tokens[i];
      if (t.startsWith("--")) {
        const eq = t.indexOf("=");
        if (eq > -1) flags[t.slice(2, eq)] = t.slice(eq + 1);
        else {
          const key = t.slice(2), nxt = tokens[i + 1];
          if (nxt && !nxt.startsWith("-")) { flags[key] = nxt; i++; } else flags[key] = true;
        }
      } else if (t.startsWith("-") && t.length > 1) {
        const key = t.slice(1), nxt = tokens[i + 1];
        if (["n", "o", "l", "f"].includes(key) && nxt && !nxt.startsWith("-")) { flags[key] = nxt; i++; }
        else flags[key] = true;
      } else pos.push(t);
    }
    return { flags, pos };
  }
  const nsOf = (f) => f.namespace || f.n || "default";
  const allNs = (f) => !!(f["all-namespaces"] || f.A);

  // ---------- rendu tableau ----------
  function table(headers, rows) {
    if (!rows.length) return "";
    const w = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i]).length)));
    const line = (cells) => cells.map((c, i) => String(c).padEnd(w[i] + 3)).join("").replace(/\s+$/, "");
    return [line(headers), ...rows.map(line)].join("\n");
  }
  const err = (m) => "error: " + m;

  // ---------- verbes ----------
  const VERBS = {
    get(c, pos, f) {
      const kind = kindOf(pos[0]);
      if (!kind) return err(`the server doesn't have a resource type "${pos[0] || ""}"`);
      const ns = nsOf(f), name = pos[1];
      let items = c.list(kind, allNs(f) ? null : (CLUSTER_SCOPED.has(kind) ? null : ns));
      if (name) items = items.filter((o) => o.name === name);
      if (f.l) { const [k, v] = String(f.l).split("="); items = items.filter((o) => o.labels && o.labels[k] === v); }
      if (!items.length) return name ? err(`${pos[0]} "${name}" not found`) : `No resources found${allNs(f) ? "" : " in " + ns + " namespace"}.`;
      const wide = f.o === "wide";
      const withNs = allNs(f);
      switch (kind) {
        case "Pod": {
          const h = (withNs ? ["NAMESPACE"] : []).concat(["NAME", "READY", "STATUS", "RESTARTS", "AGE"]).concat(wide ? ["IP", "NODE"] : []);
          return table(h, items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.ready || "1/1", o.status, o.restarts || 0, o.age || "1m"]).concat(wide ? [o.ip || "10.244.1.5", o.node || "node01"] : [])));
        }
        case "Deployment": {
          const h = (withNs ? ["NAMESPACE"] : []).concat(["NAME", "READY", "UP-TO-DATE", "AVAILABLE", "AGE"]);
          return table(h, items.map((o) => (withNs ? [o.ns] : []).concat([o.name, `${o.available != null ? o.available : o.replicas}/${o.replicas}`, o.replicas, o.available != null ? o.available : o.replicas, o.age || "2m"])));
        }
        case "Service": {
          const h = (withNs ? ["NAMESPACE"] : []).concat(["NAME", "TYPE", "CLUSTER-IP", "EXTERNAL-IP", "PORT(S)", "AGE"]);
          return table(h, items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.svcType || "ClusterIP", o.clusterIP || "10.96.0.10", o.externalIP || "<none>", o.ports || "80/TCP", o.age || "1m"])));
        }
        case "Node":
          return table(["NAME", "STATUS", "ROLES", "AGE", "VERSION"].concat(wide ? ["INTERNAL-IP"] : []),
            items.map((o) => [o.name, o.schedulable === false ? "Ready,SchedulingDisabled" : o.status, o.roles, o.age || "20d", o.version].concat(wide ? [o.internalIP || "172.30.1.2"] : [])));
        case "Namespace":
          return table(["NAME", "STATUS", "AGE"], items.map((o) => [o.name, o.status || "Active", o.age || "20d"]));
        case "PersistentVolume":
          return table(["NAME", "CAPACITY", "ACCESS MODES", "RECLAIM POLICY", "STATUS", "CLAIM"],
            items.map((o) => [o.name, o.capacity || "1Gi", o.accessModes || "RWO", o.reclaim || "Retain", o.status || "Available", o.claim || "<none>"]));
        case "PersistentVolumeClaim":
          return table((withNs ? ["NAMESPACE"] : []).concat(["NAME", "STATUS", "VOLUME", "CAPACITY", "ACCESS MODES", "STORAGECLASS"]),
            items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.status || "Bound", o.volume || "pv-1", o.capacity || "1Gi", o.accessModes || "RWO", o.storageClass || "standard"])));
        case "ConfigMap":
          return table((withNs ? ["NAMESPACE"] : []).concat(["NAME", "DATA", "AGE"]), items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.dataCount || Object.keys(o.data || {}).length, o.age || "1m"])));
        case "Secret":
          return table((withNs ? ["NAMESPACE"] : []).concat(["NAME", "TYPE", "DATA", "AGE"]), items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.secretType || "Opaque", o.dataCount || 1, o.age || "1m"])));
        default:
          return table((withNs ? ["NAMESPACE"] : []).concat(["NAME", "AGE"]), items.map((o) => (withNs ? [o.ns] : []).concat([o.name, o.age || "1m"])));
      }
    },

    describe(c, pos, f) {
      const kind = kindOf(pos[0]); if (!kind) return err("unknown resource");
      const o = c.getObj(kind, pos[1], nsOf(f));
      if (!o) return err(`${pos[0]} "${pos[1]}" not found`);
      let out = `Name:         ${o.name}\nNamespace:    ${o.ns || "<none>"}\n`;
      if (o.labels) out += `Labels:       ${Object.entries(o.labels).map(([k, v]) => k + "=" + v).join(",") || "<none>"}\n`;
      if (kind === "Pod") out += `Status:       ${o.status}\nNode:         ${o.node || "node01"}\nIP:           ${o.ip || "10.244.1.5"}\nImage:        ${o.image}\nRestarts:     ${o.restarts || 0}\n`;
      if (kind === "Deployment") out += `Replicas:     ${o.replicas} desired | ${o.replicas} updated | ${o.replicas} available\nImage:        ${o.image}\n`;
      if (kind === "Node") out += `Roles:        ${o.roles}\nUnschedulable:${o.schedulable === false ? " true" : " false"}\nTaints:       ${(o.taints || []).map((t) => `${t.key}${t.value ? "=" + t.value : ""}:${t.effect}`).join(", ") || "<none>"}\n`;
      if (kind === "Service") out += `Type:         ${o.svcType || "ClusterIP"}\nSelector:     ${o.selector || "app=" + o.name}\nPort:         ${o.ports || "80/TCP"}\n`;
      return out.trimEnd();
    },

    run(c, pos, f) {
      if (!pos[0] || !f.image) return err("you must specify --image");
      c.add("Pod", pos[0], nsOf(f), { status: "Running", ready: "1/1", restarts: 0, image: f.image, node: "node01", labels: { run: pos[0] } });
      return `pod/${pos[0]} created`;
    },

    create(c, pos, f) {
      const kind = kindOf(pos[0]); const name = pos[1];
      if (kind === "Namespace") { if (c.getObj("Namespace", name, null)) return err(`namespaces "${name}" already exists`); c.add("Namespace", name, null, { status: "Active", age: "1s" }); return `namespace/${name} created`; }
      if (kind === "Deployment") {
        const img = f.image || "nginx"; const reps = parseInt(f.replicas, 10) || 1;
        const d = c.add("Deployment", name, nsOf(f), { image: img, replicas: reps, available: reps, labels: { app: name } });
        c.syncDeployPods(d); return `deployment.apps/${name} created`;
      }
      if (kind === "ConfigMap") { c.add("ConfigMap", name, nsOf(f), { data: {}, dataCount: 1 }); return `configmap/${name} created`; }
      if (kind === "Secret") { c.add("Secret", name, nsOf(f), { secretType: "Opaque", dataCount: 1 }); return `secret/${name} created`; }
      if (kind === "ServiceAccount") { c.add("ServiceAccount", name, nsOf(f), {}); return `serviceaccount/${name} created`; }
      return err(`unable to create resource "${pos[0] || ""}"`);
    },

    expose(c, pos, f) {
      const kind = kindOf(pos[0]); const target = pos[1];
      if (!kind || !target) return err("expose requires a resource");
      const src = c.getObj(kind, target, nsOf(f));
      if (!src) return err(`${pos[0]} "${target}" not found`);
      const name = f.name || target;
      c.add("Service", name, nsOf(f), { svcType: f.type || "ClusterIP", ports: (f.port || "80") + "/TCP", selector: "app=" + target, clusterIP: "10.96.0." + (c.list("Service").length + 20) });
      return `service/${name} exposed`;
    },

    scale(c, pos, f) {
      const kind = kindOf(pos[0]) || "Deployment";
      const name = pos[1] || (pos[0] && pos[0].includes("/") ? pos[0].split("/")[1] : null);
      const d = c.getObj("Deployment", name, nsOf(f));
      if (!d) return err(`deployments.apps "${name}" not found`);
      d.replicas = parseInt(f.replicas, 10); d.available = d.replicas; c.syncDeployPods(d);
      return `deployment.apps/${name} scaled`;
    },

    set(c, pos, f) {
      if (pos[0] === "image") {
        const kind = kindOf(pos[1]) || "Deployment"; const name = pos[2];
        const spec = pos[3] || ""; const img = spec.split("=")[1];
        const d = c.getObj("Deployment", name, nsOf(f));
        if (!d) return err(`deployments.apps "${name}" not found`);
        if (img) { d.image = img; c.syncDeployPods(d); }
        return `deployment.apps/${name} image updated`;
      }
      return err("unsupported set subcommand");
    },

    delete(c, pos, f) {
      const kind = kindOf(pos[0]); const name = pos[1];
      if (!kind || !name) return err("delete requires a resource and name");
      const ok = c.remove(kind, name, nsOf(f));
      if (kind === "Deployment") c.objs = c.objs.filter((o) => !(o.kind === "Pod" && o.owner === name));
      return ok ? `${pos[0]} "${name}" deleted` : err(`${pos[0]} "${name}" not found`);
    },

    label(c, pos, f) {
      const kind = kindOf(pos[0]); const name = pos[1];
      const o = c.getObj(kind, name, nsOf(f));
      if (!o) return err(`${pos[0]} "${name}" not found`);
      o.labels = o.labels || {};
      pos.slice(2).forEach((p) => { if (p.endsWith("-")) delete o.labels[p.slice(0, -1)]; else { const [k, v] = p.split("="); if (k) o.labels[k] = v; } });
      return `${pos[0]}/${name} labeled`;
    },

    annotate(c, pos, f) {
      const kind = kindOf(pos[0]); const o = c.getObj(kind, pos[1], nsOf(f));
      if (!o) return err(`${pos[0]} "${pos[1]}" not found`);
      o.annotations = o.annotations || {};
      pos.slice(2).forEach((p) => { const [k, v] = p.split("="); if (k) o.annotations[k] = v; });
      return `${pos[0]}/${pos[1]} annotated`;
    },

    cordon(c, pos) { const n = c.node(pos[0]); if (!n) return err(`node "${pos[0]}" not found`); n.schedulable = false; return `node/${pos[0]} cordoned`; },
    uncordon(c, pos) { const n = c.node(pos[0]); if (!n) return err(`node "${pos[0]}" not found`); n.schedulable = true; return `node/${pos[0]} uncordoned`; },
    drain(c, pos) {
      const n = c.node(pos[0]); if (!n) return err(`node "${pos[0]}" not found`);
      n.schedulable = false;
      c.objs = c.objs.filter((o) => !(o.kind === "Pod" && o.node === pos[0]));
      return `node/${pos[0]} cordoned\nnode/${pos[0]} drained`;
    },
    taint(c, pos, f) {
      const n = c.node(pos[1]); if (!n) return err(`node "${pos[1]}" not found`);
      pos.slice(2).forEach((spec) => {
        const minus = spec.endsWith("-"); const s = minus ? spec.slice(0, -1) : spec;
        const [kv, effect] = s.split(":"); const [key, value] = kv.split("=");
        n.taints = n.taints || [];
        if (minus) n.taints = n.taints.filter((t) => t.key !== key);
        else n.taints.push({ key, value, effect });
      });
      return `node/${pos[1]} tainted`;
    },

    rollout(c, pos, f) {
      const sub = pos[0]; const name = pos[2] || (pos[1] && pos[1].split("/")[1]);
      const d = c.getObj("Deployment", name, nsOf(f));
      if (sub === "status") return d ? `deployment "${name}" successfully rolled out` : err(`deployments.apps "${name}" not found`);
      if (sub === "restart") { if (d) c.syncDeployPods(d); return `deployment.apps/${name} restarted`; }
      if (sub === "undo") { return `deployment.apps/${name} rolled back`; }
      if (sub === "history") return `deployment.apps/${name}\nREVISION  CHANGE-CAUSE\n1         <none>\n2         <none>`;
      return err("unknown rollout subcommand");
    },

    version() { return "Client Version: v1.31.1\nServer Version: v1.31.1"; },
    config(c, pos) { if (pos[0] === "current-context") return "kubernetes-admin@kubernetes"; if (pos[0] === "get-contexts") return table(["CURRENT", "NAME", "CLUSTER"], [["*", "kubernetes-admin@kubernetes", "kubernetes"]]); return ""; },
  };

  function run(cluster, line) {
    line = (line || "").trim();
    if (!line) return "";
    cluster.history.push(line);
    if (line === "clear") return "\x00CLEAR";
    const tokens = line.split(/\s+/);
    if (tokens[0] !== "kubectl" && tokens[0] !== "k") return `${tokens[0]}: command not found (utilise kubectl)`;
    const verb = tokens[1];
    if (!verb) return "kubectl controls the Kubernetes cluster manager.\nTape par ex. : kubectl get pods";
    const handler = VERBS[verb];
    if (!handler) return err(`unknown command "${verb}" — verbes simulés : ${Object.keys(VERBS).join(", ")}`);
    const { flags, pos } = parseFlags(tokens.slice(2));
    try { return handler(cluster, pos, flags); }
    catch (e) { return err("simulateur : " + e.message); }
  }

  window.KubeSim = {
    createCluster(seedFn) {
      const c = new Cluster();
      c.seedBase();
      if (seedFn) seedFn(c);
      return c;
    },
    run,
  };
})();
