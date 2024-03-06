import { LightningElement,api } from 'lwc';

export default class ChildComponentForAss extends LightningElement {

    selectedata;
    

    totaldata ={'india' : {'country' : 'india',
                           'population' : '1200',
                           'pm' : 'norendra modi'
                          },
                'usa' : {'country' : 'usa',
                          'population' : '2500',
                          'pm' : 'vishal patil'
                         },
                'uae' : {'country' : 'uae',
                           'population' : '1500',
                           'pm' : 'sai deep'
                          },
                'canada' : {'country' : 'canada',
                           'population' : '1600',
                           'pm' : 'choti'
                          },
                'nepal' : {'country' : 'nepal',
                           'population' : '1800',
                           'pm' : 'tanu'
                          }        

                }
    @api showHandle(value)
    {
        
        console.log('inside childclass');
        console.log('value-->'+value);
        console.log('this.totaldata[value]-->'+this.totaldata[value])
        this.selectedata = this.totaldata[value];

    }
}