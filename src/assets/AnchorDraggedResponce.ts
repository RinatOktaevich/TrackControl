import { EventPath } from "./Event";
import { Time } from './Time';

export interface AnchorDraggedResponce {
    newTime:Time;
    data: EventPath;
    nextData:EventPath;
}