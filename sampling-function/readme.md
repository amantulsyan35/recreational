Create a function in JavaScript that accepts a function as input and a count and executes that input function once for a given count of calls. Known as sampling function.


function message(){
  console.log("hello");
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // this will be executed
sample();
sample();
sample();
sample(); // this will be executed
