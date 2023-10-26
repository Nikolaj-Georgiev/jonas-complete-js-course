'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


///////////////////////////////////////////
// Helper functions
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)}mil people</p>
  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
  <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
</div>
</article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};


///////////////////////////////////////
// Our first AJAX call: XMLHttpRequest

/*
const getCountryData = function (country) {

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // the 'this' in this case is the request!!!!
    // const data = JSON.parse(this.responseText)[0];
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)}mil people</p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
    <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
  </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';

  });
};
*/

///////////////////////////////////////
// Welcome to callback hell

/*
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1;
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighboring countries
    const neighbors = data.borders;

    if (!neighbors) return;

    const request1 = new XMLHttpRequest();
    request1.open('GET', `https://restcountries.com/v3.1/alpha?codes=${neighbors.join(',')}`);
    request1.send();

    request1.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      console.log(data);

      // Render countries
      data.forEach(country => {
        renderCountry(country, 'neighbour');
      });

    });
  });
};
// getCountryAndNeighbor('bulgaria');
// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');
*/

///////////////////////////////////////////
// Promises !!!

// const country = 'portugal';
// const country = 'bulgaria';
// const country = 'asdfggasd';
// const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //returning another promise that needs to be then handled
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0])
//     })
// };


// const getCountryData = function (country) {
//   countriesContainer.style.opacity = 0;
//   // Fetch method only rejects if there is no internet connection!!!!!
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       }
//       return response.json()
//     })
//     .then(data => {
//       renderCountry(data[0])
//       const neighbors = data[0].borders || null;
//       // const neighbors = 'asdasfdasd';

//       // N.B.
//       // whatever we return becomes the fulfilled value of the promise!!!!!!!
//       return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbors.join(',')}`)

//     })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       }
//       return res.json()
//     })
//     .then(data => {
//       data.forEach(c => {
//         renderCountry(c, 'neighbour');
//       });
//     })
//     .catch(err => {
//       console.error(`${err}💥💥💥`);
//       renderError(`Something went wrong 💥💥💥${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // no matter if error or now this function will be called always!!! N.B.
//       // .then is only called when the promise is fulfilled
//       // .catch is only called when the promise is rejected
//       countriesContainer.style.opacity = '1';
//       // this method is very good to hide the loading spinner 
//     })
// };

/*
// const country = 'portugal';
// const country = 'bulgaria';
const country = 'australia';

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`)
    }
    return response.json()
  });
};

const getCountryData = function (country) {
  countriesContainer.style.opacity = 0;
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0])
      const neighbors = data[0].borders || null;
      if (!neighbors) throw new Error('No neighbors found');
      // N.B.
      // whatever we return becomes the fulfilled value of the promise!!!!!!!
      return getJSON(`https://restcountries.com/v3.1/alpha?codes=${neighbors.join(',')}`, 'Country not found');

    })
    .then(data => {
      data.forEach(c => {
        renderCountry(c, 'neighbour');
      });
    })
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`Something went wrong 💥💥💥${err.message}. Try again!`);
    })
    .finally(() => {
      // no matter if error or now this function will be called always!!! N.B.
      // .then is only called when the promise is fulfilled
      // .catch is only called when the promise is rejected
      countriesContainer.style.opacity = '1';
      // this method is very good to hide the loading spinner
    })
};

btn.addEventListener('click', function () {
  countriesContainer.innerHTML = '';
  getCountryData(country)
});

*/


////////////////////////////////////
// Coding challenge #1;

