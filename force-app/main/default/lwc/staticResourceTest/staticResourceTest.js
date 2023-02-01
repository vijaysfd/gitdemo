import { LightningElement } from 'lwc';
import 	BeerImage from '@salesforce/resourceUrl/BeerImage';


export default class StaticResourceTest extends LightningElement {
    imageUrl = BeerImage;
}