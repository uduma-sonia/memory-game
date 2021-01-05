const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector("#reset");
const hardBtn = document.querySelector(".hardBtn");
const hardModeId = ["hard1", "hard2", "hard3", "hard4"];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//MAKING THE CARDS FLIP
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

//CHECK IF FIRST & SECOND CLICKED CARDS MATCH
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//DISABLE CARDS WHEN CARDS MATCH
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//IF CARDS DO NOT MATCH,UNFLIP CARDS
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//MAKE GAME RESET ONLOAD
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//MAKE GAME RESET WHEN RESET BUTTON IS CLICKED
resetBtn.addEventListener("click", function () {
  cards.forEach((card) => {
    let randomC = Math.floor(Math.random() * 12);
    card.style.order = randomC;
  });

  //MAKING THE CARD FLIP BACK ON RESET
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flip");
  }

  resetBoard();
});

//FUNCTION FOR HARD MODE
function hardM() {
  for (var i = 0; i < hardModeId.length; i++) {
    document.getElementById(hardModeId[i]).classList.remove("hard-mode");
  }
}

//FUNCTION FOR EASY MODE
function easyM() {
  for (var i = 0; i < hardModeId.length; i++) {
    document.getElementById(hardModeId[i]).classList.add("hard-mode");
  }
}

hardBtn.addEventListener("click", hardM);
cards.forEach((card) => card.addEventListener("click", flipCard));
