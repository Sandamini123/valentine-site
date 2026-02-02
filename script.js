// ========== CHANGE THIS ==========
const YOUR_EMAIL = "sandamini.bandara11@gmail.com";
const YOUR_NAME = "Me";
const PAGE_TITLE = "Valentine Surprise 💌";

// ========== LOGIC ==========
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const emailLink = document.getElementById("emailLink");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const copiedMsg = document.getElementById("copiedMsg");
const btnRow = document.getElementById("btnRow");

let noMoves = 0;

// Detect touch device (mobile/tablet)
const isTouch = window.matchMedia("(pointer: coarse)").matches;

// Keep the No button inside the btnRow bounds
function dodgeNoButton() {
  const rowRect = btnRow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Ensure absolute positioning only when dodging
  noBtn.style.position = "absolute";

  const padding = 8;

  const maxX = Math.max(0, rowRect.width - btnRect.width - padding);
  const maxY = Math.max(0, rowRect.height - btnRect.height - padding);

  // Random position
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noMoves++;

  // Fun text changes
  if (noMoves === 2) noBtn.textContent = "Are you sure? 😳";
  if (noMoves === 4) noBtn.textContent = "Nope 😄";
  if (noMoves === 6) noBtn.textContent = "Try again 🙈";
  if (noMoves === 8) noBtn.textContent = "Just say yes 😌";
}

function showResult(accepted) {
  result.classList.remove("hidden");
  copiedMsg.textContent = "";

  if (accepted) {
    resultTitle.textContent = "YAY!! 🎉";
    resultText.textContent = "You just made my day 💗 (click ‘Send your answer’ to confirm)";
  } else {
    resultTitle.textContent = "Aww okay 😅";
    resultText.textContent = "No worries! Still sending you good vibes 🌸";
  }

  const subject = encodeURIComponent("My Valentine Answer 💌");
  const body = encodeURIComponent(
    `Hi ${YOUR_NAME}!\n\nMy answer is: ${accepted ? "YES 💖" : "NO 🙈"}\n\n(From your cute website: ${window.location.href})`
  );

  emailLink.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  emailLink.target = "_blank";
}

yesBtn.addEventListener("click", () => showResult(true));

/**
 * Desktop: dodge when mouse approaches
 * Mobile: dodge when user tries to tap (touchstart/pointerdown)
 */
noBtn.addEventListener("pointerenter", () => {
  if (!isTouch) dodgeNoButton();
});

noBtn.addEventListener("mouseenter", () => {
  if (!isTouch) dodgeNoButton();
});

// Mobile-friendly: when they try to tap it, it runs away
noBtn.addEventListener("touchstart", (e) => {
  // Stop the tap from triggering a click
  e.preventDefault();
  dodgeNoButton();
}, { passive: false });

// Also handle pointerdown for some devices
noBtn.addEventListener("pointerdown", (e) => {
  if (isTouch) {
    e.preventDefault();
    dodgeNoButton();
  }
});

// If they REALLY manage to click No (rare), respect it
noBtn.addEventListener("click", () => showResult(false));

copyLinkBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copiedMsg.textContent = "✅ Link copied!";
  } catch {
    copiedMsg.textContent = "❌ Couldn’t copy. You can manually copy the URL from the address bar.";
  }
});

document.title = PAGE_TITLE;

// On resize/orientation change, keep it inside bounds
window.addEventListener("resize", () => {
  // Reset positioning so layout doesn't look broken after rotation
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
});

