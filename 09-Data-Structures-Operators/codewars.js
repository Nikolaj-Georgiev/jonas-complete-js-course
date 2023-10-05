// KATA 


/*
// Challenge #4
function duplicateCount(text) {
  let originalToLowerCase = text.toLowerCase();
  let repeatingLettersCount = 0;
  
  const checker = function (str) {
    const first = str[0];
    str = str.slice(1);
    return str.includes(first);
  };
  
  const resizer = function (str) {
    if (checker(str)) {
      repeatingLettersCount++
      str = str
      .split('')
      .filter(x => x !== str[0])
      .join('');
      return str;
    }
    return str.slice(1);
  };
  
  while (originalToLowerCase) {
    originalToLowerCase = resizer(originalToLowerCase)
  }
  return repeatingLettersCount;
}

// regex and sort solution
// a lot slower than mine
function duplicateCount2(text) {
  return (text.toLowerCase().split('').sort().join('').match(/([^])\1+/g) || []).length;
}

// with reduce - 0.15 ms faster than mine
function duplicateCount1(text) {
  return text
    .toLowerCase()
    .split('')
    .reduce(function (a, l) {
      a[l] = a[l] ? a[l] + 1 : 1;
      if (a[l] === 2) a.count++;
      return a;
    }, { count: 0 }).count;
}
// console.log(duplicateCount('aabBcde'));
// console.log(duplicateCount('Indivisibility'));
// console.log(duplicateCount('Indivisibilities'));
// console.log(duplicateCount('abcde'));
// console.log(duplicateCount('aabbcde'));
// console.log(duplicateCount(''));

// testing the speed of the function 
let iterations = 1000000;
console.time('Function #1');
for (let i = 0; i < iterations; i++) {
  duplicateCount('Indivisibilities');
};
console.timeEnd('Function #1')

console.time('Function #2');
for (let i = 0; i < iterations; i++) {
  duplicateCount1('Indivisibilities');
};
console.timeEnd('Function #2')

// Challenge #3

String.prototype.toJadenCase = function () {
  let strArr = this
    .toLowerCase()
    .split(' ');
  strArr = strArr.map(s => s[0].toLocaleUpperCase() + s.slice(1));
  return strArr.join(' ');
};
// with regex
String.prototype.toJadenCase1 = function () {
  return this.replace(/(^|\s)[a-z]/g, function (x) { return x.toUpperCase(); });
};


const str = 'How can mirrors be real if our eyes aren\'t real';
console.log(str.toJadenCase());
console.log(str.toJadenCase1());

// testing the speed of the function 
let iterations = 1000000;
console.time('Function #1');
for (let i = 0; i < iterations; i++) {
  str.toJadenCase();
};
console.timeEnd('Function #1')

console.time('Function #2');
for (let i = 0; i < iterations; i++) {
  str.toJadenCase1();
};
console.timeEnd('Function #2')

///////////////////////////////////////////////////
// Challenge #2
// compiling a phone number string from an array
function createPhoneNumber(numbers) {
  const firstPart = numbers.slice(0, 3).join('');
  const secondPart = numbers.slice(3, 6).join('');
  const lastPart = numbers.slice(6).join('');

  return `(${firstPart}) ${secondPart}-${lastPart}`;
}

createPhoneNumber1 = n => '(###) ###-####'.replace(/#/g, () => n.shift())//very cool usage of ES6 code and regex

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
console.log(createPhoneNumber1([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

//////////////////////////////////////
// challenge #1 
// multipliers of 3 and 5
function solution(number) {
  if (number < 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 1; i < number; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      sum += i;
      continue;
    } else if (i % 5 === 0) {
      sum += i;
    } else if (i % 3 === 0) {
      sum += i;
    }
  }
  return sum
}

console.log(solution(10));
*/