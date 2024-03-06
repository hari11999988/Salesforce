import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {

    @track gretting = 'World'

    grettingMsg(event)
    {
        this.gretting = event.target.value
    }
}