import { PathData } from "./Data";
import { Time } from './Time';

export interface AnchorDraggedResponce {
    newTime:Time;
    data: PathData;
    nextData:PathData;
}