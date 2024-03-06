import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {

   @api showData = "child data";


  @api handleChange()
   {
       this.showData = "after change";
   }
}