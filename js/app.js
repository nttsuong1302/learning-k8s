// CKA Trainer — moteur : accueil, sessions de quiz, terminal simulé, progression.
(function () {
  "use strict";

  const $ = (sel, el) => (el || document).querySelector(sel);
  const app = $("#app");
  const BANK = window.CKA.questions;
  const DOMAINS = window.CKA.domains;
  const TECHS = window.CKA.techniques || [];
  const domainById = (id) => DOMAINS.find((d) => d.id === id);
  // Techniques ordonnées par domaine (pour un parcours cohérent Précédent/Suivant)
  const orderedTechs = DOMAINS.reduce((acc, d) => acc.concat(TECHS.filter((t) => t.domain === d.id)), []);

  // ---------- progression (localStorage) ----------
  const PKEY = "cka-progress-v1";
  const loadProg = () => { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; } };
  const saveProg = (p) => localStorage.setItem(PKEY, JSON.stringify(p));
  let progress = loadProg();
  function mark(id, correct) {
    const cur = progress[id] || {};
    progress[id] = { seen: true, correct: correct || cur.correct || false, ts: Date.now() };
    saveProg(progress);
  }

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

  // ============================ ACCUEIL ============================
  function renderHome() {
    const total = BANK.length;
    const answered = Object.keys(progress).filter((id) => progress[id].seen).length;
    const correct = Object.keys(progress).filter((id) => progress[id].correct).length;

    const cards = DOMAINS.map((d) => {
      const qs = BANK.filter((q) => q.domain === d.id);
      const done = qs.filter((q) => progress[q.id] && progress[q.id].correct).length;
      const pct = qs.length ? Math.round((done / qs.length) * 100) : 0;
      return `
        <button class="domain-card" data-domain="${d.id}" style="--c:${d.color}">
          <div class="dc-top"><span class="dc-icon">${d.icon}</span><span class="dc-weight">${d.weight}%</span></div>
          <h3>${esc(d.short)}</h3>
          <p class="dc-name">${esc(d.name)}</p>
          <div class="dc-bar"><span style="width:${pct}%"></span></div>
          <div class="dc-meta">${done}/${qs.length} réussies · ${qs.length} questions</div>
        </button>`;
    }).join("");

    app.innerHTML = `
      <section class="hero">
        <h1>CKA Trainer <span class="ver">v1</span></h1>
        <p class="sub">Révision de la certification <strong>Certified Kubernetes Administrator</strong> — questions théoriques &amp; pratiques avec terminal <code>kubectl</code> simulé.</p>
        <div class="stats">
          <div><b>${total}</b><span>questions</span></div>
          <div><b>${answered}</b><span>abordées</span></div>
          <div><b>${correct}</b><span>réussies</span></div>
        </div>
        <div class="quick">
          <button class="btn primary" data-start="all">▶ Tout réviser (${total})</button>
          <button class="btn" data-start="theory">📖 Théorie (${BANK.filter((q) => q.type === "theory").length})</button>
          <button class="btn" data-start="practical">🧪 Pratique (${BANK.filter((q) => q.type === "practical").length})</button>
          <button class="btn" data-start="exam">🎲 Mode examen (aléatoire)</button>
          <button class="btn accent" data-techs>🧭 Parcourir les techniques (${TECHS.length})</button>
          <button class="btn ghost" data-reset>↺ Réinitialiser la progression</button>
        </div>
      </section>
      <h2 class="section-title">Domaines CKA</h2>
      <div class="domain-grid">${cards}</div>
      <footer class="foot">Banque v1 · on grossit ensuite par lots jusqu'à 1000 questions. Progression enregistrée localement (ce navigateur).</footer>`;
  }

  // ============================ TECHNIQUES ============================
  let techFilter = "";

  function techCardHTML(t) {
    const gi = orderedTechs.indexOf(t);
    return `<button class="tech-card" data-tech-open="${gi}"><span class="tc-title">${esc(t.title)}</span><span class="tc-sum">${esc(t.summary)}</span></button>`;
  }

  function renderTechIndex() {
    const f = techFilter.toLowerCase();
    const match = (t) => !f || (t.title + " " + t.summary + " " + (t.points || []).join(" ") + " " + (t.cmds || []).join(" ")).toLowerCase().includes(f);
    const groups = DOMAINS.map((d) => {
      const list = TECHS.filter((t) => t.domain === d.id && match(t));
      if (!list.length) return "";
      return `<div class="tech-group"><h3 style="--c:${d.color}">${d.icon} ${esc(d.short)} <span>${list.length}</span></h3><div class="tech-list">${list.map(techCardHTML).join("")}</div></div>`;
    }).join("");
    app.innerHTML = `
      <div class="qtop">
        <button class="btn ghost sm" data-home>← Accueil</button>
        <div class="qtitle">🧭 Techniques Kubernetes</div>
        <div class="qcount">${TECHS.length}</div>
      </div>
      <p class="muted" style="margin:2px 0 14px">Aide-mémoire à parcourir. Clique une technique, puis navigue avec Précédent / Suivant.</p>
      <input class="search" id="techSearch" placeholder="🔍 Filtrer (ex. etcd, service, drain, PVC…)" value="${esc(techFilter)}">
      <div class="tech-index">${groups || '<p class="muted">Aucune technique ne correspond.</p>'}</div>`;
    const s = $("#techSearch");
    s.addEventListener("input", () => { techFilter = s.value; const pos = s.selectionStart; renderTechIndex(); const n = $("#techSearch"); n.focus(); n.setSelectionRange(pos, pos); });
  }

  function renderTechReader(i) {
    if (i < 0) i = 0; if (i > orderedTechs.length - 1) i = orderedTechs.length - 1;
    const t = orderedTechs[i]; const d = domainById(t.domain);
    const cmds = (t.cmds || []).map((c) => `<pre class="cmd">${esc(c)}</pre>`).join("");
    app.innerHTML = `
      <div class="qtop">
        <button class="btn ghost sm" data-tech-index>← Liste</button>
        <div class="qtitle">🧭 Techniques</div>
        <div class="qcount">${i + 1} / ${orderedTechs.length}</div>
      </div>
      <div class="qbar"><span style="width:${((i + 1) / orderedTechs.length) * 100}%"></span></div>
      <div class="qtags"><span class="tag" style="--c:${d.color}">${d.icon} ${esc(d.short)}</span></div>
      <div class="qcard">
        <h2 class="qtext">${esc(t.title)}</h2>
        <p class="scenario">${esc(t.summary)}</p>
        <ul class="tech-points">${(t.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        ${cmds ? `<div class="tech-cmds"><b>Commandes clés</b>${cmds}</div>` : ""}
        ${t.ref ? `<a class="doc-link" href="${esc(t.ref)}" target="_blank" rel="noopener">📚 Documentation ↗</a>` : ""}
      </div>
      <div class="qnav">
        <button class="btn ghost" data-tech-prev ${i === 0 ? "disabled" : ""}>← Précédent</button>
        <button class="btn" data-tech-next ${i === orderedTechs.length - 1 ? "disabled" : ""}>Suivant →</button>
      </div>`;
    techIndexPos = i;
  }
  let techIndexPos = 0;

  // ============================ SESSION ============================
  let session = null;

  function startSession(title, questions) {
    if (!questions.length) { alert("Aucune question dans cette sélection."); return; }
    session = { title, list: questions, i: 0, clusters: {}, terms: {} };
    renderQuestion();
  }

  function progressBarHTML() {
    const n = session.list.length, i = session.i;
    return `<div class="qbar"><span style="width:${((i) / n) * 100}%"></span></div>`;
  }

  function renderQuestion() {
    const q = session.list[session.i];
    const d = domainById(q.domain);
    const head = `
      <div class="qtop">
        <button class="btn ghost sm" data-home>← Accueil</button>
        <div class="qtitle">${session.title}</div>
        <div class="qcount">${session.i + 1} / ${session.list.length}</div>
      </div>
      ${progressBarHTML()}
      <div class="qtags">
        <span class="tag" style="--c:${d.color}">${d.icon} ${esc(d.short)}</span>
        <span class="tag type-${q.type}">${q.type === "theory" ? "Théorie" : "Pratique"}</span>
        <span class="tag diff-${q.difficulty}">${q.difficulty}</span>
        ${progress[q.id] && progress[q.id].correct ? '<span class="tag ok">✓ réussie</span>' : ""}
      </div>`;

    const body = q.type === "theory" ? theoryHTML(q) : practicalHTML(q);
    const nav = `
      <div class="qnav">
        <button class="btn ghost" data-prev ${session.i === 0 ? "disabled" : ""}>← Précédent</button>
        <button class="btn" data-next>${session.i === session.list.length - 1 ? "Terminer" : "Suivant →"}</button>
      </div>`;

    app.innerHTML = `<section class="quiz">${head}<div class="qcard">${body}</div>${nav}</section>`;
    if (q.type === "theory") wireTheory(q);
    else wirePractical(q);
  }

  // ---------- THÉORIE ----------
  function theoryHTML(q) {
    const multi = q.correct.length > 1;
    const opts = q.choices.map((ch, i) =>
      `<label class="opt" data-i="${i}"><input type="${multi ? "checkbox" : "radio"}" name="opt"> <span>${esc(ch)}</span></label>`).join("");
    return `
      <h2 class="qtext">${esc(q.q)}</h2>
      ${multi ? '<p class="muted">Plusieurs bonnes réponses possibles.</p>' : ""}
      <div class="opts">${opts}</div>
      <div class="qactions"><button class="btn primary" data-check>Valider</button></div>
      <div class="feedback" hidden></div>`;
  }

  function wireTheory(q) {
    const card = $(".qcard");
    $("[data-check]", card).addEventListener("click", () => {
      const chosen = [...card.querySelectorAll(".opt input")].map((inp, i) => inp.checked ? i : -1).filter((i) => i >= 0);
      if (!chosen.length) return;
      const ok = chosen.length === q.correct.length && chosen.every((i) => q.correct.includes(i));
      card.querySelectorAll(".opt").forEach((el, i) => {
        el.classList.toggle("correct", q.correct.includes(i));
        el.classList.toggle("wrong", chosen.includes(i) && !q.correct.includes(i));
      });
      const fb = $(".feedback", card);
      fb.hidden = false;
      fb.className = "feedback " + (ok ? "good" : "bad");
      fb.innerHTML = `<b>${ok ? "✓ Correct" : "✗ Incorrect"}</b><p>${esc(q.explain)}</p>${q.ref ? `<a href="${esc(q.ref)}" target="_blank" rel="noopener">📚 Documentation ↗</a>` : ""}`;
      mark(q.id, ok);
    });
  }

  // ---------- PRATIQUE (terminal simulé) ----------
  function getCluster(q) {
    if (!session.clusters[q.id]) session.clusters[q.id] = window.KubeSim.createCluster(q.seed);
    return session.clusters[q.id];
  }

  function practicalHTML(q) {
    return `
      <h2 class="qtext">${esc(q.title)}</h2>
      <p class="scenario">${esc(q.scenario)}</p>
      <div class="tasks"><b>Tâches</b><ol>${q.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>
      <div class="term">
        <div class="term-head"><span class="dots"><i></i><i></i><i></i></span> terminal — cluster simulé</div>
        <pre class="term-out" id="termOut"></pre>
        <div class="term-in"><span class="prompt">$</span><input id="termIn" autocomplete="off" spellcheck="false" placeholder="kubectl get pods"></div>
      </div>
      <div class="qactions">
        <button class="btn primary" data-verify>✓ Vérifier</button>
        <button class="btn ghost" data-hints>💡 Indices</button>
        <button class="btn ghost" data-solution>🔑 Solution</button>
        <button class="btn ghost" data-resetsim>↺ Réinitialiser le cluster</button>
      </div>
      <div class="goals" hidden></div>
      <div class="aside" hidden></div>`;
  }

  function wirePractical(q) {
    const card = $(".qcard");
    const out = $("#termOut", card), inp = $("#termIn", card);
    const cluster = getCluster(q);
    const hist = session.terms[q.id] || (session.terms[q.id] = []);
    let hIdx = hist.length;

    out.textContent = "# Tape tes commandes kubectl ci-dessous. 'clear' efface l'écran.\n";
    const print = (t) => { out.textContent += t + "\n"; out.scrollTop = out.scrollHeight; };

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const line = inp.value; inp.value = "";
        print("$ " + line);
        const res = window.KubeSim.run(cluster, line);
        if (res === "\x00CLEAR") out.textContent = "";
        else if (res) print(res);
        if (line.trim()) { hist.push(line); hIdx = hist.length; }
      } else if (e.key === "ArrowUp") { if (hIdx > 0) { hIdx--; inp.value = hist[hIdx] || ""; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (hIdx < hist.length) { hIdx++; inp.value = hist[hIdx] || ""; } e.preventDefault(); }
    });
    setTimeout(() => inp.focus(), 30);

    $("[data-verify]", card).addEventListener("click", () => {
      const results = q.goals.map((g) => ({ label: g.label, ok: !!safeCheck(g.check, cluster) }));
      const allOk = results.every((r) => r.ok);
      const box = $(".goals", card);
      box.hidden = false;
      box.className = "goals " + (allOk ? "good" : "bad");
      box.innerHTML = `<b>${allOk ? "✓ Objectifs atteints !" : "Objectifs"}</b><ul>` +
        results.map((r) => `<li class="${r.ok ? "ok" : "ko"}">${r.ok ? "✓" : "✗"} ${esc(r.label)}</li>`).join("") + "</ul>";
      mark(q.id, allOk);
    });
    $("[data-hints]", card).addEventListener("click", () => showAside(card, "Indices", `<ul>${q.hints.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`));
    $("[data-solution]", card).addEventListener("click", () => showAside(card, "Solution de référence", `<pre class="sol">${q.solution.map(esc).join("\n")}</pre><button class="btn sm" data-runsol>▶ Exécuter dans le terminal</button>`, () => {
      const btn = $("[data-runsol]", card);
      if (btn) btn.addEventListener("click", () => { q.solution.forEach((l) => { print("$ " + l); const r = window.KubeSim.run(cluster, l); if (r && r !== "\x00CLEAR") print(r); }); });
    }));
    $("[data-resetsim]", card).addEventListener("click", () => {
      delete session.clusters[q.id]; session.terms[q.id] = [];
      renderQuestion();
    });
  }

  function safeCheck(fn, c) { try { return fn(c); } catch (e) { return false; } }
  function showAside(card, title, html, after) {
    const a = $(".aside", card);
    a.hidden = false;
    a.innerHTML = `<b>${esc(title)}</b>${html}`;
    if (after) after();
  }

  // ============================ ÉVÉNEMENTS ============================
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.closest("[data-home]")) { session = null; renderHome(); return; }
    if (t.closest("[data-techs]")) { renderTechIndex(); return; }
    if (t.closest("[data-tech-index]")) { renderTechIndex(); return; }
    const to = t.closest("[data-tech-open]");
    if (to) { renderTechReader(parseInt(to.getAttribute("data-tech-open"), 10)); return; }
    if (t.closest("[data-tech-prev]") && !t.closest("[data-tech-prev]").disabled) { renderTechReader(techIndexPos - 1); return; }
    if (t.closest("[data-tech-next]") && !t.closest("[data-tech-next]").disabled) { renderTechReader(techIndexPos + 1); return; }
    if (t.closest("[data-prev]") && !t.closest("[data-prev]").disabled) { session.i--; renderQuestion(); return; }
    if (t.closest("[data-next]")) { if (session.i < session.list.length - 1) { session.i++; renderQuestion(); } else { session = null; renderHome(); } return; }

    const card = t.closest(".domain-card");
    if (card) { const id = card.getAttribute("data-domain"); const d = domainById(id); startSession(d.short, BANK.filter((q) => q.domain === id)); return; }

    const start = t.closest("[data-start]");
    if (start) {
      const mode = start.getAttribute("data-start");
      if (mode === "all") startSession("Tout réviser", BANK.slice());
      else if (mode === "theory") startSession("Théorie", BANK.filter((q) => q.type === "theory"));
      else if (mode === "practical") startSession("Pratique", BANK.filter((q) => q.type === "practical"));
      else if (mode === "exam") startSession("Mode examen", shuffle(BANK));
      return;
    }
    if (t.closest("[data-reset]")) {
      if (confirm("Réinitialiser toute la progression ?")) { progress = {}; saveProg(progress); renderHome(); }
    }
  });

  renderHome();
})();
