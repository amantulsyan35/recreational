interface UserRecord {
  globalTimestamps: number[];
  perEndpointTimestamps: Map<string, number[]>;
}

class RateLimitter {
  #userRecords = new Map<string, UserRecord>();
  constructor(
    private globalLimitPerMinute: number,
    private perEndpointLimitPerMinute: number,
  ) {}

  pruneOldRecords(timeStamps: number[]) {
    const slidingWindow = Date.now() - 60 * 1000;
    while (timeStamps.length && timeStamps[0] < slidingWindow) {
      timeStamps.shift();
    }
  }

  isRateLimited(userId: string, endpoint: string) {
    const now = Date.now();
    if (!this.#userRecords.has(userId)) {
      this.#userRecords.set(userId, {
        globalTimestamps: [],
        perEndpointTimestamps: new Map(),
      });
    }

    const record = this.#userRecords.get(userId);

    if (record?.globalTimestamps.length) {
      this.pruneOldRecords(record?.globalTimestamps);
    }

    if (
      record?.globalTimestamps.length &&
      record?.globalTimestamps.length >= this.globalLimitPerMinute
    ) {
      return false;
    }

    if (!record?.perEndpointTimestamps.has(endpoint)) {
      record?.perEndpointTimestamps.set(endpoint, []);
    }

    const endpointTimeStamps = record?.perEndpointTimestamps.get(endpoint);

    if (endpointTimeStamps?.length) {
      this.pruneOldRecords(endpointTimeStamps);
    }

    if (
      endpointTimeStamps?.length &&
      endpointTimeStamps.length >= this.perEndpointLimitPerMinute
    ) {
      return false;
    }

    record?.globalTimestamps.push(now);
    endpointTimeStamps?.push(now);
    return true;
  }
}
