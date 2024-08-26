// defining a data structure for a key value store
// ASSUMPTION: string-to-string-map
const fs = require("fs").promises;

// in-memory data structure
let inMemoryStorage = {};

class DatabaseLogs {
  constructor(fileName) {
    this.fileName = fileName;
  }

  setLogs(logs) {
    fs.writeFile(this.fileName, JSON.stringify(logs), (err, data) => {
      if (err) {
        console.log("Error saving the key value:", err);
      }

      if (data) {
        console.log("Logs have been loaded:", data);
        return data;
      }
    });
  }

  async getLogs() {
    try {
      const data = await fs.readFile(this.fileName, "utf-8");
      const logs = JSON.parse(data);
      return logs;
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }
}

const logImpl = new DatabaseLogs("databaseLog.json");

// On database server restart read from the logs one by one as if reading for the first time
// and store it in in-memory store
async function initialiseDatabase() {
  try {
    const logs = await logImpl.getLogs();
    inMemoryStorage = logs;
    return inMemoryStorage;
  } catch (err) {
    console.error(err);
  }
}

async function writeToDatabase(key, value) {
  // if the key exists update the value with the new value
  // if the key does not exist add the new key and value

  // TODO: Research async of file systems
  let logs = await logImpl.getLogs();

  if (logs[key]) {
    logs[key] = value;
  } else {
    logs[key] = value;
  }

  return logImpl.setLogs(logs);
}

// returns the value associated with the key
function readFromDatabase(key) {
  // check if the key exists or not

  if (!Object.keys(inMemoryStorage).includes(key)) {
    // throw an error
    console.error(`${key} does not exist in the database`);
    return;
  }

  return inMemoryStorage[key];
}

async function startDatabase() {
  try {
    await initialiseDatabase();
  } catch (err) {
    console.error(err);
  }
  writeToDatabase("city", "bangalore");
  const value = readFromDatabase("city");
  return value;
}

startDatabase();

// some open questions

// would blocking the thread be benificial instead of async operations
// async operations in js are given a different call stack in the js event loop and are associated
// with returning promises, so should writing to a file be async or not
