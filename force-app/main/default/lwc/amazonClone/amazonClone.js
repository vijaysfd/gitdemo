import { LightningElement } from 'lwc';
import Login from '@salesforce/apex/LoginUser.login';
export default class AmazonClone extends LightningElement {

    email;
    password;
    isError=false;
    errorMessage='';

    handleUsername(event){
        this.email=event.target.value;
    }
    handlePasswordChange(event){
        this.password = event.target.value;
    }
    handleLogin()
    {
       console.log("Inside Login"); 
       console.log("Email ", this.email); 
       console.log("Password", this.password); 
       if(this.email != null && this.password != null){
        Login({userName:this.email,password: this.password})
        .then((result)=>{
            console.log('Result is ', result);
            this.isError=false;
        })
        .catch((error)=>{
            console.log('Error is ', error);
            this.isError=true;
            this.errorMessage= error.body.message;
        })
       }
    }
}