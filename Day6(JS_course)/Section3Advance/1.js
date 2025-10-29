"use strict";

// console.log(this);

// const calcAge = function(birthAge){
//     console.log(2025 - birthAge)
//     console.log(this);
// }

// calcAge(1992);

// const calcAgeArrow = (birthAge) =>  {
//     console.log(2025 - birthAge)
//     console.log(this);
// }

// calcAgeArrow(1992);

// section 9

// const arr = [2,3, 4];
// const [x, y, z] = arr;
// console.log(x)

// spread on right side
// const arr = [1, 2, 3, ...[4, 5]];

// // rest on left side
// const [a, b, ...others] = [1, 2, 3, 4,5];
// console.log(a, b, others);

// const rest1 ={
//     name: 'Capri',
//     numGuests: 0
// };
// const rest2 ={
//     name: 'La piazza',
//     owner : 'Giovanni Rossi',
// };

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests  ||= 10;
// rest2.numGuests  ||= 10;

// rest1.numGuests  ??= 10;
// rest2.numGuests  ??= 10;

// console.log(rest1);
// console.log(rest2);

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 11.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// const [player1, player2] = game.players;
// console.log(player1, player2);

// // 2
// const[gk, ...fieldPlayers] = player1;
// console.log(gk, fieldPlayers);

// // 3
// const allplayers = [...player1, ...player2];
// console.log(allplayers);

// // 4
// const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5
// const {team1, x: draw, team2} = game.odds;
// console.log(team1, draw, team2);

// // 6
// const printGoals = function (...players) {
//   console.log(`${players.length} goals were scored`);
// }

// printGoals('Davies', 'Muller', 'Lewandowski','Kimmich');

// // 7
// team1 < team2 && console.log('Team  1 is more likely to win');
// team2 < team1 && console.log('Team  2 is more likely to win');

// challenge 2

// 1.
// for (const [i, player] of game.scored.entries()){
//   console.log(`Goal ${i + 1}: ${player}`)
// }

// // 2
// let avg = 0;
// for(const odd of Object.values(game.odds)){
//   avg += odd;
// }
// avg /= Object.values(game.odds).length;
// console.log(avg);

// // 3
// for(const [team, odd] of Object.entries(game.odds)){
//   console.log(team)
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

// set
// const orderSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza'
// ])
// console.log(orderSet)
// orderSet.add('Garlic Bread');
// console.log(orderSet)

// Map
// const rest = new Map();
// rest.set("name", "Classico Italian");
// rest
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23);
// console.log(rest.get(1));

// const ques = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct'],
//   [false, 'Try again']
// ]);

// for(const [key, value] of ques){
//   if(typeof key === 'number') console.log(`Answer ${key}: ${value}`)
// }

// const answer = Number(prompt('Your answer'));
// console.log(answer);

// console.log(ques.get(ques.get('correct') === answer));

// console.log([...ques])
// console.log([...ques.values()])
// console.log([...ques.entries()])

// challenge 3 
// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1 
// const events = [...new Set(gameEvents.values())];
// console.log(events) 

// // 2 
// console.log(gameEvents.delete(64));
// console.log(gameEvents)

// // 3 
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// // 4 
// for(const [min, event] of gameEvents){
//   const half = min <= 45 ? 'FIRST': 'SECOND';
//   console.log(`[${half} HALF] ${min}: ${event}`)
// }

// const airline = 'Tap Air Portugal';
// const plane = 'A320';

// // console.log('a+very+nice+string'.split('+'));

// const capitalizeName = function (name){
//   const names = name.split(' ');
//   console.log(names);
//   const namesUpper = [];
//   for(const n of names){
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper)
// }

// capitalizeName('jessica ann smith davis');

