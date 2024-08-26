//General approach

const allWords = [
  "speling, spelling",
  "bunch",
  "of",
  "other",
  "stuff",
  "hello",
];

// takes a word
// counts the occurence of a individual word
const count = (words) => {
  const count = {};

  words.reduce((acc, word) => {
    if (acc[word]) {
      acc[word] += 1;
    } else {
      acc[word] = 1;
    }
    return acc;
  }, count);

  return count;
};

// Function that takes the text and divides it into diff words
// for simplicity now I am assuming this is a word
// Example: The user is only allowed to type one word at a time

// a dictionary of the those words segregated
const dictionaryWithWords = count(allWords);

// function that calculates the probability of a given word
const calculateProbability = (word: string) => {
  return (
    dictionaryWithWords[word] /
    Object.values(count).reduce(
      (acc, individualCount) => acc + individualCount,
      0
    )
  );
};

// Finding the most probable word from the list of words
// function that finds the word with max probability from the known list of words
// function that calculates the bayesian probability

const edit1 = (word: string) => {
  // aman
  // I have to generate a list here wit
  // del 1 letter from stat and bottom
  //
  return [word];
};

const knownWords = (possibleWords: string[]) => {
  // check which words exist in the allWords array and return
  // a predefined bunch of operaions which basically gives a list closer to that word
  return possibleWords.filter((eachWord) => allWords.includes(eachWord));
};

// function to return a known list of words
const candidates = (word: string) => {
  return knownWords(edit1(word));
};

// List is from the known list of words which is 1 or 2 edits away
