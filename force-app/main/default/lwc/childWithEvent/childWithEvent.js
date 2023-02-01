import { LightningElement } from 'lwc';

export default class ChildWithEvent extends LightningElement {
    endVal =10;
    handleParent(){
       
        console.log('Child before Called');
       const myEvents = new CustomEvent('callchild',{  detail:{endValue : this.endVal} }  );
      
        this.dispatchEvent(myEvents);
        console.log('Child Called'); 
     }
     handleCheck(){
        console.log('handleCheck');
       // endVal = 5;
        alert('handleCheck');
     }

}