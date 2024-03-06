import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {

    countValue = 0;

    incriment()
    {
        this.countValue++;

    }

    substract()
    {
        this.countValue--;
    }
}