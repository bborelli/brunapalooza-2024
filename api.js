// Definir o idioma com base no atributo lang do documento HTML
const language = document.documentElement.lang === "pt-BR" ? "pt" : "en";

// Mensagens para os dois idiomas
const messages = {
  en: {
    eventStarted: "The event has started! 🎉",
    nameAlert: "Please enter your full name (first and last name) with at least 4 characters.",
    momentsAlert: "Please select a party vibe!",
  },
  pt: {
    eventStarted: "O evento já começou! 🎉",
    nameAlert: "Por favor, insira seu nome completo (primeiro e último nome) com pelo menos 4 caracteres.",
    momentsAlert: "Por favor, escolha uma vibe!",
  }
};

// Função de contagem regressiva
function updateCountdown() {
  const now = new Date();
  const eventDate = new Date("2024-10-04T21:00:00+01:00").getTime(); // Horário de Lisboa (UTC+1)
  const currentTime = now.getTime();
  const remainingTime = eventDate - currentTime;

  if (remainingTime < 0) {
    document.querySelector(".countdown-timer").innerHTML = `<h2>${messages[language].eventStarted}</h2>`;
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  updateNumber("days", days);
  updateNumber("hours", hours);
  updateNumber("minutes", minutes);
}

function updateNumber(id, value) {
  const element = document.getElementById(id);
  const formattedValue = formatNumber(value);
  
  if (element && element.textContent !== formattedValue) {
    element.style.animation = 'none';
    element.textContent = formattedValue;
    setTimeout(() => {
      element.style.animation = '';
    }, 10);
  }
}

function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

const countdownInterval = setInterval(updateCountdown, 1000);
document.addEventListener("DOMContentLoaded", updateCountdown);

// Função para alternar o mapa
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

// Validação do formulário RSVP
const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
  rsvpForm.setAttribute("action", "https://formspree.io/f/xanwgjdk");

 rsvpForm.addEventListener("submit", function (event) {
    const nameInput = document.getElementById("name").value.trim();
    const momentsInput = document.getElementById("moments").value;

    if (!nameInput.includes(" ") || nameInput.length <= 4) {
      event.preventDefault();
      alert(messages[language].nameAlert);
    } else if (momentsInput === "") {  // Verifique se nenhum item foi selecionado
      event.preventDefault();
      alert(messages[language].momentsAlert);  // Mensagem personalizada
    }
});
} else {
  console.warn("RSVP form not found.");
}

// Alternar entre as versões de idiomas
document.getElementById("en").addEventListener("click", function() {
  window.location.href = "index.html"; // Versão em inglês
});

document.getElementById("pt").addEventListener("click", function() {
  window.location.href = "index-pt.html"; // Versão em português
});


