// Shapes - My Solution
/* // 1
let shape = document.querySelector('canvas').getContext('2d');
shape.strokeStyle = 'grey';
shape.beginPath();
shape.moveTo(27, 25);
shape.lineTo(73, 25);
shape.lineTo(90, 75);
shape.lineTo(10, 75);
shape.closePath();
shape.stroke();

// 2
shape.beginPath();
shape.moveTo(160, 10);
shape.lineTo(200, 50);
shape.lineTo(160, 90);
shape.lineTo(120, 50);
shape.closePath();
shape.fill();

// 3
// shape.strokeStyle = 'black';
shape.beginPath();
for (let i = 8; i <= 92; i += 7) {
    if (i % 2) {
        shape.lineTo(310, i);
    } else {
        shape.lineTo(230, i);
    }
}
shape.stroke();

// 4
shape.beginPath();
shape.moveTo(390, 60);
for (let i = 0; i < 100; i++) {
    let angle = i * Math.PI / 10;
    let dist = 50 * i / 100;
    shape.lineTo(Math.cos(angle) * dist + 390, Math.sin(angle) * dist + 60);
}
shape.stroke();

// 5
shape.beginPath();
shape.moveTo(570, 60);
for (let i = 1; i <= 8; i++) {
    let angle = i * Math.PI / 4;
    shape.quadraticCurveTo(520, 60, Math.cos(angle) * 50 + 520, Math.sin(angle) * 50 + 60)
}
shape.fillStyle = 'gold';
shape.fill(); */

//****************************** Author's Solution ******************************//
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
// <script src="code/levels.js"></script>
// <script src="code/chapter/17_canvas.js"></script>

// <canvas width="600" height="200"></canvas>
// <script>
//   let cx = document.querySelector("canvas").getContext("2d");

//   function trapezoid(x, y) {
//     cx.beginPath();
//     cx.moveTo(x, y);
//     cx.lineTo(x + 50, y);
//     cx.lineTo(x + 70, y + 50);
//     cx.lineTo(x - 20, y + 50);
//     cx.closePath();
//     cx.stroke();
//   }
//   trapezoid(30, 30);

//   function diamond(x, y) {
//     cx.translate(x + 30, y + 30);
//     cx.rotate(Math.PI / 4);
//     cx.fillStyle = "red";
//     cx.fillRect(-30, -30, 60, 60);
//     cx.resetTransform();
//   }
//   diamond(140, 30);

//   function zigzag(x, y) {
//     cx.beginPath();
//     cx.moveTo(x, y);
//     for (let i = 0; i < 8; i++) {
//       cx.lineTo(x + 80, y + i * 8 + 4);
//       cx.lineTo(x, y + i * 8 + 8);
//     }
//     cx.stroke();
//   }
//   zigzag(240, 20);

//   function spiral(x, y) {
//     let radius = 50, xCenter = x + radius, yCenter = y + radius;
//     cx.beginPath();
//     cx.moveTo(xCenter, yCenter);
//     for (let i = 0; i < 300; i++) {
//       let angle = i * Math.PI / 30;
//       let dist = radius * i / 300;
//       cx.lineTo(xCenter + Math.cos(angle) * dist,
//                 yCenter + Math.sin(angle) * dist);
//     }
//     cx.stroke();
//   }
//   spiral(340, 20);

//   function star(x, y) {
//     let radius = 50, xCenter = x + radius, yCenter = y + radius;
//     cx.beginPath();
//     cx.moveTo(xCenter + radius, yCenter);
//     for (let i = 1; i <= 8; i++) {
//       let angle = i * Math.PI / 4;
//       cx.quadraticCurveTo(xCenter, yCenter,
//                           xCenter + Math.cos(angle) * radius,
//                           yCenter + Math.sin(angle) * radius);
//     }
//     cx.fillStyle = "gold";
//     cx.fill();
//   }
//   star(440, 20);
// </script>
//*******************************************************************************//


