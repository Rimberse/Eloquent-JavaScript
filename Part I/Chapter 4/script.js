// The Sum of a Range - My Solution
/* const range = (start, end, step = 1) => {
    const arr = [];

    for (let number = start; step > 0 ? number <= end : number >= end; number += step) arr.push(number);

    return arr;
};

const sum = (...numbers) => {
    let sum = 0;

    for (let i of numbers) sum += i;
    return sum;
};

console.log(range(1, 10, 2));
console.log(range(5, 2, -1));
console.log(sum(...range(1, 10))); */


//****************************** Author's Solution ******************************//
// function range(start, end, step = start < end ? 1 : -1) {
//     let array = [];

//     if (step > 0) {
//         for (let i = start; i <= end; i += step) array.push(i);
//     } else {
//         for (let i = start; i >= end; i += step) array.push(i);
//     }
//     return array;
// }

// function sum(array) {
//     let total = 0;
//     for (let value of array) {
//         total += value;
//     }
//     return total;
// }

// console.log(range(1, 10))
// // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(range(5, 2, -1));
// // → [5, 4, 3, 2]
// console.log(sum(range(1, 10)));
//   // → 55
//*******************************************************************************//


// Reversing an Array - My Solution
/* const reverseArray = array => {
    const newArr = [];

    // while (array.length !== 0) newArr.push(array.pop());

    for (let i = array.length - 1; i >= 0; i--) newArr.push(array[i]);
    return newArr;
};

const reverseArrayInPlace = array => {

    for (let i = 0; i < (array.length - 1) / 2; i++) {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
};

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const stringArr = ['reversed', 'was', 'array', 'this'];

console.log(reverseArray(numArr));
console.log(reverseArray(letterArr));
console.log(reverseArray(stringArr));

reverseArrayInPlace(numArr);
reverseArrayInPlace(letterArr);
reverseArrayInPlace(stringArr);

console.log(numArr);
console.log(letterArr);
console.log(stringArr); */

//****************************** Author's Solution ******************************//
// function reverseArray(array) {
//     let output = [];
//     for (let i = array.length - 1; i >= 0; i--) {
//         output.push(array[i]);
//     }
//     return output;
// }

// function reverseArrayInPlace(array) {
//     for (let i = 0; i < Math.floor(array.length / 2); i++) {
//         let old = array[i];
//         array[i] = array[array.length - 1 - i];
//         array[array.length - 1 - i] = old;
//     }
//     return array;
// }

// console.log(reverseArray(["A", "B", "C"]));
// // → ["C", "B", "A"];
// let arrayValue = [1, 2, 3, 4, 5];
// reverseArrayInPlace(arrayValue);
// console.log(arrayValue);
//   // → [5, 4, 3, 2, 1]
//*******************************************************************************//


// A List - My Solution
/* const arrayToList = array => {
    let firstEl = {};
    let currentEl = firstEl;

    for (let el of array) {
        if (!firstEl.value) {
            firstEl.value = el;
        } else {
            let list = { value: el, rest: null };
            currentEl.rest = list;
            currentEl = list;
        }
    }

    return firstEl;
};

const listToArray = list => {
    const arr = [];

    while (list) {
        arr.push(list.value);
        list = list.rest;
    }

    return arr;
};

const prepend = (el, list) => {
    const element = { value: el, rest: list };
    list = element;
    return list;
};

const nth = (list, number) => {
    for (let i = 0; i < number; i++) {
        if (list.rest) list = list.rest
        else return undefined;
    }
    return list.value;
};

const list = arrayToList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(list);

const arr = listToArray(list);
console.log(arr);

const newList = prepend(0, list);
console.log(newList);

console.log(nth(newList, 7)); */

//****************************** Author's Solution ******************************//
// function arrayToList(array) {
//     let list = null;
//     for (let i = array.length - 1; i >= 0; i--) {
//         list = { value: array[i], rest: list };
//     }
//     return list;
// }

// function listToArray(list) {
//     let array = [];
//     for (let node = list; node; node = node.rest) {
//         array.push(node.value);
//     }
//     return array;
// }

// function prepend(value, list) {
//     return { value, rest: list };
// }

// function nth(list, n) {
//     if (!list) return undefined;
//     else if (n == 0) return list.value;
//     else return nth(list.rest, n - 1);
// }

// console.log(arrayToList([10, 20]));
// // → {value: 10, rest: {value: 20, rest: null}}
// console.log(listToArray(arrayToList([10, 20, 30])));
// // → [10, 20, 30]
// console.log(prepend(10, prepend(20, null)));
// // → {value: 10, rest: {value: 20, rest: null}}
// console.log(nth(arrayToList([10, 20, 30]), 1));
//   // → 20
//*******************************************************************************//


// Deep Comparison - My Solution
const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (typeof obj1 != 'object' || obj1 == null || typeof obj2 != 'object' || obj2 == null) return false;

    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;

    for (let el of Object.keys(obj1)) {
        deepEqual(obj1[el], obj2[el]);
    }

    return true;
};

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, { here: 1, object: 2 }));
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));

//****************************** Author's Solution ******************************//
// function deepEqual(a, b) {
//     if (a === b) return true;

//     if (a == null || typeof a != "object" ||
//         b == null || typeof b != "object") return false;

//     let keysA = Object.keys(a), keysB = Object.keys(b);

//     if (keysA.length != keysB.length) return false;

//     for (let key of keysA) {
//         if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
//     }

//     return true;
// }

// let obj = { here: { is: "an" }, object: 2 };
// console.log(deepEqual(obj, obj));
// // → true
// console.log(deepEqual(obj, { here: 1, object: 2 }));
// // → false
// console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
//   // → true
//*******************************************************************************//