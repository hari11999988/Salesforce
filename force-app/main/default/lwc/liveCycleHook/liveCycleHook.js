import { LightningElement } from 'lwc';

export default class LiveCycleHook extends LightningElement {

    constructor()
    {
        super();
        console.log('inside constructor');
    }
    connectedCallback()
    {
        console.log('inside connectedCallBack');
    }
    disconnectedCallback()
    {
        console.log('inside disConnectedCallBack');
    }
    render()
    {
        console.log('inside Render');
    }
    renderedCallback()
    {
        console.log('inside RenderCallBack');
    }
    handleClick()
    {
        console.log('inside RenderCallBack');
    }
}