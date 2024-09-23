function toggleMap(buttonId, mapId) {
  const button = document.getElementById(buttonId);
  const map = document.getElementById(mapId);

  if (button && map) {
    button.addEventListener("click", function () {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      map.style.display = isExpanded ? "none" : "block";
      button.setAttribute("aria-expanded", !isExpanded);
    });
  } else {
    console.warn(`Elemento não encontrado: ${buttonId} ou ${mapId}`);
  }
}

toggleMap("show-chill-map", "chill-map");
toggleMap("show-party-map", "party-map");

const rsvpForm = document.getElementById("rsvp-form");
if (rsvpForm) {
  rsvpForm.setAttribute("action", "https://formspree.io/f/xanwgjdk");

  rsvpForm.addEventListener("submit", function (event) {
    const nameInput = document.getElementById("name").value.trim();

    if (!nameInput.includes(" ") || nameInput.length <= 4) {
      event.preventDefault();
      alert(
        "Please enter your full name (first and last name) with at least 4 characters."
      );
    }
  });
} else {
  console.warn("Formulário RSVP não encontrado.");
}
