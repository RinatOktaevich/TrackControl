import { Component, OnInit } from '@angular/core';
import { canvasConf, dataArr } from "./../assets/constants";
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
    console.log(this.timeChangedEvents[0].date + " " + this.timeChangedEvents[1].date);

  }

  onEventSelected(events: Event[]) {
    this.selectedEvent = events;
    this.timeChangedEvents = events;
    console.log(this.timeChangedEvents[0].date + " " + this.timeChangedEvents[1].date);

  }


  onEventWasUnTouched() {
    this.selectedEvent = null;
  }


  onSaveChanges() {
    this.eventService.setEvent(this.timeChangedEvents[0]);
    if (this.timeChangedEvents[1] != undefined) {
      this.eventService.setEvent(this.timeChangedEvents[1]);
    }
    this.dataArray = cloneDeep(this.eventService.getEvents());
  }


}
