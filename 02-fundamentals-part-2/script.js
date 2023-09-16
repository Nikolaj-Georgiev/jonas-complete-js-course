'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log('I can drive! :)');

// function logger() {
//   console.log(tester);
// }

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//   return juice;
// }

// const tester = fruitProcessor(3, 4);
// console.log(tester);
// logger();

// const age = function (birthYear) {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   return currentYear - birthYear;
// }

// const yearsUntilRetirement = function (birthYear, firstName) {
//   const retirement = 65 - age(birthYear);

//   return `${firstName} retires in ${retirement} years`
// }

// console.log(yearsUntilRetirement(1981, 'Nikolay'));


// const arr = [1, 2, 3, 4];
// console.log(arr.unshift(0));

// console.log(jonas);

// const interestedIn = prompt('What would you like to know about Jonas? Choose between firstName, lastName, age and friends');

// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log('Wrong request! What would you like to know about Jonas? Choose between firstName, lastName, age, job and friends');
// }

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);


// const jonas = {
//   firstName: 'Jonas',
//   lastName: 'Schmedtmann',
//   birthYear: 1991,
//   job: 'teacher',
//   friends: ['Michael', 'Peter', 'Steven'],
//   hasDriversLicense: true,

// calcAge: function (birthYear) {
//   return 2037 - birthYear;
// }

// calcAge: function () {
//   console.log(this);
//   return 2037 - this.birthYear;
// }

//   calcAge: function () {
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },

//   getSummery: function () {
//     return `${this.firstName} is a ${this.age}-years old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} drivers license`
//   }
// }

// console.log(jonas.calcAge());
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas['calcAge']());

// 'Jonas is a 46-years old teacher, and he has a/no drivers license';

// console.log(`${jonas.firstName} is a ${jonas.calcAge()}-years old ${jonas.job}, and he has ${jonas.hasDriversLicense ? 'a' : 'no'} drivers license`);

// console.log(jonas.getSummery());


// const mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// }
// mark.calcBMI();

// const john = {
//   fullName: 'John Smith',
//   mass: 92,
//   height: 1.95,
//   // calcBMI: function () {
//   //   this.bmi = this.mass / (this.height * this.height);
//   //   return this.bmi;
//   // }
// }


// john.calcBMI = mark.calcBMI;
// john.calcBMI();
// if (mark.bmi < john.bmi) {
//   console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`);
// } else if (mark.bmi > john.bmi) {
//   console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`);
// }


// const jonas = [
//   'Jonas',
//   'Schmedtmann',
//   2037 - 1991,
//   'teacher',
//   ['Michael', 'Peter', 'Steven'],
//   true,
// ];

// const types = [];

// for (let i = 0; i < jonas.length; i++) {

//   // console.log(jonas[i], typeof jonas[i]);
//   // types[i] = typeof jonas[i];

//   types.push(typeof jonas[i]);
//   console.log(types[i]);
// }

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   ages.push(2037 - years[i]);
// }

// console.log(ages);


let dice = Math.trunc(Math.random() * 6 + 1);

while (dice !== 6) {
  console.log(`You rolled ${dice}`);
  dice = Math.trunc(Math.random() * 6 + 1);
  if (dice === 6) console.log('The loop is ending...');
}


const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};


const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip);
}

console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg += arr[i];
  }

  // return avg /= arr.length;
  return avg / arr.length;

}

console.log(calcAverage(totals));