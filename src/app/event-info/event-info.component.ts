import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Event } from "./../../assets/Event";

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() selectedEvent: Event[];

  currentSelectedEvent: Event;
  nextEvent: Event;

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.selectedEvent.currentValue != undefined) {
      this.currentSelectedEvent = changes.selectedEvent.currentValue[0];
      this.nextEvent = changes.selectedEvent.currentValue[1];
    }
  }

  onSaveChanges(event) {

  }
}
