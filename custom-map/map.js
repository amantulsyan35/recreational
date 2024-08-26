// pass in an array
// it iterates over the array and returns an array with modified result
const numbers = [1, 2, 3, 4];

// function customMap(fn) {
//   if (Array.isArray(numbers)) {
//     //throw exceptions
//   }
//   const newArray = numbers;

//   for (let i = 0; i < newArray.length; i++) {
//     fn(newArray[i], i);
//   }
// }

function customMap(array, fn) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  const resultArray = [];

  for (let i = 0; i < array.length; i++) {
    resultArray.push(fn(array[i], i));
  }

  return resultArray;
}

const modifiedArray = customMap(numbers, (each, idx) => each * 2);

console.log(modifiedArray);

// customMap((each, idx) => console.log(each, idx));
