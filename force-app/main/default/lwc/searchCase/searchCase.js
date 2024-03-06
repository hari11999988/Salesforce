import { LightningElement } from 'lwc';
import getCase from '@salesforce/apex/CaseSearchRestApi.getCase'; 
import updateCase from '@salesforce/apex/CaseSearchRestApi.updateCase'; 
import deleteCase from '@salesforce/apex/CaseSearchRestApi.deleteCase'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class SearchCase extends LightningElement {
    searchKey //= '00001028';
    result
    edit = true;
    editDisable = false;
    saveDisable = true;
    resulttemplate;
    priorityValue;
    StatusValue;
    updatedObject={};
    confirmDelete;
    

    get priorityOption() {
        return [
            { label: 'High', value: 'High' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Low', value: 'Low' },
        ];
    }

    get StatusOption() {
        return [
            { label: 'New', value: 'New' },
            { label: 'Working', value: 'Working' },
            { label: 'Escalated', value: 'Escalated' },
        ];
    }

    handelSearchKey(event){
        this.searchKey = event.target.value;
    }

    SearchAccountHandler()
    {
        console.log('inside SearchAccountHandler');
        getCase({casenumber :this.searchKey })
        .then(results => {
            console.log('inside method');
            this.result = results; 
            this.priorityValue = results.Priority;
            this.StatusValue = results.Status;
            this.resulttemplate = false;
            if(results=='')
            {
                this.resulttemplate = true;
            }
            console.log('result==>',this.result);
        })
        .catch(error => {
            console.log('error',error);
            this.resulttemplate = true;
            this.result='';
        })
    }
    editHandel()
    {
        this.edit = false;
        this.editDisable = true;
        this.saveDisable = false;
    }
    saveHandel()
    {
        this.edit = true;
        this.editDisable = false;
        this.saveDisable = true;
        this.showToast('Success','Successfully Updated!','Success')
        this.updatedObject['Id'] = this.result.Id;
        console.log('this.result=>',this.updatedObject);

        updateCase({caseObj : this.updatedObject})
        .then(resultss => {
            console.log('updated');
            // this.result = resultss; 
            // this.priorityValue = resultss.Priority;
            // this.StatusValue = resultss.Status;

        })
        .catch(error => {
            console.log('error',error);
        })
        

    }
    deleteHandel()
    {
        this.confirmDelete = window.confirm('Are you sure ?');

        console.log('delete ? --> ',this.confirmDelete)
        if(this.confirmDelete == true)
        {
            console.log('inside if',this.result.Id);
            deleteCase({caseObj : this.result.Id})
            .then(resultss => {
                console.log('updated',resultss);
                this.updateRecordView();
            })
            .catch(error => {
                console.log('error',error);
            })
             console.log('after method call');
             this.showToast('Success','Successfully Deleted!','Deleted')
             //this.result='';
             refreshApex(this.SearchAccountHandler);
        }

    }
    priorityOnchange(event)
    {
        console.log(' event.target.value', event.target.value);
        console.log('event.target.label',event.target.label);
        
         this.priorityValue = event.target.value;
         console.log('setted value', this.result)
         this.updatedObject[event.target.label] = event.target.value;
         //this.result[event.target.label] = event.target.value; 
         console.log('updated map', this.updatedObject);
    }
    StatusOnchange(event)
    {
        this.updatedObject[event.target.label] = event.target.value;
        this.StatusValue = event.target.value;
    }

    showToast(tle,msg,vnt) {
        const event = new ShowToastEvent({
            title: tle,
            message:msg,
            variant:vnt,
        });
        this.dispatchEvent(event);
    }

    updateRecordView() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 1000); 
     }
}