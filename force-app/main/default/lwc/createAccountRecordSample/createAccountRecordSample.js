import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class CreateAccountRecordSample extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD,PHONE_FIELD,WEBSITE_FIELD];
    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            
            title: "Account Has been created",
            message: "Account Created",
            variant : "Success"

        });
       this.dispatchEvent(toastEvent);
    }
}