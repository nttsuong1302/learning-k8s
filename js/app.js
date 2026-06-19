// Moteur de la maison mémorielle.
// - Les zones cliquables du SVG (index.html) ont la classe .hotspot + data-slide.
// - Le contenu des slides vient de window.SLIDES (voir data/*.js).
// - Une slide peut être :
//     * simple : { sections:[{heading, points}] }
//     * "porte" : { door:{ objects:[{id, object, label, en, points}] } }
//       => mini-scène : une PORTE avec des OBJETS numérotés ; chaque objet
//          ouvre sa RUBRIQUE à droite (méthode des loci : numéro + objet).

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

  // --- Blueprint visuel de la porte : forme SVG par id d'objet ---
  function badge(cx, cy, n) {
    return `<circle cx="${cx}" cy="${cy}" r="11" fill="#fff" stroke="var(--accent)" stroke-width="2"/>` +
           `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--accent)">${n}</text>`;
  }

  const DOOR_SHAPES = {
    // 1 — Le noren (rideau rouge avec 関) en haut de la porte
    presentation: (n) => `
      <rect x="40" y="40" width="160" height="34" rx="3" fill="var(--accent)"/>
      <text x="120" y="65" text-anchor="middle" font-size="22" fill="var(--paper)" font-family="serif">関</text>
      ${badge(52, 44, n)}`,
    // 2 — La lanterne suspendue à gauche
    k8s: (n) => `
      <line x1="80" y1="78" x2="80" y2="94" stroke="var(--wood-dark)" stroke-width="2"/>
      <ellipse cx="80" cy="112" rx="16" ry="20" fill="var(--lantern)"/>
      <ellipse cx="80" cy="112" rx="16" ry="20" fill="var(--lantern-glow)" opacity="0.3"/>
      <line x1="66" y1="112" x2="94" y2="112" stroke="var(--wood-dark)" stroke-width="1.5"/>
      ${badge(63, 100, n)}`,
    // 3 — La caisse / colis posé au pied de la porte
    images: (n) => `
      <rect x="146" y="300" width="44" height="42" fill="var(--wood)" stroke="var(--wood-dark)" stroke-width="2"/>
      <line x1="146" y1="321" x2="190" y2="321" stroke="var(--wood-dark)" stroke-width="2"/>
      <line x1="168" y1="300" x2="168" y2="342" stroke="var(--wood-dark)" stroke-width="2"/>
      ${badge(150, 300, n)}`,
    // 4 — Le heurtoir / panneau au centre de la porte
    features: (n) => `
      <rect x="100" y="168" width="40" height="50" rx="3" fill="var(--wood-dark)"/>
      <circle cx="120" cy="200" r="11" fill="none" stroke="var(--lantern-glow)" stroke-width="3"/>
      <circle cx="120" cy="186" r="4" fill="var(--lantern-glow)"/>
      ${badge(101, 168, n)}`,
    // 5 — L'écriteau / boîte aux lettres en haut à droite
    guide: (n) => `
      <rect x="150" y="92" width="42" height="30" rx="2" fill="var(--paper)" stroke="var(--wood-dark)" stroke-width="2"/>
      <line x1="156" y1="102" x2="186" y2="102" stroke="var(--wood)" stroke-width="2"/>
      <line x1="156" y1="110" x2="180" y2="110" stroke="var(--wood)" stroke-width="2"/>
      ${badge(151, 92, n)}`,
  };

  function buildDoorSVG(objects) {
    const objsSVG = objects.map((o, i) => {
      const shape = DOOR_SHAPES[o.id] ? DOOR_SHAPES[o.id](i + 1) : "";
      return `<g class="door-obj" data-rid="${esc(o.id)}" role="button" tabindex="0"
                 aria-label="${esc((i + 1) + ". " + o.object + " — " + o.label)}">${shape}</g>`;
    }).join("");

    return `
      <svg viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" class="door-svg" aria-hidden="false">
        <!-- cadre & vantaux -->
        <rect x="34" y="34" width="172" height="320" rx="4" fill="var(--wood-dark)"/>
        <rect x="46" y="74" width="148" height="276" fill="var(--wood)"/>
        <line x1="120" y1="74" x2="120" y2="350" stroke="var(--wood-dark)" stroke-width="3"/>
        <line x1="46" y1="150" x2="194" y2="150" stroke="var(--wood-dark)" stroke-width="2"/>
        <line x1="46" y1="250" x2="194" y2="250" stroke="var(--wood-dark)" stroke-width="2"/>
        <rect x="22" y="350" width="196" height="18" fill="#46563f"/>
        ${objsSVG}
      </svg>`;
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

  function renderDoorSlide(data) {
    const objs = data.door.objects;
    const tabs = objs.map((o, i) =>
      `<button class="rub-tab" data-rid="${esc(o.id)}">
         <span class="tab-num">${i + 1}</span>${esc(o.label)}
       </button>`).join("");

    const footer = data.source ? `
      <div class="slide-footer">
        <span class="src-label">Source :</span>
        <a href="${esc(data.source)}" target="_blank" rel="noopener">${esc(data.sourceLabel || data.source)} ↗</a>
      </div>` : "";

    slideEl.innerHTML = `
      <button class="close-btn" aria-label="Fermer" data-close>×</button>
      <div class="slide-header">
        <div class="kicker">RDC · CloudNativePG</div>
        <h2>${esc(data.title)}</h2>
        ${data.subtitle ? `<p class="subtitle">${esc(data.subtitle)}</p>` : ""}
      </div>
      <div class="door-scene">
        <div class="door-left">
          ${buildDoorSVG(objs)}
          <p class="door-hint">${esc(data.door.hint || "Clique un objet de la porte.")}</p>
        </div>
        <div class="door-right">
          <div class="rub-tabs">${tabs}</div>
          <div class="rubrique" id="rubrique"></div>
        </div>
      </div>
      ${footer}`;

    selectRubrique(data, objs[0].id);
  }

  function selectRubrique(data, rid) {
    const objs = data.door.objects;
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
    const footer = data.source ? `
      <div class="slide-footer">
        <span class="src-label">Source :</span>
        <a href="${esc(data.source)}" target="_blank" rel="noopener">${esc(data.sourceLabel || data.source)} ↗</a>
      </div>` : "";
    slideEl.innerHTML = `
      <button class="close-btn" aria-label="Fermer" data-close>×</button>
      <div class="slide-header">
        <div class="kicker">RDC · CloudNativePG</div>
        <h2>${esc(data.title)}</h2>
        ${data.subtitle ? `<p class="subtitle">${esc(data.subtitle)}</p>` : ""}
      </div>
      <div class="slide-body">${sections}</div>
      ${footer}`;
  }

  let current = null;

  function open(id) {
    const data = (window.SLIDES || {})[id];
    if (!data) { console.warn("Aucune slide pour l'objet :", id); return; }
    current = data;
    if (data.door) renderDoorSlide(data);
    else renderSimpleSlide(data);
    overlay.classList.add("open");
    slideEl.scrollTop = 0;
    const closeBtn = slideEl.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }

  function close() { overlay.classList.remove("open"); current = null; }

  document.addEventListener("click", (e) => {
    const hot = e.target.closest(".hotspot[data-slide]");
    if (hot) { open(hot.getAttribute("data-slide")); return; }

    const obj = e.target.closest(".door-obj[data-rid], .rub-tab[data-rid]");
    if (obj && current && current.door) { selectRubrique(current, obj.getAttribute("data-rid")); return; }

    if (e.target.closest("[data-close]")) { close(); return; }
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Enter" || e.key === " ") {
      const a = document.activeElement;
      if (a && a.classList && a.classList.contains("hotspot")) {
        e.preventDefault(); open(a.getAttribute("data-slide")); return;
      }
      if (a && a.classList && a.classList.contains("door-obj") && current && current.door) {
        e.preventDefault(); selectRubrique(current, a.getAttribute("data-rid"));
      }
    }
  });
})();
