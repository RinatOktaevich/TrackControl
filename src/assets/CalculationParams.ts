import { EventType } from './EventType'
import { LineStroke } from './LineStroke'


export class CalculationParams {
    id: string;
    x: number;
    y: number;
    strokeWidth: number;
    fillColor: string;
    eventType: EventType;
    lineStroke: LineStroke;
}