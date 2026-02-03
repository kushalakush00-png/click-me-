const questionEl = document.getElementById("question");
const emojiEl = document.getElementById("emoji");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const music = document.getElementById("bgMusic");
const noSound = document.getElementById("noSound");
const loading = document.getElementById("loading");

let started = false;

const texts = [
  { text: "Will you be my Valentine? 💖", emoji: "🥺" },
  { text: "Are you sure? 😳", emoji: "🤨" },
  { text: "Think again… slowly 😏", emoji: "😌" },
  { text: "That NO button looks risky 👀", emoji: "👀" },
  { text: "My heart is buffering… 💔", emoji: "💔" },
  { text: "Okay okay… last chance 😭", emoji: "😭" }
];

let index = 0;

/* Typing animation */
function typeText(text) {
  questionEl.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    questionEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 45);
}

/* Start music after first tap (mobile rule) */
document.body.addEventListener("click", () => {
  if (!started) {
    music.play().catch(() => {});
    started = true;
  }
}, { once: true });

/* Fake loading on first open */
setTimeout(() => {
  loading.classList.add("hidden");
  typeText(texts[0].text);
}, 1800);

noBtn.addEventListener("click", () => {
  index++;
  const item = texts[index % texts.length];

  noSound.currentTime = 0;
  noSound.play().catch(() => {});

  typeText(item.text);
  emojiEl.textContent = item.emoji;

  noBtn.classList.add("shake");
  setTimeout(() => noBtn.classList.remove("shake"), 350);
});

yesBtn.addEventListener("click", () => {
  questionEl.textContent = "SHE SAID YES!! 💖🥰";
  emojiEl.textContent = "😍";
  document.querySelector(".actions").style.display = "none";

  setInterval(createHeart, 250);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}
