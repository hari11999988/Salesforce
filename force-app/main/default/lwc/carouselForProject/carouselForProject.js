import { LightningElement } from 'lwc';
import AddCarHomePage from '@salesforce/resourceUrl/AddCarHomePage';
import adsPictureZip from '@salesforce/resourceUrl/pictureadsfinal';
import test from '@salesforce/resourceUrl/Test';

export default class CarouselForProject extends LightningElement {
    Video = AddCarHomePage;
    testImage = test;
    video1 = adsPictureZip + '/video1.mp4'
    picture1 = adsPictureZip + '/picture1.jpg';
    picture2 = adsPictureZip + '/picture2.jpg';
    
    

}