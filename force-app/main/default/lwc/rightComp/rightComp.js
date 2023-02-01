import { LightningElement,api } from 'lwc';

export default class RightComp extends LightningElement {
   /* @api testRigthMethod(){
        alert('This is from Right Component'); 
    }*/
    handleClick(){
        const custEvent = new CustomEvent('buttonclick',{
            detail:'Parameter from Child com'
        });
        this.dispatchEvent(custEvent);
    }
}