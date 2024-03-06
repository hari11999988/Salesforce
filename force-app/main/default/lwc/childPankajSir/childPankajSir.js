import { LightningElement,api } from 'lwc';

export default class ChildPankajSir extends LightningElement {

    data={};
  

    @api parentHandler(data)
    {
        this.data = data;
        

    }
}