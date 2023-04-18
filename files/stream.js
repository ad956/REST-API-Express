const fs = require("fs");

const rs = fs.createReadStream("./files/files/getStream.txt", {
  encoding: "utf-8",
});
const ws = fs.WriteStream("./files/files/setStream.txt");

/* 

rs.on("data", (dataChunk) => {
   ws.write(dataChunk);
   console.log("data written");
 }); 
 
 */

// better way to do the same
rs.pipe(ws);
