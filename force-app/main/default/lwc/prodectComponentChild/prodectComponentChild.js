import { LightningElement,api } from 'lwc';
import productdetails from '@salesforce/resourceUrl/productdetails';

export default class ProdectComponentChild extends LightningElement {

    data; 

    image;

    Brand;
    Price;
    Color;

    @api parentData(data)
    {
        this.data = data;
        console.log('data==>',data)

        if(data == 'Watch')
        {
            this.image = productdetails +'/watch.jpeg';
            this.Brand = 'Titan';
            this.Price = '1500';
            this.Color = 'Black';

        }
        else if(data == 'Shoes')
        {
            this.image = productdetails +'/shoes.jpg';
            this.Brand = 'Puma';
            this.Price = '4500';
            this.Color = 'Red';

        }

    }
    countWatch =0;
    countshoes=0;

    onclickHandler()
    {
        console.log('data==>',this.data);
        
        if(this.data == 'Watch')
        {
            this.countWatch++;
            console.log('countWatch==>',this.countWatch);
            console.log('watchCount--> ',this.countWatch)
            const selectEvent = new CustomEvent('mycustomevent', { detail: this.countWatch});
            this.dispatchEvent(selectEvent);
        }
        else if(this.data == 'Shoes')
        {
            this.countshoes++;
            console.log('countShoes==>',this.countshoes);
            const selectEvent = new CustomEvent('mycustomevent', { detail: this.countshoes});
            this.dispatchEvent(selectEvent);

        }
    }

}