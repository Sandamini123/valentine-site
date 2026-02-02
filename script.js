// ========== CHANGE THIS ==========
const YOUR_EMAIL = "sandamini.bandara11@gmail.com"; // <-- put YOUR email here

// Optional: change these too
const YOUR_NAME = "Me"; // e.g., "Damini"
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

let noClicks = 0;

// Move the "No" button to a random position inside the button row
function dodgeNoButton() {
  const row = document.getElementById("btnRow");
  const rowRect = row.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, rowRect.width - btnRect.width);
  const maxY = Math.max(0, rowRect.height - btnRect.height);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
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

  // Create an email draft (mailto)
  const subject = encodeURIComponent("My Valentine Answer 💌");
  const body = encodeURIComponent(
    `Hi ${YOUR_NAME}!\n\nMy answer is: ${accepted ? "YES 💖" : "NO 🙈"}\n\n(From your cute website: ${window.location.href})`
  );

  emailLink.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  emailLink.target = "_blank";
}

yesBtn.addEventListener("click", () => {
  showResult(true);
});

noBtn.addEventListener("mouseenter", () => {
  noClicks++;
  dodgeNoButton();

  // Make it fun but not annoying
  if (noClicks === 2) noBtn.textContent = "Are you sure? 😳";
  if (noClicks === 4) noBtn.textContent = "Nope 😄";
  if (noClicks === 6) noBtn.textContent = "Try again 🙈";
});

noBtn.addEventListener("click", () => {
  // If he actually clicks No (on mobile, easier to tap), we respect it
  showResult(false);
});

copyLinkBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copiedMsg.textContent = "✅ Link copied!";
  } catch {
    copiedMsg.textContent = "❌ Couldn’t copy. You can manually copy the URL from the address bar.";
  }
});

// Set the page title
document.title = PAGE_TITLE;
