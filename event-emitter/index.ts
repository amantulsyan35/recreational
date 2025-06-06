type Listener = (...args: any[]) => void;

class EventEmitter {
  events = new Map<string, Listener[]>();

  on(eventName: string, listener: () => void) {
    const list = this.events.get(eventName) || [];
    list.push(listener);
    this.events.set(eventName, list);
    return this;
  }

  off(eventName: string, listener: () => void) {
    const list = this.events.get(eventName);
    if (!list) return this;

    const filtered = list.filter((fn) => fn !== listener);
    if (filtered.length > 0) {
      this.events.set(eventName, filtered);
    } else {
      this.events.delete(eventName);
    }
    return this;
  }

  emit(eventName: string, args: Listener[]) {
    const list = this.events.get(eventName);
    if (!list) return this;

    args.slice().forEach((fn) => {
      fn.apply(this, args);
    });

    for (const fn of list) {
      fn(args);
    }
    return true;
  }

  removeAll(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
    return this;
  }
}
