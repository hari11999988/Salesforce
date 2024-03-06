import { LightningElement } from 'lwc';
import getAllObject from '@salesforce/apex/AggrigateQuery.getAllObject';
import getRecord from '@salesforce/apex/AggrigateQuery.getRecord';


export default class AggrigateQuery extends LightningElement {

    Objectvalue;
    Objectoptions;
    Fieldoptions;
    Fieldvalue;
    functionvalue;
    textareavalue;
    functionvalue;
    
    get functionoptions() {
        if(this.Fieldoptions)
        {
            return [
                { label: 'Count', value: 'Count' },
                { label: 'Min', value: 'Min' },
                { label: 'Max', value: 'Max' },
                { label: 'Sum', value: 'Sum' },
            ];
        }
        else{
            return null;
        }
    }

    connectedCallback()
    {
        getAllObject()
        .then(response => {
            console.log('responce==>',response);
            let temp =[];
            for (const iterator of response) {
                temp.push({label: iterator.SobjectType , value : iterator.SobjectType });
            }
           
            this.Objectoptions = temp;
            console.log('ObjectOption==>',this.Objectoptions);
        })
        .catch(error => {
            console.log('error',error);
        })

    }

    handleChangeObject(event)
    {
        this.Objectvalue = event.target.value;
        this.Fieldoptions='';
        this.Fieldvalue='';
        this.functionvalue='';
        
        

        console.log('this.Objectvalue',this.Objectvalue);
        getRecord({obj:this.Objectvalue})
        .then(response => {
            console.log('response==>',response);
            let temp = []
            for (const iterator of response) {
                temp.push({label : iterator.QualifiedApiName , value: iterator.QualifiedApiName });
            }
            
            this.Fieldoptions = temp;
            console.log('fieldoption==>',this.Fieldoptions);
        })
        .catch(error => {
            console.log('error',error);
        })

    }

    handleChangeField(event)
    {
         this.Fieldvalue = event.target.value;
         console.log('Fieldvalue==>',this.Fieldvalue);

    }

    handleChangefunction(event)
    {
        this.functionvalue = event.target.value;
        this.textareavalue = 'SELECT '+ this.functionvalue +'('+ this.Fieldvalue +') FROM '+ this.Objectvalue;

    }
}