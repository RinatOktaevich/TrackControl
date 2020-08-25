import { Component, Input, OnChanges } from '@angular/core';
import { Event } from "./../../assets/Event";
import { cloneDeep } from "lodash";
import { EventType } from 'src/assets/EventType';


@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnChanges {
  constructor() { }

  @Input() selectedEvent: Event[];
  currentSelectedEvent: Event;
  nextEvent: Event;

  ngOnChanges(changes) {
    if (changes.selectedEvent.currentValue != undefined) {
      this.currentSelectedEvent = cloneDeep(changes.selectedEvent.currentValue[0]);
      this.nextEvent = cloneDeep(changes.selectedEvent.currentValue[1]);
    }
  }


  ChooseColor(): string {
    let type = this.selectedEvent[0].eventType;

    let offDutyColor = "#E53A3A";
    let sleeperBerthColor = "#246299";
    let drivingColor = "#3E783E";
    let onDutyColor = "#F2BF44";
    switch (type) {
      case EventType.Driving.toString():
        return drivingColor;
        break;
      case
        EventType.OffDuty.toString():
        return offDutyColor;
        break;
      case EventType.OnDuty.toString():
        return onDutyColor;
        break;
      case EventType.SleeperBerth.toString():
        return sleeperBerthColor;
        break;
    }
  }
}
