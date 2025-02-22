// Content Negotiation - My Solution
/* fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'text/plain'}}).then(response => response.text()).then(text => {
    const textarea = document.querySelector('.text').textContent = text;
});

fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'text/html'}}).then(response => response.text()).then(text => {
    const textarea = document.querySelector('.markup').textContent = text;
});

fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'application/json'}}).then(response => response.text()).then(text => {
    const textarea = document.querySelector('.json').textContent = text;
});

fetch('https://eloquentjavascript.net/author', {headers: {Accept: 'application/rainbows+unicorns'}}).then(response => response.text()).then(text => {
    console.log(text);
}); */

//****************************** Author's Solution ******************************//
// const url = "https://eloquentjavascript.net/author";
// const types = ["text/plain",
//                "text/html",
//                "application/json",
//                "application/rainbows+unicorns"];

// async function showTypes() {
//   for (let type of types) {
//     let resp = await fetch(url, {headers: {accept: type}});
//     console.log(`${type}: ${await resp.text()}\n`);
//   }
// }

// showTypes();
//*******************************************************************************//


// A JavaScript Workbench
/* let func = Function('n', 'return n + 1;');

document.querySelector('button').addEventListener('click', () => {
    const code = document.querySelector('textarea').value;
    const output = document.querySelector('.output');
    try {
        const result = String(Function(code)());
        output.innerHTML = result;
    } catch(e) {
        output.innerHTML = 'Error: ' + e;
    }
}); */

//****************************** Author's Solution ******************************//
{/* <textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  document.querySelector("#button").addEventListener("click", () => {
    let code = document.querySelector("#code").value;
    let outputNode = document.querySelector("#output");
    try {
      let result = Function(code)();
      outputNode.innerText = String(result);
    } catch (e) {
      outputNode.innerText = "Error: " + e;
    }
  });
</script> */}
//*******************************************************************************//


// Conway's Game of Life
const grid = document.querySelector('.grid');
const cells = [];

for (let i = 0; i < 15; i++) {
    for (let y = 0; y < 30; y++) {
        const cell = document.createElement('input');
        cell.type = 'checkbox';
        const random = Math.random() >= 0.5 ? true : false;
        if (random) cell.checked = true;
        grid.appendChild(cell);
        cells.push(cell);
    }
    grid.appendChild(document.createElement('br'));
}

document.querySelector('.generation').addEventListener('click', () => {

});

//****************************** Author's Solution ******************************//
{/* <div id="grid"></div>
<button id="next">Next generation</button>
<button id="run">Auto run</button>

<script>
  const width = 30, height = 15;

  // I will represent the grid as an array of booleans.

  let gridNode = document.querySelector("#grid");
  // This holds the checkboxes that display the grid in the document.
  let checkboxes = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let box = document.createElement("input");
      box.type = "checkbox";
      gridNode.appendChild(box);
      checkboxes.push(box);
    }
    gridNode.appendChild(document.createElement("br"));
  }

  function gridFromCheckboxes() {
    return checkboxes.map(box => box.checked);
  }
  function checkboxesFromGrid(grid) {
    grid.forEach((value, i) => checkboxes[i].checked = value);
  }
  function randomGrid() {
    let result = [];
    for (let i = 0; i < width * height; i++) {
      result.push(Math.random() < 0.3);
    }
    return result;
  }

  checkboxesFromGrid(randomGrid());

  // This does a two-dimensional loop over the square around the given
  // x,y position, counting all fields that have a cell but are not the
  // center field.
  function countNeighbors(grid, x, y) {
    let count = 0;
    for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
      for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
        if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
          count++;
        }
      }
    }
    return count;
  }

  function nextGeneration(grid) {
    let newGrid = new Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let neighbors = countNeighbors(grid, x, y);
        let offset = x + y * width;
        if (neighbors < 2 || neighbors > 3) {
          newGrid[offset] = false;
        } else if (neighbors == 2) {
          newGrid[offset] = grid[offset];
        } else {
          newGrid[offset] = true;
        }
      }
    }
    return newGrid;
  }

  function turn() {
    checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
  }

  document.querySelector("#next").addEventListener("click", turn);

  let running = null;
  document.querySelector("#run").addEventListener("click", () => {
    if (running) {
      clearInterval(running);
      running = null;
    } else {
      running = setInterval(turn, 400);
    }
  });
</script> */}
//*******************************************************************************//