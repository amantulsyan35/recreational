// // observables impl
// // an object that emits data/information
// // will have a method for the listeners to subscribe to it
// // the listeners can further unsubscribe if they want to

// class Observer {
//   title;
//   listeners = [];
//   count = 0;
//   constructor(title) {
//     this.title = title;
//   }

//   subscribe({ id, name }) {
//     const currentList = this.listeners;
//     const newList = [...currentList, { id, name }];
//     this.listeners = newList;
//     return this.listeners;
//   }

//   emit(id) {
//     const currentListener = this.listeners.find((each) => each.id === id);
//     if (!currentListener) {
//       throw new Error("This listener is not subscribed to the observer");
//     }
//     setInterval(() => {
//       const newCount = this.count + 1;
//       this.count = newCount;
//       console.log(this.count);
//     }, 1000);
//     // emits some data at regular intervals
//     // only to subscribers
//   }
// }

// const storyTellingObserver = new Observer("Story telling");

// storyTellingObserver.subscribe({ id: "djnjn", name: "aman" });

// console.log(storyTellingObserver.emit("something else"));

// Define an Observable class
class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  // Subscribe to the observable
  subscribe(observer) {
    return this._subscribe(observer);
  }
}

const subscribeFn = (observer) => {
  // Emit some values
  observer.next(1);
  observer.next(2);
  observer.next(3);
  // Emit an error
  // observer.error('Something went wrong');
  // Complete the observable
  observer.complete();
  // Cleanup function (optional)
  return () => {
    console.log("Observer unsubscribed");
  };
};

// Example usage
const observable = new Observable(subscribeFn);
// Subscribe to the observable
// what we want to happen as these events trigger
const subscription = observable.subscribe({
  next: (value) => console.log("Received:", value),
  error: (err) => console.error("Error occurred:", err),
  complete: () => console.log("Observable completed"),
});

// // Unsubscribe (cleanup)
subscription.unsubscribe();
