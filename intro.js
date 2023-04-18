/* 

    NodeJS is a JavaScript runtime built on Chrome's V8 JaveScript engine

    How NodeJS doffers from vanilla JS
        - it runs on backend(server) not on browser
        - the console is the Terminal window
        - global object instead of window object
        - has common core modules eg : OS, URL , Console ,NET ,Util ,Path 
        - commonJS modules instead of ES6 modules {  ref : https://blog.logrocket.com/commonjs-vs-es-modules-node-js/} 
        - missing APIs like fetch()

*/

/*

console.log("Hello NodeJS");
// console.log(global);

const os = require("os");
const path = require("path");

// console.log(os);
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(os.arch());
console.log(os.machine());
console.log("Directory name : " + __dirname);
console.log("File name : " + __filename);

console.log("\n");
console.log(path.dirname(__filename)); // directory name of given file
console.log(path.basename(__filename)); // basename of given file
console.log(path.extname(__filename)); // extension of file
console.log(path.parse(__filename)); // provides an object with details of file

*/

// accessing commonJS module using whole object
const wholeObj = require("./commonJS");
console.log(wholeObj);
// console.log(wholeObj.printMsg("my-msg"));

// accessing commonJS module using destructuring
const { printAdd, printMsg } = require("./commonJS");
printMsg("hey there");
printAdd(200, 22);

//=====================================
