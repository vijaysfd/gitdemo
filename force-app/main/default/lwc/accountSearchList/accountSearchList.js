import { LightningElement, track, wire,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccountListSearch from '@salesforce/apex/getAccountData.getAccountListSearch';
import { refreshApex } from '@salesforce/apex';

export default class AccountSearchList extends NavigationMixin( LightningElement) {
    @track  Accounts;
    @api recordId; 
    @track searchName ='';
    @track error
    @track wiredAccountList = [];
    connectedCallback() {
        console.log('Before');
        refreshApex(this.wiredAccountList);
        console.log('After');
    }
    //Event to capture search Name
    handleChangeAccName(event){
        this.searchName  = event.target.value;
    }
  //My code
    @wire(getAccountListSearch,{nameSearch :'$searchName' }) 
      getAccounts({data,error}){

          if(data){
            this.wiredAccountList = data;
              this.Accounts = data;
              this.error = undefined;
  
          }else{
              this.error = error;
              this.data=undefined;
        }
      }
      //End of my code
  
      handleClick(event){
          let actID = event.target.value;
       //  alert('Button clicked ' + actID);
     
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