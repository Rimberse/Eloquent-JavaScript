// Search Tool - My Solution
/* const { readFileSync, statSync, readdirSync } = require('fs');

const regex = new RegExp(process.argv[2]);

const search = file => {
    let stats = statSync(file);

    if (stats.isDirectory()) {
        for (let fileInDir of readdirSync(file)) {
            search(file + '/' + fileInDir);
        }
    } else if (regex.test(readFileSync(file))) {
        console.log(file);
    }
};

for (let i = 3; i < process.argv.length; i++) {
    search(process.argv[i]);
} */

//****************************** Author's Solution ******************************//
// const { statSync, readdirSync, readFileSync } = require("fs");

// let searchTerm = new RegExp(process.argv[2]);

// for (let arg of process.argv.slice(3)) {
//     search(arg);
// }

// function search(file) {
//     let stats = statSync(file);
//     if (stats.isDirectory()) {
//         for (let f of readdirSync(file)) {
//             search(file + "/" + f);
//         }
//     } else if (searchTerm.test(readFileSync(file, "utf8"))) {
//         console.log(file);
//     }
// }
//*******************************************************************************//


// Directory Creation - My Solution
/* const {mkdir} = require('fs').promises;

methods.MKCOL = async request => {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch(error) {
        if (error.code != 'ENOENT') throw error;
        else {
            await mkdir(path);
            return {status: 204};
        };
    }

    if (stats.isDirectory()) return {status: 204};
    else return {status: 400, body: 'Not a directory'};
}; */

//****************************** Author's Solution ******************************//
// const {mkdir} = require("fs").promises;

// methods.MKCOL = async function(request) {
//   let path = urlPath(request.url);
//   let stats;
//   try {
//     stats = await stat(path);
//   } catch (error) {
//     if (error.code != "ENOENT") throw error;
//     await mkdir(path);
//     return {status: 204};
//   }
//   if (stats.isDirectory()) return {status: 204};
//   else return {status: 400, body: "Not a directory"};
// };
//*******************************************************************************//


// A Public Space on the Web

//****************************** Author's Solution ******************************//
// Get a reference to the DOM nodes we need
let filelist = document.querySelector("#filelist");
let textarea = document.querySelector("#file");

// This loads the initial file list from the server
fetch("/").then(resp => resp.text()).then(files => {
    for (let file of files.split("\n")) {
        let option = document.createElement("option");
        option.textContent = file;
        filelist.appendChild(option);
    }
    // Now that we have a list of files, make sure the textarea contains the currently selected one.
    loadCurrentFile();
});

// Fetch a file from the server and put it in the textarea.
const loadCurrentFile = () => {
    fetch(filelist.value).then(resp => resp.text()).then(file => {
        textarea.value = file;
    });
};

filelist.addEventListener("change", loadCurrentFile);

// Called by the button on the page. Makes a request to save the currently selected file.
const saveFile = () => {
    fetch(filelist.value, {
        method: "PUT",
        body: textarea.value
    });
};
//*******************************************************************************//