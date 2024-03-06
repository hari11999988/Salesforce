import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/collegelogo';
import FOOTER_IMAGE from '@salesforce/resourceUrl/footerimage';
export default class CollegeFooter extends LightningElement {
     email = 'info@ibsuniversity.com';
     logoUrl = My_Resource;
     p1 = FOOTER_IMAGE + '/footerimage/facebooklogo.png';
     p2 = FOOTER_IMAGE + '/footerimage/instalogo.png';
     p3 = FOOTER_IMAGE + '/footerimage/youtubelogo.png';
     p4 = FOOTER_IMAGE + '/footerimage/linkedinlogo.png';
     p5 = FOOTER_IMAGE + '/footerimage/twiterlogo.png';
     p6 = FOOTER_IMAGE + '/footerimage/footerposter.png';
}