import { LightningElement, wire, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import getLatestAccounts from '@salesforce/apex/getAccountData.getAccountList';
const COLS = [
  { label: 'Name', fieldName: 'Name', type: 'text' },
  { label: 'Phone', fieldName: 'Phone', type: 'text' },
  { label: 'Website', fieldName: 'Website', type: 'text' }
];

export default class LwcRefreshApex extends LightningElement {
    cols = COLS;
    @track selectedRecord;
    @track accountList = [];
    @track error;
    @track wiredAccountList = [];
  
    @wire(getLatestAccounts) accList(result) {
      this.wiredAccountList = result;
  
      if (result.data) {
        this.accountList = result.data;
        this.error = undefined;
      } else if (result.error) {
        this.error = result.error;
        this.accountList = [];
      }
    }
  
    handelSelection(event) {
     //   console.log("In Handle Selection"+event.detail.selectedRows.length);
     //   alert("In Handle Selection "+event.detail.selectedRows.length);
      if (event.detail.selectedRows.length > 0) {
        this.selectedRecord = event.detail.selectedRows[0].Id;
     //   alert("In Handle Selection "+this.selectedRecord);
      }
    //  console.log("after Handle Selection");
     // alert("after Handle Selection");
    }
    deleteRecord() {
        console.log("Indelete" + this.selectedRecord);
      deleteRecord(this.selectedRecord)
        .then(() => {
            console.log("Before Refresh" + this.selectedRecord); 
          refreshApex(this.wiredAccountList);
          console.log("Refresh called");
        })
        .catch(error => {
            console.log("Error");
        })
        console.log("Afterdelete");
    }
}