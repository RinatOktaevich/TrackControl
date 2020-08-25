/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { Event } from "./../../assets/Event"
import { cloneDeep } from "lodash";

@Component({
  selector: 'google-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  constructor() { }

  @Input() eventsDataArr: Event[];
  @ViewChild('gmap') gmapElement: any;
  center: google.maps.LatLngLiteral;
  map: google.maps.Map;
  zoom: number = 5;
  mapProp; //= {
  //   center: this.center,
  // };
  // marker: google.maps.Marker;

  directionsRenderer: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;

  ngOnInit(): void {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnChanges(changes) {
    if (changes.eventsDataArr != undefined) {
      this.eventsDataArr = cloneDeep(changes.eventsDataArr.currentValue);
      // reset prev marker, if it was
      // if (this.marker != undefined) {
      //   this.marker.setMap(null);
      // }
      // this.directionsRenderer.unbindAll();

      this.checkData();
    }

  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement);
    this.directionsRenderer.setMap(this.map);

    this.checkData();

  }

  private checkData() {
    // check count and positions, so we add marker or draw direction
    //we have both events
    if (this.eventsDataArr[1] != undefined) {
      let pos1 = {
        lat: this.eventsDataArr[0].lat,
        lng: this.eventsDataArr[0].lng,
      };

      let pos2 = {
        lat: this.eventsDataArr[1].lat,
        lng: this.eventsDataArr[1].lng,
      };

      //both positions on one coordinate
      if (pos1.lat == pos2.lat && pos1.lng == pos2.lng) {
        // this.addMarker(pos1);
        this.setRoute(pos1, pos2);
        this.map.setZoom(2);

      } else {
        // create direction
        this.setRoute(pos1, pos2);
      }

    } else {
      //end of the day so we have only one event
      let evnt = this.eventsDataArr[0];
      // this.addMarker({ lat: evnt.lat, lng: evnt.lng });


      let pos = {
        lat: this.eventsDataArr[0].lat,
        lng: this.eventsDataArr[0].lng,
      };
      this.setRoute(pos, pos);
      this.map.setZoom(2);

    }


  }







  private setRoute(pointA: google.maps.LatLngLiteral, pointB?: google.maps.LatLngLiteral) {
    if (this.directionsService == undefined) {
      this.directionsService = new google.maps.DirectionsService();
    }

    this.directionsService.route(
      {
        origin: {
          lat: pointA.lat, lng: pointA.lng
        },
        destination: {
          lat: pointB.lat, lng: pointB.lng
        },
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }




}
