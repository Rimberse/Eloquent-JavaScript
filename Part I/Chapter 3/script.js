// Minimum - My Solution
/* const min = (number1, number2) => number1 < number2 ? number1 : number2;

console.log(min(1, 5));
console.log(min(0.2356, 0.35673));
console.log(min("abc", "WXZ"));
console.log(min(1.5, 3.5));
console.log(min(-7, -3)); */

//****************************** Author's Solution ******************************//
// function min(a, b) {
//     if (a < b) return a;
//     else return b;
//   }
  
//   console.log(min(0, 10));
//   // → 0
//   console.log(min(0, -10));
//   // → -10
//*******************************************************************************//


// Recursion - My Solution
/* const isEven = n => {
    n = Math.trunc(n);
    if (n === 0) return true;
    else if (n === 1) return false;
    else return n > 0 ? isEven(n - 2) : isEven(n + 2);
};

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(0));
console.log(isEven(-1));
console.log(isEven(-2)); */

//****************************** Author's Solution ******************************//
// function min(a, b) {
//     if (a < b) return a;
//     else return b;
//   }
  
//   console.log(min(0, 10));
//   // → 0
//   console.log(min(0, -10));
//   // → -10
//*******************************************************************************//


// Bean Counting - My Solution
const countBs = text => {
    return countChar(text, 'B');
};

const countChar = (text, char) => {
    let count = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) count++;
    }

    return count;
};

console.log(countBs('aaaaaBBasdsaddfBdfBdfB'));
console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));

//****************************** Author's Solution ******************************//
// function countChar(string, ch) {
//   let counted = 0;
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] == ch) {
//       counted += 1;
//    }
//   }
//   return counted;
// }
//
// function countBs(string) {
//  return countChar(string, "B");
// }

// console.log(countBs("BBC"));
// → 2
// console.log(countChar("kakkerlak", "k"));
// → 4
//*******************************************************************************//