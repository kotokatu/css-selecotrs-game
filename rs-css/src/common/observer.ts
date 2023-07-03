import { UpdateStateParams } from '../app';
type SubscriberFn = (params: UpdateStateParams) => void;

class Observer {
    private observers: SubscriberFn[];
    constructor() {
        this.observers = [];
    }

    public subscribe(fn: SubscriberFn): void {
        this.observers.push(fn);
    }

    public notify(params: UpdateStateParams): void {
        this.observers.forEach((subscriber: SubscriberFn) => subscriber(params));
    }
}

export const observer: Observer = new Observer();
