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

    /////////////////////////////////
    // Some and Every

    console.log(movements);

    // EQUALITY
    console.log(movements.includes(-130));

    // SOME: CONDITION
    console.log(movements.some(mov => mov === -130));

    const anyDeposits = movements.some(mov => mov > 0);
    console.log(anyDeposits);

    // EVERY - RETURNS TRUE IF ALL THE ELEMENTS IN THE ARRAY SATISFY THE PREDICATE CONDITION
    console.log(movements.every(mov => mov > 0));
    console.log(account4.movements.every(mov => mov > 0));

    // N.B. Separate callback
    const deposit = mov => mov > 0;
    console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////
// FLAT and FLATMAP

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const deepArr = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(deepArr.flat());
console.log(deepArr.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const balance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap === map + flat in depth 1
const overallBalance1 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1);



///////////////////////////
// Sorting arrays

//strings
const owners = ['Jonas', 'Zach', ' Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// numbers
// console.log(movements.sort()); does not work as expected - sort is sorting by strings

// return < 0; A, B (keep order)
// return > 0; B, A (switch order)
// acceding
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
movements.sort((a, b) => a - b);// for numbers
console.log(movements);

// descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);
movements.sort((a, b) => b - a);// for numbers
console.log(movements);


arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// weird errors

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(x => 5));//this does not work
x.fill(1, 3, 5);
console.log(x);
x.fill(1)
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

// Array.from

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// cool :)
const random100 = Array.from({ length: 100 }, () => (Math.trunc((Math.random() * 100)) + 1))
console.log(random100);

*/

// const bankDepositsSum = accounts.map(acc => acc.movements).flat();

// 1
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositsSum);

// 2
// const numDeposits1000 = accounts.flatMap(x => x.movements).filter(x => x >= 1000).length;
const numDeposits1000 = accounts
  .flatMap(x => x.movements)
  // .reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0)
  .reduce((count, cur) => cur >= 1000 ? ++count : count, 0)
console.log(numDeposits1000);

// 3
// const sums = accounts
const { deposits, withdraws } = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => {
    // cur > 0 ? acc.deposits += cur : acc.withdraws += cur;
    acc[cur > 0 ? 'deposits' : 'withdraws'] += cur;
    return acc
  }, { deposits: 0, withdraws: 0 });

// console.log(sums);
console.log(deposits, withdraws);

const sums2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => {
    cur > 0 ? (acc.deposits ? acc.deposits += cur : acc.deposits = cur) : (acc.withdraws ? acc.withdraws += cur : acc.withdraws = cur);
    return acc
  }, {});

console.log(sums2);
const sums3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => {
    acc.deposits ??= 0;
    acc.withdraws ??= 0;
    cur > 0 ? acc.deposits += cur : acc.withdraws += cur;
    return acc
  }, {});

console.log(sums3);

// 4
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {

  const capitalize = str => str.at(0).toUpperCase() + str.slice(1);
  const exceptions = ['a', 'and', 'an', 'in', 'the', 'but', 'or', 'on', 'with'];


  const titleCase = title.toLowerCase().split(' ').map((word, i) => {
    return exceptions.includes(word) ? word : capitalize(word);
    // return exceptions.includes(word) && i !== 0 ? word : capitalize(word);
  }).join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
