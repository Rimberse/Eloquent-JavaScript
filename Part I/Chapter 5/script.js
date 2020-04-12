// Flattenning - My Solution
/* const flatten = array => {
    return array.reduce((a, b) => a.concat(b));
};

const arr1 = [[1, 2, 3], [4, 5], [6, 7, 8, 9]];
const arr2 = [['a', 'b'], ['c', 'd'], ['e', 'f']];
const arr3 = [['word', 'string'], ['text','letter']];

console.log(flatten(arr1));
console.log(flatten(arr2));
console.log(flatten(arr3)); */

//****************************** Author's Solution ******************************//
// let arrays = [[1, 2, 3], [4, 5], [6]];

// console.log(arrays.reduce((flat, current) => flat.concat(current), []));
// // → [1, 2, 3, 4, 5, 6]
//*******************************************************************************//


// Your Own Loop - My Solution
/* const loop = (value, test, update, body) => {
    for (value; test(value); value = update(value)) {
        body(value);
    }
};

loop(1, n => n <= 10, n => n + 1, console.log);
loop('a', n => n.length < 10, n => n + 'a', console.log);
loop(3, n => n > 0, n => n - 1, console.log); */

//****************************** Author's Solution ******************************//
// function loop(start, test, update, body) {
//     for (let value = start; test(value); value = update(value)) {
//       body(value);
//     }
//   }

//   loop(3, n => n > 0, n => n - 1, console.log);
//   // → 3
//   // → 2
//   // → 1
//*******************************************************************************//


// Everything - My Solution
/* const every = (array, test) => {
    for (let el of array) {
        if (!test(el)) return false;
    }
    return true;
};

const everyV2 = (array, test) => {
    return !(array.some(el => !test(el)));
};

console.log(everyV2([1, 3, 5], n => n < 10));
console.log(everyV2([2, 4, 16], n => n < 10));
console.log(everyV2([], n => n < 10)); */

//****************************** Author's Solution ******************************//
// function every(array, predicate) {
//     for (let element of array) {
//         if (!predicate(element)) return false;
//     }
//     return true;
// }

// function every2(array, predicate) {
//     return !array.some(element => !predicate(element));
// }

// console.log(every([1, 3, 5], n => n < 10));
// // → true
// console.log(every([2, 4, 16], n => n < 10));
// // → false
// console.log(every([], n => n < 10));
//   // → true
//*******************************************************************************//


// Dominant Writing Direction - My Solution
const dominantDirection = text => {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : 'none';
    }).filter(({ name }) => name != 'none');

    if (scripts.length === 0) return "ltr";

    return scripts.reduce((a, b) => a.count > b.count ? a : b).name;
};

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({ name, count: 1 });
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));

//****************************** Author's Solution ******************************//
// function dominantDirection(text) {
//     let counted = countBy(text, char => {
//         let script = characterScript(char.codePointAt(0));
//         return script ? script.direction : "none";
//     }).filter(({ name }) => name != "none");

//     if (counted.length == 0) return "ltr";

//     return counted.reduce((a, b) => a.count > b.count ? a : b).name;
// }

// console.log(dominantDirection("Hello!"));
// // → ltr
// console.log(dominantDirection("Hey, مساء الخير"));
//   // → rtl
//*******************************************************************************//