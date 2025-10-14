'use strict';

// let hasLin = false;
// let passTest = true;

// if(passTest) hasLin = true;
// if(hasLin) console.log('Drive');

// const interface = 'autdio';

// functions 
// function declaration 
// function calcAge(birthAge){
//     return 2037 - birthAge;
// }

// console.log(calcAge(2003))

// // function expression 
// const calcAge1 = function (birthAge){
//     return 2037 - birthAge;
// }
// console.log(calcAge1(2003))

// arrow function 
// const calcAge2 = birthYear => 2037 - birthYear;
// console.log(calcAge2(2003))

// const yearRetire = (birthYear, firthName) => {
//     const age = 2025 - birthYear;
//     const retirement = 65 - age;
//     // return retirement;
//     return `${firthName} retires in ${retirement} years`
// }
// console.log(yearRetire(2003, "mohd"))


// challenge 8 
// const calAvg = (a, b, c) => (a+b+c) /3;

// let scoreDol = calAvg(44, 23, 71);
// let scoreKor = calAvg(65, 54, 49);

// const checkWin = (avgDolphins, avgKoalas) => {
//     if (avgDolphins >= avgKoalas) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//     } else if (avgKoalas >= avgDolphins) {
//         console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//     } else {
//         console.log('No team wins...');
//     }
// }

// checkWin(scoreDol, scoreKor)

// Arrays 
// const friends = ['Mohd', 'Ali', 'Zakir', 'Sakir'];
// console.log(friends.length)
// console.log(friends[friends.length-1])

// const all = ['Mohd', 'ali', 21, true]
// console.log(all)

// challenge 12 
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(bills, tips, totals)

// object 
// const details = {
//     firstName: 'Mohd',
//     lastName: 'Ali',
//     birthYear: 2003,
//     job: 'teacher',
//     friends: ['Ali', 'Zakir', 'Sakir'],
//     hasDriver : true,
//     calcAge: function (){
//         return 2037 - this.birthYear
//     }

// }
// console.log(details.firstName)
// console.log(details['lastName'])

// const nameKey = 'Name';
// console.log(details['first' + nameKey])

// console.log(details.'last' + nameKey)

// console.log(details.calcAge())

// challenge 13 
// const mark = {
//     fullName: 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function() {
//         this.bmi = this.mass / (this.height * this.height);
//         return this.bmi;
//     }
// }

// const john = {
//   fullName: 'John Smith',
//   mass: 150,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// }

// mark.calcBMI();
// john.calcBMI();

// if (mark.bmi > john.bmi) {
//   console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`)
// } else if (john.bmi > mark.bmi) {
//   console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`)
// }

// loops 
// const friends = ['Mohd', 'Ali', 'Zakir', 'Sakir'];

// while loop  

// challenge 23 
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// const bills = [ 22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
// let tips = []
// let total = []

// for(let i=0; i< bills.length; i++){
//     const tip = calcTip(bills[i]);
//     tips.push(tip);
//     total.push(tip + bills[i]);
// }

// console.log(bills, tips, total);

// const calcAverage = function (arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     // sum = sum + arr[i];
//     sum += arr[i];
//   }
//   return sum / arr.length;
// }

// console.log(calcAverage([2, 3, 7]));
// console.log(calcAverage(total));
// console.log(calcAverage(tips));

// challenge 24

// const data1 =[17, 21, 23];

// const printForecast = function(arr){
//     let str = "";
//     for(let i=0; i<arr.length;i++){
//         str = str + `${arr[i]}C in ${i+1} days ...`
//     }
//     console.log("... "+str)
// }

// printForecast(data1);

