import { LightningElement } from 'lwc';
import contactDetails from '@salesforce/apex/SearchContactHandler.contactDetails';
import searchContact from '@salesforce/apex/SearchContactHandler.searchContact';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Account Name', fieldName: 'Account.Name' },
];

export default class ContactSearchTable extends LightningElement {

    inputValue;
    recordsToDisplay;
    column = columns;
    value = 5;

    connectedCallback()
    {
        contactDetails({limits: this.value})
        .then(result => {
            //console.log('result==>',result);
             this.recordsToDisplay = result;
        })
        .catch(error => {
            console.log('error',error);
        })

        fetchContacts()
        .then((result) => {
            if (result != null) {
                console.log('RESULT--> ' + JSON.stringify(result));
                this.records = result;
                this.totalRecords = result.length; // update total records count                 
                this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
                this.paginationHelper(); // call helper menthod to update pagination logic 
            }
        })
        .catch((error) => {
            console.log('error while fetch contacts--> ' + JSON.stringify(error));
        });

    }
    inputHandler(event)
    {
        this.inputValue = event.target.value;
    }
    searchHandel()
    {
        searchContact({searchKey: this.inputValue , limits: this.value})
        .then(result => {
            //console.log('result==>',result);
             this.recordsToDisplay = result;
        })
        .catch(error => {
            console.log('error',error);
        })
    }

    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
        ];
    }
    handleChange(event)
    {
        this.value = event.target.value;
        // console.log('value==>',this.value);
        // console.log('event.target.valuevvvv==>',event.target.value);
        if(this.inputValue)
        {
            searchContact({searchKey: this.inputValue , limits: this.value})
            .then(result => {
                //console.log('result==>',result);
                this.recordsToDisplay = result;
            })
            .catch(error => {
                console.log('error',error);
            })
        }
        else{

            contactDetails({limits: this.value})
            .then(result => {
                 this.recordsToDisplay = result;
            })
            .catch(error => {
                console.log('error',error);
            })
        }

    }

    pageSizeOptions = [5, 10, 15, 20]; //Page size options
    records = []; //All records available in the data table
    columns = []; //columns information available in the data table
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number    
    recordsToDisplay = [];

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    firstHandle() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }
    // JS function to handel pagination logic 
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.records[i]);
        }
    }
}