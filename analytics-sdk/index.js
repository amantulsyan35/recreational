"use strict";
class SDK {
    constructor() {
        // eventDelay: number = 1000;
        this.eventQueue = [];
    }
    eventDelay(event, index) {
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(() => {
                clearInterval(intervalId);
                if ((index + 1) % 5 != 0) {
                    resolve(`Analytics sent ${event}`);
                }
                else {
                    reject(`Failed to send ${event}`);
                }
            }, 1000);
        });
    }
    logEvent(event) {
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
    retry(event) {
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
