import { LightningElement, api } from "lwc";


export default class modalPopup extends LightningElement {
  showModal = false;

  @api show() {
    console.log("Show");
    this.showModal = true;
    console.log("After");
  }
  handleDialogClose() {
  
    this.showModal = false;
  }
}