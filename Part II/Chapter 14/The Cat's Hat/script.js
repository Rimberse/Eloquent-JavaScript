// Elements by Tag Name - My Solution
const cat = document.querySelector('img');
const hat = document.querySelector('.hat');
let angle = Math.PI / 2;

const animate = (time, lastTime) => {
    if (lastTime != null) {
        angle += (time - lastTime) * 0.001;
    }

    cat.style.top = (Math.sin(angle) * 20) + 'px';
    cat.style.left = (Math.cos(angle) * 200) + 'px';

    hat.style.top = 50 + (Math.sin(angle) * 50) + 'px';
    hat.style.left = 800 + (Math.cos(angle) * -200) + 'px';
    requestAnimationFrame(newTime => animate(newTime, time));
};

requestAnimationFrame(animate);

//****************************** Author's Solution ******************************//
// <!doctype html>

// <meta charset="utf8">

// <base href="https://eloquentjavascript.net/">

// <style>body { min-height: 200px }</style>
// <img src="img/cat.png" id="cat" style="position: absolute">
// <img src="img/hat.png" id="hat" style="position: absolute">

// <script>
//   let cat = document.querySelector("#cat");
//   let hat = document.querySelector("#hat");

//   let angle = 0;
//   let lastTime = null;
//   function animate(time) {
//     if (lastTime != null) angle += (time - lastTime) * 0.001;
//     lastTime = time;
//     cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
//     cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
//     hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + "px";
//     hat.style.left = (Math.cos(angle + Math.PI) * 200 + 230) + "px";

//     requestAnimationFrame(animate);https://eloquentjavascript.net/img/hat.png
//   }
//   requestAnimationFrame(animate);
// </script>
//*******************************************************************************//