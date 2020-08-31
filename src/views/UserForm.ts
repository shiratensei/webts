import { User } from '../models/User'

export class UserForm {
    constructor(public parent: Element, public user: User) {
        this.bindModel();
    }

    bindModel(): void {
        this.user.on( 'change', () => {
            this.render();
        } );
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            // "click:button": this.onButtonClick,
            "mouseenter:h1": this.onHeaderHover,
            "click:.set-age": this.onSetAgeClick
        };
    }

    // //event implementation
    // onButtonClick(): void {
    //     console.log('Button clicked');
    // }

    //event implementation
    onHeaderHover(): void {
        console.log('H1 was hovered over');
    }

    //event implementation
    onSetAgeClick = (): void => {
        this.user.setRandomAge();
        console.log(this.user.get("age"));
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.user.get('name')}</div>
                <div>User age: ${this.user.get('age')}</div>
                <input />
                <button>Click Me</button>
                <br/>
                <button class="set-age">Set Random Age</button>
            </div>
        `;
    }

    //helper method
    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                //event handler
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    render(): void {
        this.parent.innerHTML = "";

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}