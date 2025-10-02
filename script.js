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

// Initialize laptop images to locked state
function initLaptops() {
  laptops.forEach((_, idx) => {
    document.getElementById("laptop"+idx).src = "assets/locked.jpg";
    document.getElementById("status"+idx).innerHTML = "🔒 Locked";
  });
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

    // Update image to unlocked
    document.getElementById("laptop"+qIndex).src = "assets/unlocked.jpg";
    document.getElementById("status"+qIndex).innerHTML = "✅ Unlocked";
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

// Call this on page load to set all laptops to locked images
initLaptops();
