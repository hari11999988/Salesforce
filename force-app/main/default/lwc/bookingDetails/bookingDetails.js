import { LightningElement } from 'lwc';
import OBJECT_API from '@salesforce/schema/bookingForCar__c';
import DATE_FIELD from '@salesforce/schema/bookingForCar__c.Pick_up_date__c';
import DAYS_FIELD from '@salesforce/schema/bookingForCar__c.No_of_Days__c';
import AMOUNT_FIELD from '@salesforce/schema/bookingForCar__c.Total_Amount__c';
import CAR_IMAGE from '@salesforce/schema/bookingForCar__c.Car_image__c';
import CAR_NAME from '@salesforce/schema/bookingForCar__c.Name';
import getRecordId from '@salesforce/apex/GetCarDetails.getRecordId';


export default class BookingDetails extends LightningElement {

    objectApiName = OBJECT_API;
    returnData;
     dateData = DATE_FIELD;
     daysData = DAYS_FIELD;
     amountData = AMOUNT_FIELD;
     carName = CAR_NAME;
     carImage = CAR_IMAGE;

    connectedCallback()
    {
        getRecordId()
        .then(responce => {
            this.returnData = responce;
            console.log('responce==>',responce);

        })
        .catch(error => {
            console.log('error',error);
        })
    }

}