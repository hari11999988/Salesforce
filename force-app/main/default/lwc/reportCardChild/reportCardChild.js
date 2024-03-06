import { LightningElement,api } from 'lwc';
import generateData from './reportcardSeparate';

const column =[
    {label : 'label' , fieldName : 'name'}
]

export default class ReportCardChild extends LightningElement {

    
   valueOfParent;

    data = [];
    columns = column;

    connectedCallback()
    {
        this.data=generateData();
        console.log(this.data);

    }
    

    handleOnClick()
    {
        let dataTable = this.template.querySelector('.dataTable');
        if(dataTable) {
            console.log(JSON.parse(JSON.stringify(dataTable.selectedRows)));


            this.valueOfParent = JSON.parse(JSON.stringify(dataTable.selectedRows));

            console.log(this.valueOfParent)

            this.dispatchEvent(new CustomEvent('reflect',{detail:this.valueOfParent}));

            
        }
    }
}