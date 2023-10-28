// Exporting module
// console.log('Exporting module');

// Blocking code
// console.log('Start Fetching users!');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');
// console.log('Top lvl await blocks the execution of the importing module until the blocking code has finished!!!');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
