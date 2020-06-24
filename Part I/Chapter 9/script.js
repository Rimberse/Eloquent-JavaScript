// Regexp Golf - My Solution
/* const regex1 = /ca[rt]/;
console.log(regex1.test('car'));
console.log(regex1.test('cat'));

const regex2 = /pr?op/;
console.log(regex2.test('pop'));
console.log(regex2.test('prop'));

const regex3 = /fer{2}(et|y|ari)/;
console.log(regex3.test('ferret'));
console.log(regex3.test('ferry'));
console.log(regex3.test('ferrari'));

const regex4 = /.*ious\b/;
console.log(regex4.test('abnoxious'));
console.log(regex4.test('iousoity'));

const regex5 = /\s[.,:;]?/;
console.log(regex5.test(' .'));
console.log(regex5.test('   ,'));
console.log(regex5.test('     ;'));
console.log(regex5.test(' .,:;'));

const regex6 = /\w{7,}/;
console.log(regex6.test('programming'));
console.log(regex6.test('wonder'));

const regex7 = /\b[^\We]+\b/i;
console.log(regex7.test('book'));
console.log(regex7.test('tempting')); */

//****************************** Author's Solution ******************************//
// // Fill in the regular expressions

// verify(/ca[rt]/,
//     ["my car", "bad cats"],
//     ["camper", "high art"]);

// verify(/pr?op/,
//     ["pop culture", "mad props"],
//     ["plop", "prrrop"]);

// verify(/ferr(et|y|ari)/,
//     ["ferret", "ferry", "ferrari"],
//     ["ferrum", "transfer A"]);

// verify(/ious\b/,
//     ["how delicious", "spacious room"],
//     ["ruinous", "consciousness"]);

// verify(/\s[.,:;]/,
//     ["bad punctuation ."],
//     ["escape the dot"]);

// verify(/\w{7}/,
//     ["hottentottententen"],
//     ["no", "hotten totten tenten"]);

// verify(/\b[^\We]+\b/i,
//     ["red platypus", "wobbling nest"],
//     ["earth bed", "learning ape", "BEET"]);


// function verify(regexp, yes, no) {
//     // Ignore unfinished exercises
//     if (regexp.source == "...") return;
//     for (let str of yes) if (!regexp.test(str)) {
//         console.log(`Failure to match '${str}'`);
//     }
//     for (let str of no) if (regexp.test(str)) {
//         console.log(`Unexpected match for '${str}'`);
//     }
// }
//*******************************************************************************//


// Quoting Style - My Solution
/* const regex = /(\W)'|'(\W)/g;
const string = "Once upon a time, in a 'far' land called 'Uponia', something 'terrible' happened and all the humans became 'rats'. But don't get me wrong, 'young reader', they aren't actually the 'ordinary rats' you used to see.";
console.log(string);
console.log(string.replace(regex, '$1"$2')); */

//****************************** Author's Solution ******************************//
// let text = "'I'm the cook,' he said, 'it's my job.'";

// console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
// // → "I'm the cook," he said, "it's my job."
//*******************************************************************************//


// Numbers Again - My Solution
const regex = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
console.log(regex.test('.5'));
console.log(regex.test('5.'));
console.log(regex.test('-25.36'));

//****************************** Author's Solution ******************************//
// Fill in this regular expression.
// let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// // Tests:
// for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
//     "1.3e2", "1E-4", "1e+12"]) {
//     if (!number.test(str)) {
//         console.log(`Failed to match '${str}'`);
//     }
// }
// for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
//     ".5.", "1f5", "."]) {
//     if (number.test(str)) {
//         console.log(`Incorrectly accepted '${str}'`);
//     }
// }
//*******************************************************************************//