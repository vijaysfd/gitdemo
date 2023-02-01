import { LightningElement } from 'lwc';

export default class ParentChildEvent extends LightningElement {
    count = 1;
    endValue=0;
    msg="In Parent Comp";
    hanldeCall(){
        if(this.count <= 5){
            this.count = this.count+1;
        }
        else{
            this.count = this.count-1;
        }
        
    }
    handleCallParam(event)
    {
        console.log('in hanldeCallParam');
        this.endValue = event.detail.endValue;
        }
    otherCall(){
        this.count = this.count+1;
    }
}