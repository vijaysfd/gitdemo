import { LightningElement, track, wire,api} from 'lwc';
import   getAccountList from '@salesforce/apex/getAccountData.getAccountList';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';

export default class AccountList extends NavigationMixin( LightningElement) {
  @track   Accounts;
  @api recordId;
  @track title;
  @track error;
  //Code added from external source  https://inevitableyogendra.blogspot.com/p/how-to-refesh-lightning-datatable-after.html
   //  @api actID;
   @track isLoading = false;
   @track subscription = {};
   @track  CHANNEL_NAME = '/event/Refresh_Page__e';

  connectedCallback() {
    alert('In Connected');
    console.error('Start of Call back');
    this.isLoading = true;
    this.getAccountList();
    this.title = 'Account Refresh';
    subscribe(this.CHANNEL_NAME, -1, this.refreshList).then(response => {
        this.subscription = response;
    });
    onError(error => {
        console.error('Server Error--->'+error);
    });
    console.error('End of Call back');
}

refreshList = ()=> {
    console.error('Start of Refresh');
    this.isLoading = true;
    this.getAccountList();
    console.error('End of Refresh');
}

getAccountList() {
  //  alert('Start of Load');
    console.log('Start of Load');
    getAccountList()
        .then(result => {
            this.Accounts = result;
            this.error = undefined;
            this.isLoading = false;
            console.log('in result '+JSON.stringify(this.Accounts));
        })
        .catch(error => {
            this.error = error;
            this.Accounts = undefined;
            this.isLoading = false;
            console.log('in error');
        });
  //      alert('End of Load');
    console.log('End of Load');
}

disconnectedCallback() {
    unsubscribe(this.subscription, () => {
        console.log('Unsubscribed Channel');
    });
}

//End of external source
/*
//My code
  @wire(getAccountList) 
    getAccounts({data,error}){
        if(data){
            this.Accounts = data;
            this.error = undefined;

        }else{
            this.error = error;
            this.data=undefined;
      }
    }
    //End of my code
*/
    handleClick(event){
        let actID = event.target.value;
     //   alert('Button clicked ' + actID);
   //  console.log('acctd ID '+ event.target.value);
      /* alert('Before ');
       alert('Hi '+recordId);
         */
       this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: actID,
            objectApiName: 'Account',
            actionName: 'edit'
        },
        
    });
 //   alert('After');
    }
}