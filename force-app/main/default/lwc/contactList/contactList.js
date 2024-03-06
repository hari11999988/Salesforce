import { LightningElement ,wire} from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
const columns = [
    { label: 'FirstName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' },
   
];

export default class BasicDatatable extends LightningElement {
    data = [];
    columns = columns;
    error;

    @wire(getContacts)
    contacts;
    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }
    // theValues({error , data}) {
    //     if(data)
    //     {
    //         let temp = [];
    //             for (const iterator of data) {
    //                 temp.push({key :iterator , value : iterator});
    //             }
    //         this.data = temp;
    //         console.log('temp==>',temp);
    //     }
    //     else if(error)
    //     {
    //         this.error = error;

    //     }
        
    //}
    
}