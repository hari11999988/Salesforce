import { LightningElement } from 'lwc';
import getFields from '@salesforce/apex/FieldDependency.getFields';
import getCity from '@salesforce/apex/FieldDependency.getCity';

export default class FieldDependency extends LightningElement {

    value='';
    option='';

    valueCity;
    optionsCity='';

    connectedCallback()
    {
        getFields().then(data => {
                console.log('inside getFields()==>.than');
                let options = [];
                console.log('data==>',data);
                for (var key of data) 
                {
                    console.log('inside for loop');
                    options.push({ label: key, value: key });
                }
                this.option = options;
                console.log('this.options =>', this.option)
            })
            .catch(error => {
                console.log('error'+error)
            });
        

    }

    handleChange(event)
    {
        this.value = event.target.value;
        console.log('event.target.value==>', event.target.value)
        getCity({ state: this.value }).then(data => {
            console.log('inside getCity()==>.than');
            let options = [];
            console.log('data==>',data);
            for (var key of data) 
            {
                console.log('inside for loop');
                options.push({ label: key, value: key });
            }
            this.optionsCity = options;
            console.log('this.optionsCity =>', this.optionsCity)
        })
        .catch(error => {
            console.log('error'+error)
        });
        
        

    }
}