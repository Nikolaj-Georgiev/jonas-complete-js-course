'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-09-10T14:43:26.374Z',
    '2023-10-08T18:49:59.371Z',
    '2023-10-10T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-09-10T14:43:26.374Z',
    '2023-10-08T18:49:59.371Z',
    '2023-10-10T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// It has became a nice func :)
// let timed = false;
// const timeSort = (arr, timed = false) => {
//   if (timed) {
//     const arrTime = arr.map(x => new Date(x).getTime());
//     return arrTime
//   }
//   const arrTime = arr.map(x => new Date(x).toISOString());
//   return arrTime
// }
// timeSort(account1.movementsDates)

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (day1, day2) => Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(date, new Date());
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);

};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
};

const displayMovements = function (acc, sort = false) {
  // const displayMovements = function (acc, sort = false, timeSort) {
  containerMovements.innerHTML = '';

  // const movDats = sort ? timeSort(timeSort(acc.movementsDates.slice(), !timed).sort((a, b) => b - a), timed) : acc.movementsDates;

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);



    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurr(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {

  const tick = () => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    // In each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // Decrease 1s;
    // When 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer)
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    };
    time--;
  }

  // Set timer to 5 mins.
  let time = 300;

  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//////////////////////////////////
// N.B.
// Experimenting API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   // month: 'numeric'
//   // month: '2-digit'
//   month: 'long',
//   year: 'numeric',
//   // year: '2-digit'
//   weekday: 'long'
//   // weekday: 'short'
//   // weekday: 'narrow'
// };
// const locale = navigator.language;// getting the language and display country from the browser! N.B.
// console.log(locale);

// // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);//manually set the display format.
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);



// day/month/year - Porugal
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    // N.B. - to make the date yourself
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'long',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'short'
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    clearInterval(timer);
    timer = startLogOutTimer();
    setTimeout(function () {// Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);

  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  // displayMovements(currentAccount, !sorted, timeSort);
  sorted = !sorted;
  // timed = !timed;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
console.log(23 === 23.0);

// in JS numbers are represented internally in a 64 base 2 format
// Base 10 -> 0 to 9
// Base 2 -> 0 and 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // simply an error in JavaScript

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('px2', 10));

console.log(Number.parseInt(' 2.5rem '));
// parseFloat is good for reading value out of a string
console.log(Number.parseFloat(' 2.5rem '));
// console.log(parseFloat(' 2.5rem '));// it is a global function but in modern JS is encouraged to call it true Number to provide a named space

// Checking for NaN - not good for numbers
console.log(Number.isNaN(23));//false
console.log(Number.isNaN('23'));//false
console.log(Number.isNaN(+'23x'));//true
console.log(Number.isNaN(23 / 0));//false

// Checking for numbers
// BEST FOR CHECKING IF A VALUE IS A NUMBER!
console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
console.log(Number.isFinite(+'23x'));
console.log(Number.isFinite(23 / 0));
console.log(Number.isFinite(NaN));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23.3));
console.log(Number.isInteger(23 / 0));


console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));//square root by hand
console.log(8 ** (1 / 3));//cubic root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(...[5, 18, '23', 11, 2]));
console.log(Math.max(5, 18, '23px', 11, 2));//NaN

console.log(Math.min(5, 18, 23, 11, 2));

//calculating the area of a circle with a given radius
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.PI * Math.pow(Number.parseFloat('10px'), 2));

/////////////////////////////
// Random number calculator function

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;// This is Jonas func, does not works correct.the random number will always be between MIN+1 and MAX!!!
const randomInt1 = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;// This is also Jonas func

// N.B.
const randomIntMine = (min, max) => Math.trunc(Math.random() * ((max + 1) - min) + min); // my func works correct

console.log(randomInt(1, 10));// this will never provide 1 !!!
console.log(randomIntMine(1, 10));

////////////////////////////////////
// Rounding integers
console.log(Math.round(23.3));//23
console.log(Math.round(23.8));//24
console.log(Math.round(23.4));//23
console.log(Math.round(23.5));//24

console.log(Math.ceil(23.3));//24
console.log(Math.ceil(23.8));//24

console.log(Math.floor(23.3));//23
console.log(Math.floor(23.8));//23

console.log(Math.trunc(-23.3));//-23
console.log(Math.floor(-23.3));//-24

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(1));
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));
console.log(+(2.345).toFixed(3));


// Remainders
console.log(5 / 2);// 5 = 2 * 2 + 1
console.log(5 % 2);// remainder 1

