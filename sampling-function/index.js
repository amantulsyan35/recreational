let counter = 0;
function message() {
  console.log("hello");
}

function sampler(fn, count) {
  let counter = 0;

  return function innerFunction(...args) {
    counter += 1;

    if (counter === count) {
      fn.apply(this, args);
      counter = 0;
    }
  };
}

const sample = sampler(message, 4);

sample();
sample();
sample();
