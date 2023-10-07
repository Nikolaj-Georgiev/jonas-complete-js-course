'use strict';

/*
///////////////////////////////////////
// Default values
const bookings = [];

// default value can be any value

// const createBooking = function (flightNum, numPassengers = 1, price = 199) {
const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  // for this to work we need to keep the order of the params. We cannot use something before it is defined ex. (price = 199 * numPassengers, numPassengers = 1) this will not work

  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price
  }
  bookings.push(booking);
  console.log(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 3);
createBooking('LH123', 5);
// if we want to skip an argument to use it's default value we can set it to undefined
createBooking('LH123', undefined, 1000);
// result is :{flightNum: 'LH123', numPassengers: 1, price: 1000}

///////////////////////////////////////////////
// passing primitive and reference values to functions

const flight = 'LH234';
const nikolay = {
  name: 'Nikolay Georgiev',
  passport: 65432158465151
}

const checkIn = function (flightNum, passenger) {
  // not a good practice to change fc args. This only of the example
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name

  if (passenger.passport === 65432158465151) {
    alert('Checked in');
  } else {
    alert('Wrong passport')
  }
};

// checkIn(flight, nikolay);
// console.log(flight);
// console.log(nikolay);

// // It's the same as doing...
// const flightNum = flight;
// const passenger = nikolay;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

// Must be very careful when manipulating objects in functions. It can cause a trouble when the same object is manipulated by other funcs too.
newPassport(nikolay);
checkIn(flight, nikolay);


///////////////////////////////////////////
// Functions accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  // return fn(str);
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // functions also have properties
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callback functions all the time! :)
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);


////////////////////////////////////////
// Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};

// Closure
const greeterHey = greet('Hey');
greeterHey('Nikolay');
greeterHey('Jonas');

greet('Hello')('Pesho')//I really need to understand this!!!
// Всъшност това отгоре работи, защото връщаме функция и незабавно я викаме.

// Challange Arrow
// const wave = waving => {
//   return name => {
//     console.log(`${name} is waving with ${waving}`);
//   };
// };tooooooo much code

const wave = waving => name => console.log(`${name} is waving with ${waving}`);

const waveWithBothHands = wave('both hands');
waveWithBothHands('Gosho')

wave('stick')('Petruna');


///////////////////////////////////////
// CALL and APPLY Methods

const lufthansa = {
  airLine: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
// book: function () { }, // pre ES6 way
  book(flightNum, name) {
  console.log(`${name} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`);
  this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name })
  }
};

lufthansa.book(235, 'Nikolay Georgiev');
lufthansa.book(453, 'Jonas Schmedtmann');
console.log(lufthansa);

const eurowings = {
  airLine: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
}

const book = lufthansa.book;

// не работи, this-a на обикновената функция сочи към undefined..
// book(23, 'Petruna Vasileva');

// Call method
book.call(eurowings, 23, 'Sara Connor');
console.log(eurowings);
book.call(lufthansa, 873, 'Marry Poppins');
console.log(lufthansa);

const swiss = {
  airLine: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: []
}

book.call(swiss, 444, 'Marry Poppins');

// Apply method - passing arguments as array
const flightData = [384, 'P J'];
book.apply(swiss, flightData)

book.call(swiss, ...flightData) // the spread operator makes the call method to be used instead of apply
console.log(swiss);


//////////////////////////////////////
// Bind method
// book.call(eurowings, 23, 'Sara Connor');

// book.bind(eurowings)// this does not call the book func, it returns a new func with this key word bind to the object passed as argument
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// you can also bind some of the arguments not only the this word
const bookEW23 = book.bind(eurowings, 23)// binding the first arg of the book func
// it is also common pattern called partial application
bookEW23('Nikolay Georgiev');
bookEW23('Sara Connor');
console.log(eurowings);

// With Event Listeners
lufthansa.plains = 300;
lufthansa.buyPlain = function () {
  console.log(this);

  this.plains++;
  console.log(this.plains);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlain.bind(lufthansa))


////////////////////////////////////
// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.2);
// addVAT = value => value + value * 0.2

console.log(addVAT(100));
console.log(addVAT(23));
console.log(addVAT(4200));

const taxFunc = function (rate) {
  return function (value) {
    return value + value * rate
  };
};

const taxVAT = taxFunc(0.2);
console.log(taxVAT(100));

const taxArr = rate => value => value + value * rate;

const vatFC = taxArr(0.2);
console.log(vatFC(200));

console.log(taxFunc(0.1)(100));
console.log(taxArr(0.1)(100));


///////////////////////////
// IIFE - Immediately Invoked Function Expression

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

//IIFE
(function () {
  console.log('This will never run again');
  var petruna = 'hujnja';
})();

(() => console.log('This will ALSO never run again'))();

{
  const oki = '';
  let koki = '';
  var gosho = 'huj'
}

// console.log(gosho);
// // console.log(oki);
// // console.log(koki);
// // console.log(petruna);


////////////////////////////
// Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); //here you can see the closure


////////////////////////
// More closure examples

// Example #1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// first we call g so that f becomes a function
g();
f();//it now close over g and have a=23 in its closure
console.dir(f)

h()// now the f is re-assigned and close over h; 
f()//it now holds b=777 in its closure
console.dir(f)


// Example #2
/*
const boardingPass = function (n, wait) {
  const perGroup = n / 3;
  const f = function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  };
  setTimeout(f, wait * 1000);
  
  console.log(`Will start boarding in ${wait} seconds`);
  console.dir(f);
};
// This is for better visualization 
boardingPass(150, 5);
*/
/*
const boardingPass = function (n, wait) {
  const perGroup = n / 3;
  
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  
  console.log(`Will start boarding in ${wait} seconds`);
  
};

const perGroup = 1000;// the perGroup from the closer is used instead of this one, because closure have higher priority than the scope chain.
boardingPass(150, 2);
*/

