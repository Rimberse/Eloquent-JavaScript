# Chapter 22
## Javascript and Performance

###### Exercises:
<br>
1. <b>Pathfinding</b>
Write a function findPath that, like the function you saw in Chapter 7, tries to find the shortest path between two nodes in a graph. It takes two GraphNode objects (as used throughout this chapter) as arguments and returns either null, if no path could be found, or an array of nodes that represents  a path through the graph. Nodes that occur next to each other in this array should have an edge between them.
A good approach for finding a path in a graph goes like this:

1. Create a work list that contains a single path that contains only the starting node.
2. Start with the first path in the work list.
3. If the node at the end of the current path is the goal node, return this path.
4. Otherwise, for each neighbor of the node at the end of the path, if that node has not been looked at before (does not occur at the end of any paths in the work list), create a new path by extending the current path with that neighbor and add it to the work list.
5. If there are more paths in the work list, go the the next path and continue at step 3.
6. Otherwise, there is no path.

By "spreading out" paths from the start node, this approach ensures that it always reaches a given other node by the shortest path since longer paths are cosidered only after all shorter paths have been tried.
Implement this program and test it on some simple tree paths. Construct a graph with a cycle in it (for example, by adding edges to a tree graph with the connect method) and see whether your function can find the shortest path when there are multiple possibilites.

<br>

<br>
2. <b>Timing</b>
Use Date.now() to measure the time it takes your findPath function to find a path in a more complicated graph. Since treeGraph always puts the root at the start of the graph array and a left at the end, you can give your function a nontrivial task by doing something like this:

```javascript
let graph = treeGraph(6, 6);
console.log(findPath(graph[0], graph[graph.length - 1]).length);
// -> 6
```

Create a test case that has a running time of around half a second. Be careful with passing larger numbers to treeGraph - the size of the graph increases exponentially, so you can easily make your graph so big that it'll take huge amounts of time and memory to find a path through them.

<br>

<br>
3. <b>Optimizing</b>
Now that you have a measured test case, find ways to make your findPath function faster.
Think both about macro-optimization (doing less work) and micro-optimization (doing the given work in a cheaper way). Also, consider ways to use less memory and allocate fewer or smaller data structures.

<br>

<br>