import { EventType } from "./EventType";

export class Data {
    date;
    lat;
    lng;
    eventType;

    constructor(_date: Date, _lat: number, _lng: number, _eventType: EventType) {
        this.date = _date;
        this.lat = _lat;
        this.lng = _lng;
        this.eventType = _eventType;
    }
}
