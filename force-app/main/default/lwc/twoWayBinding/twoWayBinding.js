import { LightningElement } from 'lwc';

export default class TwoWayBinding extends LightningElement {
    greeting = 'Hello user have a great time';
    handleChange(event){
        this.greeting = event.target.value;
    }
}