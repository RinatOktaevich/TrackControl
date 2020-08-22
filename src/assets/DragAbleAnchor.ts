import { PathData } from "./Data"
import { fromEvent, Observable, Subject } from 'rxjs'
import { takeUntil, switchMap, map } from 'rxjs/operators'
import { Time } from './Time';
import { TimeUtil } from './TimeUtil'
import { AnchorDraggedResponce } from "./AnchorDraggedResponce";
import { cloneDeep } from "lodash"


export class DragAbleAnchor {
    //private
    private anchorBlockOffset = 7;
    private xPos1: number;
    private xPos2: number;
    private element: HTMLElement;
    private dataObject: PathData;
    private nextDataObject: PathData;
    private isInPlace;
    private side: LeftOrRight;

    private mouseMove$;
    private mouseDown$;
    private mouseUp$;
    private stream$;

    private AnchorDragged$: Subject<AnchorDraggedResponce> = new Subject<AnchorDraggedResponce>();


    constructor(_element: HTMLElement, _side: LeftOrRight) {
        this.element = _element;
        this.side = _side;
        this.isInPlace = _side == LeftOrRight.Left ? this.leftBorderCheck : this.rightBorderCheck;

        this.mouseDown$ = fromEvent(this.element, 'mousedown');
        this.mouseMove$ = fromEvent(document, 'mousemove');
        this.mouseUp$ = fromEvent(window, 'mouseup');

        this.stream$ = this.mouseDown$
            .pipe(
                map((e: any) => {
                    this.xPos2 = e.clientX;

                    return e;
                }
                ),
                switchMap(() => {
                    return this.mouseMove$
                        .pipe(
                            takeUntil(this.mouseUp$)
                        )
                })
            );

        this.stream$.subscribe(this.onMouseMove.bind(this));

    }

    SubscribeOnDrag(callback: Action): void {
        this.AnchorDragged$.subscribe(callback);
    }


    SetData(_data: PathData, _nextData: PathData) {
        this.dataObject = cloneDeep(_data);
        this.nextDataObject = cloneDeep(_nextData);
    }

    private onMouseMove(e) {
        this.xPos1 = this.xPos2 - e.clientX;
        this.xPos2 = e.clientX;
        let elementPos = (this.element.offsetLeft - this.xPos1);


        if (this.isInPlace(elementPos)) {
            this.element.style.left = (elementPos) + "px";

            let usedData = this.side == LeftOrRight.Left ? this.dataObject : this.nextDataObject;
            let newPos = elementPos + this.anchorBlockOffset;

            let newTime = this.newTimeForData(usedData, newPos);
            let AnchorResponce: AnchorDraggedResponce = {
                data: usedData,
                newTime: newTime
            };
            this.AnchorDragged$.next(AnchorResponce);
        }
    }

    private newTimeForData(data: PathData, newXPos: number): Time {
        let oldPos = data.lineStroke.startPoint.x;
        let diffInPX: number;
        let newTime: Time;
        if (newXPos > oldPos) {
            diffInPX = newXPos - oldPos;
            let diffInTime = TimeUtil.strokeLengthToTime(diffInPX);
            newTime = TimeUtil.sumUpTimes(TimeUtil.dateToTime(data.date), diffInTime);

        } else {
            diffInPX = oldPos - newXPos;
            let diffInTime = TimeUtil.strokeLengthToTime(diffInPX);
            newTime = TimeUtil.differTimes(TimeUtil.dateToTime(data.date), diffInTime);
        }
        return newTime;
    }


    private leftBorderCheck(xPos: number): boolean {
        if ((xPos + this.anchorBlockOffset) >= this.nextDataObject.lineStroke.startPoint.x
            &&
            (xPos - this.anchorBlockOffset) < this.dataObject.lineStroke.endPoint.x) {
            return true;
        }
        return false;
    }

    private rightBorderCheck(xPos: number): boolean {
        if ((xPos + this.anchorBlockOffset) < this.nextDataObject.lineStroke.endPoint.x
            &&
            (xPos + this.anchorBlockOffset) > this.dataObject.lineStroke.startPoint.x) {
            return true;
        }
        return false;
    }






}



export enum LeftOrRight {
    Left,
    Right
}


interface Action {
    (d: AnchorDraggedResponce): void;
}