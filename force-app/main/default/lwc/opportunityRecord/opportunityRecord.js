import { LightningElement, api } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import Opportunity from '@salesforce/schema/Opportunity';

import Name from '@salesforce/schema/Opportunity.Name';
import CloseDate from '@salesforce/schema/Opportunity.CloseDate';
import StageName from '@salesforce/schema/Opportunity.StageName';
import Probability from '@salesforce/schema/Opportunity.Probability';
import NextStep from '@salesforce/schema/Opportunity.NextStep';



export default class OpportunityRecord extends NavigationMixin(LightningElement){
    @api recordId;
   

    fields = [Name,CloseDate,StageName,Probability,NextStep];
    objectApiName = Opportunity;

   // handleSuccess(event) 
   // {
       // const evt = new ShowToastEvent
       // ({
       //     title: 'Account created',
        //    message: 'Record ID: ' + event.detail.id,
        //    variant: 'success',
            
            
           
      //  });
      //  this.dispatchEvent(evt);
   // }

   handleSubmit(event) {
        // Navigate to the CaseComments related list page
        // for a specific Case record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
               recordId:event.detail.id,
               objectApiName : 'Opportunity',
               actionname:'view'
            

              
            }
        });
      
    }
        // navigateToWebPage(event) 
        // {

        //     this[NavigationMixin.Navigate]
        //     ({
    
        //         type: 'standard__recordPage',
    
        //         attributes: 
        //         {
        //             recordId: event.detail.id,
        //             objectApiName : 'Opportunity',
        //             actionName: 'view',
    
        //             //url: 'https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/r/Opportunity/'+event.detai.id+'/view'

        //         }
    
        //     })
        // }

        // navigateToWebPage(event) 
        // {
        //     this[NavigationMixin.GenerateUrl]
        //     ({
        //         type: "standard__recordPage",
        //         attributes: 
        //         {
        //             url: 'https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/r/Opportunity/'+event.detail.id+'/view'
        //         }
        //     }) 
        //     .then(generatedUrl => 
        //         {
        //             window.open(generatedUrl);
        //         })
        // }


//         component.find("navigation")
//             .navigate({
//                 type: 'standard__recordPage',
//                 attributes: {
//                     recordId      : recordId,
//                     actionName    : actionName ? actionName : 'view'   //clone, edit, view
//                 }
//             }, true);
}