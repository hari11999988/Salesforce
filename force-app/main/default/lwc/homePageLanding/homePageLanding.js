import { LightningElement } from 'lwc';
export default class HomePageLanding extends LightningElement {

    connectedCallback() {
        console.log('inside connected call back');
    console.log('window.location.href',window.location.href);
    const param = "c__AcctInfo";
    const paramValue = this.getUrlParamValue(window.location.href, param);
    console.log("to show my parm :: " + paramValue);

}

}