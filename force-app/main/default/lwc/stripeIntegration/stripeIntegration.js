import { LightningElement, track, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import stripeJs from '@salesforce/resourceUrl/stripeJs';

export default class StripeIntegration extends LightningElement {

    @api studentDetail
    @track stripe;
    @track elements;
    @track card;


    renderedCallback() {
        if (!this.stripe) {
            this.loadStripeJs();
        }
        console.log('this.template.querySelector(#card-elemen) -->',JSON.stringify(this.template.querySelector('.card-element')));
    }

    loadStripeJs() {
        loadScript(this, stripeJs)
            .then(() => {
                this.stripe = Stripe('pk_test_51M4IlZSA8n5fSvxPJTh3ImavdcUQ2RSt8wtYB0lrMJMUPpInhcYASqmyArUxoP2F5DdvQCfFooc8R9NbzJ4FgfcK00EryZlBf5');
                this.elements = this.stripe.elements();
                console.log('this.stripe ->',this.stripe);
                // Create an instance of the card Element.
                this.card = this.elements.create('card');

                console.log();
                // Add an instance of the card Element into the `card-element` div.
                this.card.mount(this.template.querySelector('.card-element'));

                // Handle real-time validation errors from the card Element.
                this.card.addEventListener('change', (event) => {
                    const displayError = this.template.querySelector('#card-errors');
                    if (event.error) {
                        displayError.textContent = event.error.message;
                    } else {
                        displayError.textContent = '';
                    }
                });
            })
            .catch((error) => {
                console.error('Error loading Stripe.js:', error);
            });
    }

    handlePayment() {
        this.stripe.createToken(this.card).then((result) => {
            if (result.error) {
                // Inform the user if there was an error.
                const errorElement = this.template.querySelector('#card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                // This is where you would handle the server-side processing (e.g., charge the card).
                console.log(result.token);
                alert('Payment successful!'); // For demonstration purposes, you may replace this with your own logic.
            }
        });
    }
}