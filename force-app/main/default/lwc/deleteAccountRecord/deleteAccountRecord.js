import { LightningElement ,wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { deleteRecord} from 'lightning/uiRecordApi';
import   getAccountList from '@salesforce/apex/getAccountData.getAccountList';

export default class DeleteAccountRecord extends LightningElement {
accounts;
wiredAccountResult;
error;

@wire(getAccountList)
wiredAccounts(result){
    this.wiredAccountResult = result;
    if(result.data){
        this.accounts = result.data;
        this.error = undefined;
        console.log('Account' + JSON.stringify(this.accounts));
    } else if(result.error){
        this.account = undefined;
        this.error = error;
    }

    }

    deleteAccount(event)
    {

        const recordId = event.target.dataset.recordid;
        console.log('Record Id' + recordId );
        deleteRecord(recordId)
        .then(()=>{
            this.dispatchEvent(
                
                new ShowToastEvent({
                    title : 'Account Records',
                    message : 'Account Deleted',
                    variant : 'Success'
                })
            );
            console.log('Before Refresh');
            return refreshApex(this.wiredAccountResult);
            console.log('After Refresh');
        })
        .catch((error)=>{
            console.log('Catch Started'+  JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error',
                    message : 'Error deleting record' + JSON.stringify(error) ,
                    variant : 'Error'
                })
            );
            console.log('Catch End');
        })
    }

}