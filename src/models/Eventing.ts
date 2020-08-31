type Callback = () => void;

export class Eventing {
    events: { [key: string]: Callback[] } = {};

    on = (eventName: string, callback: Callback): void => {
        // this.events[eventName] // Callback[] or undefined

        const handler = this.events[eventName] || []; //if this.events[eventName] is undefined, handler is an empty array instead
        handler.push(callback);
        this.events[eventName] = handler;
    }

    trigger = (eventName: string): void => {
        const handler = this.events[eventName];

        if (!handler || handler.length === 0) {
            return;
        }

        handler.forEach((callback) => {
            callback();
        });
    }
}
