import { LightningElement,api,wire } from 'lwc';
import  getContact from '@salesforce/apex/GetContactForLwc.getContact';

const columns = [
    {label:'Name',fieldName:'Name'},
]

export default class AccountLwcComponentChild extends LightningElement {

    idData;
    value =[];
    data = [];
    columns = columns;

   @api parentHandler(data)
    {
        console.log(data);
        this.idData=data;
        getContact({AccountId : this.idData}).then((res) => {
            this.data = res;
        }).catch((er) => {
            console.log('ee' , er);
        })
    }


    // @wire(getContact, { ccountId : this.idData })
    // data;
}