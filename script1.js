const rpsGame = () => {
  let pScore, cScore, round, playing;
  const game = {
    playerHand: document.querySelector(".player-choice"),
    computerhand: document.querySelector(".computer-choice"),
    playerScore: document.querySelector(".player-score"),
    computerScore: document.querySelector(".computer-score"),
    modalBox: document.querySelector(".modal"),
    gameWinner: document.querySelector(".declare-winner"),
    overLay: document.querySelector(".overlay"),
    closeModalBtn: document.querySelector(".close-modal"),
    roundCounter: document.querySelector(".round-counter"),
    roundWinner: document.querySelector(".round-winner"),
    Btns: document.querySelectorAll(".btns"),
    hand: document.querySelectorAll(".choice"),
  };

  const updateScore = () => {
    game.playerScore.textContent = pScore;
    game.computerScore.textContent = cScore;
  };

  const displayModal = () => {
    game.modalBox.classList.remove("hidden");
    game.overLay.classList.remove("hidden");
  };

  const closeModal = () => {
    game.modalBox.classList.add("hidden");
    game.overLay.classList.add("hidden");
  };

  const countRound = () => {
    game.roundCounter.textContent = round;
  };

  const roundWinner = function (message) {
    game.roundWinner.textContent = message;
  };
  const defualtHand = () => {
    game.playerHand.src = "images/rock.png";
    game.computerhand.src = "images/rock.png";
  };
  const restart = () => {
    pScore = 0;
    cScore = 0;
    round = 10;
    playing = true;
    updateScore();
    closeModal();
    roundWinner("Let the game begin...");
    defualtHand();
  };
  restart();

  const compDecision = function () {
    const compArray = ["rock", "paper", "scissors"];
    const compIndex = Math.floor(Math.random() * 3);
    const computerSelection = compArray[compIndex];
    game.computerhand.src = `images/${computerSelection}.png`;
    return computerSelection;
  };

  const playerDecision = (playerChoice) => {
    game.playerHand.src = `images/${playerChoice}.png`;

    const computerDecision = compDecision();
    currentRoundWinner(playerChoice, computerDecision);
    declareWinner();
  };
  game.hand.forEach((hand) => {
    hand.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });
  game.Btns.forEach((option) => {
    option.addEventListener("click", function () {
      defualtHand();
      setTimeout(() => {
        const playerChoiceValue = this.textContent.toLowerCase();
        playerDecision(playerChoiceValue);
      }, 2000);

      game.playerHand.style.animation = "player-shake 2s ease";
      game.computerhand.style.animation = "computer-shake 2s ease";
    });
  });

  const decrementRound = () => {
    round--;
    countRound();
  };

  const currentRoundWinner = (playerChoice, computerChoice) => {
    if (playing) {
      if (playerChoice === computerChoice) {
        roundWinner("🚩No winner,play again");
        return;
      } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
      ) {
        roundWinner(`🏆Player won this round`);
        pScore++;
        decrementRound();
        updateScore();
        return;
      } else {
        roundWinner(`🏆Computer won this round`);
        cScore++;
        decrementRound();
        updateScore();
        return;
      }
    }
  };

  const checkWinner = () => {
    const Winner = game.gameWinner;
    if (pScore > cScore) {
      Winner.textContent = `You won (${pScore}-${cScore})`;
    } else if (pScore < cScore) {
      Winner.textContent = `Computer won (${pScore}-${cScore})`;
    } else {
      Winner.textContent = `Tie 🤝 (${pScore}-${cScore})`;
    }
  };

  const declareWinner = () => {
    if (playing) {
      if (round === 0) {
        playing = false;
        checkWinner();
        displayModal();
      }
    }
  };

  game.closeModalBtn.addEventListener("click", restart);
  game.overLay.addEventListener("click", restart);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !game.modalBox.classList.contains("hidden")) {
      restart();
    }
  });
};
rpsGame();
