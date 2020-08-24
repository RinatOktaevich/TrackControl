import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Event } from "./../../assets/Event";
import { cloneDeep } from "lodash";


@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit, OnChanges {

  constructor(private _cdr: ChangeDetectorRef) { }

  @Input() selectedEvent: Event[];

  currentSelectedEvent: Event;
  nextEvent: Event;

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.selectedEvent.currentValue != undefined) {
      this.currentSelectedEvent = cloneDeep(changes.selectedEvent.currentValue[0]);
      this.nextEvent = cloneDeep(changes.selectedEvent.currentValue[1]);
      // this._cdr.detectChanges();
    }
  }

  onSaveChanges(event) {

  }
}
