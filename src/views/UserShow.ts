import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {
            // "click:button": this.onButtonClick,
            'mouseenter:h1': this.onHeaderHover
        };
    }

    //event implementation
    onHeaderHover(): void {
        console.log('H1 was hovered over');
    }

    template(): string {
        return `
        <div>
            <h1>User Details:</h1>
            <div>User name: ${this.user.get('name')}</div>
            <div>User age: ${this.user.get('age')}</div>
        </div>
        `;
    }
}
