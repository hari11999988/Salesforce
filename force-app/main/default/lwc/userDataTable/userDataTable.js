import { LightningElement ,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getUserList from '@salesforce/apex/UserController.getUserList';
import getUserrecentList from '@salesforce/apex/UserController.getUserRecentList';

// Define the columns for the lightning-datatable
const actions = [
        { label: 'Show details', name: 'show_details' }
       
    ]

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];


export default class UserDataTable extends NavigationMixin(LightningElement) {

    get options() {
        return [
            { label: 'All User', value: 'All User' },
            { label: 'Active User', value: 'Active User' },
            { label: 'Admin User', value: 'Admin User' },
            { label: 'Recent viewed', value: 'Recent viewed' },           
        ];
    }

    data = [];
    datatoIterae = [];

    // Define the columns for the datatable
    columns = columns;
    value = 'All User';
    // Wire method to fetch user records
    @wire(getUserList)
    wiredUsers({ error, data }) {
        if (data) {
            // Transform the data if needed
            this.data = data.map(record => ({ ...record }));
             this.datatoIterae = data.map(record => ({ ...record }));
            console.log('Data : ',data);
        } else if (error) {
            // Handle error if needed
            console.error(error);
        }
    }

    handleRowAction(event){
        console.log('inside handleRowAction : ');
        //const action = event.detail.action;
        const row = event.detail.row;
        //console.log('action : ',action);
        //if (action.name === 'Show details') {
            // Handle the Edit action
            this.navigateToRecordEditPage(row.Id);
        //}

    }
     navigateToRecordEditPage(recordId) {
        // Navigate to the record edit page
        console.log('Inside Navigation');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'User',
                actionName: 'view'
            }
        });
    }

    handleListViewChange(event){
        this.value = event.detail.value;
        console.log('this.value : ',this.value);
        let temp = [];
        if(this.value == 'All User'){
            this.datatoIterae = this.data;
            console.log('this.data : ',this.data);
            console.log('this.datatoIterae : ',this.datatoIterae);    
        }
        else if(this.value == 'Active User'){
            for (let record of this.data){
                console.log('record is ' + record.IsActive);
                if(record.IsActive == true){
                    temp.push(record);
                }
            }
             this.datatoIterae = temp;
        }
        else if(this.value == 'Admin User'){
            for (let record of this.data){
                console.log('record.Profile.Name' + record.ProfileId);
                if(record.ProfileId == '00e5i000002Ra6HAAS'){
                    temp.push(record);
                }
            }
             this.datatoIterae = temp;
        }
        else if(this.value == 'Recent viewed'){
            getUserrecentList()
            .then((result) => {
                console.log('result : ',result);
                this.datatoIterae = result;
            })
            .catch((error) => {
                console.log('error : ',error);
            });
        }
       
        console.log('data : ',temp);
    }

    newUser(){
        // this[NavigationMixin.Navigate]({
        //     "type": "standard__webPage",
        //     "attributes": {
        //         "url": "https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/page?address=%2F005%2Fe%3FretURL%3D%252F005%253FisUserEntityOverride%253D1%2526retURL%253D%25252Fsetup%25252Fhome%2526appLayout%253Dsetup%2526tour%253D%2526isdtp%253Dp1%2526sfdcIFrameOrigin%253Dhttps%25253A%25252F%25252Fibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com%2526sfdcIFrameHost%253Dweb%2526nonce%253Da62eab2f3e8fb69cb6e86df942f635b25580d2d42c1eaf1b736d69d6288c3370%2526ltn_app_id%253D06m5i00000202anAAA%2526clc%253D1%26isUserEntityOverride%3D1"
        //     }
        // });

        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/page?address=%2F005%2Fe%3FretURL%3D%252F005%253FisUserEntityOverride%253D1%2526retURL%253D%25252Fsetup%25252Fhome%2526appLayout%253Dsetup%2526tour%253D%2526isdtp%253Dp1%2526sfdcIFrameOrigin%253Dhttps%25253A%25252F%25252Fibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com%2526sfdcIFrameHost%253Dweb%2526nonce%253Da62eab2f3e8fb69cb6e86df942f635b25580d2d42c1eaf1b736d69d6288c3370%2526ltn_app_id%253D06m5i00000202anAAA%2526clc%253D1%26isUserEntityOverride%3D1' 
            }
        }).then(generatedUrl => {
            window.open("https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/page?address=%2F005%2Fe%3FretURL%3D%252F005%253FisUserEntityOverride%253D1%2526retURL%253D%25252Fsetup%25252Fhome%2526appLayout%253Dsetup%2526tour%253D%2526isdtp%253Dp1%2526sfdcIFrameOrigin%253Dhttps%25253A%25252F%25252Fibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com%2526sfdcIFrameHost%253Dweb%2526nonce%253Da62eab2f3e8fb69cb6e86df942f635b25580d2d42c1eaf1b736d69d6288c3370%2526ltn_app_id%253D06m5i00000202anAAA%2526clc%253D1%26isUserEntityOverride%3D1", "_blank");
        });
    }

    expertToCsv(){
        console.log('OUTPUT : ');
        const csv = this.convertToCSV(this.datatoIterae);
        console.log('csv : ',csv);
        const link = document.createElement('a');
        console.log('link : ',link);
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        console.log('link : ',link);
        link.download = 'UserDetails.csv';
        console.log('link : ',link);
        link.click();
        console.log('link : ',link);
    }
    convertToCSV(data) {
        console.log('data : ',data);
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        return `${header}\n${rows.join('\n')}`;
    }
     
}