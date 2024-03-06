import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigteUserList extends NavigationMixin(LightningElement) {
    connectedCallback() {
       this.navigateToUsertListView();
    }

    handleClickView(){
        //this.navigateToUsertListView();
    }

    handleClickNewUser(){
        console.log('handleClickNewUser');
        let url = "https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/home"
        //let url = "https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/page?address=%2F005%2Fe%3FretURL%3D%252F005%253FisUserEntityOverride%253D1%2526retURL%253D%25252Fsetup%25252Fhome%2526appLayout%253Dsetup%2526tour%253D%2526isdtp%253Dp1%2526sfdcIFrameOrigin%253Dhttps%25253A%25252F%25252Fibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com%2526sfdcIFrameHost%253Dweb%2526nonce%253Da62eab2f3e8fb69cb6e86df942f635b25580d2d42c1eaf1b736d69d6288c3370%2526ltn_app_id%253D06m5i00000202anAAA%2526clc%253D1%26isUserEntityOverride%3D1"
        this[NavigationMixin.GenerateUrl]({
           "type": "standard__webPage",
            "attributes": {
                "url": url
            }
        });
        console.log('After navigaet');
    }
    navigateToUsertListView() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/home' 
            }
        }).then(generatedUrl => {
            window.open("https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/setup/ManageUsers/home", "_blank");
        });

        // this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: 'User',
        //         actionName: 'list'
        //     },
        //     state: {
        //         filterName: 'ActiveUsers'
        //     },
        // });
    }
}