// Game state
const laptops = [false, false, false]; // unlocked state
const clues = [];

const questions = [
  {
    q: "What should you do if you get a suspicious email?",
    a: "Report it"
  },
  {
    q: "What is a strong password?",
    a: "Complex and unique"
  },
  {
    q: "What does MFA stand for?",
    a: "Multi-factor authentication"
  }
];

// --- Correct image paths ---
const lockedImg = "assets/locked_v2.jpg";
const unlockedImg = "assets/unlocked_v2.jpg";

// Render laptops
function renderLaptops() {
  const container = document.getElementById("laptops");
  container.innerHTML = "";

  laptops.forEach((unlocked, index) => {
    const img = document.createElement("img");
    img.src = unlocked ? unlockedImg : lockedImg;
    img.alt = unlocked ? "Unlocked" : "Locked";
    img.classList.add("laptop");

    // Flip animation effect on click
    img.addEventListener("click", () => handleLaptopClick(index, img));

    container.appendChild(img);
  });
}

// Handle clicking a laptop
function handleLaptopClick(index, imgElement) {
  if (laptops[index]) return; // already unlocked

  const userAnswer = prompt(questions[index].q);
  if (!userAnswer) return;

  if (userAnswer.trim().toLowerCase() === questions[index].a.toLowerCase()) {
    laptops[index] = true;
    clues.push(questions[index].a[0]); // simple clue letter
    flipImage(imgElement, unlockedImg);
    renderClues();
  } else {
    alert("Incorrect! Try again.");
  }
}

// Flip transition for unlock
function flipImage(imgElement, newSrc) {
  imgElement.style.transition = "transform 0.6s";
  imgElement.style.transform = "rotateY(180deg)";

  setTimeout(() => {
    imgElement.src = newSrc;
    imgElement.style.transform = "rotateY(0deg)";
  }, 300);
}

// Show collected clues
function renderClues() {
  const cluesContainer = document.getElementById("clues");
  cluesContainer.textContent = clues.join(" ");
}

// Initialize game
renderLaptops();
renderClues();
