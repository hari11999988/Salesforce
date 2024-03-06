import { LightningElement,api } from 'lwc';
import OBJECT_APINAME from '@salesforce/schema/Account';
import OBJECT_NAME from '@salesforce/schema/Account.Name'

export default class RecordViewForm extends LightningElement {

    objectApiName = OBJECT_APINAME;
    fieldNAme = OBJECT_NAME;
    @api recordId ='0015i00000OszMYAAZ';
}