const cards = document.querySelectorAll(".flip-card");
const restartBtn = document.getElementById("restartBtn");
let openCards = [];
let lockBoard = false;
let gameStarted = false;
let timer = null;
let seconds = 0;
let reveals = 0;

const gameTimeEl = document.getElementById("gameTime");

let matchedCards = 0;
const totalCards = cards.length;

const endMessageEl = document.getElementById("endMessage");

let attempts = 0;

const attemptsEl = document.getElementById("attempts");
const revealsEl = document.getElementById("reveals");

const endGameContainer=document.getElementById("endGameButtonContainer");

shuffleCards();
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!gameStarted) {
      startGame();
    }
    if (lockBoard) return;
    if (card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    openCards.push(card);
    reveals++;
    if (openCards.length === 2) {
      attempts++;
      attemptsEl.textContent = attempts;
      checkForMatch();
    }
  });
});

function shuffleCards() {
  cards.forEach((card) => {
    const randomOrder = Math.floor(Math.random() * cards.length);
    card.style.order = randomOrder;
  });
}

restartBtn.addEventListener("click", () => {
  location.reload(); // Reload page to reset game
});

function checkForMatch() {
  lockBoard = true;
  const card1 = openCards[0];
  const card2 = openCards[1];
  const img1 = card1.querySelector(".flip-card-back img").src;

  const img2 = card2.querySelector(".flip-card-back img").src;

  if (img1 === img2) {
    matchedCards += 2;
    openCards = [];
    lockBoard = false;
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      openCards = [];
      lockBoard = false;
    }, 1000);
  }
  if (matchedCards === totalCards) {
    endGame();
  }
}

function startGame() {
  gameStarted = true;
  timer = setInterval(() => {
    seconds++;
    gameTimeEl.textContent = seconds;
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  revealsEl.textContent = reveals;
  attemptsEl.textContent = attempts;

  endMessageEl.innerHTML = getSpaceEndMessage();
endGameContainer.appendChild(restartBtn);
  document.querySelector(".display-content").style.display = "flex";
}
function getSpaceEndMessage() {
  if (attempts <= totalCards / 2) {
    return `🌟 Perfect Mission! Stellar Memory! <br><br> You completed the game in ${seconds} seconds.`;
  } else if (attempts <= totalCards) {
    return `🚀 Mission Success! Orbit Achieved! <br><br> You completed the game in ${seconds} seconds.`;
  } else {
    return `🪐 Mission Complete! You Made It Home! <br><br> You completed the game in ${seconds} seconds.`;
  }
}
