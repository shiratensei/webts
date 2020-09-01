// import { User } from '../models/User'
import { Model } from '../models/Model';

// interface ModelForView {
//     on(eventName: string, callback: () => void): void;
// }

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(public parent: Element, public user: T) {
        this.bindModel();
    }

    abstract template(): string;

    regionsMap(): { [key: string]: string } {
        return {};
    }

    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    bindModel(): void {
        this.user.on('change', () => {
            this.render();
        });
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach((element) => {
                //event handler
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    bindRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[key] = element;
            }
        }
    }

    //a must for the child class that wants to do the actual nesting on rendering. optional for other child classes.
    onRender(): void {};

    render(): void {
        this.parent.innerHTML = ' ';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.bindRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}
