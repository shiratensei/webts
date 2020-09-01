import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
    
    eventsMap(): { [key: string]: () => void } { 
        return {
            // "click:button": this.onButtonClick,
            "mouseenter:h1": this.onHeaderHover,
            "click:.set-age": this.onSetAgeClick,
            "click:.set-name": this.onSetNameClick,
            "click:.save-model": this.onSaveClick
        };
    }

    //event implementation
    onHeaderHover(): void {
        console.log('H1 was hovered over');
    }

    //event implementation
    onSetAgeClick = (): void => {
        this.user.setRandomAge();
        console.log(this.user.get("age"));
    }

    //event implementation
    onSetNameClick = (): void => {
        const input = this.parent.querySelector("input");

        if (input) {  //type guard technique
            const name = input.value;
            this.user.set({name: name});  //this.user.set({ name }) //es2015 refactor
        }
    }

    //event implementation
    onSaveClick = (): void => {
        this.user.save();
    }

    template(): string {
        return `
            <div>
                <input placeholder="${this.user.get('name')}"/>
                <button class="set-name">Change Name</button>
                <br/>
                <button class="set-age">Set Random Age</button>
                <br/>
                <button class="save-model">Save User</button>
            </div>
        `;
    }

    //helper method
    
}