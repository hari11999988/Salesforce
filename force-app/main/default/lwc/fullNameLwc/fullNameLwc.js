import { LightningElement, track } from 'lwc';

export default class FullNameLwc extends LightningElement {

    @track firstname;
    @track lastname;

    firstNameChange(event){
        this.firstname = event.detail.value
    }
    lastNameChange(event){
        this.lastname = event.detail.value
    }

    fullname(event)
    {
        console.log("inside fullname")
        window.alert(this.firstname +" "+this.lastname);
    }
}