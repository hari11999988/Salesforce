import { LightningElement } from 'lwc';

export default class ParentPankajSir extends LightningElement {
    username;
    Email;
    userData = {};
    parentData=[];

    changeHandle(event)
    {
        console.log('event.target.label==>'+event.target.label);
        console.log('event.detail.label==>'+event.detail.label)
        if(event.target.label === 'Username')
        {
            this.username = event.target.value;
        }
        else if(event.target.label === 'Email'){
            this.Email = event.target.value;
        }

        this.userData[event.target.label] = event.target.value;
    }


    onclickHandeler()
    {
        this.parentData.push(this.username);
        this.parentData.push(this.Email);
        console.log('userData', this.userData);
        this.template.querySelector('c-child-pankaj-sir').parentHandler(this.userData);

    }
}