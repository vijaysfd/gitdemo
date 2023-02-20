import { LightningElement, wire,track } from 'lwc';
import searchcontacts  from  "@salesforce/apex/ContactCotnroller.searchcontacts";
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
//https://techdicer.com/inline-editing-in-lightning-datatable-in-lwc-salesforce/
const COLS = [
    { label: 'FirstName', fieldName: 'FirstName', type: 'text' },
    { label: 'LastName', fieldName: 'LastName', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable:true},
    { label: 'Email', fieldName: 'Email', type: 'Email', editable:true }
  ];
export default class RefreshContact extends LightningElement {

    Columns = COLS;
    saveDraftValues = [];
    @track contacts;

@wire(searchcontacts) 
contactData(result) {
    this.contacts = result;
    if (result.error) {
        this.contacts = undefined;
    }
};

// This is the Save event
handleSave(event) {
    this.saveDraftValues = event.detail.draftValues;
    const recordInputs = this.saveDraftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });

    // Updateing the records using the UiRecordAPi
    console.log('Before');
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    console.log('After');
    Promise.all(promises).then(res => {
        this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
        this.saveDraftValues = [];
        return this.refresh();
    }).catch(error => {
        this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
    }).finally(() => {
        this.saveDraftValues = [];
    });
}

ShowToast(title, message, variant, mode){
    const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
}

// This function is used to refresh the table once data updated
async refresh() {
    await refreshApex(this.contacts);
}



}