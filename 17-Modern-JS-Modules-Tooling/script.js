var $9hWyW$lodashes = require("lodash-es");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';//it is hoisted so no matter where you put it, but it's kind of a convention to always put it on top!!!
// All modules are executed in strict mode by default!!!
// console.log(price, tq);
// addToCart('bananas', 10);
// console.log('Importing module');
// Exporting module
// console.log('Exporting module');
// Blocking code
// console.log('Start Fetching users!');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');
// console.log('Top lvl await blocks the execution of the importing module until the blocking code has finished!!!');
const $4cb0a17f18b0e41e$var$shippingCost = 10;
const $4cb0a17f18b0e41e$export$e79499a77ba07702 = [];
const $4cb0a17f18b0e41e$export$576b6dd9d68b37bc = function(product, quantity) {
    $4cb0a17f18b0e41e$export$e79499a77ba07702.push({
        product: product,
        quantity: quantity
    });
    console.log(`${quantity} ${product} added to cart`);
};
const $4cb0a17f18b0e41e$export$da0715255d0ed324 = 237;
const $4cb0a17f18b0e41e$export$5b07eba68643ad41 = 23;
function $4cb0a17f18b0e41e$export$2e2bcd8739ae039(product, quantity) {
    $4cb0a17f18b0e41e$export$e79499a77ba07702.push({
        product: product,
        quantity: quantity
    });
    console.log(`${quantity} ${product} added to cart`);
}



const $0102d920810385a3$var$state = {
    cart: [
        {
            product: "bread",
            quantity: 5
        },
        {
            product: "pizza",
            quantity: {
                b: 1
            }
        }
    ],
    user: {
        loggedIn: true
    }
};
const $0102d920810385a3$var$stateClone = Object.assign({}, $0102d920810385a3$var$state);
const $0102d920810385a3$var$stateClone1 = JSON.parse(JSON.stringify($0102d920810385a3$var$state)); //Very cool hack for deep cloning!!! :)
const $0102d920810385a3$var$stateDeepClone = (0, ($parcel$interopDefault($9hWyW$lodashes)))($0102d920810385a3$var$state);
$0102d920810385a3$var$state.user.loggedIn = false;
console.log($0102d920810385a3$var$stateClone);
console.log($0102d920810385a3$var$stateClone1);
console.log($0102d920810385a3$var$stateDeepClone); // for hot reload with parcel -> for remaining state and not reload the whole page
 // if (module.hot) {
 //   module.hot.accept();
 // }


//# sourceMappingURL=script.js.map
