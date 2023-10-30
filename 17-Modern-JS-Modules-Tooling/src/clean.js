'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// budget[0].value = 10000;//you still can change the lower levels of the object it freezes only the first layer.!

//making a object immutable!! (Object.freeze({object}))
//it can be used on arrays too!
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.pehso = 1000;// this will throw TypeError: ...,object is not extensible

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
// const limit = spendingLimits?.[user] ?? 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  // N.B.
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
  //   if (value <= getLimit(cleanUser)) {
  //   budget.push({ value: -value, description, user: cleanUser });
  // }
};

// it is not good practice to pass more than 3 arguments to a function. Instead you can pass an object of options, as one of the params.
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

// N.B.

/*
//in the real world we would use composing and currying to create one function that can do this by itself
// something like this!!!:
// and it's Pure function :D

const createBudgetManager = function (initialBudget, limits) {
  let state = initialBudget;
  
  return function (value) {
    return function (description) {
      return function (user = 'jonas') {
        const cleanUser = user.toLowerCase();
        const getLimit = user => limits?.[user] ?? 0;
        state = value <= getLimit(cleanUser)
        ? [...state, { value: -value, description, user: cleanUser }]
        : state;
        return state;
      };
    };
  };
};

const budgetManager = createBudgetManager(budget, spendingLimits);

const newBudget11 = budgetManager(10)('Pizza 🍕')();
const newBudget22 = budgetManager(100)('Going to movies 🍿')('Matilda');
const newBudget33 = budgetManager(200)('Stuff')('Jay');
const nb4 = budgetManager()()()

console.log(newBudget11);
console.log(newBudget22);
console.log(newBudget33);
console.log(nb4);
*/

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limit' } : entry;
//   })
// for (const entry of budget) {
//   if (entry.value < -getLimit(limits, entry.user)) {
//     entry.flag = 'limit';
//   }
// }
// };
const checkExpenses = (state, limits) =>
  state.map(entry => entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limit' } : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    // .map(entry => entry.description.slice(-2))
    // .join(' / ');
    .reduce((str, cur) => {
      return str === ''
        ? cur.description.slice(-2)
        : `${str} / ${cur.description.slice(-2)}`
    }, '')

  return bigExpenses;
  // let output = '';
  // for (const el of budget) {
  //   output += el.value <= -bigLimit ? `${el.description.slice(-2)} / ` : '';
  //   // `${el.description.slice(-2)} / `; // Emojis are 2 chars
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

// console.log(budget);
console.log(logBigExpenses(finalBudget, 500));