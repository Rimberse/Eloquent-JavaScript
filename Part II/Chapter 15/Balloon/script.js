// Balloon - My Solution
const balloon = document.querySelector('span');

const growShrink = event => {
    if (event.key == 'ArrowUp') {          // event.keyCode == 38
        if (parseInt(getComputedStyle(balloon).fontSize) > 250) {
            balloon.textContent = '💥';
            const paragraph = document.createElement('p');
            paragraph.textContent = 'BOOM 🤯'
            paragraph.className = 'banner';
            document.querySelector('div').appendChild(paragraph);
            document.body.removeEventListener('keydown', growShrink);
        } else {
            balloon.style.fontSize = parseInt(getComputedStyle(balloon).fontSize) + (parseInt(getComputedStyle(balloon).fontSize) / 100) * 10 + 'px';
            event.preventDefault();
        }
    } else if(event.key == 'ArrowDown') {
        balloon.style.fontSize = parseInt(getComputedStyle(balloon).fontSize) - (parseInt(getComputedStyle(balloon).fontSize) / 100) * 10 + 'px';
        event.preventDefault();
    }
};

document.body.addEventListener('keydown', growShrink);

//****************************** Author's Solution ******************************//
// <!doctype html>

// <p>🎈</p>

// <script>
//   let p = document.querySelector("p");
//   let size;
//   function setSize(newSize) {
//     size = newSize;
//     p.style.fontSize = size + "px";
//   }
//   setSize(20);

//   function handleArrow(event) {
//     if (event.key == "ArrowUp") {
//       if (size > 70) {
//         p.textContent = "💥";
//         document.body.removeEventListener("keydown", handleArrow);
//       } else {
//         setSize(size * 1.1);
//         event.preventDefault();
//       }
//     } else if (event.key == "ArrowDown") {
//       setSize(size * 0.9);
//       event.preventDefault();
//     }
//   }
//   document.body.addEventListener("keydown", handleArrow);
// </script>
//*******************************************************************************//