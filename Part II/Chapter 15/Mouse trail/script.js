// Mouse Trail - My Solution
const trails = [];
let i = 0;

for (let i = 0; i < 50; i++) {
    let trail = document.createElement('div');
    trail.className = 'trail';
    document.body.appendChild(trail);
    trails.push(trail);
}

window.addEventListener('mousemove', event => {
    let trail = trails[i];  
    trail.style.left = (event.pageX - 5) + 'px';
    trail.style.top = (event.pageY - 5) + 'px';

    i = (i + 1) % trails.length;
});

// let timeout;

// window.addEventListener('mousemove', event => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//         let trail = document.createElement('div');
//         trail.className = 'trail';
//         trail.style.left = (event.pageX - 5) + 'px';
//         trail.style.top = (event.pageY - 5) + 'px';
//         document.body.appendChild(trail);
//     }, 1);
// });


//****************************** Author's Solution ******************************//
// <!doctype html>

// <style>
//   .trail { /* className for the trail elements */
//     position: absolute;
//     height: 6px; width: 6px;
//     border-radius: 3px;
//     background: teal;
//   }
//   body {
//     height: 300px;
//   }
// </style>

// <body>
// <script>
//   let dots = [];
//   for (let i = 0; i < 12; i++) {
//     let node = document.createElement("div");
//     node.className = "trail";
//     document.body.appendChild(node);
//     dots.push(node);
//   }
//   let currentDot = 0;
  
//   window.addEventListener("mousemove", event => {
//     let dot = dots[currentDot];
//     dot.style.left = (event.pageX - 3) + "px";
//     dot.style.top = (event.pageY - 3) + "px";
//     currentDot = (currentDot + 1) % dots.length;
//   });
// </script>
// </body>
//*******************************************************************************//