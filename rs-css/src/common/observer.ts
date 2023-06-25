import { LevelState } from '../app';

class Observer {
    observers: ((params: Partial<LevelState>) => void)[];
    constructor() {
        this.observers = [];
    }

    subscribe(fn: (params: Partial<LevelState>) => void) {
        this.observers.push(fn);
    }

    notify(params: Partial<LevelState>) {
        this.observers.forEach((subscriber) => subscriber(params));
    }
}

export const observer = new Observer();
