import { api, LightningElement, track } from 'lwc';

export default class Mytest extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track parentVal = "From Parent Val";
    
    constructor(){
        super();
        console.log ('Record Id' + this.recordId);  
        console.log ('Object Name' + this.objectApiName);  
    }
    handleClick(){
        this.parentVal = "Value changed through button click";
    }
    /*
    //This is to call @api method of child method
    handleRight(){
        var rightComp = this.template.querySelector('c-right-Comp');
        rightComp.testRigthMethod();
    }*/
    handleChange(event){
        this.parentVal = event.target.value;
    }
    handleRightClick(event){ 
        this.parentVal = "Child calling parent";
        alert("Parent Called "+event.detail );
    }

}