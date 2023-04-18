const printMsg = (msg) => {
  console.log("your msg : " + msg);
};
const printAdd = (n1, n2) => {
  console.log("your add : " + (n1 + n2));
};

module.exports = { printMsg, printAdd };

/* 
// below one also works fine ... with require()

exports.printMsg = (msg) => {
  console.log("your msg : " + msg);
};
exports.printAdd = (n1, n2) => {
  console.log("your add : " + (n1 + n2));
};


*/
