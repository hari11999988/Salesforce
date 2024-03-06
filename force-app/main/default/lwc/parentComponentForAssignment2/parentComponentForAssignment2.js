import { LightningElement } from 'lwc';

export default class ParentComponentForAssignment2 extends LightningElement {

    value = '';


    get option()
    {
       return [
            {label : 'india', value : 'india'},
            {label : 'usa', value : 'usa'},
            {label : 'uae', value : 'uae'},
            {label : 'canada', value : 'canada'},
            {label : 'nepal', value : 'nepal'}
        ]

    }

    onchangehandle(event)
    {
        this.value=event.detail.value;
        console.log('target.event.value-->'+event.detail.value)
    }

    show()
    {
       console.log('calling child class method')
       this.template.querySelector("c-child-component-ass").showHandle(this.value);
       console.log('calling child class method')
    }
}