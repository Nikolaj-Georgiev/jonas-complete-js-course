// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE - DOESN'T MUTATE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));//lase element
console.log(arr.slice(1, -2));
console.log(arr.slice());//shallow copy
console.log([...arr]); // shallow copy

// SPLICE - MUTATE
// console.log(arr.splice(2));
const spl1 = arr.splice(-1);//removing the last element
console.log(arr);
const spl2 = arr.splice(1, 2);
console.log(arr);
arr.splice(1, 0, ...spl2)
console.log(arr);
arr.splice(arr.length, 0, ...spl1)
console.log(arr);

// REVERSE - MUTATE
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT - DOESN'T MUTATE
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN - DOESN'T MUTATE
console.log(letters.join(' - '));

///////////////////////
// AT (ES2022)
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));// useful for method chaining also

//this method also works on strings
console.log('Nikolay'.at(0));
console.log('Nikolay'.at(-1));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// FOROF
// for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: withdrew ${Math.abs(movement)}`);
  }
}

// FOREACH
console.log('++++++FOREACH++++++');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: withdrew ${Math.abs(mov)}`);
  }
})

console.log('++++++FOREACH++++++ARROW');
// FOREACH ARROW CALLBACK
movements.forEach((mov, i) => mov > 0 ? console.log(`Movement ${i + 1}: deposited ${mov}`) : console.log(`Movement ${i + 1}: withdrew ${Math.abs(mov)}`));

//////////////////////////
// FOREACH with MAPS and SETS

//  Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'BGN']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, set) => console.log(`${value}: ${value}`, set))


///////////////////////////////////////////
// MAP, FILTER, REDUCE


// MAP
const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
  //   return mov * euroToUsd;
  // });

const movementsUSD = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);

console.log(movementsUSDfor);


const movementDescriptions = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);

console.log(movementDescriptions);

// const createUsername = function (user) {
//   const username = user.toLocaleLowerCase().split(' ').map(name => name[0]).join('');
//   return username;
// };


// FILTER
// const deposits = movements.filter(mov => mov > 0);

const deposits = movements.filter(function (mov) {
  return mov > 0;
})
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// REDUCE
// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum Value
const max = movements.reduce((acc, cur) => acc > cur ? acc : cur);
console.log(max);

const euroToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
// .map((mov, i, arr) => {
  //   console.log(arr); // passing the arr as arg and loging it is a good way to debug chained methods!!!!!
  //   return mov * euroToUsd
  // })
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
  console.log(totalDepositsUSD);

*/

/////////////////////////////
// FIND
console.log(movements);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// let acc1 = {}
// for (const acc of accounts.values()) {
//   // console.log(acc.owner);
//   if (acc.owner === 'Jessica Davis') {
//     acc1 = { ...acc };
//   }
// }
// console.log(acc1);