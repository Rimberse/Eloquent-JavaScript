// Looping a Triangle - My Solution
/* const outputTriangle = () => {
    let count = 1;

    while (count <= 7) {
        let text = '';

        for (let i = 0; i < count; i++) {
            text = text + '#';
        }
        console.log(text);
        count++;
    } 
};

outputTriangle(); */

//****************************** Author's Solution ******************************//
// for (let line = "#"; line.length < 8; line += "#")  console.log(line);
//*******************************************************************************//


// FizzBuzz - My Solution
/* const printNumbers = () => {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
};

printNumbers(); */

//****************************** Author's Solution ******************************//
// for (let n = 1; n <= 100; n++) {
//     let output = "";
//     if (n % 3 == 0) output += "Fizz";
//     if (n % 5 == 0) output += "Buzz";
//     console.log(output || n);
// }
//*******************************************************************************//


// Chessboard - My Solution
const generateGrid = size => {
    let pattern = '';

    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j += 2) {
            if (i % 2 === 0) pattern = pattern + '# ';
            else pattern = pattern + ' #';
        }
        pattern = pattern + '\n';
    }

    console.log(pattern);
};

generateGrid(8);

//****************************** Author's Solution ******************************//
// let size = 8;

// let board = "";

// for (let y = 0; y < size; y++) {
//   for (let x = 0; x < size; x++) {
//     if ((x + y) % 2 == 0) {
//       board += " ";
//     } else {
//       board += "#";
//     }
//   }
//   board += "\n";
// }

// console.log(board);
//*******************************************************************************//