console.log(8 / 3);// 8 = 3 * 2 + 2
console.log(8 % 3);// remainder 2

//even
console.log(6 % 2);// 0 remainder
console.log(6 / 2);// 3

//odd
console.log(7 % 2);// 1 remainder
console.log(7 / 2);//3.5

console.log(15 % 2);// when you check it is better to check for 1 not for 0. Some edge cases..

const isEven = n => n % 2 === 0;
const isEven1 = n => n % 2 !== 1;

console.log(isEven(8));
console.log(isEven1(8));
console.log(isEven(23));
console.log(isEven1(23));
console.log(isEven(514));
console.log(isEven1(514));

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  })
});
// remainder operator is useful when you need to do something every Nth time!!!


//////////////////////////////////////
// Numeric separators since ES2021

//287,460,000,000
const diameter = 287_460_000_000;// the underscore is the numeric separator
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee = 15_00;
const transferFee1 = 1_500;
console.log(transferFee, transferFee1);

const PI = 3.14_15;
console.log(PI);

console.log(Number('230000'));
console.log(Number('2300_00'));//NaN



//////////////////////////////////////
// BigInt

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(65465484132184651321534345354n);
console.log(BigInt(65_465_484_132_184_651_321_534_345_354n));//numeric separator works also on bigInt :)
console.log(BigInt(65465484132184651321534345354));//this loses precision

// Operations all works with bigInts

console.log(100000n + 100000n);
console.log(65465484132184651321534345354n * 100000n);

const huge = 234789259283098127589345n;
const num = 23;
// console.log(huge * num);//throw error
console.log(huge * BigInt(num));// works fine

// Exceptions
console.log(20n > 15);
console.log(20n > 20);
console.log(20n === 20);//false - no type coercion 
console.log(typeof 20n);
console.log(20n == 20);
console.log(20n == '20');

//String 
console.log(huge + ' is REALLY BIG!');

// Divisions
console.log(10n / 3n);//cuts the decimal part



/////////////////////////////
// Create date

const now = new Date();
console.log(now);

console.log(new Date('Wed Oct 11 2023 15:03:30'));
console.log(new Date('December 24, 2022'));
console.log(new Date('12-04-2022'));
console.log(new Date('02-14-2022'));
console.log(new Date(account1.movementsDates[0]));

// moths count in JS is 0 based
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 56)); // JS auto-corrects the date this will result in Dec 26 2037

// also you can pass ms. JS counts them since the Unix time - January 1 1970
console.log(new Date(0));// Jan 01 1970
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Jan 04 1970


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());// 0 based months count
console.log(future.getDate());// calendar date
console.log(future.getDay());// 0 based Sunday starting day of the week.
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());// international time standard
console.log(future.getTime());// time stamp as ms since 01-01-1970 - 2142249780000 

console.log(new Date(2142249780000));

console.log(Date.now());//gives us the time stamp for now(current moment of time)

// there are also set methods for all of the above methods
future.setFullYear(2040);
console.log(future);



const future = new Date(2037, 10, 19, 15, 23);
// it automatically converts the date to a time stamp.... N.B.
// console.log(Number(future));
console.log(+future);

const calcDaysPassed = (day1, day2) => Math.abs(day2 - day1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

// FOR PRECISE DATE CALCS WE SHOULD USE MOMENT.JS(moment.js)


const num = 3884764.23;
const options = {
  style: 'currency',
  currency: 'USD',
  // currency: 'EUR',
  // currency: 'BGN',
  //   ====================
  // style: 'percent',
  //   ==================== 
  // style: 'unit',
  // unit: 'mile-per-hour'
  // unit: 'celsius'
  // unit: 'kilometer-per-hour'
  unit: 'celsius',
  // useGrouping: false
}
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('BG: ', new Intl.NumberFormat('bg-BG', options).format(num));
console.log('PT: ', new Intl.NumberFormat('pt-PT', options).format(num));
console.log('PE: ', new Intl.NumberFormat('qu-PE', options).format(num));
console.log('DE: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('SY: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('IN: ', new Intl.NumberFormat('hi-IN', options).format(num));



//////////////////////////////
// Timers 

// setTimeout - only executes the callback func once. After a set interval of time. It can be stopped before the timeout time expires with clearTimeout(funcName); N.B.
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`), 2000, ...ingredients);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval

const clock = setInterval(() => {
  const now = new Date();
  console.log(new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(now));
}, 1000);

setTimeout(() => clearInterval(clock), 10000);

// console.log(new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' }).format(new Date()));

*/