import { LightningElement , wire} from 'lwc';
import getAccounts from'@salesforce/apex/AccountDemo.getAccounts';

export default class GetAccountdaata extends LightningElement {

    @wire (getAccounts) getAccountsdata;
}