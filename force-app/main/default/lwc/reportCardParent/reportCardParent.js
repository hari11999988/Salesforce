import { LightningElement,api } from 'lwc';

export default class ReportCardParent extends LightningElement {

    count;
    parentvalue=[];

     onreflectHandler(event)
    {   
        console.log('in onreflecthandler')
        console.log('event.detail -->', JSON.parse(JSON.stringify(event.detail)))
        this.parentvalue = event.detail;
        this.count = this.parentvalue.length;

        console.log('this.count==>'+this.count);
        console.log('this.parentvalue==>'+this.parentvalue);


    }
}