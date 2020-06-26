// Tracking the Scalpel - My Solution
/* const locateScalpel = async nest => {
    let first = nest.name;

    while (true) {
        let next = await anyStorage(nest, first, 'scalpel');
        if (next == first) return first;
        first = next;
    }
};

const locateScalpel2 = nest => {
    const loop = first => {
        return anyStorage(nest, first, 'scalpel').then(next => {
            if (next == first) return first;
            else return loop(next);
        });
    };

    return loop(nest.name);
}; */

//****************************** Author's Solution ******************************//
// async function locateScalpel(nest) {
//     let current = nest.name;
//     for (; ;) {
//         let next = await anyStorage(nest, current, "scalpel");
//         if (next == current) return current;
//         current = next;
//     }
// }

// function locateScalpel2(nest) {
//     function loop(current) {
//         return anyStorage(nest, current, "scalpel").then(next => {
//             if (next == current) return current;
//             else return loop(next);
//         });
//     }
//     return loop(nest.name);
// }
//*******************************************************************************//


// Building Promise.all - My Solution
const Promise_all = async promises => {
    return new Promise((resolve, reject) => {
        let newPromises = [];
        let left = promises.length;

        for (let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                newPromises[i] = result;
                left--;
                if (left == 0) resolve(newPromises);
            }).catch(reject);
        }

        if (promises.length == 0) resolve(newPromises);
    });
};

//****************************** Author's Solution ******************************//
// function Promise_all(promises) {
//     return new Promise((resolve, reject) => {
//         let results = [];
//         let pending = promises.length;
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(result => {
//                 results[i] = result;
//                 pending--;
//                 if (pending == 0) resolve(results);
//             }).catch(reject);
//         }
//         if (promises.length == 0) resolve(results);
//     });
// }

// // Test code.
// Promise_all([]).then(array => {
//     console.log("This should be []:", array);
// });
// function soon(val) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(val), Math.random() * 500);
//     });
// }
// Promise_all([soon(1), soon(2), soon(3)]).then(array => {
//     console.log("This should be [1, 2, 3]:", array);
// });
// Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
//     console.log("We should not get here");
// }).catch(error => {
//     if (error != "X") {
//         console.log("Unexpected failure:", error);
//     }
// });
//*******************************************************************************//