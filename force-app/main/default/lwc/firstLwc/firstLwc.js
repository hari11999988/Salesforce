import { LightningElement } from 'lwc';

export default class FirstLwc extends LightningElement {

title = 'Hari';

handleClick()
    {
        window.alert("Hii");
    }


}