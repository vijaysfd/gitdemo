import { LightningElement,track,wire } from 'lwc';
import getAccountList from "@salesforce/apex/getAccountData.getAccWithCon";
//https://www.salesforcebolt.com/2021/12/tree-grid-in-lightning-web-component.html
//https://developer.salesforce.com/docs/component-library/bundle/lightning-tree-grid/documentation

export default class TreeGrid extends LightningElement {

    accounts;
    error;
    @track expandedRows = [];
  
    @wire(getAccountList)
    wiredAccounts({ error, data }) {
      if (data) {
        let parseData = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < parseData.length; i++) {
          parseData[i]._children = parseData[i]["Contacts"];
          console.log('in Parse Loop');
        }
        console.log('After Parse Loop');
        this.accounts = parseData;
        console.log('After Accounts');
   //    console.log('Account'+ JSON.stringify(data));
      } else if (error) {
        this.error = error;
        this.accounts = undefined;
        console.log('Error');
      }
    }
    constructor() {
      super();
      console.log('Constructor');
      this.columns = [
        {
          type: "text",
          fieldName: "Name",
          label: "Name"
        },
        {
          type: "text",
          fieldName: "Rating",
          label: "Rating"
        },
        {
          type: "text",
          fieldName: "Phone",
          label: "Phone"
        },
        {
          type: "text",
          fieldName: "FirstName",
          label: "First Name"
        },
        {
          type: "text",
          fieldName: "LastName",
          label: "Last Name"
        },
  
        { type: "action", typeAttributes: { rowActions: this.getRowActions } }
      ];
    }
    get expandedRowItems() {
      return this.expandedRows;
    }
    getRowActions(row, doneCallback) {
      const actions = [];
      actions.push({
        label: "Add",
        name: "add"
      });
      actions.push({
        label: "Edit",
        name: "edit"
      });
      actions.push({
        label: "Delete",
        name: "delete"
      });
      doneCallback(actions);
    }


}