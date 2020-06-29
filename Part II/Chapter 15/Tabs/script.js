// Tabs - My Solution
const asTabs = node => {
    for (let i = 0; i < node.childNodes.length; i++) {
        const element = node.childNodes[i];

        if (element.nodeType == Node.ELEMENT_NODE && element.nodeName.toLowerCase() !== 'button') {
            firstChild = element;
            break;
        }
    }
    node.style.display = 'block';

    const tabs = document.body.querySelectorAll('.tab');
    tabs.forEach(button => {
        const tabName = button.getAttribute('data-tabname');
        button.textContent = tabName;
        button.style.display = 'inline-block';
        button.classList.remove('active');
        if (tabName === node.id) button.classList.add('active');
        node.insertBefore(button, firstChild);
    });
};

asTabs(document.body.getElementsByClassName('window')[0]);

document.body.querySelectorAll('.tab').forEach(el => {
    el.addEventListener('click', event => {
        for (let node of document.body.getElementsByClassName('window')) {
            node.style.display = 'none';
        }

        const button = event.target.getAttribute('data-tabname');
        const element = document.body.querySelector(`#${button}`);
        asTabs(element);
    });
});


//****************************** Author's Solution ******************************//
// <!doctype html>

// <tab-panel>
//   <div data-tabname="one">Tab one</div>
//   <div data-tabname="two">Tab two</div>
//   <div data-tabname="three">Tab three</div>
// </tab-panel>
// <script>
//   function asTabs(node) {
//     let tabs = Array.from(node.children).map(node => {
//       let button = document.createElement("button");
//       button.textContent = node.getAttribute("data-tabname");
//       let tab = {node, button};
//       button.addEventListener("click", () => selectTab(tab));
//       return tab;
//     });

//     let tabList = document.createElement("div");
//     for (let {button} of tabs) tabList.appendChild(button);
//     node.insertBefore(tabList, node.firstChild);

//     function selectTab(selectedTab) {
//       for (let tab of tabs) {
//         let selected = tab == selectedTab;
//         tab.node.style.display = selected ? "" : "none";
//         tab.button.style.color = selected ? "red" : "";
//       }
//     }
//     selectTab(tabs[0]);
//   }

//   asTabs(document.querySelector("tab-panel"));
// </script>
//*******************************************************************************//