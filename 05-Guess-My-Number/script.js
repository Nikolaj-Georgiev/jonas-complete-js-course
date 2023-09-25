'use strict';

const message = document.querySelector('.message')
const score = document.querySelector('.score');
const body = document.querySelector('body');
const number = document.querySelector('.number');
const highScore = document.querySelector('.highscore');
const guessField = document.querySelector('.guess');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScoreCount = 0;
let scoreCount = 20; //state variable;

const scoreCounter = function () {
  if (scoreCount > 1) {
    scoreCount--;
    score.textContent = scoreCount;
    return;
  }
  scoreCount = 0;
  score.textContent = scoreCount;
  message.textContent = '💥 You lost the game!';

};


document.querySelector('.check').addEventListener('click', function () {

  const guess = Number(guessField.value);

  // when there is no input
  if (!guess) {
    message.textContent = '⛔ No number!';

    // when player wins
  } else if (guess === secretNumber) {
    message.textContent = '🎉 Correct Number!';
    body.style.backgroundColor = '#60b347';
    number.textContent = secretNumber;
    number.style.width = '30rem';
    if (scoreCount > highScoreCount) {
      highScoreCount = scoreCount;
      highScore.textContent = highScoreCount;
    }
    // highScoreCount = scoreCount > highScoreCount ? scoreCount : highScoreCount;
    // highScore.textContent = highScoreCount;

    // when guess is too high
  } else if (guess > secretNumber) {
    if (scoreCount > 1) {
      message.textContent = '📈 Too high!';
      scoreCounter();
    } else {
      scoreCounter();
    }

    // when guess is too low
  } else if (guess < secretNumber) {
    if (scoreCount > 1) {
      message.textContent = '📉 Too low!';
      scoreCounter();
    } else {
      scoreCounter();
    }
  }
});

// document.querySelector('.again').addEventListener('click', () => { location.reload() });

// my code
document.querySelector('.again').addEventListener('click', () => {
  body.style.backgroundColor = '#222';
  number.textContent = '?';
  scoreCount = 20;
  score.textContent = scoreCount;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  guessField.value = '';
  number.style.width = '15rem';
  message.textContent = 'Start guessing...';
});

// jonas code
// document.querySelector('.again').addEventListener('click', () => { });

