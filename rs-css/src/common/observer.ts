class Observer {
    observers: ((data: number) => void)[];
    constructor() {
        this.observers = [];
    }

    subscribe(fn: (data: number) => void) {
        this.observers.push(fn);
    }

    notify(data: number) {
        this.observers.forEach((subscriber) => subscriber(data));
    }
}

export const observer = new Observer();
