import { LightningElement } from "lwc";

export default class Map extends LightningElement {
  mapMarkers;
  zoomLevel;
  listView;
  connectedCallback() {
    this.mapMarkers = [
      {
        location: {
          City: "Hyderabad",
          Country: "India",
          PostalCode: "500090",
        Street:'Nizampet'
        },
        title: "Vijay",
        description: "I am here",
        icon: "standard:account"
      },
      
    ];
    //Google Maps API supports zoom levels from 1 to 22 in desktop browsers, and from 1 to 20 on mobile.
    this.zoomLevel = 20;
    this.listView = "visible";
  }
}