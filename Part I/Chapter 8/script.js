// Retry - My Solution
/* class MultiplicatorUnitFailure extends Error { };

const primitiveMultiply = (a, b) => {
    let random = Math.floor(Math.random() * 101);

    if (random <= 20) return a * b;
    else throw new MultiplicatorUnitFailure("Failed");
};

const reliableMultiply = (a, b) => {
    while (true) {

        try {
            let result = primitiveMultiply(a, b);
            if (result == a * b) return result;
        } catch (error) {
            if (error instanceof MultiplicatorUnitFailure) {
                console.log(error);
            } else {
                throw error;
            }
        };
    };
};

let a = Math.ceil(Math.random() * 10);
let b = Math.ceil(Math.random() * 10);
let result = reliableMultiply(a, b);

console.log(`Result of multiplication of numbers ${a} and ${b} is: ${result}`); */


//****************************** Author's Solution ******************************//
// class MultiplicatorUnitFailure extends Error { }

// function primitiveMultiply(a, b) {
//     if (Math.random() < 0.2) {
//         return a * b;
//     } else {
//         throw new MultiplicatorUnitFailure("Klunk");
//     }
// }

// function reliableMultiply(a, b) {
//     for (; ;) {
//         try {
//             return primitiveMultiply(a, b);
//         } catch (e) {
//             if (!(e instanceof MultiplicatorUnitFailure))
//                 throw e;
//         }
//     }
// }

// console.log(reliableMultiply(8, 8));
// // → 64
//*******************************************************************************//


// The Locked Box - My Solution
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

const withBoxUnlocked = func => {
    const alreadyUnlocked = !box.locked;

    try {
        box.unlock();
        func();
    } catch (err) {
        console.log(err);
    } finally {
        if (!alreadyUnlocked) {
            box.lock();
        }
    }
};

withBoxUnlocked(() => {
    box.content.push("gold piece");
});

console.log(box.locked);
console.log(box._content);

box.unlock();
try {
    withBoxUnlocked(() => {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}

console.log(box.locked);

//****************************** Author's Solution ******************************//
// const box = {
//     locked: true,
//     unlock() { this.locked = false; },
//     lock() { this.locked = true; },
//     _content: [],
//     get content() {
//         if (this.locked) throw new Error("Locked!");
//         return this._content;
//     }
// };

// function withBoxUnlocked(body) {
//     let locked = box.locked;
//     if (!locked) {
//         return body();
//     }

//     box.unlock();
//     try {
//         return body();
//     } finally {
//         box.lock();
//     }
// }

// withBoxUnlocked(function () {
//     box.content.push("gold piece");
// });

// try {
//     withBoxUnlocked(function () {
//         throw new Error("Pirates on the horizon! Abort!");
//     });
// } catch (e) {
//     console.log("Error raised:", e);
// }

// console.log(box.locked);
//   // → true
//*******************************************************************************//