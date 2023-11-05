'use strict';

// function calcAge(birthYear) {
//   const date = new Date();
//   const year = date.getFullYear();
//   // const age = 2037 - birthYear;
//   const age = year - birthYear;

//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}.`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millennial = true;
//       // Creating new variable with same name as outer scopes variable
//       const firstName = 'Steven';

//       // Reassigning outer scopes variable
//       output = 'NEW OUTPUT!!!';

//       const str = `Oh, and you are a millennial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }

//     }
//     console.log(millennial);
//     // console.log(str); // Uncaught ReferenceError: str is not defined
//     // console.log(add(2, 3)); // works if not in a 'strict mode';
//     console.log(output);

//   }
//   printAge();
//   return age;
// }

// const firstName = 'Nikolay';
// calcAge(1981);

// const jonas = {
//   name: 'Jonas',
//   year: 1989,
//   calcAge: function () {
//     console.log(this);
//     return `${this.name} is ${2037 - this.year} years old!`;
//   }
// }

// console.log(jonas.calcAge());

// const petruna = {
//   name: 'Petruna',
//   year: 1996,
//   // babaluga: jonas.calcAge
// }

// petruna.babaluga = jonas.calcAge;
// console.log(petruna.babaluga());

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(1981);

// const f = jonas.calcAge;
// console.log(f);

// const ceca = {
//   name: 'Ceca',
//   year: 2015,
// }

// ceca.calcAge = f;
// console.log(ceca.calcAge());

/*
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(2037 - this.year);

    // const isMillennial = function () {
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // }; this code throw Type Error because THIS IS UNDEFINED IN SIMPLE FUNCTION CALLS

    // Solution 1 for this to work is to create variable for this outside of the function:
    // const self = this; // self or that
    // console.log(self);
    // const isMillennial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillennial();

    // Solution 2 is to use arrow function. This would work because it uses the this of the calcAge function
    const isMillennial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  }
}

jonas.greet();
jonas.calcAge();
*/

/*
// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
}
addExpr(2, 5);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b
};
addArrow(2, 3, 5)
this will not work, it will throw error because the arrow function cannot use the arguments keyword.

in modern (after ES6) JavaScript you can use the spred operator instead ... 
var addArrow = (...args) => {
  console.log(args);
  return args[0] + args[0];
};
addArrow(2, 3, 5)
*/

/*
let age = 30;
let oldAge = age;
age = 31;

console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30
}

const friend = me;
friend.age = 27;

console.log('Friend:', friend.age);
console.log('Me:', me.age);
*/

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27
}

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before wedding: ', jessica);
console.log('After wedding: ', marriedJessica);
// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob']
}

// Creates a shallow copy
// const jessicaCopy = Object.assign({}, jessica2);

// This creates a deep copy!!!
const jessicaCopy = JSON.parse(JSON.stringify(jessica2));

jessicaCopy.lastName = 'Davis';

console.log('Before wedding: ', jessica2);
console.log('After wedding: ', jessicaCopy);

jessicaCopy.family.push('Mary', 'John');

console.log('Before wedding: ', jessica2);
console.log('After wedding: ', jessicaCopy);
console.log(jessica2.family);
console.log(jessicaCopy.family);