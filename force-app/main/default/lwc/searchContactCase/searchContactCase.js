import { LightningElement } from 'lwc';
import getAccountData from '@salesforce/apex/SearchContact.getAccountData';
import getContactData from '@salesforce/apex/SearchContact.getContactData';

const columns = [
    { label: 'Contact Name', fieldName: 'Name' },
    { label: 'Contact Phone', fieldName: 'Id'},
    { label: 'Contact Email', fieldName: 'Email' },
];

export default class SearchContactCase extends LightningElement {
    value;
    result;
    columns = columns;

    searchHandle(event)
    {

        this.value = event.target.value;
    }

    

    handleClick()
    {
       console.log('this.data=>',this.value)
       console.log('insite buttom');
        getAccountData({textkey : this.value})
        .then( data => {
            this.result = data;
            console.log('data=>',data)

        })
        .catch(error => {
            console.log('error',error)
        })
    }

    connectedCallback()
    {
        getContactData()
        .then(data => {
            this.result = data;
            console.log('data=>',data)
        })
        .catch(error => {
            console.log('error',error);
        })

    }
}