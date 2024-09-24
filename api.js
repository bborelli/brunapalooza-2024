function updateCountdown() {
  const now = new Date();
  const eventDate = new Date("2024-10-04T21:00:00+01:00").getTime();

  const currentTime = now.getTime();
  const remainingTime = eventDate - currentTime;

  if (remainingTime < 0) {
    document.getElementById("countdown").innerHTML = "<h2>O evento já começou! 🎉</h2>";
    clearInterval(countdownInterval);
    return;
  }

  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  updateNumber("days", days);
  updateNumber("hours", hours);
  updateNumber("minutes", minutes);
}

function updateNumber(id, value) {
  const element = document.getElementById(id);
  const formattedValue = formatNumber(value);

  if (element.textContent !== formattedValue) {
    element.classList.add("flip");
    setTimeout(() => {
      element.textContent = formattedValue;
      element.classList.remove("flip");
    }, 500);
  }
}

function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

const countdownInterval = setInterval(updateCountdown, 1000);

document.addEventListener("DOMContentLoaded", updateCountdown);


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
        "Por favor, insira seu nome completo (nome e sobrenome) com pelo menos 4 caracteres."
      );
    }
  });
} else {
  console.warn("Formulário RSVP não encontrado.");
}

