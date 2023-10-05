'use strict';


/*
////////////////////////////////////////////////////////
// Coding challenge #5
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(44);
  console.log(output);
}


//////////////////////////////////////////////////
// Coding challenge #4
// Jonas code
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea');

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
})

// My Code
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', collectText);
const text = document.querySelector('textarea');

function collectText() {
  const input = text.value;
  handleText(input)
  
};

function handleText(text) {
  let inputArr = text.split('\n').map(imp => imp.toLowerCase().trim());
  inputArr = inputArr.filter(x => x.includes('_')); //this instead of if statement
  const highest = inputArr.map(x => x.length).sort((a, b) => b - a)[0];//can create first lengths arr and then take the highest if needed.
  // const highest = lengths[0];
  // for (let i = 0; i < inputArr.length; i++) {
    //   let variable = inputArr[i].toLocaleLowerCase();
    //   // if (!variable.includes('_')) {
      //   //   continue;
      //   // }
      //   const [start, end] = variable.split('_');
      //   const newVariable = start + end.replace(end[0], end[0].toLocaleUpperCase());
      //   console.log(newVariable.padEnd((highest + 3), ' ') + '✅'.repeat(i + 1));
      // }
      for (const [i, variable] of inputArr.entries()) {
        const [start, end] = variable.split('_');
        const newVariable = `${start}${end.replace(end[0], end[0].toLocaleUpperCase())}`;
        console.log(newVariable.padEnd((highest + 3), ' ') + '✅'.repeat(i + 1));
      }
    };
*/


/*
// Coding challenge #3
 
const gameEvents = new Map([
  [17, '⚽ GOAL'],
[36, '🔁 Substitution'],
[47, '⚽ GOAL'],
[61, '🔁 Substitution'],
[64, '🔶 Yellow card'],
[69, '🔴 Red card'],
[70, '🔁 Substitution'],
[72, '🔁 Substitution'],
[76, '⚽ GOAL'],
[80, '⚽ GOAL'],
[92, '🔶 Yellow card'],
]);

//1
const events = [...new Set(gameEvents.values())];
console.log(events);
//2
gameEvents.delete(64);
console.log(gameEvents);
//3
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);
const time = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

//4
for (const [time, event] of gameEvents) {
console.log(`[${time <= 45 ? 'FIRST' : 'SECOND'} HALF] ${time}: ${event}`);
}

////////////////////////////////////////////////////
const game = {
team1: 'Bayern Munich',
team2: 'Borrussia Dortmund',
players: [
[
  'Neuer',
  'Pavard',
  'Martinez',
  'Alaba',
  'Davies',
  'Kimmich',
  'Goretzka',
  'Coman',
  'Muller',
  'Gnarby',
  'Lewandowski',
],
[
  'Burki',
  'Schulz',
  'Hummels',
  'Akanji',
  'Hakimi',
  'Weigl',
  'Witsel',
  'Hazard',
  'Brandt',
  'Sancho',
  'Gotze',
],
],
score: '4:0',
scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
'Hummels'],
date: 'Nov 9th, 2037',
odds: {
team1: 1.33,
x: 3.25,
team2: 6.5,
},
};


//////////////////////////////////////////////////////
//  Coding challenge #2
// 1.
for (const [goal, player] of game.scored.entries()) {
console.log(`Goal ${ goal + 1}: ${ player }`);
}

// 2
let oddSum = 0;
const odds = Object.values(game.odds)
for (const odd of odds) oddSum += odd;
console.log(oddSum / odds.length);

// 3.
// for (const odd of Object.keys(game.odds)) {
//   console.log(`Odd of victory ${ game[odd] ??= 'draw' }: ${ game.odds[odd] }`);// my solution
// }

for (const [team, odd] of Object.entries(game.odds)) {
const teamStr = team === 'x' ? 'draw' : game[team];//Jonas solution
console.log(`Odd of ${ teamStr }: ${ odd }`);
}

// Bonus
const scorers = {};
for (const player of game.scored) {
scorers[player] = scorers[player] >= 1 ? scorers[player] += 1 : 1; // my solution
// scorers[player] ? scorers[player]++ : (scorers[player] = 1); // Jonas solution
}

console.log(scorers);

///////////////////////////////////////
// Coding challenge #1
// const players1 = [];
// players1.push(...game.players[0]);
// const players2 = [];
// players2.push(...game.players[1]);

// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];

// 1.
const [players1, players2] = game.players;//destructuring...
// 2.
const [gk, ...fieldPlayers] = players1;
// 3.
const allPlayers = [...players1, ...players2];
// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// 5.
// const { team1, x: draw, team2 } = game.odds;//my solution
const { odds: { team1, x: draw, team2 } } = game;//JONAS solution. TOP!!!
console.log(team1, draw, team2);
// 6.
const printGoals = function (...players) {
console.log(`${ players.length } goals were scored! The players who scored are: `);
players.forEach(pl => console.log(pl));
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
printGoals('Lewandowski', 'Gnarby');

// 7.
team1 < team2 && console.log('Team 1 is more likely to win!');
team1 > team2 && console.log('Team 2 is more likely to win!');
*/