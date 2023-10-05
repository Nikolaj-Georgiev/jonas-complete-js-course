'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  // [`day-${2 + 5}`]: {//new ES6 feature now we can compute also the property names
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto', 'Pork Fillet'],

  // ES6 enhanced object literals
  openingHours,

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];//old way of writing methods!
  // },
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];//new ES6 way of writing methods!
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! The ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} at ${time}h!`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  }
};


/*
//////////////////////////////////////////////////
// Working with Strings - Part 2

// Split and Join
console.log('a+very+nice+string'.split('+'));
console.log('Nikolay Georgiev'.split(' '));

const [firstName, lastName] = 'Nikolay Georgiev'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);


const capitalizedName = function (name) {
  const names = name.split(' ');
  const upperNames = [];

  for (const n of names) {
    // upperNames.push(n[0].toUpperCase() + n.slice(1));
    upperNames.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(upperNames.join(' '));
};


// Padding

const message = 'Go to gate 23!'
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Nikolay'.padStart(20, '+').padEnd(30, '+'));

// pretty cool function
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(21313484));
console.log(maskCreditCard(2113484665684646));
console.log(maskCreditCard('864321354446468585'));

// Repeat
const message2 = 'Bad weather... All Departures delayed... '
console.log(message2.repeat(5));

const plainsInLine = function (n) {
  console.log(`There are ${n} plains in line ${'🛫'.repeat(n)}`);
};

plainsInLine(5);
plainsInLine(3);
plainsInLine(12);


// capitalizedName('jessica ann smith davis')
// capitalizedName('nikolay georgiev')


//////////////////////////////////////////////////
// Working with Strings - Part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails

const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLocaleLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLocaleLowerCase().trim();
console.log(normalizedEmail);
console.log(normalizedEmail === email);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replaceAll(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Plane is part of the New Airbus family');
}

// Practice exercise 
const checkBaggage = function (items) {
  const baggage = items.toLocaleLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('Welcome aboard!');
  } else {
    console.log('You are not allowed to board!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

/////////////////////////////////////////////
// Working with Strings - Part 1
const airline = 'TAP Air Portugal';
const plain = 'A320';

console.log(plain[0]);
console.log(plain[1]);
console.log(plain[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // the length of the sliced piece will always be the result of last - first arg (7 - 4 in this case);

console.log(airline.slice(0, airline.indexOf(' '))); // takes the first word before the empty space
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // takes all after the last empty space

console.log(airline.slice(-2)); // start extracting from the back - this code takes the last to chars
console.log(airline.slice(1, -1));// this example extracts everything without the first and the last letter of the string

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat 😬');
  } else {
    console.log('You got lucky! 😎');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// when we use a method on a string, JavaScript turns that string in an object behind the scenes 
console.log(new String('Nikolay'));
console.log(typeof new String('Nikolay'));
// all string methods return primitives
console.log(typeof new String('Nikolay').slice(1));


//////////////////////////////////////////////
// MAPS: additional
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'You are correct 🎉'],
  [false, 'You are wrong 💀! Try again!']
]);
console.log(question);

// convert objects to maps
const openingHoursMap = new Map(Object.entries(openingHours));
console.log(openingHoursMap);
console.log(openingHoursMap.get('thu'));

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer: '));

console.log(question.get(answer === question.get('correct')));

// Convert a Map to an Array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

////////////////////////////////////////////////////////
// Maps: Fundamentals
const rest = new Map();
// SET method is used to fill tha Map with the data
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));//the set method returns the updated Map! This allows chaining

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(')

console.log(rest);

// GET method is used to retrieve the value behind a certain key 
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(false));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time >= rest.get('open') && time <= rest.get('close'))) // this is something really clever!!! :)

console.log(rest.has('categories'));
console.log(rest.delete(2)); // returns true if the prop is deleted and false if you try to delete something that is not there
// rest.clear();// clears the whole Map and returns undefined
console.log(rest);
console.log(rest.size);

// rest.set([1, 2], 'Test');// 1)
// console.log(rest.get([1, 2]));// 1) this will not work because those are 2 completely different arrays 
const arr = [1, 2]; // МНОГО ЯКООО!!!
rest.set(arr, 'Test')
console.log(rest.get(arr));
arr.push(...[3, 4, 5]);
console.log(rest.get(arr));
console.log(rest);

// also we can set objects and DOM elements for keys of the Map
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);


///////////////////////////////////////////////////
// Sets
// you pas an iterable to the Set
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);

console.log(new Set('Nikolay'));// strings are also iterables the result is separated letters

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// in a normal code base the best use case of Sets is to basically remove duplicates from arrays
// Example 

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff);
// const staffUnique = Array.from(new Set(staff));// може да си го обърнеш директно в масив
const staffUnique = [...new Set(staff)]; // същото но с модерния spred оператор
console.log(staffUnique);

// using Sets for counting the unique items in an iterable:
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);//if we only want to know how many unique positions are there
console.log(new Set('jonasschmedtmann').size);// how many unique letters are there in the string


////////////////////////////////////////////////////////////
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open at ${open} and close at ${close}`);
}


