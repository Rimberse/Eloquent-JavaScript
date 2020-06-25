import { roads, roadGraph } from './roadGrap';

// A Modular Robot - My Solution
/* 
   I would create modules for the piece of the code that operates on data, and modules that export functions to work with that data.
   It goes without saying, that these function will depend on the imported interfaces that provide that data: array, graph, roadGrap, etc.

   export roads;
   export roadGraph;
   export VillageState;
   the list goes on...

   export function buildGraph;
   export function runRobot;
   etc...

   Most likely the algorithm for searching for the shortest path in a graph is already available in NPM, so we won't be required to implement our own.
   I would prefer to use the available code, whenever i can.
*/

//****************************** Author's Solution ******************************//
// NONE
//*******************************************************************************//


// Roads Module - My Solution
/* console.log(roads);
console.log(roadGraph);  */

//****************************** Author's Solution ******************************//
// NONE
//*******************************************************************************//


// Circular Dependencies - My Solution

//****************************** Author's Solution ******************************//
// const { buildGraph } = require("./graph");

// const roads = [
//    "Alice's House-Bob's House", "Alice's House-Cabin",
//    "Alice's House-Post Office", "Bob's House-Town Hall",
//    "Daria's House-Ernie's House", "Daria's House-Town Hall",
//    "Ernie's House-Grete's House", "Grete's House-Farm",
//    "Grete's House-Shop", "Marketplace-Farm",
//    "Marketplace-Post Office", "Marketplace-Shop",
//    "Marketplace-Town Hall", "Shop-Town Hall"
// ];

// exports.roadGraph = buildGraph(roads.map(r => r.split("-")));
//*******************************************************************************//


// Circular Dependencies - My Solution
/* 
   It will result in an unpredicted behaviour, the expected functionality won't be delivered,
   e.g. Module B expects an object, but gets a function, which results in a type mismatch.
*/

//****************************** Author's Solution ******************************//
// NONE
//*******************************************************************************//