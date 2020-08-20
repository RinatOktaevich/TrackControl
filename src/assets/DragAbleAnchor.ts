import { PathData } from "./Data"
import { fromEvent } from 'rxjs'
import { takeUntil, switchMap, map } from 'rxjs/operators'

export class DragAbleAnchor {
    private anchorBlockOffset = 7;

    private xPos1: number;
    private xPos2: number;
    private element: HTMLElement;
    private dataObject: PathData;
    private nextDataObject: PathData;
    private isInPlace;

    private mouseMove$;
    private mouseDown$;
    private mouseUp$;
    private stream$;

    constructor(_element: HTMLElement, _side: LeftOrRight) {
        this.element = _element;

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


    SetData(_data: PathData, _nextData: PathData) {
        this.dataObject = _data;
        this.nextDataObject = _nextData;
    }

    private onMouseMove(e) {
        this.xPos1 = this.xPos2 - e.clientX;
        this.xPos2 = e.clientX;
        let elementPos = (this.element.offsetLeft - this.xPos1);

        if (this.isInPlace(elementPos)) {
            this.element.style.left = elementPos + "px";
        }
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