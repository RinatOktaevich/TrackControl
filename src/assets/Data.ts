import { EventType } from "./EventType";
import { Point } from './Point';

export class Data {
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


export class PathData extends Data {
    lineStroke: LineStroke;

}

class LineStroke {
    startPoint: Point;
    endPoint: Point;
}