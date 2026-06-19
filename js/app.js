// Moteur de la maison mémorielle.
// - Zones cliquables du SVG principal (index.html) : .hotspot + data-slide
//   (1 clic) et data-dblslide (double-clic).
// - Le contenu vient de window.SLIDES (voir data/*.js).
// - Une slide peut être :
//     * simple  : { sections:[{heading, points}] }
//     * scène   : { scene:"<blueprint>", hint, objects:[{id,object,label,en,points}], nav:[...] }
//       => mini-scène : un décor avec des OBJETS numérotés ; chaque objet ouvre
//          sa RUBRIQUE à droite (méthode des loci : numéro + objet).

(function () {
  "use strict";

  const overlay = document.getElementById("overlay");
  const slideEl = document.getElementById("slide");
  const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
    }[c]));
  }

  // ---------- Petites primitives de dessin ----------
  function badge(cx, cy, n) {
    return `<circle cx="${cx}" cy="${cy}" r="11" fill="#fff" stroke="var(--accent)" stroke-width="2"/>` +
           `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--accent)">${n}</text>`;
  }
  function shoe(x, y, c) {
    return `<ellipse cx="${x}" cy="${y}" rx="12" ry="5.5" fill="${c}"/>` +
           `<rect x="${x - 12}" y="${y - 9}" width="13" height="9" rx="4" fill="${c}"/>`;
  }
  function pairShoes(x, y, c) { return shoe(x, y, c) + shoe(x + 26, y, c); }

  // ============ Blueprints de scènes (décor SVG + formes des objets) ============
  const SCENE_BLUEPRINTS = {
    // ---- LA PORTE ----
    porte: {
      viewBox: "0 0 240 380",
      base: `
        <rect x="34" y="34" width="172" height="320" rx="4" fill="var(--wood-dark)"/>
        <rect x="46" y="74" width="148" height="276" fill="var(--wood)"/>
        <line x1="120" y1="74" x2="120" y2="350" stroke="var(--wood-dark)" stroke-width="3"/>
        <line x1="46" y1="150" x2="194" y2="150" stroke="var(--wood-dark)" stroke-width="2"/>
        <line x1="46" y1="250" x2="194" y2="250" stroke="var(--wood-dark)" stroke-width="2"/>
        <rect x="22" y="350" width="196" height="18" fill="#46563f"/>`,
      shapes: {
        presentation: (n) => `
          <rect x="40" y="40" width="160" height="34" rx="3" fill="var(--accent)"/>
          <text x="120" y="65" text-anchor="middle" font-size="22" fill="var(--paper)" font-family="serif">関</text>
          ${badge(52, 44, n)}`,
        k8s: (n) => `
          <line x1="80" y1="78" x2="80" y2="94" stroke="var(--wood-dark)" stroke-width="2"/>
          <ellipse cx="80" cy="112" rx="16" ry="20" fill="var(--lantern)"/>
          <ellipse cx="80" cy="112" rx="16" ry="20" fill="var(--lantern-glow)" opacity="0.3"/>
          <line x1="66" y1="112" x2="94" y2="112" stroke="var(--wood-dark)" stroke-width="1.5"/>
          ${badge(63, 100, n)}`,
        images: (n) => `
          <rect x="146" y="300" width="44" height="42" fill="var(--wood)" stroke="var(--wood-dark)" stroke-width="2"/>
          <line x1="146" y1="321" x2="190" y2="321" stroke="var(--wood-dark)" stroke-width="2"/>
          <line x1="168" y1="300" x2="168" y2="342" stroke="var(--wood-dark)" stroke-width="2"/>
          ${badge(150, 300, n)}`,
        features: (n) => `
          <rect x="100" y="168" width="40" height="50" rx="3" fill="var(--wood-dark)"/>
          <circle cx="120" cy="200" r="11" fill="none" stroke="var(--lantern-glow)" stroke-width="3"/>
          <circle cx="120" cy="186" r="4" fill="var(--lantern-glow)"/>
          ${badge(101, 168, n)}`,
        guide: (n) => `
          <rect x="150" y="92" width="42" height="30" rx="2" fill="var(--paper)" stroke="var(--wood-dark)" stroke-width="2"/>
          <line x1="156" y1="102" x2="186" y2="102" stroke="var(--wood)" stroke-width="2"/>
          <line x1="156" y1="110" x2="180" y2="110" stroke="var(--wood)" stroke-width="2"/>
          ${badge(151, 92, n)}`,
      },
    },

    // ---- L'ENTRÉE / GENKAN ----
    entree: {
      viewBox: "0 0 240 380",
      base: `
        <!-- mur du fond + plancher surélevé + tataki (sol bas du genkan) -->
        <rect x="0" y="0" width="240" height="300" fill="var(--paper)"/>
        <rect x="0" y="300" width="240" height="80" fill="#6e5a4a"/>
        <line x1="0" y1="300" x2="240" y2="300" stroke="var(--wood-dark)" stroke-width="3"/>
        <!-- getabako (meuble à chaussures) -->
        <rect x="118" y="78" width="104" height="216" rx="3" fill="var(--wood)" stroke="var(--wood-dark)" stroke-width="3"/>
        <line x1="118" y1="150" x2="222" y2="150" stroke="var(--wood-dark)" stroke-width="2.5"/>
        <line x1="118" y1="222" x2="222" y2="222" stroke="var(--wood-dark)" stroke-width="2.5"/>
        <rect x="118" y="294" width="104" height="10" fill="var(--wood-dark)"/>`,
      shapes: {
        // paillasson de bienvenue, posé sur le tataki
        tapis: (n) => `
          <rect x="26" y="320" width="118" height="40" rx="5" fill="var(--accent)"/>
          <rect x="32" y="326" width="106" height="28" rx="3" fill="none" stroke="var(--paper)" stroke-width="1.5" opacity="0.7"/>
          <text x="85" y="346" text-anchor="middle" font-size="15" fill="var(--paper)" font-family="serif">ようこそ</text>
          ${badge(30, 320, n)}`,
        // chaussures — étagère du haut
        term_k8s: (n) => `${pairShoes(150, 138, "var(--roof-light)")}${badge(126, 92, n)}`,
        // chaussures — étagère du milieu
        term_pg: (n) => `${pairShoes(150, 210, "var(--wood-dark)")}${badge(126, 164, n)}`,
        // chaussures — étagère du bas
        term_cloud: (n) => `${pairShoes(150, 282, "#8d8270")}${badge(126, 236, n)}`,
        // pantoufles, prêtes à enfiler sur le plancher surélevé
        suite: (n) => `
          <ellipse cx="56" cy="250" rx="20" ry="9" fill="var(--lantern)"/>
          <ellipse cx="56" cy="247" rx="13" ry="5" fill="var(--lantern-glow)"/>
          <ellipse cx="92" cy="262" rx="20" ry="9" fill="var(--lantern)"/>
          <ellipse cx="92" cy="259" rx="13" ry="5" fill="var(--lantern-glow)"/>
          ${badge(40, 238, n)}`,
      },
    },
  };

  function buildSceneSVG(sceneName, objects) {
    const bp = SCENE_BLUEPRINTS[sceneName];
    if (!bp) return "";
    const objsSVG = objects.map((o, i) => {
      const shape = bp.shapes[o.id] ? bp.shapes[o.id](i + 1) : "";
      return `<g class="door-obj" data-rid="${esc(o.id)}" role="button" tabindex="0"
                 aria-label="${esc((i + 1) + ". " + o.object + " — " + o.label)}">${shape}</g>`;
    }).join("");
    return `<svg viewBox="${bp.viewBox}" xmlns="http://www.w3.org/2000/svg" class="door-svg">${bp.base}${objsSVG}</svg>`;
  }

  // ---------- Rendu ----------
  function footerHTML(data) {
    return data.source ? `
      <div class="slide-footer">
        <span class="src-label">Source :</span>
        <a href="${esc(data.source)}" target="_blank" rel="noopener">${esc(data.sourceLabel || data.source)} ↗</a>
      </div>` : "";
  }

  function navHTML(data) {
    if (!data.nav || !data.nav.length) return "";
    return `<div class="scene-nav">` + data.nav.map((n) =>
      `<button class="nav-btn" data-go="${esc(n.slide)}">${esc(n.label)}</button>`).join("") + `</div>`;
  }

  function renderRubrique(obj, index) {
    const en = obj.en
      ? `<p class="rub-en"><span>en.</span> ${esc(obj.en)} <em>— explication en français ci-dessous</em></p>`
      : "";
    return `
      <div class="rub-obj">${CIRCLED[index] || (index + 1)} ${esc(obj.object)}</div>
      <h3 class="rub-title">${esc(obj.label)}</h3>
      ${en}
      <ul class="rub-points">${obj.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
  }

  function renderSceneSlide(data) {
    const objs = data.objects;
    const tabs = objs.map((o, i) =>
      `<button class="rub-tab" data-rid="${esc(o.id)}"><span class="tab-num">${i + 1}</span>${esc(o.label)}</button>`).join("");

    slideEl.innerHTML = `
      <button class="close-btn" aria-label="Fermer" data-close>×</button>
      <div class="slide-header">
        <div class="kicker">RDC · CloudNativePG</div>
        <h2>${esc(data.title)}</h2>
        ${data.subtitle ? `<p class="subtitle">${esc(data.subtitle)}</p>` : ""}
      </div>
      <div class="door-scene">
        <div class="door-left">
          ${buildSceneSVG(data.scene, objs)}
          <p class="door-hint">${esc(data.hint || "Clique un objet.")}</p>
          ${navHTML(data)}
        </div>
        <div class="door-right">
          <div class="rub-tabs">${tabs}</div>
          <div class="rubrique" id="rubrique"></div>
        </div>
      </div>
      ${footerHTML(data)}`;

    selectRubrique(data, objs[0].id);
  }

  function selectRubrique(data, rid) {
    const objs = data.objects;
    const idx = objs.findIndex((o) => o.id === rid);
    if (idx < 0) return;
    const rub = document.getElementById("rubrique");
    if (rub) rub.innerHTML = renderRubrique(objs[idx], idx);
    slideEl.querySelectorAll(".door-obj").forEach((g) =>
      g.classList.toggle("selected", g.getAttribute("data-rid") === rid));
    slideEl.querySelectorAll(".rub-tab").forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-rid") === rid));
  }

  function renderSimpleSlide(data) {
    const sections = (data.sections || []).map((sec) => `
      <div class="slide-section">
        <h3>${esc(sec.heading)}</h3>
        <ul>${sec.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`).join("");
    slideEl.innerHTML = `
      <button class="close-btn" aria-label="Fermer" data-close>×</button>
      <div class="slide-header">
        <div class="kicker">RDC · CloudNativePG</div>
        <h2>${esc(data.title)}</h2>
        ${data.subtitle ? `<p class="subtitle">${esc(data.subtitle)}</p>` : ""}
      </div>
      <div class="slide-body">${sections}</div>
      ${footerHTML(data)}`;
  }

  let current = null;

  function open(id) {
    const data = (window.SLIDES || {})[id];
    if (!data) { console.warn("Aucune slide pour :", id); return; }
    current = data;
    if (data.scene) renderSceneSlide(data);
    else renderSimpleSlide(data);
    overlay.classList.add("open");
    slideEl.scrollTop = 0;
    const closeBtn = slideEl.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }

  function close() { overlay.classList.remove("open"); current = null; }

  // ---------- Interactions ----------
  document.addEventListener("click", (e) => {
    const hot = e.target.closest(".hotspot[data-slide]");
    if (hot) { open(hot.getAttribute("data-slide")); return; }

    const go = e.target.closest("[data-go]");
    if (go) { open(go.getAttribute("data-go")); return; }

    const obj = e.target.closest(".door-obj[data-rid], .rub-tab[data-rid]");
    if (obj && current && current.scene) { selectRubrique(current, obj.getAttribute("data-rid")); return; }

    if (e.target.closest("[data-close]")) { close(); return; }
    if (e.target === overlay) close();
  });

  // Double-clic sur un objet de la scène principale -> on "entre"
  document.addEventListener("dblclick", (e) => {
    const dbl = e.target.closest("[data-dblslide]");
    if (dbl) { open(dbl.getAttribute("data-dblslide")); }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Enter" || e.key === " ") {
      const a = document.activeElement;
      if (a && a.classList && a.classList.contains("hotspot")) {
        e.preventDefault(); open(a.getAttribute("data-slide")); return;
      }
      if (a && a.classList && a.classList.contains("door-obj") && current && current.scene) {
        e.preventDefault(); selectRubrique(current, a.getAttribute("data-rid"));
      }
    }
  });
})();
