import { LightningElement,track,wire } from 'lwc';
import getAccountRecord from '@salesforce/apex/ForEachDemo.getAccountRecord'

export default class ForEachLoopDemo extends LightningElement {

    @track data = []

    @wire(getAccountRecord)
    account;



}