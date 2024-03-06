import { LightningElement,track } from 'lwc';

export default class ConditionalStatement extends LightningElement {

    @track labelHandle = 'Show';
    @track show = false;

    data= 'salesforce i dont want u!!'

    handeler(event)
    {
        if(event.target.label === 'Show')
        {
            console.log('inside if'+this.labelHandle);
            this.labelHandle = 'Hide'
            this.show = true;

        }
        else if(event.target.label === 'Hide')
        {
            this.labelHandle = 'Show'
            this.show = false;

        }
    }
}