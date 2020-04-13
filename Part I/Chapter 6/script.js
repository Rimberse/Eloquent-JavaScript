// A Vector Type - My Solution
/* class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y);
    };

    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y);
    };

    get length() {
        return Math.sqrt(Math.pow(0 - this.x, 2) + Math.pow(0 - this.y, 2));
    };
};

const vector1 = new Vec(15, 20);
const vector2 = new Vec(3, 5);
console.log(vector1.plus(vector2));
console.log(vector1.minus(vector2));
console.log(vector1.length);

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length); */

//****************************** Author's Solution ******************************//
// class Vec {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     plus(other) {
//         return new Vec(this.x + other.x, this.y + other.y);
//     }

//     minus(other) {
//         return new Vec(this.x - other.x, this.y - other.y);
//     }

//     get length() {
//         return Math.sqrt(this.x * this.x + this.y * this.y);
//     }
// }

// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// // → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// // → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
//   // → 5
//*******************************************************************************//


// Groups - My Solution
/* class Group {
    constructor() {
        this.container = [];
    };

    add(value) {
        if (!this.has(value)) this.container.push(value);
    };

    delete(value) {
        if (this.has(value)) {
            const index = this.container.indexOf(value);
            this.container.splice(index, 1);
        }
    };

    has(value) {
        return this.container.indexOf(value) !== -1 ? true : false;
    };

    [Symbol.iterator]() {
        return new GroupIterator(this);
    };

    static from(collection) {
        const newGroup = new Group();

        for (let el of collection) {
            newGroup.add(el);
        }
        return newGroup;
    };
};

const group = new Group();
group.add(1);
group.add(2);
group.add(25);
group.add(3);
group.add(1);
group.delete(25);
console.log(group.has(25));
console.log(group.has(1));
console.log(group);

const newGroup = Group.from(['first', 'second', 'third', 'fourth', 'fifth']);
newGroup.add('third');
newGroup.delete('first');
console.log(newGroup); */

//****************************** Author's Solution ******************************//
// class Group {
//     constructor() {
//         this.members = [];
//     }

//     add(value) {
//         if (!this.has(value)) {
//             this.members.push(value);
//         }
//     }

//     delete(value) {
//         this.members = this.members.filter(v => v !== value);
//     }

//     has(value) {
//         return this.members.includes(value);
//     }
//
//     static from(collection) {
//         let group = new Group;
//         for (let value of collection) {
//             group.add(value);
//         }
//         return group;
//     }
// }

// let group = Group.from([10, 20]);
// console.log(group.has(10));
// // → true
// console.log(group.has(30));
// // → false
// group.add(10);
// group.delete(10);
// console.log(group.has(10));
//*******************************************************************************//


// Iterable Groups - My Solution
/* class GroupIterator {
    constructor(Group) {
        this.index = 0;
        this.group = Group;
    };

    next() {
        if (this.index === this.group.container.length) return { done: true };
        
        let value = this.group.container[this.index];
        this.index++;

        return { value, done: false };
    };
};

for (let value of Group.from([1, 2, 3, 4, 5])) {
    console.log(value);
} */

//****************************** Author's Solution ******************************//
// class Group {
//     constructor() {
//         this.members = [];
//     }

//     add(value) {
//         if (!this.has(value)) {
//             this.members.push(value);
//         }
//     }

//     delete(value) {
//         this.members = this.members.filter(v => v !== value);
//     }

//     has(value) {
//         return this.members.includes(value);
//     }

//     static from(collection) {
//         let group = new Group;
//         for (let value of collection) {
//             group.add(value);
//         }
//         return group;
//     }

//     [Symbol.iterator]() {
//         return new GroupIterator(this);
//     }
// }

// class GroupIterator {
//     constructor(group) {
//         this.group = group;
//         this.position = 0;
//     }

//     next() {
//         if (this.position >= this.group.members.length) {
//             return { done: true };
//         } else {
//             let result = {
//                 value: this.group.members[this.position],
//                 done: false
//             };
//             this.position++;
//             return result;
//         }
//     }
// }

// for (let value of Group.from(["a", "b", "c"])) {
//     console.log(value);
// }
//   // → a
//   // → b
//   // → c
//*******************************************************************************//


// Borrowing a Method - My Solution
let map = {one: true, two: true, hasOwnProperty: true};

// Fixed
console.log(Object.prototype.hasOwnProperty.call(map, "one"));

//****************************** Author's Solution ******************************//
// let map = {one: true, two: true, hasOwnProperty: true};

// console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// // → true
//*******************************************************************************//