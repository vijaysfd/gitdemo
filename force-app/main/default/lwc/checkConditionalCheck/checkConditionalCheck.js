import { LightningElement } from 'lwc';

export default class CheckConditionalCheck extends LightningElement {
    myChecked = false;
   
    phone="";
    fullName="";
    email="";

    handleChange(event){
        this.myChecked = event.target.checked;
    }
    handleInputChange(event){
        const fieldVal = event.target.name;
        
        if(fieldVal == 'fullName'){
            this.fullName = event.target.value;
         //   this.fullName = event.target.value.toUpperCase(); //convert string to uppercase directly
        }
        else   if(fieldVal == 'email'){
            this.email = event.target.value;
        }
        else   if(fieldVal == 'phone'){
            this.phone = event.target.value;
        }
       
    } 
    get upperCase(){
        return '${this.fullName}'.toUpperCase();
     }
}