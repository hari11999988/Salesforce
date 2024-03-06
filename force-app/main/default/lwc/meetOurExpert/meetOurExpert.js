import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/Professor';
export default class MeetOurExpert extends LightningElement {
    p1 = My_Resource + '/Professor/p1.jpg';
    p2 = My_Resource + '/Professor/p2.jpg';
    p3 = My_Resource + '/Professor/p3.jpg';
    p4 = My_Resource + '/Professor/p4.jpg';
}