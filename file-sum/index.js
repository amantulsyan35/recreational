const fs = require("fs");

// how to read a file from
// it blocks the js execution thread so all the tasks are dependent on this finishing

const fileContent = fs.readFileSync("./file.txt", "utf-8");

// string manupulation
// splitting on the basis on one line
const lines = fileContent.split("\n");

// looping elements and modifying it
// converting each line into a number
// map returns an array
// since it is a 0 based index hence idx + 1
const linesAsNumbers = lines.map((eachLine, idx) => idx + 1);

// reduce
// which basically is equivalent to

// let sum = 0;
// const res2 = linesAsNumbers.forEach((each) => {
//   sum += each;
// });

// again looping elements and modifying to get a desired outcome
const result = linesAsNumbers.reduce((acc, lineNumber) => {
  return (acc += lineNumber);
}, 0);

// 1+ 2 + 3 = 6

console.log(result);
