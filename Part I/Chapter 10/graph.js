export const buildGraph = edges => {
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