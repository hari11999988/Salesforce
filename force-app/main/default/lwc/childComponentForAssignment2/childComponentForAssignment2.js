import { LightningElement,api } from 'lwc';

export default class ChildComponentForAssignment2 extends LightningElement {

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
        this.selectedata = this.totaldata[value];

    }
}