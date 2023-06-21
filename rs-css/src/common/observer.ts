class Observer {
    observers: ((levelNum: number, isCompleted?: boolean) => void)[];
    constructor() {
        this.observers = [];
    }

    subscribe(fn: (levelNum: number, isCompleted?: boolean) => void) {
        this.observers.push(fn);
    }

    notify(levelNum: number, isCompleted?: boolean) {
        this.observers.forEach((subscriber) => subscriber(levelNum, isCompleted));
    }
}

export const observer = new Observer();
