// defining a data structure for a key value store
// ASSUMPTION: string-to-string-map
const databaseStorage = {};
// file somewhere
const databaseLogs = {};

class DatabaseLogs {
  constructor(typeOfOperation) {
    this.typeOfOperation = typeOfOperation;
  }

  setLogs(output) {
    const timestamp = new Date();
    // some indentifier which shuld be unique like timestamp
    databaseLogs[timestamp] = { type: this.typeOfOperation, output };
  }

  getLogs(timestamp) {
    // filter on the basis of operation
    return Object.values(databaseLogs).filter(
      (eachLog) => eachLog.type === this.typeOfOperation
    );
  }
}

const readOperationLog = new DatabaseLogs("READ");
const writeOperationLog = new DatabaseLogs("WRITE");

// Now like a typical functional database, this database will also have two functions one to set value and the other to get values
// Additionally we need to maintain a log of these operations

// Here is what the structure of log should look like

// 1. The log should tell which operation was perfromed(write/read)
// 2. On the basis of operation performed we should be able to retreive the output of that operation
// that operation

// returns the database storage
function writeToDatabase(key, value) {
  // ideally this should just take the name of the key and the value and write to it
  // ASSUMPTION If the key exists it will not update the value for now it will just throw an error

  if (Object.keys(databaseStorage).includes(key)) {
    // throw an error
    console.error("Duplicate key error");
    return;
  }

  databaseStorage[key] = value;
  // append to the log here just in case
  writeOperationLog.setLogs(databaseStorage);
  return databaseStorage;
}

// returns the value associated with the key
function readFromDatabase(key) {
  // check if the key exists or not
  if (!Object.keys(databaseStorage).includes(key)) {
    // throw an error
    console.error(`${key} does not exist in the database`);
    return;
  }

  // append to the log here just in case
  readOperationLog.setLogs(databaseStorage[key]);

  return databaseStorage[key];
}

function getLogs(type) {
  const timestamp = new Date();
  if (type === "WRITE") {
    return writeOperationLog.getLogs(timestamp);
  }
  if (type === "READ") {
    return readOperationLog.getLogs(timestamp);
  }
}