/*
const whereAmI = function (latitude, longitude) {
  fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
    .then(res => {
      if (res.status === 403) {
        throw new Error(`Only 3 tries per second! 😬 ${res.status}`)
      }
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Wrong coords, try again!`)
      }
      return res.json();
    })
    .then(data => {
      const country = data.address.country;
      const city = data.address.city;
      console.log(`You are in ${city}, ${country}`);
      return fetch(`https://restcountries.com/v3.1/name/${country.toLocaleLowerCase()}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Country not found!`)
      }
      return res.json();
    })
    .then(data => {
      renderCountry(data[0])
      const neighbors = data[0].borders || null;
      if (!neighbors) throw new Error('No neighbors found');
      // N.B.
      // whatever we return becomes the fulfilled value of the promise!!!!!!!
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbors.join(',')}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Country not found!`)
      }
      return res.json();
    })
    .then(data => {
      data.forEach(c => {
        renderCountry(c, 'neighbour');
      });
    })
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`Something went wrong 💥💥💥${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
whereAmI(-33.933, 18.474)


////////////////////////////////////////////////
// Event loop, Callback Queue, Microtasks Queue
// N.B.
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0); // Callback Queue!!!!
Promise.resolve('Promise resolved 1').then(res => console.log(res)); // Microtasks Queue!!!!
Promise.resolve('Promise resolved 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {
  }
  console.log(res)
});

console.log('Test end');


const lotteryPromise = new Promise(function (resolve, reject) {

  console.log('Lottery draw is happening 🔮!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰!!!');
    } else {
      reject(new Error('You lost your money... 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (res) {
    setTimeout(res(seconds), seconds * 1000);
  });
};

const wait1 = seconds => new Promise((resolve) => setTimeout(resolve, seconds * 1000));


// wait(2).then((sec) => {
//   console.log(`I waited for ${sec} seconds`)
//   return wait(1);
// }).then((sec) => console.log(`I waited for ${sec} second`));//immediately resolves, does not wait the setTimeout func.

wait1(1).then(() => {
  console.log('1 second passed')
  return wait1(1);
}).then(() => {
  console.log('2 second passed')
  return wait1(1)
}).then(() => {
  console.log('3 second passed')
  return wait1(1)
}).then(() => {
  console.log('4 second passed')
  return wait1(1)
})

// same as this, but with clean promises code

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000)
//     }, 1000)
//   }, 1000)
// }, 1000)


// Immediately resolve/reject promise!!
Promise.resolve('No Problem!').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
Promise.reject(new Error('Problem!')).then(null, x => console.error(x));//same as catch!!




// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err));
// // async behavior -> we can check with console.log after it
// console.log('Getting geolocation');

//////////////////////////////////////////////
// Promisifying the Geolocation API

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
};
// getPosition().then(pos => console.log(pos)).catch(err => console.error(err));

const whereAmI = function () {

  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
    })
    .then(res => {
      if (res.status === 403) {
        throw new Error(`Only 3 tries per second! 😬 ${res.status}`)
      }
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Wrong coords, try again!`)
      }
      return res.json();
    })
    .then(data => {
      const country = data.address.country;
      const city = data.address.city;
      console.log(`You are in ${city}, ${country}`);
      return fetch(`https://restcountries.com/v3.1/name/${country.toLocaleLowerCase()}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Country not found!`)
      }
      return res.json();
    })
    .then(data => {
      renderCountry(data[0])
      const neighbors = data[0].borders || null;
      if (!neighbors) throw new Error('No neighbors found');
      // N.B.
      // whatever we return becomes the fulfilled value of the promise!!!!!!!
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbors.join(',')}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Babalugaaaa!!!!! Country not found!`)
      }
      return res.json();
    })
    .then(data => {
      data.forEach(c => {
        renderCountry(c, 'neighbour');
      });
    })
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`Something went wrong 💥💥💥${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

btn.addEventListener('click', whereAmI);



///////////////////////////////////////////
// Coding Challenge #2
// const img1 = document.createElement('img');
// const img2 = document.createElement('img');
// const img3 = document.createElement('img');

const wait = seconds => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const imgContainer = document.querySelector('.images');

const createImage = function (imagePath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imagePath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    })

    img.addEventListener('error', function () {
      const msg = 'Babaluga, nema snimka!!! 💥💩😬';
      imgContainer.insertAdjacentText('beforeend', msg);
      reject(new Error(msg));
    })

  })
};

let currentImg;

createImage('img/img-1.jpg')
  .then((img) => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then((img) => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then((img) => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

//mine solution but I think it is slower then Jonases because I use the DOM...
// createImage('img/img-1.jpg')
//   .then(() => {
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     imgContainer.children[0].style.display = 'none';
//   })
//   .then(() => {
//     return createImage('img/img-2.jpg');
//   })
//   .then(() => {
//     console.log('Image 2 loaded');
//     return wait(2)
//   })
//   .then(() => {
//     const images = [...imgContainer.children]
//     const newImage = images.slice(-1)[0];
//     newImage.style.display = 'none';
//   })
//   .then(() => {
//     return createImage('img/img-3.jpg');
//   })
//   .then(() => {
//     console.log('Image 3 loaded');
//     return wait(2)
//   })
//   .then(() => {
//     const images = [...imgContainer.children]
//     const newImage = images.slice(-1)[0];
//     newImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

*/

//////////////////////////////////
// Async/Await - Consuming promises

// script.js:549 [Violation] Only request geolocation information in response to a user gesture.
const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
};

// fetch(`https://restcountries.com/v3.1/name/${country.toLocaleLowerCase()}`).then(res => console.log(res));//exactly the same as the async/await shown here

const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reversed geocoding
  const resGeo = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
  const geoData = await resGeo.json();

  // Country data
  const res = await fetch(`https://restcountries.com/v3.1/name/${geoData.address.country.toLocaleLowerCase()}`);
  const data = await res.json();

  renderCountry(data[0]);
};
whereAmI();

