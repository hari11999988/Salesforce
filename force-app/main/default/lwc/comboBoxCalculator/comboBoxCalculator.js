import { LightningElement,track} from 'lwc';

export default class TestParent extends LightningElement {

    @track Input1;
    @track Input2; 
   
    input = [];
    
    value = '';

    get options() {
        return [
            { label: 'Add +', value: 'Addition' },
            { label: 'Sub -', value: 'Subtraction' },
            { label: 'Multi *', value: 'Multiplication' },
            { label: 'Div /', value: 'Division' },
        ];
    }
   

    handleImput1(event){
        console.log(event.detail.value);
        this.Input1 =event.detail.value;
    }
    handleImput2(event){
        console.log(event.target.value)
        this.Input2 =event.target.value;
    }
    handleChange(event)
    {
        this.value = event.target.value;
    }

    handleAction(event) {

        console.log('inside handleAction');
        console.log(this.value)
        
        if(this.value == 'Addition')
        {
 
            const totalvalue = this.input1+this.input2;
            console.log(totalvalue);
        }
        if(this.value == 'Subtraction')
        {

        }
        
        this.value = event.detail.value;
    }

}