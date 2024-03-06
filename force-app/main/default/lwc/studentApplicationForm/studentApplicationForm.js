import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import OBJECT_NAME from "@salesforce/schema/StudentInformation__c";
import CATEGORY_FIELD from "@salesforce/schema/StudentInformation__c.Category_Attach_Proof__c";
import DOB_FIELD from "@salesforce/schema/StudentInformation__c.DOB__c";
import FATHERNAME_FIELD from "@salesforce/schema/StudentInformation__c.Father_s_Husband_Name__c";
import FATHEROCCUPATION_FIELD from "@salesforce/schema/StudentInformation__c.Father_s_Occupation__c";
import GENDER_FIELD from "@salesforce/schema/StudentInformation__c.Gender__c";
import MOTHERNAME_FIELD from "@salesforce/schema/StudentInformation__c.Mother_s_Name__c";
import NAME_FIELD from "@salesforce/schema/StudentInformation__c.Name__c";
import ADDRESS_FIELD from "@salesforce/schema/StudentInformation__c.Permanent_Address__c"; 
import EMAIL_FIELD from "@salesforce/schema/StudentInformation__c.Email__c";
import COURSE_FIELD from "@salesforce/schema/StudentInformation__c.Course__c";
import STREAM_FIELD from "@salesforce/schema/StudentInformation__c.Stream__c";
export default class StudentApplicationForm extends NavigationMixin(LightningElement) {
    objectName = OBJECT_NAME;
    CATEGORY_FIELD = CATEGORY_FIELD;
    COURSE_FIELD =COURSE_FIELD;
    STREAM_FIELD = STREAM_FIELD;
    DOB_FIELD = DOB_FIELD;
    EMAIL_FIELD = EMAIL_FIELD;
    FATHERNAME_FIELD = FATHERNAME_FIELD;
    FATHEROCCUPATION_FIELD = FATHEROCCUPATION_FIELD;
    GENDER_FIELD = GENDER_FIELD;
    MOTHERNAME_FIELD = MOTHERNAME_FIELD;
    NAME_FIELD =NAME_FIELD;
    ADDRESS_FIELD = ADDRESS_FIELD;
 
    myFields = [NAME_FIELD,GENDER_FIELD,CATEGORY_FIELD,DOB_FIELD,EMAIL_FIELD,FATHERNAME_FIELD,FATHEROCCUPATION_FIELD,MOTHERNAME_FIELD,COURSE_FIELD,STREAM_FIELD,ADDRESS_FIELD]
    handleAccountCreated(event){
        const evt = new ShowToastEvent({
        title: 'Applied successfully!',
        message: 'Application no -'+ event.detail.id,
        variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}