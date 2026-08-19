const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".player-card");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    cards.forEach(card => {
      const show = filter === "Todos" || card.dataset.position === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

const profileModal = document.getElementById("profileModal");
const profileDialog = profileModal.querySelector(".profile-dialog");
const profileClose = profileModal.querySelector(".profile-close");
const profileType = document.getElementById("profileType");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const profileStats = document.getElementById("profileStats");
const profileDescription = document.getElementById("profileDescription");
const profileBadge = document.getElementById("profileBadge");
const profilePhoto = document.getElementById("profilePhoto");
const profileNegative = document.getElementById("profileNegative");
const profileVisual = document.getElementById("profileVisual");

let closeTimer = null;

function buildStat(label, value) {
  if (!value) return "";
  return `
    <div class="profile-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function openProfile(card) {
  clearTimeout(closeTimer);

  const type = card.dataset.profileType || "Ficha";
  const name = card.dataset.profileName || "";
  const role = card.dataset.profileRole || "";
  const number = card.dataset.profileNumber || "";
  const height = card.dataset.profileHeight || "";
  const weight = card.dataset.profileWeight || "";
  const photo = card.dataset.profilePhoto || "";
  const description = card.dataset.profileDescription || "";

  profileType.textContent = type;
  profileName.textContent = name;
  profileRole.textContent = role;
  profileBadge.textContent = number || role.slice(0, 2).toUpperCase();
  profileDescription.textContent = description;

  if (photo) {
    profilePhoto.src = photo;
    profilePhoto.alt = `Foto de ${name}`;
    profileNegative.src = photo;
    profilePhoto.style.display = "";
    profileNegative.style.display = "";
  } else {
    profilePhoto.removeAttribute("src");
    profileNegative.removeAttribute("src");
    profilePhoto.style.display = "none";
    profileNegative.style.display = "none";
  }

  if (type === "Jugador") {
    profileStats.innerHTML =
      buildStat("Altura", height) +
      buildStat("Peso", weight) +
      buildStat("Posición", role);
  } else {
    profileStats.innerHTML =
      buildStat("Rol", role) +
      buildStat("Área", "Staff técnico");
  }

  profileModal.classList.add("is-open");
  profileModal.setAttribute("aria-hidden", "false");
}

function closeProfile() {
  profileModal.classList.remove("is-open");
  profileModal.setAttribute("aria-hidden", "true");
}

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closeProfile, 180);
}

document.querySelectorAll(".player-card, .staff-card").forEach(card => {
  card.addEventListener("mouseenter", () => openProfile(card));
  card.addEventListener("focusin", () => openProfile(card));
  card.addEventListener("mouseleave", scheduleClose);
  card.addEventListener("click", () => openProfile(card));
});

profileDialog.addEventListener("mouseenter", () => clearTimeout(closeTimer));
profileDialog.addEventListener("mouseleave", scheduleClose);

profileClose.addEventListener("click", closeProfile);

profileModal.addEventListener("click", event => {
  if (event.target === profileModal) closeProfile();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProfile();
});

const contactForm = document.getElementById("contactoForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const tipo = document.getElementById("tipo").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !telefono || !mensaje) {
      alert("Por favor completa nombre/empresa, teléfono/email y mensaje antes de enviar.");
      return;
    }

    const destinatario = "agsbenitez@gmail.com";
    const asunto = "Consulta web U17 Regatas Corrientes";
    const cuerpo = [
      `Nombre / Empresa: ${nombre}`,
      `Teléfono / Email: ${telefono}`,
      `Tipo de interés: ${tipo}`,
      "",
      "Mensaje:",
      mensaje
    ].join("\n");

    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoLink;
  });
}
