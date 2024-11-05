"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let playerChoiceValue = 0;
  let computerChoiceValue = 0;
  let round = 10;
  const playerChoice = document.querySelector(".player-choice");
  const computerChoice = document.querySelector(".computer-choice");
  const modal = document.querySelector(".modal");
  const overLay = document.querySelector(".overlay");
  const Btns = document.querySelectorAll(".btns");
  const hands = document.querySelectorAll(".choice");
  const closeModalButton = document.querySelector(".close-modal");

  const countRound = function (countingDown) {
    if (countingDown >= 0) {
      document.querySelector(".round-counter").textContent = countingDown;
    }
  };

  const playerScore = function (playscore) {
    document.querySelector(".player-score").textContent = playscore;
  };

  const computerScore = function (compscore) {
    document.querySelector(".computer-score").textContent = compscore;
  };

  const displayModal = function () {
    modal.classList.remove("hidden");
    overLay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overLay.classList.add("hidden");
  };

  const roundWinner = function (message) {
    document.querySelector(".round-winner").textContent = message;
  };

  const compDecision = function () {
    const compArray = ["rock", "paper", "scissors"];
    const compIndex = Math.floor(Math.random() * 3);
    const computerSelection = compArray[compIndex];
    computerChoice.src = `images/img${compIndex + 1}.png`;
    return computerSelection;
  };

  const rockDecision = function () {
    playerChoice.src = `images/img1.png`;
    return "rock";
  };

  const paperDecision = function () {
    playerChoice.src = `images/img2.png`;
    return "paper";
  };

  const scissorsDecision = function () {
    playerChoice.src = `images/img3.png`;
    return "scissors";
  };

  const checkWinner = function (playerDecision) {
    playerChoice.style.animation = "player-shake 1s ease";
    computerChoice.style.animation = "computer-shake 1s ease";
    const computerDecision = compDecision();
    if (playerDecision === computerDecision) {
      roundWinner("🚩 No winner,play again");
    } else if (playerDecision !== computerDecision) {
      round--;
      countRound(round);
      if (
        (playerDecision === "rock" && computerDecision === "scissors") ||
        (playerDecision === "paper" && computerDecision === "rock") ||
        (playerDecision === "scissors" && computerDecision === "paper")
      ) {
        roundWinner("🏆 Player won this round");
        playerChoiceValue++;
        playerScore(playerChoiceValue);
      } else if (
        (playerDecision === "scissors" && computerDecision === "rock") ||
        (playerDecision === "rock" && computerDecision === "paper") ||
        (playerDecision === "paper" && computerDecision === "scissors")
      ) {
        roundWinner("🏆 Computer won this round");
        computerChoiceValue++;
        computerScore(computerChoiceValue);
      }
    }
    if (round === 0) {
      displayModal();
      const declareWinner = (player, computer) => {
        const Winner = document.querySelector(".declare-winner");

        if (player > computer) {
          Winner.textContent = `You won (${player}-${computer})`;
        } else if (player < computer) {
          Winner.textContent = `Computer won (${computer}-${player})`;
        } else {
          Winner.textContent = `Tie 🤝 (${player}-${computer})`;
        }
      };
      declareWinner(playerChoiceValue, computerChoiceValue);
    }
  };

  Btns[0].addEventListener("click", function () {
    checkWinner(rockDecision());
  });
  Btns[1].addEventListener("click", function () {
    checkWinner(paperDecision());
  });
  Btns[2].addEventListener("click", function () {
    checkWinner(scissorsDecision());
  });

  const restart = () => {
    round = 10;
    playerChoiceValue = 0;
    computerChoiceValue = 0;
    closeModal();
    countRound(round);
    playerScore(playerChoiceValue);
    computerScore(computerChoiceValue);
    roundWinner("Let the game begin...");
    rockDecision();
    computerChoice.src = `images/img1.png`;

    // At the beginning of the restart function
  };
  closeModalButton.addEventListener("click", restart);
  overLay.addEventListener("click", restart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      restart();
    }
  });
});
