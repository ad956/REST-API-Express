const fs = require("fs");
const path = require("path");

/*
fs.readFile("./files/file1.txt", "UTF8", (err, data) => {
  if (err) throw err;
  console.log(data); // displays as buffer data => <Buffer 68 65 6c 6c 6f 20 6d 73 67>
  console.log(data.toString()); // use toString() OR specify encoding {UTF8} before (err,data)
});

//  better way to do using path
fs.readFile(path.join(__dirname, "files", "file2.txt"), "UTF8", (err, data) => {
  if (err) throw err;
  console.log(data); // displays as buffer data => <Buffer 68 65 6c 6c 6f 20 6d 73 67>
  console.log(data.toString()); // use toString() OR specify encoding {UTF8} before (err,data)
});

// function or methods from NodeJS are asyncronous so ,, helllo will be printed first before data of file

*/
console.warn("helllo");

/*
let msgToWrite = "THIS MSG WILL BE WRITTEN IN FILE";

fs.writeFile(path.join(__dirname, "files", "file3.txt"), msgToWrite, (err) => {
  // if file is not there than it will create one
  if (err) throw err;

  msgToWrite = "\n\nappended msg here";
  console.log("WrietFile Complete");

  fs.appendFile(
    path.join(__dirname, "files", "file3.txt"),
    msgToWrite,
    (err) => {
      // if file is not there than it will create one
      if (err) throw err;
      console.log("Append Complete");
    }
  );

  //   let newFileName = "newFileName.txt";

  //   fs.rename(
  //     path.join(__dirname, "files/", "oldname.txt"), // error if file is not there
  //     newFileName,
  //     (err) => {
  //       if (err) throw err;
  //       console.log("Rename Complete");
  //     }
  //   );
});

*/

// better way to do file operation without callBack HELL using promisses
const fsp = require("fs").promises;

const fileOperations = async () => {
  let msgToWrite = "THIS MSG WILL BE WRITTEN IN FILE";
  try {
    // read file
    const readData = await fsp.readFile(
      path.join(__dirname, "files", "file2.txt"),
      "UTF8"
    );
    console.log(readData);

    // write file
    await fsp.writeFile(path.join(__dirname, "files", "file1.txt"), msgToWrite);

    msgToWrite = "SPIDER-MAN DAREDEVIL";
    //append file
    await fsp.appendFile(
      path.join(__dirname, "files", "file1.txt"),
      msgToWrite
    );

    // rename file
    // await fsp.rename(path.join(__dirname, "files", "old.txt"), "newname.txt");

    // delete file
    // await fsp.unlink(path.join(__dirname, "files", "toDelete.txt"));
  } catch (err) {
    console.error(err);
  }
};

fileOperations();

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory Created");
  });
}
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory Removed");
  });
}

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT ERROR => " + err);
  process.exit(1);
});
