'use strict';

/*
////////////////////////////////////////////
// Constructor function

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!!!! Never create a method inside of constructor function!!!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
  // instead we will use prototypes and prototype inheritance!!!
};

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};

Person.hey();


const nikolay = new Person('Nikolay', 1981);
console.log(nikolay);
// nikolay.hey()// TypeError nikolay.hey is not a function

// what the 'new' does:
// 1. creates new empty {};
// 2. function is called, and this is set to the new {};
// 3. {} is linked to prototype
// 4. function AUTOMATICALLY RETURNS the {}

const ema = new Person('Ema', 2011);
const boyan = new Person('Boyan', 2019);

console.log(nikolay instanceof Person);//true



const elitza = new Person('Elitza', 1978);

console.log(ema, boyan, elitza);

const pesho = 'Pesho';

console.log(pesho instanceof Person);//false

console.log(Person.prototype);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

nikolay.calcAge();
boyan.calcAge();
ema.calcAge();

console.log(nikolay.__proto__);
console.log(nikolay.__proto__ === Person.prototype);//true

console.log(Person.prototype.isPrototypeOf(nikolay));//true
console.log(Person.prototype.isPrototypeOf(boyan));//true
console.log(Person.prototype.isPrototypeOf(Person));//false

// .prototypeOfLinkedObjects... it should be named something like this instead of .prototype

// N.B.
// the "new" keyword sets the __proto__ property of the object to the prototype of the constructor function!!!

Person.prototype.species = 'Homo Sapiens';

console.log(nikolay, elitza);
console.log(nikolay.species, elitza.species);
nikolay.species = 'Sapiens'
console.log(nikolay.species, elitza.species);

console.log(elitza.hasOwnProperty('firstName'));//true
console.log(elitza.hasOwnProperty('species'));//false -> it simply has access to the property in its prototype - Person.

console.log(nikolay.__proto__);
// Object.prototype (top of the prototype chain)
console.log(nikolay.__proto__.__proto__);
console.log(nikolay.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 6, 72, 6, 7, 3]; // [] === new Array
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

///////////////////////////////////////////
// Coding Challenge #1


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;



  Car.prototype.accelerate = function () {
    this.speed += 10;
    this.printSpeed();
  };

  Car.prototype.brake = function () {
    this.speed -= 5;
    this.printSpeed();

  };

  Car.prototype.printSpeed = function () {
    console.log(`'${this.make}' is going at ${this.speed} km/h`);
  };
};

/////////////////////////////////////////////
// Coding Challenge #3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;

};
EV.prototype = Object.create(Car.prototype, {
  constructor: {
    value: EV,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
//  - as a second argument to the Object.create function.

EV.prototype.chargeBattery = function (chargeTo) {
  chargeTo >= 100 ? this.charge = 100 : this.charge = chargeTo;
};

EV.prototype.printSpeed = function () {
  console.log(`'${this.make}' is going at ${this.speed} km/h, with a charge at ${this.charge}%`);
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  this.printSpeed();
};

// EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(120);
console.log(tesla);
tesla.accelerate();




/*
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
bmw.brake();


// N.B. pretty cool constructor class function.
const Person = function (firstName, birthYear) {

this.firstName = firstName;
this.birthYear = birthYear;

//N.B.
//Prototypal inheritance - the methods/functions will be on the prototype, not on the objects!!! And all the object created with new Person will be able to use them!!!

// Instance methods
Person.prototype.printFutureAge = function (age) {
  console.log(`In 2037 ${this.firstName} will be ${age} years old!`);
};

Person.prototype.calcAge = function () {
  const fAge = 2037 - this.birthYear;
  this.printFutureAge(fAge);
};

//static method
Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
};

const pesho = new Person('Pehso', 1979);
Person.hey()


console.log(pesho);
pesho.calcAge();
const margaritka = new Person('Margaritka', 2011);
console.log(margaritka);
console.log(margaritka.__proto__ === Person.prototype)
Person.prototype.greet = function () {
console.log(`Hey ${this.firstName}!`);
};
margaritka.greet();
console.log(pesho);


////////////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class { };

// Class declaration
class PersonCl {
constructor (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
}

// Instance methods
// Methods will be added to .prototype property
calcAge() {
  console.log(2037 - this.birthYear);
}

// greet = function () { //works the same
greet() {
  console.log(`Hey ${this.fullName}!`);
}

get age() {
  return 2037 - this.birthYear;
}

set fullName(name) {
  if (name.includes(' ')) this._fullName = name;
  else alert(`${name} is not fullname`)
}

get fullName() {
  return this._fullName;
}

// Static method
// static hey = function () {// also works
static hey() {
  console.log('Hey there 👋');
  console.log(this);
};
};

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.fullName);
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}!`);
// };
jessica.greet();

// N.B.
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens -> we can pass them into functions also return them from functions
// 3. Classes are executed in strict mode


const walter = new PersonCl('Walter Williams', 1965)

const account = {
owner: 'Jonas',
movements: [100, 200, 400, 300],

get latest() {
  return this.movements.slice(-1).pop()
},

set latest(mov) {
  this.movements.push(mov);
}
}

console.log(account.latest);

console.log(account.latest = 50);
console.log(account.movements);

PersonCl.hey();


/////////////////////////////////
// Object.create()


const PersonProto = {
calcAge() {
  console.log(2037 - this.birthYear);
},

init(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}
}

const steven = Object.create(PersonProto);
steven.init('Steven', 1976);
console.log(steven);
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2002)
console.log(sarah);
sarah.calcAge();



///////////////////////////////////////////
// Coding Challenge #2

class CarCl {
constructor (make, speed) {
  this.make = make;
  this.speed = speed;
}

printSpeed() {
  console.log(`'${this.make}' is going at ${this.speed} km/h`);
}

accelerate() {
  this.speed += 10;
  this.printSpeed();
}

brake() {
  this.speed -= 5;
  this.printSpeed();
}

get speedUS() {
  return Math.round(this.speed / 1.6);
}

set speedUS(s) {
  this.speed = Math.round(s * 1.6);
}

}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.speedUS = 93;
ford.accelerate();



//////////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
this.firstName = firstName;
this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
Person.call(this, firstName, birthYear);
this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype, {
constructor: {
  value: Student,
  enumerable: false, // Make it non-enumerable, so it won't appear in `for...in` loop
  writable: true,
  configurable: true,
},
});

Student.prototype.introduce = function () {
console.log(`Hi there, I'm ${this.firstName} and I'm studying ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

// Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
console.log(mike.__proto__);


//////////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor (fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not fullname`)
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  };
};

class StudentCL extends PersonCl {
  constructor (fullName, birthYear, course) {
    // Always start with the call of super!!!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`Hi there, I'm ${this.fullName} and I'm studying ${this.course}`);
  };

  // this calcAge is "shadowing" the one that is in its parent class
  calcAge() {
    console.log(`Hi I'm ${2037 - this.birthYear} and I study ${this.course}, but I feal like I'm ${2037 - this.birthYear + 10} years old`);
  }

}

const martha = new StudentCL('Martha Jones', 2012, 'Computer Science')
console.log(martha);
martha.introduce();
martha.calcAge();
martha.greet();
StudentCL.hey();



//////////////////////////////////////////////
// Inheritance Between "Classes": Object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(StudentProto);

StudentProto.hey = function () {
  console.log(`Hey, I'm ${this.firstName}`);
};

StudentProto.introduce = function () {
  console.log(`Hi there, I'm ${this.firstName} and I'm studying ${this.course}`);
};

jay.init('Jay', 1987, 'Computer Science')
console.log(jay);
jay.hey();
jay.calcAge();
jay.introduce();



class Account {
  constructor (owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // protected property
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // common way in practice to get some protected property
  getMovements() {
    return this._movements;
  }

  getPin() {
    return this._pin;
  }

  // Public interface (API)
  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    val = Math.abs(val);
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan of ${val} is approved!`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// we should not be allowed to manually mess with this properties
// acc1.movements.push(250);
// acc1.movements.push(-250);
// acc1.approveLoan(1000);

acc1.deposit(1250);
acc1.withdraw(-140);
acc1.withdraw(-160);
acc1.withdraw(160);
console.log(acc1);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1.getPin());



// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods

class Account {

  // 1. Public fields (on the instances)
  locale = navigator.language;

  // 2. Private fields (available on the instances not on the prototype);
  #movements = [];
  #pin;


  constructor (owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // common way in practice to get some protected property
  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }


  // 3. Public methods
  // Public interface (API)
  deposit(val) {
    this.#movements.push(val);
    return this; //this is the whole object
  }

  withdraw(val) {
    val = Math.abs(val);
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan of ${val} is approved!`);
      return this;
    }
  }

  // 4. Private methods
  #approveLoan(val) {
    return true;
  }

  static helper() {
    console.log('Helper');
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
acc1.deposit(100);
console.log(acc1.getPin());
console.log(acc1.getMovements());
acc1.requestLoan(100);
// acc1.#approveLoan()//SyntaxError
// console.log(acc1.#movements);//SyntaxError

class Ac1 extends Account { };//just checking the private methods

const acc2 = new Ac1('Pehso', 'BGN', 2222);

acc2.deposit(2000);
console.log(acc2);
acc2.requestLoan(200)
Account.helper();
Ac1.helper();

// Chaining methods
acc1.deposit(500).withdraw(200).deposit(25000).requestLoan(5000).withdraw(10000);
acc2.deposit(500).withdraw(200).deposit(25000).requestLoan(5000).withdraw(10000);
console.log(acc1.getMovements());
console.log(acc2.getMovements());

*/

///////////////////////////////////////////
// Coding Challenge #4

class CarCl {
  constructor (make, speed) {
    this.make = make;
    this.speed = speed;
  }

  printSpeed() {
    console.log(`'${this.make}' is going at ${this.speed} km/h`);
  }

  accelerate() {
    this.speed += 10;
    this.printSpeed();
  }

  brake() {
    this.speed -= 5;
    this.printSpeed();
    return this;
  }

  get speedUS() {
    return Math.round(this.speed / 1.6);
  }

  set speedUS(s) {
    this.speed = Math.round(s * 1.6);
  }

}

class EVCl extends CarCl {
  #charge;
  constructor (make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    chargeTo >= 100 ? this.#charge = 100 : this.#charge = chargeTo;
    return this;
  }

  printSpeed() {
    console.log(`'${this.make}' is going at ${this.speed} km/h, with a charge at ${this.#charge}%`);
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    this.printSpeed();
    return this;
  }
};


const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian.accelerate().chargeBattery(90).accelerate().brake().accelerate();
console.log(rivian.speedUS);