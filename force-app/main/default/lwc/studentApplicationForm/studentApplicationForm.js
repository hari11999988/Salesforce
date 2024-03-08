import { LightningElement,track } from 'lwc';
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
import uniqueName_FIELD from "@salesforce/schema/StudentInformation__c.Name";
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
    uniqueName_FIELD = uniqueName_FIELD;
    @track nextPage = false;
    @track streamOption = ['--please Select--'];  
    @track options = ["--please select--","MCA", "BTECH", "BCA"]
    @track studentDetails ={};

    childoptions = {
        none:['--please Select--'],
        MCA : ['--please Select--','MCA'],
        BCA : ['--please Select--','BCA'],
        BTECH : ['--please Select--','Biotechnology', 'Civil Engineering', 'Artificial intelligence', 'BTech ECE', 'BTech CSE', 'Mechanical Engineering']
    }
 
    myFields = [NAME_FIELD,GENDER_FIELD,CATEGORY_FIELD,DOB_FIELD,EMAIL_FIELD,FATHERNAME_FIELD,FATHEROCCUPATION_FIELD,MOTHERNAME_FIELD,COURSE_FIELD,STREAM_FIELD,ADDRESS_FIELD]
    handleAccountCreated(event){
        console.log("event==",JSON.parse(JSON.stringify(event.detail)),JSON.stringify(event.detail["fields"]["Name"]["value"]));
        const evt = new ShowToastEvent({
        title: 'Applied successfully!',
        message: 'Application no '+ event?.detail?.fields?.Name?.value,
        variant: 'success',
        });
        this.dispatchEvent(evt);
        this.nextPage=true;
    }
    handleCourse(event){
        console.log('value->',event.target.value);
        this.studentDetails["course"] = event.target.value;
        if(event.target.value == '--please select--'){
            this.streamOption = this.childoptions['none'];
        }else{
            this.streamOption = this.childoptions[event.target.value];
        }

    }
    handleStream(event){
        this.studentDetails["stream"] = event.target.value;
    }
    handleGender(event){
        this.studentDetails["gender"] = event.target.value;
    }
    handleChangeField(event){
        this.studentDetails[event.target.name] = event.target.value;
    }
    handleNext(){
        console.log('this.studentDetails -->',JSON.stringify(this.studentDetails));
        this.nextPage=true;
    }
}