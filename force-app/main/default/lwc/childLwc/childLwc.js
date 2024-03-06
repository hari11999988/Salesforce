import { LightningElement } from 'lwc';

export default class ChildLwc extends LightningElement {

    addHandler()
    {
        this.dispatchEvent(new CustomEvent('add'));

    }

    SubstractHandler()
    {
        this.dispatchEvent(new CustomEvent('substract'));

    }
}