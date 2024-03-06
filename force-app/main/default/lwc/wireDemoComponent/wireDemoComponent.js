import { LightningElement,track,wire } from 'lwc';
import getAccountRecord from '@salesforce/apex/WireDemo.getAccountRecord'

const columns = [
    {label : 'Name' , fieldName : "Name"},
    { label : 'Account id' , fieldName : "id"},
]


export default class WireDemoComponent extends LightningElement {

    @track columns = columns;
    @track data = [];

    @wire(getAccountRecord)

    wireAccount({data,error})
    {
        if(data)
        {
            this.data = data;
        }
        else if(error)
        {
            console.log('error occur');
        }

    }

}