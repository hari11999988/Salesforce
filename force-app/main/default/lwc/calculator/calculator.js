import { LightningElement,api } from 'lwc';

export default class Calculator extends LightningElement {

    @api input1;
    @api input2;
    @api result;

    addition()
    {
        this.result=Number(this.input1)+Number(this.input2);
    }

    substraction()
    {
        this.result=Number(this.input1)-Number(this.input2);
    }

    multiplication()
    {
        this.result=Number(this.input1)*Number(this.input2);
    }

    division()
    {
        this.result=Number(this.input1)/Number(this.input2);
    }

    input1handler(event)
    {
        this.input1 = event.target.value;
    }
    inputhandler(event)
    {
        this.input2 =  event.target.value;
    }
    
}