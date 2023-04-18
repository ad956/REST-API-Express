// const { v4: uuid } = require("uuid");
//     v4 as uuid

console.log("THIS IS THE INDEX FILE");
// console.log(uuid());

const logEvents = require("./Events Emitter/event");
const EventEmitter = require("events");

/* 
Node.js uses events module to create and handle custom events. The EventEmitter class can be used to create and handle custom events module.
*/
class MyEmitter extends EventEmitter {}

// initalize object
const myEmitter = new MyEmitter();
//(msg, fileName, folder, rqURL, rqMethod)
myEmitter.on("log", (msg, fileName, folder, URi, method, __dirname) => {
  logEvents(msg, fileName, folder, URi, method, __dirname);
});

setTimeout(() => {
  myEmitter.emit(
    "log",
    "my log event emitted",
    "log.txt",
    "logs",
    "",
    "",
    __dirname
  );
}, 2000);

module.exports = { myEmitter };
