import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

    handleOnclick()
    {
        this.template.querySelector("c-child-component").handleChange();
    }
}