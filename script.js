<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cyber Escape Game</title>
<style>
  .hidden { display: none; }
  button { margin: 5px; }
  .laptop-container { display: flex; gap: 20px; margin-bottom: 20px; }
</style>
</head>
<body>

<h1>Cyber Escape Game</h1>

<div class="laptop-container">
  <div>
    <img id="laptop0" width="150" height="150">
    <div id="status0"></div>
    <button onclick="openLaptop(0)">Open Laptop 1</button>
  </div>
  <div>
    <img id="laptop1" width="150" height="150">
    <div id="status1"></div>
    <button onclick="openLaptop(1)">Open Laptop 2</button>
  </div>
  <div>
    <img id="laptop2" width="150" height="150">
    <div id="status2"></div>
    <button onclick="openLaptop(2)">Open Laptop 3</button>
  </div>
</div>

<div id="questionBox" class="hidden">
  <h2 id="question"></h2>
  <div id="answers"></div>
</div>

<h3>Clues:</h3>
<div id="clueList"></div>

<script>
const laptops = [false, false, false];
const clues = [];
const questions = [
  { q: "What should you do if you get a suspicious email?", a: ["Click the link", "Delete or report it", "Reply immediately"], correct: 1, clue: "C" },
  { q: "Which is safest for remote work?", a: ["Public WiFi", "VPN", "Random hotspot"], correct: 1, clue: "Y" },
  { q: "Strong passwords should include?", a: ["Only numbers", "Mix of letters, numbers & symbols", "Your birthday"], correct: 1, clue: "B" }
];

const ASSET_PATH = "assets/";
const IMAGES = { locked: "locked_v2.jpg", unlocked: "unlocked_v2.jpg" };

// Initialize laptops
function initLaptops() {
  laptops.forEach((_, idx) => {
    setLaptopImage(idx);
    setLaptopStatus(idx);
  });
}

// Set laptop image with cache-buster
function setLaptopImage(index) {
  const img = document.getElementById("laptop"+index);
  if(!img) return;

  const filename = laptops[index] ? IMAGES.unlocked : IMAGES.locked;
  img.src = ASSET_PATH + filename + "?v=" + new Date().getTime();
  img.onerror = () => { console.error("Failed to load image: " + filename); img.src = "https://via.placeholder.com/150?text=Image+Missing"; }
}

function setLaptopStatus(index) {
  const statusEl = document.getElementById("status"+index);
  if(!statusEl) return;
  statusEl.innerHTML = laptops[index] ? "✅ Unlocked" : "🔒 Locked";
}

function openLaptop(index) {
  if(laptops[index]) { alert("✅ This laptop is already unlocked!"); return; }
  loadQuestion(index);
}

function loadQuestion(i) {
  document.getElementById("questionBox").classList.remove("hidden");
  const q = questions[i];
  document.getElementById("question").innerHTML = q.q;
  const answersHTML = q.a.map((ans, idx) => `<button onclick="checkAnswer(${i},${idx})">${ans}</button>`).join("");
  document.getElementById("answers").innerHTML = answersHTML;
}

function checkAnswer(qIndex, choice) {
  const q = questions[qIndex];
  if(choice === q.correct) {
    laptops[qIndex] = true;
    clues.push(q.clue);
    setLaptopImage(qIndex);
    setLaptopStatus(qIndex);
    document.getElementById("clueList").innerHTML += `<div>${q.clue}</div>`;
    document.getElementById("questionBox").classList.add("hidden");
    if(laptops.every(l => l)) setTimeout(() => alert("🎉 You escaped! The final code is: " + clues.join("")), 500);
  } else {
    alert("❌ Wrong answer! The lock stays closed.");
  }
}

// Initialize on page load
initLaptops();
</script>

</body>
</html>
