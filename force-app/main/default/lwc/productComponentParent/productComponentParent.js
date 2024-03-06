import { LightningElement } from 'lwc';

export default class ProductComponentParent extends LightningElement {
    watch;
    shoes;

    childcomponent = true;
   


    
    onclickHandler(event)
    {
        const lavel = event.target.label;

        const checkbox = event.target.checked;
        
        
        console.log('lavel==>',lavel);
        console.log('checkbox==>',checkbox);

        if(checkbox)
        {
            if(lavel == 'Watch')
            {
                this.watch = true;
                this.shoes = false;
                this.childcomponent = true;
                this.count = 0 ;
                console.log('inside if');
                console.log('watch==>',this.watch);
                console.log('shoes==>',this.shoes);
    
                this.template.querySelector('c-prodect-component-child').parentData(lavel);
            }
            else if(lavel == 'Shoes')
            {
                this.watch = false;
                this.shoes = true;
                this.childcomponent = true;
                this.count = 0;
                console.log('inside else if');
                console.log('watch==>',this.watch);
                console.log('shoes==>',this.shoes);
    
                this.template.querySelector('c-prodect-component-child').parentData(lavel);
            }

        }
        else{
            this.childcomponent = false;
            this.count = 0;
        }


       
    }

    count=0;
    onselectEventHandle(event)
    {

        console.log('inside custom handler');
        console.log('count==>',event.detail);
        this.count = event.detail;

    }
}