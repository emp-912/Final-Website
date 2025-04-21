// js/final.js

// Theme definitions
const characterThemes = {
  ironclad: {
    background: "linear-gradient(to bottom, #3b1f1f, #1a0e0e)", // dark red
    textColor: "#e6b8b8",
    buttonColor: "#a64d4d",
    cardBackground: "#4d1f1f",
  },
  huntress: {
    background: "linear-gradient(to bottom, #1f3b1f, #0e1a0e)", // dark green
    textColor: "#b8e6b8",
    buttonColor: "#4da64d",
    cardBackground: "#1f4d1f",
  },
  robot: {
    background: "linear-gradient(to bottom, #1f1f3b, #0e0e1a)", // dark blue‑gray
    textColor: "#b8b8e6",
    buttonColor: "#4d4da6",
    cardBackground: "#1f1f4d",
  },
  watcher: {
    background: "linear-gradient(to bottom, #3b3b1f, #1a1a0e)", // dark gold
    textColor: "#e6e6b8",
    buttonColor: "#a6a64d",
    cardBackground: "#4d4d1f",
  },
};

// Apply a theme object to the current page
function applyTheme(theme) {
  document.body.style.background = theme.background;
  document.body.style.color = theme.textColor;

  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.style.backgroundColor = theme.cardBackground;

  const brand = document.querySelector(".navbar-brand");
  if (brand) brand.style.color = theme.textColor;

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.style.color = theme.textColor;
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = theme.buttonColor;
    btn.style.borderColor = theme.buttonColor;
    btn.style.color = "#000";
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.style.backgroundColor = theme.cardBackground;
    card.style.color = theme.textColor;
  });

  const footer = document.querySelector(".footer");
  if (footer) {
    footer.style.backgroundColor = theme.cardBackground;
    footer.style.color = theme.textColor;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1) Landing page (index.html): redirect to home.html
  const landing = document.getElementById("landing-page");
  if (landing) {
    landing.addEventListener("click", () => {
      // Going “home” resets the theme
      localStorage.removeItem("selectedCharacter");
      window.location.href = "home.html";
    });
  }

  // 2) On home.html: clicking a character stores selection
  document.querySelectorAll(".character-card").forEach((card) => {
    card.addEventListener("click", () => {
      const char = card.dataset.character;
      if (char) {
        localStorage.setItem("selectedCharacter", char);
        window.location.href = `about.html?character=${char}`;
      }
    });
  });

  // 3) If URL has ?character=, override storage (in case user bookmarks)
  const params = new URLSearchParams(window.location.search);
  const fromURL = params.get("character");
  if (fromURL && characterThemes[fromURL]) {
    localStorage.setItem("selectedCharacter", fromURL);
  }

  // 4) On any other page: read storage and re‑apply theme
  const stored = localStorage.getItem("selectedCharacter");
  if (stored && characterThemes[stored]) {
    applyTheme(characterThemes[stored]);
  }
});
