const laptops = [false, false, false]; // unlocked state
const clues = [];

const questions = [
  { 
    q: "What should you do if you get a suspicious email?",
    a: ["Click the link", "Delete or report it", "Reply immediately"],
    correct: 1,
    clue: "C"
  },
  { 
    q: "Which is safest for remote work?",
    a: ["Public WiFi", "VPN", "Random hotspot"],
    correct: 1,
    clue: "Y"
  },
  { 
    q: "Strong passwords should include?",
    a: ["Only numbers", "Mix of letters, numbers & symbols", "Your birthday"],
    correct: 1,
    clue: "B"
  }
];

// Folder path for images
const ASSET_PATH = "assets/";

// Unique filenames to avoid caching issues
const IMAGES = {
  locked: "locked_v2.jpg",   
  unlocked: "unlocked_v2.jpg"
};

// Initialize laptops to locked state
function initLaptops() {
  laptops.forEach((_, idx) => {
    setLaptopImage(idx);
    setLaptopStatus(idx);
  });
}

// Set laptop image based on locked/unlocked state with cache-buster
function setLaptopImage(index) {
  const img = document.getElementById("laptop"+index);
  if(!img) return;

  const filename = laptops[index] ? IMAGES.unlocked : IMAGES.locked;
  const path = ASSET_PATH + filename + "?t=" + new Date().getTime(); // cache-buster

  img.src = path;

  // Fallback if image fails to load
  img.onerror = () => {
    console.error(`Image not found: ${path}`);
    img.src = "https://via.placeholder.com/150?text=Image+Missing";
  }
}

// Set status text for a laptop
function setLaptopStatus(index) {
  const statusEl = document.getElementById("status"+index);
  if(!statusEl) return;

  statusEl.innerHTML = laptops[index] ? "✅ Unlocked" : "🔒 Locked";
}

function openLaptop(index) {
  if(laptops[index]) {
    alert("✅ This laptop is already unlocked!");
    return;
  }
  loadQuestion(index);
}

function loadQuestion(i) {
  document.getElementById("questionBox").classList.remove("hidden");
  const q = questions[i];
  document.getElementById("question").innerHTML = q.q;
  
  let answersHTML = "";
  q.a.forEach((ans, idx) => {
    answersHTML += `<button onclick="checkAnswer(${i},${idx})">${ans}</button>`;
  });
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

    if(laptops.every(l => l)) {
      setTimeout(() => {
        alert("🎉 You escaped! The final code is: " + clues.join(""));
      }, 500);
    }

  } else {
    alert("❌ Wrong answer! The lock stays closed.");
  }
}

// Call on page load
initLaptops();
