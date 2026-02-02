// ====== CONFIG ======
// Put YOUR email here (the recipient who should get the "Yes" reply)
const RECIPIENT_EMAIL = "sandamini.bandara11@gmail.com";

// Prefilled email content
const EMAIL_SUBJECT = "💖 Valentine Reply: YES!";
const EMAIL_BODY = [
  "Hi!",
  "",
  "I clicked YES 💘",
  "You are officially my Valentine 😄",
  "",
  "From,"
  // user can type their name at the end
].join("\n");

// ====== ELEMENTS ======
const scene = document.getElementById("scene");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const modal = document.getElementById("modal");
const emailLink = document.getElementById("emailLink");
const closeModal = document.getElementById("closeModal");

// ====== HELPERS ======
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function sceneRect() {
  return scene.getBoundingClientRect();
}

function btnRect(btn) {
  return btn.getBoundingClientRect();
}

function setNoPosition(x, y) {
  // x,y are pixels relative to scene
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(-50%, -50%)";
}

function randomSpotAvoidingYes() {
  const s = sceneRect();
  const noR = btnRect(noBtn);
  const yesR = btnRect(yesBtn);

  // Safe padding inside the scene
  const pad = 18;

  // bounds for center-point positioning
  const minX = pad;
  const maxX = s.width - pad;
  const minY = pad;
  const maxY = s.height - pad;

  // Try a few random spots; avoid being too close to the Yes button
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    // Approx yes position inside scene
    const yesCenterX = (yesR.left + yesR.right) / 2 - s.left;
    const yesCenterY = (yesR.top + yesR.bottom) / 2 - s.top;

    const dx = x - yesCenterX;
    const dy = y - yesCenterY;
    const dist = Math.hypot(dx, dy);

    // Keep "No" away from "Yes" so the user doesn't accidentally tap both
    if (dist > 110) {
      return { x, y };
    }
  }

  // fallback
  return {
    x: clamp(s.width * 0.75, 20, s.width - 20),
    y: clamp(s.height * 0.65, 20, s.height - 20)
  };
}

function dodgeNo() {
  const spot = randomSpotAvoidingYes();
  setNoPosition(spot.x, spot.y);

  // Update hint text a bit playfully
  const phrases = [
    "Nope 😌",
    "Too slow 😏",
    "Try again 🙈",
    "Hehe… not today 😄",
    "Almost! 😼"
  ];
  hint.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}

function mailtoHref(to, subject, body) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${encodeURIComponent(to)}?subject=${s}&body=${b}`;
}

// ====== INIT ======
// place "No" somewhere nice on load
(function initNoPosition() {
  // Wait for layout so bounding boxes are correct
  requestAnimationFrame(() => {
    const s = sceneRect();
    setNoPosition(s.width * 0.65, s.height * 0.58);
  });
})();

// Update email link
emailLink.href = mailtoHref(RECIPIENT_EMAIL, EMAIL_SUBJECT, EMAIL_BODY);

// ====== EVENTS ======

// Desktop hover dodge
noBtn.addEventListener("mouseenter", dodgeNo);

// Mobile: dodge on touch start (before click happens)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNo();
}, { passive: false });

// If user still manages to click it (rare), dodge anyway
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dodgeNo();
});

// Keep inside bounds on resize/orientation change
window.addEventListener("resize", () => {
  const spot = randomSpotAvoidingYes();
  setNoPosition(spot.x, spot.y);
});

// YES action -> show modal + email link
yesBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

// Close modal
function closeIt() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", closeIt);

// Click outside modal card to close
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeIt();
});

// ESC to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeIt();
});

