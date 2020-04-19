// Edges
/* const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office",
    "Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm", "Grete's House-Shop",
    "Marketplace-Farm", "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

// Graph
const buildGraph = edges => {
    let graph = Object.create(null);

    const addEdge = (from, to) => {
        if (graph[from] == null) {
            graph[from] = [to];         // assigns the value of an array with only one element inside (to)
        } else {
            graph[from].push(to);
        }
    };

    for (let [from, to] of edges.map(r => r.split("-"))) {          // splits each array element, produces an array with 2 elements (from, to)
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
};

// Build Graph from Edges
const roadGraph = buildGraph(roads);

// Village's State
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    };

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;            // returns the old state, since it's not a valid move
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);

            return new VillageState(destination, parcels);
        }
    };
};

// TEST
// const first = new VillageState("Post Office", [{ place: "Post Office", address: "Alice's House" }]);
// const next = first.move("Alice's House");

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);

// Running a robot
const runRobot = (state, robot, memory) => {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
};

// Pick a random entry in an array
const randomPick = array => {
    const choice = Math.floor(Math.random() * array.length);
    return array[choice];
};

// Pick a random delivery location
const randomRobot = state => ({ direction: randomPick(roadGraph[state.place]) });

// Add a static method to create a new state with parcels
VillageState.random = (parcelCount = 5) => {
    const parcels = [];

    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);

        parcels.push({ place, address });
    }

    return new VillageState("Post Office", parcels);
};

// Run robot
// runRobot(VillageState.random(), randomRobot);

// Route that passes all places in the village
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

// Route following robot
const routeRobot = (state, memory) => {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
};

const findRoute = (graph, from, to) => {
    let work = [{ at: from, route: [] }];

    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
};

const goalOrientedRobot = ({ place, parcels }, route) => {
    if (route.length == 0) {
        let parcel = parcels[0];

        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}; */

// console.log(goalOrientedRobot(VillageState.random(), []));



//********************************** EXERCISES **********************************//


// Measuring a Robot - My Solution
/* const countSteps = (state, robot, memory) => {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length == 0) return steps;

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
};

const compareRobots = (robot1, robot1Memory, robot2, robot2Memory) => {
    let steps1 = 0, steps2 = 0;

    for (let i = 0; i < 100; i++) {
        let task = VillageState.random();

        steps1 += countSteps(task, robot1, robot1Memory);
        steps2 += countSteps(task, robot2, robot2Memory);
    }

    console.log(`Robot 1 needed ${steps1 / 100} steps per task\nRobot 2 needed ${steps2 / 100} steps per task`);
}; */

// compareRobots(routeRobot, [], goalOrientedRobot, []);


//****************************** Author's Solution ******************************//
// function countSteps(state, robot, memory) {
//     for (let steps = 0; ; steps++) {
//         if (state.parcels.length == 0) return steps;
//         let action = robot(state, memory);
//         state = state.move(action.direction);
//         memory = action.memory;
//     }
// }

// function compareRobots(robot1, memory1, robot2, memory2) {
//     let total1 = 0, total2 = 0;
//     for (let i = 0; i < 100; i++) {
//         let state = VillageState.random();
//         total1 += countSteps(state, robot1, memory1);
//         total2 += countSteps(state, robot2, memory2);
//     }
//     console.log(`Robot 1 needed ${total1 / 100} steps per task`)
//     console.log(`Robot 2 needed ${total2 / 100}`)
// }

// compareRobots(routeRobot, [], goalOrientedRobot, []);
//*******************************************************************************//


// Robot Efficiency - My Solution
/* const efficientGoalOrientedRobot = ({ place, parcels }, route) => {
    if (route.length == 0) {
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return { route: findRoute(roadGraph, place, parcel.place), picked: true };
            } else {
                return { route: findRoute(roadGraph, place, parcel.address), picked: false };
            }
        });

        const pick = ({ route, pick }) => {
            return (pick ? 1 : 0) - route.length;
        };

        route = routes.reduce((a, b) => pick(a) > pick(b) ? a : b).route;
    }
    return { direction: route[0], memory: route.slice(1) };
};

compareRobots(goalOrientedRobot, [], efficientGoalOrientedRobot, []); */

//****************************** Author's Solution ******************************//
// function lazyRobot({ place, parcels }, route) {
//     if (route.length == 0) {
//         // Describe a route for every parcel
//         let routes = parcels.map(parcel => {
//             if (parcel.place != place) {
//                 return {
//                     route: findRoute(roadGraph, place, parcel.place),
//                     pickUp: true
//                 };
//             } else {
//                 return {
//                     route: findRoute(roadGraph, place, parcel.address),
//                     pickUp: false
//                 };
//             }
//         });

//         // This determines the precedence a route gets when choosing.
//         // Route length counts negatively, routes that pick up a package
//         // get a small bonus.
//         function score({ route, pickUp }) {
//             return (pickUp ? 0.5 : 0) - route.length;
//         }
//         route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
//     }

//     return { direction: route[0], memory: route.slice(1) };
// }

// runRobotAnimation(VillageState.random(), lazyRobot, []);
//*******************************************************************************//


// Persistent Group - My Solution
class PGroup {
    constructor(container) {
        this.container = container;
    }

    add(value) {
        if (!this.has(value)) {
            const arr = Array.from(this.container);
            arr.push(value);
            const newGroup = new PGroup(arr);
            return newGroup;
        }
    };

    delete(value) {
        if (this.has(value)) {
            const index = this.container.indexOf(value);
            const arr = this.container.slice(0, index).concat(this.container.slice(index + 1, this.container.length));
            const newGroup = new PGroup(arr);
            return newGroup;
        }
    };

    has(value) {
        return this.container.indexOf(value) !== -1 ? true : false;
    };
};

PGroup.empty = new PGroup([]);
console.log(PGroup.empty);

const hold = func => {
    setTimeout(func, 2500);
};

hold(() => {
    let a = PGroup.empty.add(5);
    console.log(a);

    hold(() => {
        let b = a.add(7);
        console.log(b);

        hold(() => {
            let c = b.add(3);
            console.log(c);

            hold(() => {
                let d = c.delete(7);
                console.log(d);
                console.log(d.has(3));
                console.log(d.has(7));

                console.log('---------- Another try ----------');
                hold(() => {
                    let a = PGroup.empty.add('a');
                    console.log(a);

                    hold(() => {
                        let ab = a.add('b');
                        console.log(ab);

                        hold(() => {
                            let a = ab.delete('b');
                            console.log(a);
                        });
                    });
                });
            });
        });
    });
});

//****************************** Author's Solution ******************************//
// class PGroup {
//     constructor(members) {
//         this.members = members;
//     }

//     add(value) {
//         if (this.has(value)) return this;
//         return new PGroup(this.members.concat([value]));
//     }

//     delete(value) {
//         if (!this.has(value)) return this;
//         return new PGroup(this.members.filter(m => m !== value));
//     }

//     has(value) {
//         return this.members.includes(value);
//     }
// }

// PGroup.empty = new PGroup([]);

// let a = PGroup.empty.add("a");
// let ab = a.add("b");
// let b = ab.delete("a");

// console.log(b.has("b"));
// // → true
// console.log(a.has("b"));
// // → false
// console.log(b.has("a"));
//   // → false
//*******************************************************************************//