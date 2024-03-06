import { api, LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LwcPractice extends LightningElement {
    
    // connectedCallback(event)
    // {
    //     let x = 'hii';
    //     window.alert("success"+ x);
    // }
   
     @api x = "hii salesforce";
     
     @api handleChange()
       {
        console.log("hii");
        this.x = "Hii hari"
       
       }
     

    clickHandel()
    {
        
        window.alert("success"+ this.x); 
        this.showToast(this.x);
    }
       


        showToast(para)
        {
            let event = new ShowToastEvent({
                title : para,
                message : 'showToastEvent practice',
                variant : 'worning'
            })
            this.dispatchEvent(event);

        }
}