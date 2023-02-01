import { LightningElement } from 'lwc';

export default class Hitest1 extends LightningElement {

    handleParent(){
       // console.log('Child before Called');
        this.dispatchEvent(new CustomEvent('callcount'));
       // console.log('Child Called');
    }
}