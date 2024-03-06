import { LightningElement } from 'lwc';
import getObjectName from '@salesforce/apex/DataImportComponentHandler.getObjectName';
import insertRecords from '@salesforce/apex/DataImportComponentHandler.insertRecords';
import LightningAlert from "lightning/alert";
import myResource from '@salesforce/resourceUrl/papaparsestaticresource';
import { loadScript } from 'lightning/platformResourceLoader';
export default class DataImportComponent extends LightningElement {
    value;
    objectOpton;
    uploadedFiles ={};

    get acceptedCSVFormats() {
        return ['.csv'];
    }
    connectedCallback()
    {
        console.log('inside connected callback');
        getObjectName()
        .then(results => {
            let temp = [];
            console.log('result ->',results);
            for (const iterator of results) {
                temp.push({label : iterator.Name , value: iterator.Name });
            }
            this.objectOpton = temp;
            console.log('objectOption ->',this.objectOpton);
        })
        .catch(error => {
            console.log('error',error);
        })
    }
    parserInitialized = false;
    renderedCallback() {
        if(!this.parserInitialized){
            loadScript(this, myResource + '/papaparse.min.js')
                .then(() => {
                    this.parserInitialized = true;
                })
                .catch(error => console.error(error));
        }
    }

    onclickHandler(event)
    {
        this.value = event.target.value;
        console.log('value ->', this.value);
    }
    loading = false;
    returndata = [];
    filename;
    uploadFileHandler(event) ///c
    {
       console.log('in upload method')
       console.log('event.target-->' ,event.target)
       console.log('event.target.files -->' ,event.target.files)
       console.log('name  -->',event.target.files[0].name);
       console.log('event.target.files.length -->' ,event.target.files.length)
       if(event.target.files.length > 0){
        console.log('in if')
        const file = event.target.files[0];
        this.filename = event.target.files[0].name;
        Papa.parse(file, {
            quoteChar: '"',
            header: 'true',
            complete: (results) => {
                
                console.log('results ->', results)
                this.uploadedFiles = results.data;
            },
            error: (error) => {
                console.error(error);
                // this.loading = false;
            }
        })
        console.log('in after parse')
    }

    }

    
    buttonHandler()
    {
        if(this.uploadedFiles != undefined && this.value != undefined)
        {
            console.log('uploadedFiles ->',this.uploadedFiles);
            console.log('value ->',this.value);
            console.log('inside if');
            const temp = {};
            temp[this.value] = this.uploadedFiles;
            console.log('temp ->',temp);
            insertRecords({value: this.value , data : this.uploadedFiles })
            .then(result => {
                console.log('result',result);
            })
            .catch(error =>{
                console.log('error',error);
            })
            console.log('afetr imperative');
        }
        else{
            /*await*/ LightningAlert.open({
                message: "Both are required field",
                theme: "error",
                label: "Alert Header"
              }).then(() => {
                console.log("###Alert Closed");
              });
        }

    }
}