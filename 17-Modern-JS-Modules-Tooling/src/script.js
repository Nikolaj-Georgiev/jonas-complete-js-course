// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';//it is hoisted so no matter where you put it, but it's kind of a convention to always put it on top!!!
// All modules are executed in strict mode by default!!!
// console.log(price, tq);
// addToCart('bananas', 10);
// console.log('Importing module');

import * as ShoppingCart from '../src/shoppingCart.js';
/*
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { totalPrice as price, tq } from './shoppingCart.js';//mixed import - bad practice
// console.log(price);
// console.log(tq);

import add, { cart } from './shoppingCart.js';

add('babalugas', 8);
add('hujnja', 3);
add('.I.', 2);


console.log(cart);
const popped = cart.pop();
console.log(popped);
console.log(cart);
cart.push(popped)
// BOOOM - това чупи глави!! :)



// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// //
// // N.B. - the top level await blocks the execution of the whole module!!!
// //
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body }
};
const lastPost = await getLastPost();
console.log(lastPost);


////////////////////////////////
// Old way of modules:

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 10;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart, shipping costs will be: ${shippingCost} gold`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // this will be our public API
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity
  }
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
// this works and have worked great for many years before ES6 modules.
// The limitations are:
// 1. you cannot bundle the scripts like in the ES6 modules
// 2. you need to create different script files for every module and link them all in the HTML - you need to be careful about the order
// 3. you need to be careful with the variable names because they are all going to be in the global scope!!
// 4... probably there are more :)



/////////////////////////////////////////
// CommonJS modules

// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart, shipping costs will be: ${shippingCost} gold`);
};

// Import
const { addToCart } = require('./shoppingCart.js');

*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: { b: 1 } },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateClone1 = JSON.parse(JSON.stringify(state));//Very cool hack for deep cloning!!! :)
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateClone1);
console.log(stateDeepClone);

// for hot reload with parcel -> for remaining state and not reload the whole page

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey'
  constructor (name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
};

const nikolay = new Person('Nikolay');

console.log('Nikolay' ?? null);

console.log(state.cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';
// to reduce the bundle size - manually select only what is needed!
import 'core-js/stable/array/find';
import 'core-js/stable/promise';

// We always need to install one more package => regenerator-runtime

// Polifilling async functions
import 'regenerator-runtime/runtime';