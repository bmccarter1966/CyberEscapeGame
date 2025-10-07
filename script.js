const laptops = [false, false, false]; // unlocked state
const clues = [];

const questions = [
  { q: "What should you do if you get a suspicious email?", a: ["Click the link", "Delete or report it", "Reply immediately"], correct: 1, clue: "C" },
  { q: "Which is safest for remote work?", a: ["Public WiFi", "VPN", "Random hotspot"], correct: 1, clue: "Y" },
  { q: "Strong passwords should include?", a: ["Only numbers", "Mix of letters, numbers & symbols", "Your birthday"], correct: 1, clue: "B" }
];

// Path relative to index.html
const ASSET_PATH = "./assets/";
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
  const img = document.getElementById("laptop" + index);
  if (!img) return;

  // ✅ fixed reference
  const filename = laptops[index] ? IMAGES.unlocked : IMAGES.locked;

  img.src = ASSET_PATH + filename + "?v=" + new Date().getTime();
  img.onerror = () => {
    console.error("Failed to load image: " + filename);
    img.src = "https://via.placeholder.com/150?text=Image+Missing";
  };
}

// Set laptop status text
function setLaptopStatus(index) {
  const statusEl = document.getElementById("status" + index);
  if (!statusEl) return;
  statusEl.innerHTML = laptops[index] ? "✅ Unlocked" : "🔒 Locked";
}

// Laptop click
function openLaptop(index) {
  if (laptops[index]) {
    alert("✅ This laptop is already unlocked!");
    return;
  }
  loadQuestion(index);
}

// Load question
function loadQuestion(i) {
  document.getElementById("questionBox").classList.remove("hidden");
  const q = questions[i];
  document.getElementById("question").innerHTML = q.q;
  const answersHTML = q.a.map((ans, idx) => `<button onclick="checkAnswer(${i},${idx})">${ans}</button>`).join("");
  document.getElementById("answers").innerHTML = answersHTML;
}

// Check answer
function checkAnswer(qIndex, choice) {
  const q = questions[qIndex];
  if (choice === q.correct) {
    laptops[qIndex] = true;
    clues.push(q.clue);

    // Flip animation
    const laptopContainer = document.querySelector(`#laptop${qIndex}`).parentElement;
    laptopContainer.classList.add("flip");

    setTimeout(() => {
      setLaptopImage(qIndex);
      setLaptopStatus(qIndex);
      laptopContainer.classList.remove("flip"); // allow future flips
    }, 300); // half of 0.6s animation

    // Update clues and hide question
    document.getElementById("clueList").innerHTML += `<div>${q.clue}</div>`;
    document.getElementById("questionBox").classList.add("hidden");

    // Check if all laptops unlocked
    if (laptops.every(l => l))
      setTimeout(() => alert("🎉 You escaped! The final code is: " + clues.join("")), 500);
  } else {
    alert("❌ Wrong answer! The lock stays closed.");
  }
}

// Initialize on page load
initLaptops();
