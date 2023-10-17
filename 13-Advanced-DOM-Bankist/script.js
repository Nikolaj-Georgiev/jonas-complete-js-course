'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll: ', window.pageXOffset, window.pageYOffset);
  // console.log('Current scroll: ', window.scrollX, window.scrollY);//alias of pageXOffset and pageYOffset

  console.log('hight/width viewport: ', document.documentElement.clientHeight, document.documentElement.clientWidth);


  // Old school way
  // // so to implement smooth scrolling we need to specify object with left, top and behavior properties.
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })


  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });

})

//////////////////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// });

// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated that event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }

});

///////////////////////////////////////
// Tabbed component

// tabs.forEach(t => t.addEventListener('click', () => { console.log('TAB') }))

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;

  }
};

// Passing "argument" into handler. This is a workaround to the fact that the handler function can take only one argument!!! N.B.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// nav.addEventListener('mouseout', (e) => { handleHover(e, 1) });

/////////////////////////////////////////////
// Sticky navigation

// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// // with 'scroll' event -- it should be avoided in practice 
// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky nav: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,//intersecting with the viewport because we give null to the root
//   threshold: [0, 0.2]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  // const entry = entries[0]; this is the same as the one below
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');

  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
  // rootMargin: '-9%'//you can specify % also
});
headerObserver.observe(header);

//////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


///////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');//with this selector we select all the images that have the 'data-src' property!!!
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;// when loading finishes JS will emit loading event

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/*
// Selecting, creating and deleting elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML - very nice and useful way to insert dom elements!!!

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics.';

message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message); this was the old way, before the .remove() method;
})
// Moving up and down the DOM tree is called traversing


// Styles
message.style.backgroundColor = '#37383d';
// message.style.width = '100vw';
message.style.width = '120%';


console.log(message.style.height);
console.log(message.style.backgroundColor);// this works only for the stiles that we have manually put there as inline stiles.!!

// console.log(getComputedStyle(message));// returns a huge object with all the styles and properties;
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.id);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard attributes
console.log(logo.designer);// it does not work for custom attributes.
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist')

console.log(logo.src);//absolute version
console.log(logo.getAttribute('src'));//relative version

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);//we can put this way any data that we need. Also we need to transform the kebap case from HTML to camelCase in JS in order for this to work

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
// the ones worth knowing

// Don't use - it will override all the classes that are already there.
// logo.className = 'jonas'


/////////////////////////////////////////
// Smooth scrolling


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll: ', window.pageXOffset, window.pageYOffset);
  console.log('Current scroll: ', window.scrollX, window.scrollY);//alias of pageXOffset and pageYOffset

  console.log('hight/width viewport: ', document.documentElement.clientHeight, document.documentElement.clientWidth);
  //////
  // Scrolling  N.B.
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  // Old school way
  // // so to implement smooth scrolling we need to specify object with left, top and behavior properties.
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })


  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });

})


const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert(`addEventListener: Great! You are reading the heading :D`);

  // h1.removeEventListener('mouseenter', alertH1);//make it to listen for the event just once. This remove could be anywhere in our code.
};

h1.addEventListener('mouseenter', alertH1)

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)//you also can remove it after some time...

// h1.onmouseenter = function (e) {
//   alert(`addEventListener: Great! You are reading the heading :D`)
// };



// Pretty cool!!! :)
// rgb(255,255,255);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  // N.B.
  // e.target point to where the event happened not to where is handled!!!!!!!!
  // e.currentTarget points to where the event handler is attached!!!

  // stop propagation
  // e.stopPropagation()//in practice really not a good idea


})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

})

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

}, true)//if we add true ans third argument to the event listener, then it catches the event in the capturing phase!!!


///////////////////////////////////////////////////
// DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));// works for all the elements with that class, no matter how deep they are nested.
console.log(h1.childNodes);
console.log(h1.children);//works only for direct children.
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

// N.B. very important and it's used all the time for event delegation and stuff
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// if the query is pointing is the same as the element that we are using closest on, that that same element will be returned:
h1.closest('h1').style.background = 'var(--gradient-primary)';//finds parent elements no matter how deep in the tree are they nested

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(-0.8) skewX(-15deg)';
});
*/