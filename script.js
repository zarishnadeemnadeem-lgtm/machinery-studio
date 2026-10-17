/*
  MACHINERY STUDIO — website interactions
  IMPORTANT: Replace WHATSAPP_NUMBER with your WhatsApp number.
  Use international format with country code, numbers only.
  Example for Pakistan: 923001234567 (do not include +, spaces, or dashes).
*/
const WHATSAPP_NUMBER = "923001234567"; // CHANGE THIS to your real WhatsApp number.

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const whatsappForm = document.getElementById("whatsappForm");
const formStatus = document.getElementById("formStatus");
const floatingWhatsApp = document.getElementById("floatingWhatsApp");

function makeWhatsAppLink(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function numberIsPlaceholder() {
  return !WHATSAPP_NUMBER || WHATSAPP_NUMBER === "923001234567";
}

// Mobile menu open/close
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Filter the equipment cards
const filterButtons = document.querySelectorAll(".filter-btn");
const equipmentCards = document.querySelectorAll(".equipment-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    equipmentCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

// Equipment enquiry buttons prefill the WhatsApp enquiry form
document.querySelectorAll(".quote-item").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("customerNeed").value =
      button.dataset.item === "Earthmoving Equipment" ? "Construction equipment" :
      button.dataset.item === "Workshop Machinery" ? "Workshop machinery" :
      "Generators and power tools";
    document.getElementById("customerMessage").value =
      `Hello Machinery Studio, I would like to enquire about ${button.dataset.item}. Please share availability, specifications and pricing.`;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    document.getElementById("customerName").focus({ preventScroll: true });
  });
});

// WhatsApp enquiry form
whatsappForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const need = document.getElementById("customerNeed").value;
  const location = document.getElementById("customerLocation").value.trim();
  const details = document.getElementById("customerMessage").value.trim();

  if (!name || !need || !details) {
    formStatus.textContent = "Please fill in your name, category and requirement.";
    return;
  }

  if (numberIsPlaceholder()) {
    formStatus.textContent = "Setup needed: open script.js and replace WHATSAPP_NUMBER with your real WhatsApp number, then save and refresh.";
    return;
  }

  const message =
    "Hello Machinery Studio! I'd like to make an enquiry.\n\n" +
    "Name: " + name + "\n" +
    "Category: " + need + "\n" +
    "City / delivery location: " + (location || "Not provided") + "\n" +
    "Requirement: " + details + "\n\n" +
    "Please share the relevant details. Thank you.";

  formStatus.textContent = "Opening WhatsApp. Please review your message and press Send.";
  window.open(makeWhatsAppLink(message), "_blank", "noopener,noreferrer");
});

// Floating WhatsApp button
function updateFloatingWhatsApp() {
  if (numberIsPlaceholder()) {
    floatingWhatsApp.href = "#contact";
    floatingWhatsApp.removeAttribute("target");
    floatingWhatsApp.addEventListener("click", event => {
      if (numberIsPlaceholder()) {
        event.preventDefault();
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        formStatus.textContent = "Please set your WhatsApp number in script.js before using WhatsApp contact.";
      }
    });
  } else {
    floatingWhatsApp.href = makeWhatsAppLink("Hello Machinery Studio! I'd like to make a business enquiry.");
    floatingWhatsApp.target = "_blank";
  }
}
updateFloatingWhatsApp();

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
