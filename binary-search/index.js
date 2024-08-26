// find a value in an array

// ASSUMPTION: The array is sorted

// const sortedArray = [1, 2, 3, 4, 5];
const sortedArray = Array.from({ length: 100000000 }, (_, i) => i + 1);

const findValue = (value) => {
  let result = 0;
  for (let i = 0; i <= sortedArray.length; i++) {
    if (sortedArray[i] === value) {
      result += 1;
    }
  }
  return result;
};

console.time("findValue");
const final = findValue(500);
console.timeEnd("findValue");
console.log(final ? "value found without algo" : "value not found");

// Divide and conquer
// divide the problem into smaller chunks: divide the array into pieces and try to narrow down the range
// in which the value can exist

const divideLength = (list) => {
  const length = Math.ceil(list.length / 2);
  return list.splice(length);
};

const divideAndConquer = (value) => {
  // divide the array
  // figure out what is the range in which the value lies
  // const arrayLength = 0;
  let left = 0;
  let result = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArray[mid] === value) {
      return (result += 1);
    } else if (sortedArray[mid] < value) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};

// [1, 2, 3, 4 , 5,  6,  7, 8, 9,]

// value is 2
// left 0
// right 8
// calculates the middle: 5
// value < middle
// search on the left side which is left remains the same and right becomes middle -1
// 0 - 4
// repeat the process

// value is 7
// left 0
// right 8
// calculates the middle: 5
// value > middle
// search on the right side which is right remains the same and left  becomes middle + 1
// 6 - 9
// repeat the process

console.time("divideAndConquer");
const final2 = divideAndConquer(500);
console.timeEnd("divideAndConquer");
console.log(final2 ? "value found with algo" : "value not found");
// console.log(sortedArray);
