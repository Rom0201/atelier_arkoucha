// ═══════════════════════════════════════════════
//  ✏️  MODIFIEZ VOS TABLEAUX ICI
//  Pour chaque tableau, remplissez :
//    - titre      : nom du tableau
//    - technique  : ex "Huile sur toile", "Aquarelle"...
//    - description: texte de présentation
//    - prix       : le prix ORIGINAL (avant réduction), ex "350 €"
//    - image      : chemin vers votre photo (ex "tableau1.jpg")
//               ou laissez "" pour un placeholder gris
//
//  Le prix affiché sur le site sera automatiquement le prix
//  original barré + le prix réduit de -35% calculé tout seul.
//  Pour changer le pourcentage de réduction, modifiez la
//  constante POURCENTAGE_PROMO juste en dessous.
// ═══════════════════════════════════════════════

const POURCENTAGE_PROMO = 35; // en %

const tableaux = [
  {
    id: "tableau1",
    titre: "La fille au printemps",
    technique: "Peinture à l'huile et à la spatule.",
    description:
      "Une jeune femme aux cheveux de feu s'abandonne à la douceur du renouveau. Sa robe aux teintes orangées et vertes se confond avec la nature qui l'entoure, dans un tourbillon de couleurs vives et généreuses. L'œuvre mêle peinture texturée et éléments en relief — perles, brindilles, feuilles séchées, grappes — donnant à la toile une dimension presque tactile et précieuse. Une célébration joyeuse de la vie et de la féminité.",
    prix: "350 €",
    image: "tableau1.jpeg",
    position: true,
  },
  {
    id: "tableau2",
    titre: "Le champs de lavandes",
    technique: "Peinture à l'huile et à la spatule.",
    description:
      "Des rangées de lavande violette s'étendent au premier plan, rythmant la composition d'un mouvement presque musical. Au-delà, les collines dorées se déploient sous un ciel nuageux, ponctuées de maisons provençales et de cyprès élancés. Les sommets enneigés à l'horizon rappellent la grandeur du paysage du sud de la France. Une œuvre lumineuse et généreuse, portée par une touche vive et énergique.",
    prix: "400 €",
    image: "tableau2.jpeg",
  },
  {
    id: "tableau3",
    titre: "La Marocaine",
    technique: "Peinture à l'huile et à la spatule.",
    description:
      "Une femme élégante et sereine, drapée de blanc, trône dans un fauteuil en osier sculpté comme un soleil. Le sol ocre doré, les drapés rouges et le feuillage aux reflets bleus et verts créent un écrin chaleureux et exotique autour d'elle. À ses pieds, une jarre en terre cuite, des bols et un plateau tressé évoquent la douceur d'un quotidien méditerranéen. Une œuvre haute en couleur, empreinte de grâce et de dignité.",
    prix: "250 €",
    image: "tableau3.jpeg",
    position: true,
  },
  {
    id: "tableau4",
    titre: "L'émotion",
    technique: "Peinture à l'huile et à la spatule.",
    description:
      "Des bandes de couleurs brutes — rouge ardent, or, vert émeraude, noir profond — se superposent en strates puissantes, comme les couches d'un sentiment qui monte et déborde. Au cœur de la composition, une ligne de matières en relief explose : perles, étoiles, un cœur argenté, des fleurs, des pierres — autant de fragments de vie incrustés dans la peinture. Une œuvre abstraite et sensorielle, à la frontière entre la toile et la sculpture, qui parle directement aux émotions sans passer par les mots.",
    prix: "300 €",
    image: "tableau4.jpeg",
  },
];

// ═══════════════════════════════════════════════

// Calcule le prix réduit à partir du prix original (ex "350 €" -> "227,50 €")
function calculerPrixReduit(prixStr) {
  const nombre = parseFloat(prixStr.replace("€", "").replace(",", ".").trim());
  const reduit = nombre * (1 - POURCENTAGE_PROMO / 100);
  return reduit.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " €";
}

function imgHTML(t, cls) {
  if (t.image) {
    const topClass = t.position ? "top" : "";
    return `<img src="${t.image}" alt="${t.titre}" class="${cls} ${topClass}" loading="lazy"/>`;
  }
  return `<div class="${cls === "card-img" ? "card-img-placeholder" : "modal-img-placeholder"}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
      <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    <span>Photo à venir</span>
  </div>`;
}

// Rendu galerie
const grid = document.getElementById("gallery-grid");

tableaux.forEach((t, i) => {
  const prixReduit = calculerPrixReduit(t.prix);

  // carte
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    ${imgHTML(t, "card-img")}
    <div class="card-body">
      <div class="card-num">Œuvre n°${String(i + 1).padStart(2, "0")}</div>
      <div class="card-title">${t.titre}</div>
      <div class="card-tech">${t.technique}</div>
      <div class="card-footer">
        <div class="price-block">
          <div class="price-old"><span class="price-old-value">${t.prix}</span> <span class="price-promo">-${POURCENTAGE_PROMO}%</span></div>
          <div class="price-new">${prixReduit}</div>
        </div>
        <button class="btn-voir" onclick="openModal(${i})">Voir</button>
      </div>
    </div>`;
  grid.appendChild(card);
});

// Modal
function openModal(i) {
  const t = tableaux[i];
  const prixReduit = calculerPrixReduit(t.prix);
  document.getElementById("modal-content").innerHTML = `
    ${imgHTML(t, "modal-img")}
    <div class="modal-info">
      <div class="modal-num">Œuvre n°${String(i + 1).padStart(2, "0")}</div>
      <div class="modal-title">${t.titre}</div>
      <div class="modal-tech">${t.technique}</div>
      <div class="modal-desc">${t.description}</div>
      <div class="modal-price-old"><span class="modal-price-old-value">${t.prix}</span> <span class="modal-price-promo">-${POURCENTAGE_PROMO}%</span></div>
      <div class="modal-price-new">${prixReduit}</div>
      <button class="btn-contact-modal" onclick="goContact()">
        Je suis intéressé(e)
      </button>
    </div>`;
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  history.pushState(null, "", "#" + t.id);
}

function closeModal(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModalBtn();
}
function closeModalBtn() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
  history.pushState(null, "", window.location.pathname);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalBtn();
});

// Ouvre automatiquement la modal si un #id est dans l'URL
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const idx = tableaux.findIndex((t) => t.id === hash);
    if (idx !== -1) openModal(idx);
  }
});

function goContact() {
  closeModalBtn();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}
