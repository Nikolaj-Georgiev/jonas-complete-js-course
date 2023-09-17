// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23;

// const calcAge = birthYear => 2037 - birthYear;
// console.log(calcAge(1981));


// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: 'Given an array of temperatures of the day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error.'

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem 
//  - What is temp amplitude? Answer: difference between highest and lowest temp.
//  - How to compute max and min temperatures?
//  - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Subtract min from max (amplitude) and return it

// const calcTempAmplitude = function (temps) {
//   const workArr = temps.filter((x) => typeof x !== 'string');
//   const max = workArr.reduce((a, b) => {
//     return a > b ? a : b;
//   });
//   const min = workArr.reduce((a, b) => {
//     return a < b ? a : b;
//   });
//   const amplitude = max - min;

//   return amplitude;
// };
// const calcTempAmplitude = function (temps) {

//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const currentTemp = temps[i]
//     if (typeof currentTemp !== 'number') continue;

//     if (currentTemp > max) max = currentTemp;
//     if (currentTemp < min) min = currentTemp;
//   }

//   return max - min;

// };

// const amplitude = calcTempAmplitude(temperatures);
// console.log(amplitude);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge the two arrays.

// 2) Breaking up into sub-problems
// - How to merge two arrays?

// const calcTempAmplitudeNew = function (t1, t2) {

//   const workArr = t1.concat(t2);

//   let max = workArr[0];
//   let min = workArr[0];
//   for (let i = 0; i < workArr.length; i++) {
//     const currentTemp = workArr[i]
//     if (typeof currentTemp !== 'number') continue;

//     if (currentTemp > max) max = currentTemp;
//     if (currentTemp < min) min = currentTemp;
//   }

//   return max - min;

// };
// const tempNew = [1, -2, -8, 12, 19, 'Pesho', 7, 'Gosho', 4];
// const amplitudeNew = calcTempAmplitudeNew(temperatures, tempNew);
// console.log(amplitudeNew);

///////////////////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print '... 17^C in 1 days ... 21^C in 2 days ... 23^c in 3 days'

Create a function 'printForecast' that takes in an array 'arr' and logs a string like the above to the console.
Use the problem-solving framework: Understand the problem and break it into sub-problems!

TEST DATA 1: [17, 21, 23];
TEST DATA 2: [12, 5, -5, 0, 4];
*/

// 1) Understanding the problem
// - how to create string with the result
// - how to write the celsius symbol

// 2) Break into sub-problems
// - find the celsius symbol and write it in a variable
// - create interpolated string with the needed data
// - iterate true the array to populate the result string

let deg = String.fromCodePoint(8451);
const arr = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  const frocArr = arr.map((x, i) => `... ${x}${deg} in ${i + 1} days`);
  return frocArr.join(' ');
};

const forecast = printForecast(arr);
console.log(forecast);