// Pie Chart - My Solution
/* const results = [
    {name: 'Satisfied', count: 1043, color: 'lightblue'},
    {name: 'Neutral', count: 563, color: 'lightgreen'},
    {name: 'Unsatisfied', count: 510, color: 'pink'},
    {name: 'No comment', count: 175, color: 'silver'}
];

let cx = document.querySelector('canvas').getContext('2d');
cx.font = '16px Georgia';
cx.fillStyle = 'fuchsia';
// cx.fillText('I can draw text, too!', 10, 50);
let total = results.reduce((sum, {count}) => sum + count, 0);
// Start at the top
let currentAngle = -0.5 * Math.PI;
const centerX = 250, centerY = 150;

for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    // center = 100, 100, radius = 100
    // from current angle, clockwise by slice's angle
    cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);

    let middleAngle = currentAngle + 0.5 * sliceAngle;          // half of the sliced part (0.5 * sliceAngle)
    let textX = Math.cos(middleAngle) * 120 + centerX;
    let textY = Math.sin(middleAngle) * 120 + centerY;
    cx.textBaseline = 'middle';
    cx.textAlign = Math.cos(middleAngle) > 0 ? 'left' : 'right';
    cx.fillText(result.name, textX, textY);
    
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
} */

//****************************** Author's Solution ******************************//
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
// <script src="code/levels.js"></script>
// <script src="code/chapter/17_canvas.js"></script>

// <canvas width="600" height="300"></canvas>
// <script>
//   let cx = document.querySelector("canvas").getContext("2d");
//   let total = results.reduce(function(sum, choice) {
//     return sum + choice.count;
//   }, 0);

//   let currentAngle = -0.5 * Math.PI;
//   let centerX = 300, centerY = 150;

//   results.forEach(function(result) {
//     let sliceAngle = (result.count / total) * 2 * Math.PI;
//     cx.beginPath();
//     cx.arc(centerX, centerY, 100,
//            currentAngle, currentAngle + sliceAngle);

//     let middleAngle = currentAngle + 0.5 * sliceAngle;
//     let textX = Math.cos(middleAngle) * 120 + centerX;
//     let textY = Math.sin(middleAngle) * 120 + centerY;
//     cx.textBaseLine = "middle";
//     if (Math.cos(middleAngle) > 0) {
//       cx.textAlign = "left";
//     } else {
//       cx.textAlign = "right";
//     }
//     cx.font = "15px sans-serif";
//     cx.fillStyle = "black";
//     cx.fillText(result.name, textX, textY);

//     currentAngle += sliceAngle;
//     cx.lineTo(centerX, centerY);
//     cx.fillStyle = result.color;
//     cx.fill();
//   });
// </script>
//*******************************************************************************//


// A Bouncing Ball - My Solution
let cx = document.querySelector('canvas').getContext('2d');

let lastTime = null;
const frame = time => {
    if (lastTime != null) {
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

const width = 500, height = 500
let rectX = 262, rectY = 134;
let x = 347, y = 409;
let speedX = 120, speedY = 80;
const radius = 25;

const updateAnimation = step => {
    cx.clearRect(rectX - 25, rectY - 25, width + 50, height + 50);
    cx.strokeStyle = "green";
    cx.lineWidth = 3;
    cx.strokeRect(rectX, rectY, width, height);

    x += step * speedX;
    y += step * speedY;
    if (x < rectX + radius || x > rectX + width - radius) speedX = -speedX;
    if (y < rectY + radius || y > rectY + height - radius) speedY = -speedY;
    cx.fillStyle = "black";
    cx.beginPath();
    cx.arc(x, y, radius, 0, 7);
    cx.fill();
}

//****************************** Author's Solution ******************************//
// let cx = document.querySelector("canvas").getContext("2d");

// let lastTime = null;
// function frame(time) {
//     if (lastTime != null) {
//         updateAnimation(Math.min(100, time - lastTime) / 1000);
//     }
//     lastTime = time;
//     requestAnimationFrame(frame);
// }
// requestAnimationFrame(frame);

// let x = 100, y = 300;
// let radius = 10;
// let speedX = 100, speedY = 60;

// function updateAnimation(step) {
//     cx.clearRect(0, 0, 400, 400);
//     cx.strokeStyle = "blue";
//     cx.lineWidth = 4;
//     cx.strokeRect(25, 25, 350, 350);

//     x += step * speedX;
//     y += step * speedY;
//     if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
//     if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
//     cx.fillStyle = "red";
//     cx.beginPath();
//     cx.arc(x, y, radius, 0, 7);
//     cx.fill();
// }
//*******************************************************************************//