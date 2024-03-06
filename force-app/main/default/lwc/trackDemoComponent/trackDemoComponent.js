import { LightningElement,track } from 'lwc';

export default class TrackDemoComponent extends LightningElement {

    @track firstname = "";
    @track lastname = "";

    changeHandle(event)
    {
       
        if(event.target.name === 'Firstname')
        {
            this.firstname = event.target.value;
        }

        
        else if(event.target.name === 'lastname')
        {
            this.lastname = event.target.value;
        }

    }
}