// Traductions anglaises des questions (q + choices) — conditions d'examen.
// Surcharge par id : window.CKA.questions[i].en = { q, choices }.
// Le débriefing (explain/why) reste en français (aide à l'apprentissage).
// Lot 1 : Architecture. Étendre par lots dans le même objet EN.
(function () {
  const EN = {
    /* ---------- ARCHITECTURE (theory.js) ---------- */
    "th-arch-1": { q: "Which control plane component stores the entire cluster state?", choices: ["kube-scheduler", "etcd", "kubelet", "kube-proxy"] },
    "th-arch-2": { q: "Which component decides on which node a newly created Pod should run?", choices: ["kube-controller-manager", "kube-apiserver", "kube-scheduler", "etcd"] },
    "th-arch-3": { q: "On a node, which components must run for it to join and serve the cluster? (multiple answers)", choices: ["kubelet", "kube-proxy", "kube-scheduler", "etcd"] },
    "th-arch-4": { q: "With kubeadm, which command generates a new join command to add a worker?", choices: ["kubeadm token create --print-join-command", "kubeadm join --generate", "kubeadm init --join", "kubectl join node"] },
    "th-arch-5": { q: "By default, where are the control plane Static Pod manifests installed by kubeadm?", choices: ["/etc/kubernetes/manifests", "/var/lib/kubelet/pods", "/etc/kubernetes/static", "/opt/kubernetes/manifests"] },
    "th-arch-6": { q: "Which command backs up etcd to a snapshot?", choices: ["etcdctl snapshot save snap.db", "etcdctl backup --dir", "kubectl etcd save", "etcdctl dump > snap.db"] },
    "th-arch-7": { q: "A ServiceAccount is mainly used to:", choices: ["Authenticate a human user", "Provide an identity to processes running in a Pod", "Encrypt etcd", "Route Service traffic"] },
    "th-arch-8": { q: "In RBAC, which object binds a (namespaced) Role to a subject in a namespace?", choices: ["ClusterRoleBinding", "RoleBinding", "ClusterRole", "PodSecurityPolicy"] },
    "th-arch-9": { q: "During a kubeadm upgrade, in which order should you proceed?", choices: ["worker then control plane", "control plane (kubeadm upgrade apply) then kubelet, then workers", "kubelet everywhere then kubeadm", "everything at once"] },
    "th-arch-10": { q: "What is the single entry point for all kubectl commands and all components?", choices: ["kubelet", "kube-apiserver", "etcd", "coredns"] },
    "th-arch-11": { q: "Which command checks the effective permissions of the current user?", choices: ["kubectl auth can-i", "kubectl rbac check", "kubectl describe role", "kubectl whoami"] },
    "th-arch-12": { q: "The admin kubeconfig client certificate has expired. Which directory holds the cluster CA (kubeadm)?", choices: ["/etc/kubernetes/pki", "/var/lib/kubernetes", "/etc/ssl/k8s", "/root/.kube"] },

    /* ---------- ARCHITECTURE (theory2.js) ---------- */
    "t2-a1": { q: "Which TCP port does the etcd client listen on by default?", choices: ["2379", "6443", "10250", "8080"] },
    "t2-a2": { q: "On which port does the API server listen over HTTPS by default?", choices: ["443", "6443", "8443", "2379"] },
    "t2-a3": { q: "Which component runs the control loops (reconciling desired vs actual state)?", choices: ["kube-scheduler", "kube-controller-manager", "kubelet", "etcd"] },
    "t2-a4": { q: "Which command lists resource types and their short names?", choices: ["kubectl api-resources", "kubectl get all", "kubectl explain", "kubectl types"] },
    "t2-a5": { q: "Which authorization modes does kubeadm enable by default?", choices: ["ABAC only", "AlwaysAllow", "Node and RBAC", "Webhook only"] },
    "t2-a6": { q: "To grant a subject full cluster rights, which built-in ClusterRole do you bind?", choices: ["admin", "edit", "cluster-admin", "view"] },
    "t2-a7": { q: "Which `kubeadm init` flag sets the Pod network CIDR?", choices: ["--service-cidr", "--pod-network-cidr", "--cni-cidr", "--cluster-cidr"] },
    "t2-a8": { q: "Which object extends the Kubernetes API with a new resource type?", choices: ["CustomResourceDefinition", "APIService add-on", "ConfigMap", "Aggregator"] },
    "t2-a9": { q: "Default lifetime of a kubeadm join token?", choices: ["1 hour", "24 hours", "7 days", "unlimited"] },
    "t2-a10": { q: "How do you change the default namespace of the current kubectl context?", choices: ["kubectl config set-context --current --namespace=dev", "kubectl set namespace dev", "kubectl namespace dev", "kubectl config namespace dev"] },
    "t2-a11": { q: "Which controller signs approved CertificateSigningRequests?", choices: ["kube-scheduler", "kube-controller-manager", "kubelet", "etcd"] },
    "t2-a12": { q: "Where does kubeadm write the administrator kubeconfig?", choices: ["/root/.kube/config", "/etc/kubernetes/admin.conf", "/var/lib/kubelet/config.yaml", "/etc/kubernetes/pki/admin"] },
    "t2-a13": { q: "Which object limits the aggregate resource consumption of a namespace?", choices: ["LimitRange", "ResourceQuota", "PriorityClass", "PodDisruptionBudget"] },
    "t2-a14": { q: "Which object sets default/min/max requests-limits per container in a namespace?", choices: ["ResourceQuota", "LimitRange", "HorizontalPodAutoscaler", "PriorityClass"] },
    "t2-a15": { q: "What does a PodDisruptionBudget protect against?", choices: ["Application crashes", "Voluntary disruptions (drain), by guaranteeing a minimum number of Pods", "Network attacks", "etcd data loss"] },
    "t2-a16": { q: "Which command renews the certificates managed by kubeadm?", choices: ["kubeadm certs renew all", "kubeadm reset certs", "kubectl renew certs", "openssl renew"] },
    "t2-a17": { q: "Which config file does the kubeadm-installed kubelet use?", choices: ["/etc/kubernetes/kubelet.conf only", "/var/lib/kubelet/config.yaml", "/etc/kubelet.yaml", "/etc/systemd/kubelet"] },
    "t2-a18": { q: "Which command creates a ClusterRoleBinding granting cluster-admin to user bob?", choices: ["kubectl create clusterrolebinding bob-admin --clusterrole=cluster-admin --user=bob", "kubectl bind bob cluster-admin", "kubectl create rolebinding bob --role=cluster-admin", "kubectl grant bob admin"] },
    "t2-a19": { q: "What does `kubeadm upgrade apply v1.31.1` do?", choices: ["Upgrades the control plane components to that version", "Upgrades only kubelet", "Backs up etcd", "Resets the cluster"] },
    "t2-a20": { q: "Which component runs on every node to drive containers and Pods?", choices: ["kube-proxy", "kubelet", "container runtime only", "etcd"] },
    "t2-a21": { q: "Which add-on provides internal cluster DNS resolution?", choices: ["kube-proxy", "CoreDNS", "etcd", "metrics-server"] },
    "t2-a22": { q: "On a node, which systemd command inspects the kubelet state?", choices: ["systemctl status kubelet", "kubectl get kubelet", "service apiserver status", "journalctl kube-proxy"] },
  };

  let n = 0;
  (window.CKA.questions || []).forEach((q) => { if (EN[q.id]) { q.en = Object.assign(q.en || {}, EN[q.id]); n++; } });
  window.CKA._enCount = n;
})();
