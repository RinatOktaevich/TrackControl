import { Data, PathData } from "./Data"
export class DragAbleAnchor {


    const private anchorBlockOffset = 7;

    private pos1: number;
    private pos2: number;
    private pos3: number;
    private pos4: number;
    private element: HTMLElement;
    private dataObject: PathData;
    private nextDataObject: PathData;
    private side: LeftOrRight;
    private isInPlace;


    constructor(_element: HTMLElement, _side: LeftOrRight) {
        this.element = _element;
        this.side = _side;
        this.element.onmousedown = this.onMouseDown.bind(this);

        this.isInPlace = _side == LeftOrRight.Left ? this.leftBorderCheck : this.rightBorderCheck;
    }

    SetData(_data: PathData, _nextData: PathData) {
        this.dataObject = _data;
        this.nextDataObject = _nextData;
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



    private onMouseDown(e) {
        console.log("down");


        e = e || window.event;
        // e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // console.log("e");
        // console.log(e);


        document.onmouseup = this.onMouseUp.bind(this);
        // console.log("this.element.onmouseup");
        // console.log(this.element);

        // call a function whenever the cursor moves:
        document.onmousemove = this.onMouseMove.bind(this);
    }


    private onMouseMove(e) {
        e = e || window.event;
        console.log("move");

        // e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        // pos2 = pos4 - e.clientY;
        this.pos3 = e.clientX;
        // pos4 = e.clientY;
        // set the element's new position:
        // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

        // console.log((elmnt.offsetLeft - pos1) + "px");
        // if ((this.element.offsetLeft - this.pos1) <= 612 - 7) {
        //     this.element.style.left = (this.element.offsetLeft - this.pos1) + "px";
        // }
        // console.log("(this.element.offsetLeft - this.pos1) + px");
        // console.log((this.element.offsetLeft - this.pos1) + "px");
        // console.log("(this.element.offsetLeft - this.pos3) + px");
        // console.log((this.element.offsetLeft - this.pos3) + "px");

        let elementPos = (this.element.offsetLeft - this.pos1);

        if (this.isInPlace(elementPos)) {
            this.element.style.left = elementPos + "px";
        }

    }


    private onMouseUp(event) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        console.log("up");

    }


}



export enum LeftOrRight {
    Left,
    Right
}