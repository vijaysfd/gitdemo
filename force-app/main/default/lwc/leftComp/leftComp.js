import { api, LightningElement } from 'lwc';

export default class LeftComp extends LightningElement {
    @api chldVar = "In Child";
}