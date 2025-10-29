"use strict";

// const oneWord = function(str){
//     return str.replace(/ /g, '').toLowerCase();
// }

// const upperFirstWord = function(str){
//     const [first, ...others] = str.split(' ');
//     return [first.toUpperCase(), ...others].join(' ');
// }

// const transformer = function(str, fn){
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`); 
//     console.log(`function name: ${fn.name}`)
// }

// transformer('javascript is the best', upperFirstWord);
// transformer('javascript is the best', oneWord);

// const greet = function(greeting){
//     return function(name){
//         console.log(`${greeting} ${name}`);
//     }
// }

// const greeterHey = greet('Hey');
// greeterHey('Mohd')

// const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

// const greeterHey= greetArr('Hey');
// greeterHey('Mohd')

// const luftansa = {
//     airline: 'Luftansa',
//     iataCode: 'LH',
//     booking: [],
//     book( flightNumber, name){
//     console.log(`${name} booked a seat on ${this.airline}  flight ${this.iataCode}${flightNumber}`);
//     this.booking.push({ flight: `${this.iataCode}${flightNumber}`, name });
//     }
// }

// const airIndia = {
//     airline: 'Air India',
//     iataCode: 'AI',
//     booking: [],
    
// }

// const book = luftansa.book

// book.call(luftansa, 239, 'Mohd');
// book.apply(airIndia, [333, 'Ali']);

// const bookLH = book.bind(luftansa);
// bookLH(233, 'Mohd')  

// challenge 1 

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
   
//   answers: new Array(4).fill(0),
//   registerNewAnswer(){
//     const ans = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));

//     // register
//     console.log(ans)
//     typeof ans === 'number' && ans < this.answers.length && this.answers[ans]++; 
//   }  
// };

// 1 

// const runOnce = function () {
//     console.log('this will never run agian');
// }
// runOnce();

// (function() {
//     console.log('this is immediate');
// })();

// (() => console.log('This is arrow imediate'))(); 

// closure
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
// booker();
// booker();

console.dir(booker);
booker();
console.dir(booker);