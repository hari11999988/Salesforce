import { LightningElement } from 'lwc';
import getCar from '@salesforce/apex/GetCarDetails.getCar';
import indivisualCar from '@salesforce/apex/GetCarDetails.indivisualCar';
import getUser from '@salesforce/apex/GetCarDetails.getUser';
import checkBooking from '@salesforce/apex/GetCarDetails.checkBooking';
import createRecord from '@salesforce/apex/GetCarDetails.createRecord';
import { NavigationMixin } from 'lightning/navigation';
import OBJECT_API from '@salesforce/schema/Car__c';
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import IMAGE_FIELD from '@salesforce/schema/Car__c.Image__c';
import COST_FIELD from '@salesforce/schema/Car__c.Cost_per_day__c';
import MILAGE_FIELD from '@salesforce/schema/Car__c.Milage__c';
import SEAT_FIELD from '@salesforce/schema/Car__c.Seat_cepacity__c';
import OBJECT_API_BOOKING from '@salesforce/schema/bookingForCar__c';
import PICKUP_DATE from '@salesforce/schema/bookingForCar__c.Pick_up_date__c';
import DAYS from '@salesforce/schema/bookingForCar__c.No_of_Days__c';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import test from '@salesforce/resourceUrl/Test';
//import BookingDetails from '/bookingDetails/bookingDetails';

export default class CarRentalComponentOne extends NavigationMixin(LightningElement) {

    carDetails;
    displayData;
    modalData = false;
    dataForModel;
    modelBooknow = false;
    isboolean;
    showBookingDetailsTemplate = false;
    paynow = false;
    

    objectapibooking = OBJECT_API_BOOKING;
    pickupdate = PICKUP_DATE;
    days = DAYS;
    objectApiName = OBJECT_API;
    fieldname = NAME_FIELD;
    fieldimage = IMAGE_FIELD;
    fieldcost = COST_FIELD;
    fieldmilage = MILAGE_FIELD;
    fieldseat = SEAT_FIELD;
    testImage = test;

    value  ;
    
    get options() {
        return [
            { label: 'KaraMangala', value: 'KaraMangala' },
            { label: 'MG Road', value: 'MG Road' },
            { label: 'Silk Board', value: 'Silk Board' },
            { label: 'Electronic city', value: 'Electronic city' },
            { label: 'Whitefield', value: 'Whitefield' },
        ];
    }
    connectedCallback()
    {
        getCar()
        .then(data =>{

            this.displayData = data;
            console.log('displaydata==>',this.displayData);
        })
        .catch(error => {
            console.log('error',error);
        })
    }

    onclickHandle(event)
    {
        // this.modalData = true;
        const value = event.target.dataset.id;
        console.log('id==>'+value);
        

        indivisualCar({iddata : value})
        .then(data => {
            this.dataForModel = data[0];
            this.modalData = true;
            console.log('dataForModal==>', this.dataForModel);
            console.log('recordId==>', this.dataForModel.Id);
        })
        .catch(error => {
            console.log('error',error);
        })

    }

    cancelHandle()
    {
        this.confirmBookingDate = '';
        this.ConfirmDays = '';
        this.modalData = false;
        this.modelBooknow = false;
    }

    indivisualcarid;
    bookNowHandeler(event)
    {
        this.indivisualcarid = event.target.dataset.id;
        console.log('indivisualcarid==>',this.indivisualcarid);
        
        //let isboolean = false;
        getUser()
        .then(data => {
            var isboolean = data;
            console.log('isboolean==>',isboolean)
            this.bookingHandler(data);

        })
        .catch(error => {
            console.log('error',error);
        })
        
         

    }

    bookingHandler(data)
    {
        if(/*true*/data === true)
        {
            console.log('inside is boolean if')
            this.modelBooknow = true;
            this.modalData = false;

        }
        else{
            console.log('inside else part');
            this.modalData = false;
            this.modelBooknow = false;

            this[NavigationMixin.Navigate]({
                "type": "standard__webPage",
                "attributes": {
                    "url": "https://ibirdssoftwareservicepvtl-a-dev-ed.my.site.com/carRentalSystems/s/login/?"
                }
            }, true);


        }

    }

    bookingdetails={};
    onchangeHandle(event)
    {
        this.bookingdetails[event.target.label] = event.target.value;
        if(event.target.label == 'Pickup Location')
        {
            this.value = event.target.value;
        }

    }


    amount;
    bookNowHandeler1()
    {
        
        
        console.log('inside bookNowHandeler1');
        this.bookingdetails["recordId"]=this.indivisualcarid;
        console.log('inside bookNowHandeler1');
        console.log('bookingdetails==>',this.bookingdetails);

        var today = new Date();
        this.date=today.toISOString();
        console.log(today.toISOString())
        console.log('booking date==>',this.bookingdetails['Booking date']);
        console.log('booking date==>',this.bookingdetails['No of days']);
        // let temp= this.bookingdetails['Booking date'].split('-');
        // console.log('temp==>',temp);
        // let formatdate = temp[1]+'/'+temp[2]+'/'+temp[0];
        // this.bookingdetails["formatdate"]=formatdate;
        console.log('bookingDetails==>',this.bookingdetails);
        console.log('condition==>',this.bookingdetails['Booking date'] < today.toISOString());
        if(this.bookingdetails['Booking date'] <= today.toISOString())
        {
            console.log('inside if');
            this.showNotification('please enter valid date')

        }    
        else if(this.bookingdetails['Booking date'] == undefined || this.bookingdetails['No of days'] == undefined || this.bookingdetails['Pickup Location'] == undefined)
        {
            console.log('inside else if');
            this.showNotification('Missing required field');
        }
        
        else{  
            console.log('inside else');
            let temp= this.bookingdetails['Booking date'].split('-');
            console.log('temp==>',temp);
            let formatdate = temp[1]+'/'+temp[2]+'/'+temp[0];
            this.bookingdetails["formatdate"]=formatdate;
            this.amount = this.dataForModel.Cost_per_day__c * this.bookingdetails['No of days'];
            console.log('amount===>', this.amount);
            this.bookingdetails["amount"]=this.amount;


            checkBooking({data : this.bookingdetails})
            .then(responce => {
                if(responce)
                {
                    this.bookingHandlersupport(responce);
                    console.log('after calling bookingHandlersupport');
                }
                else{
                    this.showNotification('Not available for selected data please change the date and search')
                }
                console.log('responce',responce);

            })
            .catch(error => {
                console.log('error',error);
            })
        }
    }

    confirmBookingDate='';
    ConfirmDays='';
    TotalAmmount;
    bookingHandlersupport(data)
    {
        console.log('confirmBookingDate==>',this.bookingdetails['Booking date']);
        console.log('ConfirmDays==>',this.bookingdetails['No of days']);
        
        this.confirmBookingDate = this.bookingdetails['Booking date'];
        this.ConfirmDays = this.bookingdetails['No of days'];
        this.showBookingDetailsTemplate = true;
        this.paynow = true;




    }

    payNowHandler()
    {
        this.showNotificationBooking('your booking is confirmed');
        this.modelBooknow = false;
        createRecord({data : this.bookingdetails})
        .then(responce => {
            console.log('responce==>',responce);
        })
        .catch(error => {
            console.log('error==>',error);
        })

        
    }


    showNotification(message) {
        const evt = new ShowToastEvent({
            title: 'Error',
            message: message,
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }

    showNotificationBooking(message) {
        const evt = new ShowToastEvent({
            title: 'BOOKING CONFORMED',
            message: message,
            variant: 'Success',
        });
        this.dispatchEvent(evt);
    }

}