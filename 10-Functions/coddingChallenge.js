'use strict';

/*
///////////////////////////////
// Codding Challenge #1

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
    console.log(answer);

    // Register
    typeof answer === 'number' && answer < this.options.length && answer >= 0 && this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');


/*
//////////////////////////////////
// My solution
const addAnswerOptions = function (options) {
  let optionsStr = '';
  for (const opt of options) {
    optionsStr += `${opt}\n`.padStart(opt.length + 8);
    // optionsStr += `${opt}\n`;
  }
  return optionsStr.trimEnd();
};

const checkAnswers = function (value) {
  const workValue = Number(value);
  let number = (workValue >= 0 && workValue <= 3) && workValue;
  return number;
};


const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // this generates [0, 0, 0, 0];
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // let promptMessage = `${this.question}\n`;
    let promptMessage = `${this.question}\n`.padStart(this.question.length + 8);//optional
    promptMessage += addAnswerOptions(this.options);
    let answer = checkAnswers(prompt(promptMessage));
    while (!answer && answer !== 0) {
      answer = checkAnswers(prompt(promptMessage));
    }
    this.answers[answer]++
    this.displayResults(this.answers);
  },
  displayResults(type) {
    typeof type === 'object' ? console.log(this.answers) : console.log(`Poll results are ${this.answers.join(', ')}`);
  }
}

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));


//////////////////////////////
// Coding challenge #2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue'
  })
})();

*/
