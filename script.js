document.addEventListener('DOMContentLoaded', () => {
  const userScoreElement = document.querySelector('.box2 p');
  const computerScoreElement = document.querySelector('.box1 p');
  const resultMessageElement = document.querySelector('.result-message');
  const overlayElement = document.querySelector('.overlay');
  const playAgainButton = document.querySelector('.play-again');
  const circles = document.querySelectorAll('.game button');
  const celebrationElement = document.querySelector('.celebration')
  const resetButton = document.createElement('button');

  
  let userScore = 0;
  let computerScore = 0;
  const choices = {
    'circle': 'rock',
    'circle1': 'scissors',
    'circle2': 'paper'
  };
  circles.forEach(circle => {
    circle.addEventListener('click', (e) => {
      if (userScore < 15 && computerScore < 15) {
        const userChoiceClass = e.currentTarget.className;
        const userChoice = choices[userChoiceClass];
        playRound(userChoice);
      }
    });
  });
  playAgainButton.addEventListener('click', resetGame);

  function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    updateScores(result);
    checkForWinner();
  }

  function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return 'tie';
    }
    if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'user';
    } else {
      return 'computer';
    }
  }

  function updateScores(winner) {
    if (winner === 'user') {
      userScore++;
      userScoreElement.textContent = `YOUR SCORE: ${userScore}`;
      alert('you won your score:'+userScore);
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreElement.textContent = `COMPUTER SCORE: ${computerScore}`;
      alert('computer won your score:'+computerScore);
    }
    else if(winner==='tie'){
      alert("Its tie");
    }
  }

  function checkForWinner() {
    if (userScore === 15) {
      redirectPage("HURRAY", "YOU WON THE MATCH");
    } else if (computerScore === 15) {
      redirectPage("SORRY","COMPUTER WINS");
    }
  }
  function redirectPage(title,message)
  {
    window.location.href = 'winner.html?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}'
  }

  function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = 'YOUR SCORE:0';
    computerScoreElement.textContent = 'COMPUTER SCORE: 0';
    celebrationElement.style.display = 'none';
    celebrationElement.removeChild(resetButton);
  }
  function showCelebration(message) {
    celebrationElement.textContent = message;
    celebrationElement.style.display = 'flex';
    createResetButton();
  }

  function createResetButton() {
    resetButton.textContent = 'Play Again';
    resetButton.classList.add('reset-btn');
    celebrationElement.appendChild(resetButton);

    resetButton.addEventListener('click', resetGame);
  }
  
});
