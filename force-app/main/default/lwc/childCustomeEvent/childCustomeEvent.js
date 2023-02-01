import { LightningElement } from 'lwc';

export default class ChildCustomeEvent extends LightningElement {
    
    handleClick(){
        console.log('Before');
        this.dispatchEvent(new CustomEvent('callcountchild'));
        console.log('After');
    }
    
    
}