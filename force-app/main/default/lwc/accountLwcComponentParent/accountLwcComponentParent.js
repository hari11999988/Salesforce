import { LightningElement,wire } from 'lwc';
import getAccount from '@salesforce/apex/GetAccountForLwc.getAccount';

const columns = [
    
    {label:'Name',fieldName:'Name'},
]

export default class AccountLwcComponentParent extends LightningElement {

    value ='';
    optionsArray=[];

    @wire(getAccount) 
       account;  

    connectedCallback() {
        getAccount()
        .then(response=> {
            let arr = [];
            for(var i=0; i<response.length; i++){
                arr.push({ label : response [i].Name , value:response[i].Id })
            }
            this.optionsArray = arr;
        })
    }

    get options() {
        return this.optionsArray;
    }

    
       

     handleChanged(event)
     {
        this.value = event.detail.value;
        console.log(event.detail.value)
        this.template.querySelector('c-account-lwc-component-child').parentHandler(this.value);
     }

}