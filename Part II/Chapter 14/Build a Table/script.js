// Build a Table - My Solution
class Mountain {

    constructor(name, height, place) {
        this.name = name;
        this.height = height;
        this.place = place;
    }
};

const mountains = [new Mountain('Everest', 8848, 'Nepal-China'), new Mountain('K2', 8611, 'China-Pakistan'), new Mountain('Kangchenjunga', 8586, 'Nepal-China'),
new Mountain('Annapurna', 8091, 'Nepal'), new Mountain('Kilimanjaro', 5895, 'Tanzania'), new Mountain('Elbrus', 5642, 'Russia')];

const generateTable = array => {
    const table = document.createElement('table');
    document.body.appendChild(table);

    const row = document.createElement('tr');
    table.appendChild(row);

    for (let colName in array[0]) {
        let col = document.createElement('th');
        col.appendChild(document.createTextNode(colName));
        row.appendChild(col);
    }

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement('tr');
        table.appendChild(row);

        for (let prop in array[i]) {
            let textNode = document.createTextNode(array[i][prop]);
            let tableData = document.createElement('td');

            if (prop === Object.keys(array[i])[0]) {
                tableData.style.textAlign = 'left';
            } else if (typeof array[i][prop] == 'number') {
                tableData.style.textAlign = 'right';
            }

            tableData.appendChild(textNode);
            row.appendChild(tableData);
        }
    }

    table.id = `#${(array[0].constructor.name).toLowerCase()}s`;
};

generateTable(mountains);


//****************************** Author's Solution ******************************//
// < !doctype html >

//     <meta charset="utf8">

//         <h1>Mountains</h1>

//         <div id="mountains"></div>

//         <script>
//             const MOUNTAINS = [
//     {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
//     {name: "Everest", height: 8848, place: "Nepal"},
//     {name: "Mount Fuji", height: 3776, place: "Japan"},
//     {name: "Vaalserberg", height: 323, place: "Netherlands"},
//     {name: "Denali", height: 6168, place: "United States"},
//     {name: "Popocatepetl", height: 5465, place: "Mexico"},
//     {name: "Mont Blanc", height: 4808, place: "Italy/France"}
//   ];

//   function buildTable(data) {
//                 let table = document.createElement("table");

//     let fields = Object.keys(data[0]);
//     let headRow = document.createElement("tr");
//     fields.forEach(function(field) {
//                 let headCell = document.createElement("th");
//       headCell.appendChild(document.createTextNode(field));
//       headRow.appendChild(headCell);
//     });
//     table.appendChild(headRow);

//     data.forEach(function(object) {
//                 let row = document.createElement("tr");
//       fields.forEach(function(field) {
//                 let cell = document.createElement("td");
//         cell.appendChild(document.createTextNode(object[field]));
//         if (typeof object[field] == "number") {
//                 cell.style.textAlign = "right";
//         }
//         row.appendChild(cell);
//       });
//       table.appendChild(row);
//     });

//     return table;
//   }

//   document.querySelector("#mountains")
//     .appendChild(buildTable(MOUNTAINS));
// </script>
//*******************************************************************************//