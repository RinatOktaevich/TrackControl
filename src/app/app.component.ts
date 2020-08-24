import { Component, OnInit } from '@angular/core';
import { canvasConf } from "./../assets/constants";
import { Event } from "./../assets/Event";
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  canvasConf;
  dataArray: Event[];

  selectedEvent: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.canvasConf = canvasConf;
    this.dataArray = this.eventService.getEvents();
  }



  onEventSelected(event: Event[]) {
    this.selectedEvent = event;
    console.log(this.selectedEvent[0].date);
    // console.log(this.selectedEvent[1].date.toUTCString());
    console.log();
    console.log();
    console.log();
    console.log();


  }


  onEventWasUnTouched() {
    this.selectedEvent = null;
  }


}
