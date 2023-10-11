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

//////////////////////////////////
// Coding challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 4.1
dogs.forEach(dog => {
  // dog.recFood = Math.trunc(dog.weight ** 0.75 * 28); // Jonas
  dog.recommendedFood ??= Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 4.2
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
const sarahsDogEating = sarahsDog.curFood > sarahsDog.recommendedFood ? 'Sara\'s dog is eating too much' : 'Sara\'s dog is eating too little';
console.log(sarahsDogEating)

// jonas
console.log(`Sara's dog is eating too ${sarahsDog.curFood > sarahsDog.recommendedFood ? 'much' : 'little'}`);

// 4.3
const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce((acc, curr) => {
  curr.curFood > curr.recommendedFood ?
    acc.ownersEatTooMuch.push(...curr.owners) :
    acc.ownersEatTooLittle.push(...curr.owners);
  return acc;
}, { ownersEatTooMuch: [], ownersEatTooLittle: [] });
console.log(ownersEatTooLittle, ownersEatTooMuch);

// jonas
const ownersEatTooMuch1 = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners)
// .flat();

console.log(ownersEatTooMuch1);


// 4.4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 4.5
console.log(dogs.find(dog => dog.curFood === dog.recommendedFood) ? true : false);

// jonas
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 4.6
const condition = dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10);

console.log(dogs.find((dog) => condition(dog)) ? true : false);//mnooo sum zle... true/false e za some ne za find!!!!
// console.log(dogs.some((dog) => condition(dog)));//i towa se zamenja samo s referencia kum funkciata...
console.log(dogs.some(condition));

// 4.7
const eatingOkDogs = dogs.reduce((acc, curr) => {
  condition(curr) ? acc.push(curr) : curr;
  return acc;
}, []);//overkill
// jonas
const eatingOkDogs1 = dogs.filter(condition);
console.log(eatingOkDogs);
console.log(eatingOkDogs1);

// 4.8

const sortedDogs = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood)
console.log(sortedDogs);