//////////////////////////////////////////////////
// Optional chaining (?.)
// if (restaurant.openingHours.mon && restaurant.openingHours.mon.open) console.log(restaurant.openingHours.mon.open);
// console.log(restaurant.openingHours.mon.open);

// with optional chaining
// console.log(restaurant.openingHours.mon?.open);// only if 'mon' property exist, only then the 'open' property will be read from there. Otherwise immediately 'undefined' will be returned!!
// console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

// Method
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
const users1 = [];
console.log(users[0]?.name ?? 'No such user!');
console.log(users1[0]?.name ?? 'No such user!');

///////////////////////////////////////////////
// The for-of loop
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);//Old school way
// }

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);//Modern way
}

// console.log([...menu.entries()]);

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
}

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
}

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

/////////////////////////////////////////////
// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null or undefined (NOT 0 or '')
const correctGuests = restaurant.numGuests ?? 10;
console.log(correctGuests);


////////////////////////////////////////////////////////////
// Logical operators. Short circuiting (&& AND ||);


console.log('---------OR---------');

// Use ANY data type, return ANY data type, short-circuiting(short circuit evaluation)

console.log(3 || 'Nikolay'); //if the first value is truthy JS will return it and not look at the second value at all!!!
console.log('' || 'Nikolay');
console.log(true || 0);
console.log(undefined || null);

const punko = function () { console.log('Babaluga') };

console.log(undefined || '' || 0 || 'Hello' || 23 || null);
console.log(undefined || '' || 0 || false || punko() || null); //Това малко чупи мозъци
console.log(undefined || '' || 0 || false || console.log('Babaluga 2') || null); //Това малко чупи мозъци

// if restaurant.numGuests = 0;, the code bellow will not work, because 0 is a falsy value
// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---------AND---------');
console.log(0 && 'Nikolay');//if the first value is falsy JS will immediately short-circuit the operation and will return the first value!
console.log(7 && 'Nikolay');//when it's true it continues the evaluation and the last value is returned.
console.log('Hello' && 23 && null && 'Nikolay');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


///////////////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring
// Arrays
// SPREAD, because it's on the RIGHT side of the '=';
const arr = [1, 2, ...[3, 4]];

// REST, because it's on the LEFT side of the '=';
const [a, b, ...other] = [1, 2, 3, 4, 5, 6];
console.log(a, b, other);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// REST does not include any skipped elements!
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

const { thu, ...weekend } = restaurant.openingHours;
console.log(thu);
console.log(weekend);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
console.log(add(2, 3));
console.log(add(5, 3, 7, 2));
console.log(add(8, 2, 5, 3, 2, 1, 4));

const x = [23, 5, 7];

console.log(add(...x));

restaurant.orderPizza('pepperoni', 'mozzarella', 'scamorza');
restaurant.orderPizza('mushrooms');


/////////////////////////////////////////////////
// The Spread Operator (...)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array (shallow)
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects.
const str = 'Nikolay';
const letters = [...str, ' ', 'G.']
console.log(letters);
console.log(letters.join(''));
console.log(...str);
// console.log(`${...str} Georgiev`); // this will not work, and will trow Syntax error.

// Real-world example
const ingredients = [prompt('Let\'s make pasta with 3 ingredients: 1)'), prompt('2)'), prompt('3)')];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects (since 2018 Spread operator also works on objects);
const newRestaurant = { foundedIn: 1929, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);

// creating shallow copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);


///////////////////////////////////////////////////////
// Destructuring Object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21'
})


const { openingHours, name, categories } = restaurant;
console.log(openingHours, name, categories);

const { openingHours: hours, name: restaurantName, categories: tags } = restaurant;
console.log(hours, restaurantName, tags);

// destructuring with assigning Default values and changing the name of the property!!! 🤯🤯🤯
const { menu = ['.I.'], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 2222;
const obj = { a: 27, b: 4, c: 18 };
({ a, b } = obj);// you need the () braces to wrap the curly braces otherwise VSC thinks this for a block of code and trow Unexpected error "=";
console.log(a, b);

//Nested objects
const { fri } = hours;
const { fri: { open, close } } = hours;
const { fri: { open: o, close: c } } = hours;
const { fri: { open: oi = 1, close: ci = 1, babaluga = 1 } } = hours;
const { fri: { open: oik = 1, close: cik = 1, babaluga: hui = 1 } } = hours;
console.log(fri);
console.log(open, close);
console.log(o, c);
console.log(oi, ci, babaluga);
console.log(oik, cik, hui);
  

////////////////////////////////////////////
// Destructuring arrays
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

const [first, second] = restaurant.categories;
console.log(first, second);
const [first1, , , forth] = restaurant.categories; // just skipping the elements that we don't need with coma and empty space
console.log(first1, forth);


let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);


// Receive a 2 function values from a function
const [starter, main] = restaurant.order(2, 0);
console.log(starter);
console.log(main);

// Nested destructuring 🤯
const nested = [2, 3, [4, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/