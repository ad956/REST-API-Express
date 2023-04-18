const fs = require("fs");
const fsp = require("fs").promises;
const { format } = require("date-fns");
const path = require("path");
const { v4: uuid } = require("uuid");

const logEvents = async (
  msg,
  fileName,
  folder,
  rqURL,
  rqMethod,
  dir = __dirname
) => {
  const date = `${format(new Date(), "yyyy/mm/dd \t hh:mm:ss")}`;
  const logItem = `${uuid()}\t${date}\t ${msg}\t${rqURL}\t${rqMethod}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(dir, folder))) {
      await fsp.mkdir(path.join(dir, folder));
    }
    await fsp.appendFile(path.join(dir, folder, fileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
