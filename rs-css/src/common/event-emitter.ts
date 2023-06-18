interface Events {
    [key: string]: ((data: number) => void)[];
}

export class EventEmitter {
    public events: Events;
    constructor(events?: Events) {
        this.events = events || {};
    }

    public emit(name: string, data: number): void {
        (this.events[name] || []).forEach((fn) => fn(data));
    }

    public subscribe(eventName: string, cb: (data: number) => void) {
        (this.events[eventName] || (this.events[eventName] = [])).push(cb);

        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn) => cb !== eventFn);
        };
    }
}
