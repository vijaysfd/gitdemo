import { LightningElement, api } from 'lwc';
import getChildCases from "@salesforce/apex/CaseHierarchyController.getChildCases";
import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_DATA_LAZY_LOADING,
} from './sampleData';

export default class CaseHierarchyView extends LightningElement {
    @api recordId;
    gridLoadingState = false;
    currentRecordId;
// child data to be added later
    childrenData = {}; 
    gridColumns = [
        {
            type: 'url',
            fieldName: 'CaseNumberLink',
            label: 'Case Number',
            typeAttributes: {
               label: { fieldName: 'CaseNumber' },
           },
           
        },
        {
            type: 'text',
            fieldName: 'Subject',
            label: 'Subject',
        },
        {
            type: 'text',
            fieldName: 'Origin',
            label: 'Origin',
        },
    ];//EXAMPLES_COLUMNS_DEFINITION_BASIC;

  
    gridData = [];//EXAMPLES_DATA_LAZY_LOADING;

    connectedCallback() {
        this.currentRecordId = this.recordId;
       this.getChildCaseRecords();
      }

    getChildCaseRecords(){
        getChildCases({parentCaseId :  this.currentRecordId})
            .then(result => {               
                console.log('child case records 46: ' + JSON.stringify(result));
                let caseData = result[this.currentRecordId];
                console.log('child case records 48: ' + JSON.stringify(caseData));
                for(let i=0; i< caseData.length; i++){
                    if(caseData[i].hasChildrenContent === true)
                    {
                        caseData[i]._children = [];
                    }
                }
                console.log('this.gridData.length ' + this.gridData.length);
                if(this.gridData.length > 0 ) // if child case selected
                {
                    this.childrenData = result;
                    this.retrieveUpdatedData(this.currentRecordId).then((newData) => {
                        console.log('new data with child ' + JSON.stringify(newData));
                        this.gridData = newData;
                    });
                }
                else
                {
                    this.gridData = caseData;
                }
                
                console.log('child case records caseData: ' + JSON.stringify(caseData));
                console.log('child case records gridData: ' + this.gridData);
            })
            .catch(error => {
        
        });
    }

    handleRowToggle(event) {
        console.log('event.detail 61: ' + JSON.stringify(event.detail));
        // retrieve the unique identifier of the row being expanded
       
let rowName1 = event.detail.name;
console.log('event.detail rowName1: ' + rowName1);
this.currentRecordId = rowName1;
this.getChildCaseRecords();
        // does the component have children content for this row already?
       /* const hasChildrenContent = event.detail.hasChildrenContent;

     
        if (hasChildrenContent === false) {
            this.gridLoadingState = true;

          
            this.retrieveUpdatedData(rowName).then((newData) => {
                this.gridData = newData;
                this.gridLoadingState = false;
            });
        }*/
    }

   

   
    retrieveUpdatedData(rowName) {
        return new Promise((resolve) => {
           
                // add children to data
                const updatedData = this.addChildrenToRow(
                    this.gridData,
                    rowName,
                    this.childrenData[rowName]
                );

                resolve(updatedData);           
        });
    }

    // add the new child rows at the desired location
    addChildrenToRow(data, rowName, children) {
        // step through the array using recursion until we find the correct row to update
        const newData = data.map((row) => {
            // does this row have a properly formatted _children key with content?
            let hasChildrenContent = false;
            if (
                // eslint-disable-next-line no-prototype-builtins
                row.hasOwnProperty('_children') &&
                Array.isArray(row._children) &&
                row._children.length > 0
            ) {
                hasChildrenContent = true;
            }

            // if this is the row that was toggled then add the child content
            if (row.currentCaseId === rowName) {
                row._children = children;
                // otherwise keep searching for the correct row by recursively searching the tree
            } else if (hasChildrenContent) {
                this.addChildrenToRow(row._children, rowName, children);
            }

            return row;
        });

        return newData;
    }

    
}