/*
////////////////////////////////
// Coding challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  // const dogsJuliaCorrected = dogsJulia.slice();
  // dogsJuliaCorrected.splice(0, 1);
  // dogsJuliaCorrected.splice(-2);
  // const dogs = dogsJuliaCorrected.concat(dogsKate);
  const allDogsArr = [...dogsJuliaCorrected, ...dogsKate];
  allDogsArr.forEach((dog, i) => console.log(dog < 3 ? `Dog number ${i + 1} is still a puppy 🐶` : `Dog number ${i + 1} is an adult, and is ${dog} years old`));
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('++++++++++++++++++++++++++++++++');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////
// Coding challenge #2

const calcAverageHumanAge = function (ages) {
  const humanAgesDogs = ages.map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4);
  const adultDogs = humanAgesDogs.filter(dogAge => dogAge >= 18);

  // const averageHumanAge = adultDogs.reduce((a, c) => a + c) / adultDogs.length;

  // average ->  2 3, (2+3) / 2 === 2/2 + 3/2 = 2.5;
  const averageHumanAge = adultDogs.reduce((a, c, i, arr) => a + c / arr.length, 0);

  return averageHumanAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

////////////////////////
// Coding challenge #3 

const calcAverageHumanAge = ages => ages
.map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
  .filter(dogAge => dogAge >= 18)
  .reduce((acc, dog, i, arr) => acc + dog / arr.length, 0);//adultDogs.length
  
  
  console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
  console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
  */