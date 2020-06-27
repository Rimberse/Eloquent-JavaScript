// Elements by Tag Name - My Solution
const byTagName = (node, tag) => {
    const childElements = [];

    const dive = node => {
        // for (let el of Array.from(node.childNodes)) {
        //     if (el.nodeType == document.ELEMENT_NODE) {
        //         if ((el.nodeName).toLowerCase() == tag) childElements.push(el);
        //         dive(el);
        //     }
        // }

        node.childNodes.forEach(el => {
            if (el.nodeType == document.ELEMENT_NODE) {
                if ((el.nodeName).toLowerCase() == tag) childElements.push(el);
                dive(el);
            }
        });
    };

    dive(node);
    return childElements;
}

console.log(byTagName(document.body, 'h1').length);
console.log(byTagName(document.body, 'span').length);


//****************************** Author's Solution ******************************//
// < !doctype html >

//     <h1>Heading with a <span>span</span> element.</h1>
//     <p>A paragraph with <span>one</span>, <span>two</span>
//   spans.</p>

//     <script>
//         function byTagName(node, tagName) {
//             let found = [];
//     tagName = tagName.toUpperCase();

//     function explore(node) {
//       for (let i = 0; i < node.childNodes.length; {
//             let child = node.childNodes[i];
//         if (child.nodeType == document.ELEMENT_NODE) {
//           if (child.nodeName == tagName) found.push(child);
//           explore(child);
//         }
//       }
//     }

//     explore(node);
//     return found;
//   }

//   console.log(byTagName(document.body, "h1").length);
//   // → 1
//   console.log(byTagName(document.body, "span").length);
//   // → 3
//   let para = document.querySelector("p");
//   console.log(byTagName(para, "span").length);
//   // → 2
// </script>
//*******************************************************************************//