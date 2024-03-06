import { LightningElement } from 'lwc';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import CONT_OBJ from '@salesforce/schema/Contact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';




export default class ContactCreator extends LightningElement {
    fields = [FIRST_NAME, LAST_NAME, EMAIL];
    recordId = '0035i00000JZ7qkAAD';
    objectApiName = CONT_OBJ;

    handleSuccess(event)
    {
        const evt = new ShowToastEvent({
            title: success,
            message: event.target.id,
            variant: success,
        });
        this.dispatchEvent(evt);

    }
}