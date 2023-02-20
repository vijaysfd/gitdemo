import { LightningElement } from "lwc";

export default class containers extends LightningElement {
  handleShowModal() {
    const modal = this.template.querySelector("c-modal-Popup");
    modal.show();
  }
}