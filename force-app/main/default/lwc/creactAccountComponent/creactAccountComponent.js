import { LightningElement, track } from 'lwc';
import insertAccount from '@salesforce/apex/GetAccountForLwc.insertAccount';
import getAccountDetails from '@salesforce/apex/GetAccountForLwc.getAccountDetails';
import deleteAccount from '@salesforce/apex/GetAccountForLwc.deleteAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
//import { refreshApex } from '@salesforce/apex';


const actions = [
    
    { label: 'Edit', name: 'edit' },
    
    { label: 'Delete', name: 'delete' },
    
];
const columns = [
    {label : 'Account Name' , fieldName : 'Name'},
    {label : 'Account Phone' , fieldName : 'Phone'},
    {label : 'Account City' , fieldName : 'BillingCity'},
    {type: 'action', typeAttributes: { rowActions: actions }
    }
]
export default class CreactAccountComponent extends NavigationMixin(LightningElement) {
    accountId = false;
    inputData = {};
    disabled = false;
    saveDisabled = false;
    newAccountDisabled = true;
    accountIdValue;
    columns = columns;
    actions = actions;
    accountIdList =[];
    @track data;
    onchangeHandle(event)
    {
        this.inputData[event.target.label] = event.target.value;
    }
    newAccountHandle()
    {
        //refreshApex(this.inputData);
        this.inputData = {};
        //eval("$A.get('e.force:refreshView').fire();");
        this.clearDataFromInputs()
        console.log('inputdata ->',this.inputData);
        this.disabled = false;
        this.saveDisabled = false;
        this.newAccountDisabled = true;
        this.accountId = false;
        
    }

    clearDataFromInputs() {
        for(let eachClass of this.template.querySelectorAll('.input')) {
            eachClass.value = '';
        }
    }
    saveHandle()
    {
       // if(this.inputData.Name != null && this.inputData[Billing city] != null && this.inputData)
    //    console.log('inputData ->',this.inputData);
    //    console.log('Billing city ->',this.inputData['Billing city']);
    //    console.log('Name->',this.inputData['Name']);
    //    console.log('Phone number->',this.inputData['Phone number']);
    //    console.log('size ->',this.inputData.length);
       if(this.inputData['BillingCity'] != '' && this.inputData['Phone'] != '' && this.inputData['Name'] != '' && this.inputData['Phone'] !=undefined && this.inputData['BillingCity'] !=undefined && this.inputData['Name'] !=undefined)
       {
           this.disabled = true;
           this.saveDisabled = true;
           this.newAccountDisabled = false;
           this.accountId = true;
           insertAccount({accountObj : this.inputData})
           .then( result => {
                console.log('result ->', result);
                this.accountIdValue = result.Id;
                this.accountIdList.push(result.Id);
                console.log('accountIdValue ->' , this.accountIdValue);
                console.log('accountIdList -> ',this.accountIdList);
                getAccountDetails({idList : this.accountIdList})
                .then(result => {
                        this.data = result;
                        console.log('data ->',this.data);
                })
                .catch(error => {
                        console.log('error',error);
                })
           })
           .catch(error => {
                console.log('error',error);
           })
        //    getAccountDetails({idList : this.accountIdList})
        //    .then(result => {
        //         this.data = result;
        //         console.log('data ->',this.data);
        //    })
        //    .catch(error => {
        //         console.log('error',error);
        //    })
       }
       else
       {
           this.showNotification();
       }

    }

    onRowActionHandler(event)
    {
        const actName = event.detail.action.name;
        console.log('actName ->',actName);
        const row = event.detail.row;
        console.log('row ->',row.Id);

        if(actName == 'delete')
        {
            deleteAccount({accId : row.Id })
            .then(result => {
                console.log('success');
                this.data = undefined;
            })
            .catch(error => {
                console.log('error',error);
            })
            this.accountIdList.filter((Id)=>{
                return (row.id !== Id)
            });
            getAccountDetails({idList : this.accountIdList})
                .then(result => {
                        this.data = result;
                        console.log('data ->',this.data);
                })
                .catch(error => {
                        console.log('error',error);
                })
        }
        else if(actName == 'edit')
        {
            console.log('inside else if');
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'Account',
                    actionName: 'edit'
                }
            });
            getAccountDetails({idList : this.accountIdList})
                .then(result => {
                        this.data = result;
                        console.log('data ->',this.data);
                })
                .catch(error => {
                        console.log('error',error);
                })

        }

    }

    showNotification(){
        const evt = new ShowToastEvent({
            title: 'Missing Fields',
            message: 'Fill all the Fields',
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }
}