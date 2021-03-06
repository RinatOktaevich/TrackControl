import { EventType } from "./EventType";
import { LineStroke } from './LineStroke';

export class Event {
    id: string;
    [x: string]: any;
    date: Date;
    lat: number;
    lng: number;
    eventType: EventType;

    constructor(_date: Date, _lat: number, _lng: number, _eventType: EventType) {
        this.date = _date;
        this.lat = _lat;
        this.lng = _lng;
        this.eventType = _eventType;
    }
}


export class EventPath extends Event {
    lineStroke: LineStroke;
}
