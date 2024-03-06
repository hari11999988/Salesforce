import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OBJECT_API from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCNO_FIELD from '@salesforce/schema/Account.AccountNumber';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import FAX_FIELD from '@salesforce/schema/Account.Fax';

export default class RecordEditForm extends LightningElement {

    objectApiName = OBJECT_API;
    nameField = NAME_FIELD;
    accnoField = ACCNO_FIELD;
    phoneField = PHONE_FIELD;
    faxField = FAX_FIELD;

    successhandle()
    {
        console.log('inside method');
       
            console.log('inside toast method');
            const events = new ShowToastEvent({
                title: 'Account created',
                message: 'sucess',
                variant:'success'

            });
            this.dispatchEvent(events);
        
    }
}