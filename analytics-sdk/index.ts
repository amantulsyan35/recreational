class SDK {
  eventQueue: string[] = [];

  eventDelay(event: string, index: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        clearInterval(intervalId);

        if ((index + 1) % 5 != 0) {
          resolve(`Analytics sent ${event}`);
        } else {
          reject(`Failed to send ${event}`);
        }
      }, 1000);
    });
  }

  logEvent(event: string) {
    this.eventQueue.push(event);
  }

  send() {
    this.eventQueue.forEach((event, i) => {
      this.eventDelay(event, i)
        .then((msg) => {
          console.log(msg);
          this.eventDelay(event, i);
        })
        .catch((msg) => {
          console.log(msg);
          this.retry(event);
        });
    });
  }

  retry(event: string) {
    console.log(`Retrying sending ${event}`);
  }
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
