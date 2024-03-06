import { LightningElement } from 'lwc';
import getCaseRequest from '@salesforce/apex/CaseLwcController.getCaseRequest';
import getCaseRequestTemplate from '@salesforce/apex/CaseLwcController.getCaseRequestTemplate';
import getEmail from '@salesforce/apex/CaseLwcController.getEmail';

export default class CaseLwcComponent extends LightningElement {

    temp = false;
    temp2 = false;
    options;
    value = '';

    option2;
    value2;
    email;


    connectedCallback()
    {
        getCaseRequest()
        .then(data => {
            console.log('inside getCAseRequest');
            let option = [];
            for(var key of data)
            {
                option.push({label:key , value:key});
            }
            this.options = option;
            console.log('option==>',option);
        })

        .catch(error => {
            console.log('Error',error)
        })



    }

    handleChange(event)
    {
        console.log('1st line')
        this.temp2 = false;
        console.log('2ns lun')
        this.value = event.target.value;
        console.log('3rf')
        if(this.value)
        {
            this.temp = true;
        }

        getCaseRequestTemplate({caserequest:this.value})
        .then( data => {
            let option = []
            for(var key of data)
            {
                option.push({label:key.Name , value:key.Id})
            }
            this.option2 = option;
            console.log('option==>',option);
        })
        .catch(error =>{
            console.log('error',error);
        })


    }


    handleChange2(event)
    {
        console.log('line 1');
        this.value2 = event.target.value;
        console.log('line 2');
        this.temp2 = true;
        console.log('line 3');

        getEmail({value:this.value2})
        .then( data => {
            console.log('Inside then');
            console.log('data=>',data);
            this.email = data.Email__c;
        })
        .catch(error => {
            console.log('error',error);
        })


    }
}