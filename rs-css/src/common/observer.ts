import { UpdateStateParams } from '../app';

class Observer {
    observers: ((params: UpdateStateParams) => void)[];
    constructor() {
        this.observers = [];
    }

    subscribe(fn: (params: UpdateStateParams) => void) {
        this.observers.push(fn);
    }

    notify(params: UpdateStateParams) {
        this.observers.forEach((subscriber) => subscriber(params));
    }
}

export const observer = new Observer();
