const laptops = [false, false, false]; // unlocked state
const clues = [];

const questions = [
  { q: "What should you do if you get a suspicious email?", a: ["Click the link", "Delete or report it", "Reply immediately"], correct: 1, clue: "C" },
  { q: "Which is safest for remote work?", a: ["Public WiFi", "VPN", "Random hotspot"], correct: 1, clue: "Y" },
  { q: "Strong passwords should include?", a: ["Only numbers", "Mix of letters, numbers & symbols", "Your birthday"], correct: 1, clue: "B" }
];

// 🔧 Adjust this based on your folder structure
const ASSET_PATH = "assets/";  // or "../assets/"
const IMAGES = { locked: "locked_v2.jpg", unlocked: "unlocked_v2.jpg" };

function initLaptops() {
  laptops.forEach((_, idx) => {
    setLaptopImage(idx);
    setLaptopStatus(idx);
  });
}

function setLaptopImage(index) {
  const img = document.getElementById("laptop" + index);
  if (!img) return;

  const filename = laptops[index] ? IMAGES.unlocked : IMAGES.locked;
  const imagePath = ASSET_PATH + filename;

  img.src = imagePath;
  img.onerror = () => {
    console.error("Failed to load image:", imagePath);
    img.src = "https://via.placeholder.com/150?text=Missing+Image";
  };
}

function setLaptopStatus(index) {
  const statusEl = document.getElementById("status" + index);
  if (!statusEl) return;
  statusEl.innerHTML = laptops[index] ? "✅ Unlocked" : "🔒 Locked";
}

function openLaptop(index) {
  if (laptops[index]) {
    alert("✅ This laptop is already unlocked!");
    return;
  }
  loadQuestion(index);
}

function loadQuestion(i) {
  document.getElementById("questionBox").classList.remove("hidden");
  const q = questions[i];
  document.getElementById("question").innerHTML = q.q;
  const answersHTML = q.a.map(
    (ans, idx) => `<button onclick="checkAnswer(${i},${idx})">${ans}</button>`
  ).join("");
  document.getElementById("answers").innerHTML = answersHTML;
}

function checkAnswer(qIndex, choice) {
  const q = questions[qIndex];
  if (choice === q.correct) {
    laptops[qIndex] = true;
    clues.push(q.clue);

    const laptopContainer = document.querySelector(`#laptop${qIndex}`).parentElement;
    laptopContainer.classList.add("flip");

    setTimeout(() => {
      setLaptopImage(qIndex);
      setLaptopStatus(qIndex);
      laptopContainer.classList.remove("flip");
    }, 300);

    document.getElementById("clueList").innerHTML += `<div>${q.clue}</div>`;
    document.getElementById("questionBox").classList.add("hidden");

    if (laptops.every(l => l))
      setTimeout(() => alert("🎉 You escaped! The final code is: " + clues.join("")), 500);

  } else {
    alert("❌ Wrong answer! The lock stays closed.");
  }
}

initLaptops();
