import { Component, OnInit } from '@angular/core';
import { canvasConf } from "./../assets/constants";
import { Event } from "./../assets/Event";
import { EventService } from './event.service';
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  canvasConf;
  dataArray: Event[];

  selectedEvent: Event[];
  timeChangedEvents: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.canvasConf = canvasConf;
    this.dataArray = this.eventService.getEvents();
  }


  onAnchorDraged(events: Event[]) {
    this.timeChangedEvents = events; 
  }

  onEventSelected(events: Event[]) {
    this.selectedEvent = events;
    this.timeChangedEvents = events;
  }


  onEventWasUnTouched() {
    this.selectedEvent = null;
  }


}
