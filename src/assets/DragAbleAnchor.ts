import { Data, PathData } from "./Data"
export class DragAbleAnchor {

    private pos1: number;
    private pos2: number;
    private pos3: number;
    private pos4: number;
    private element: HTMLElement;
    private dataObject: PathData;
    private nextDataObject: PathData;
    private side: LeftOrRight;


    constructor(_element: HTMLElement, _side: LeftOrRight) {
        this.element = _element;
        this.side = _side;
        this.element.onmousedown = this.onMouseDown.bind(this);

        // this.pos1 = 0;
        // this.pos2 = 0;
        // this.pos3 = 0;
        // this.pos4 = 0;
    }

    SetData(_data: PathData, _nextData: PathData) {
        this.dataObject = _data;
        this.nextDataObject = _nextData;
    }


    private onMouseDown(e) {
        e = e || window.event;
        // e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        console.log("e");
        console.log(e);


        document.onmouseup = this.onMouseUp.bind(this);
        console.log("this.element.onmouseup");
        console.log(this.element);

        // call a function whenever the cursor moves:
        document.onmousemove = this.onMouseMove.bind(this);
    }

    // private onMouseMove(e) {
    //     console.log(e.clientX);

    // }

    private onMouseMove(e) {
        e = e || window.event;
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
        console.log("(this.element.offsetLeft - this.pos1) + px");
        console.log((this.element.offsetLeft - this.pos1) + "px");
        console.log("(this.element.offsetLeft - this.pos3) + px");
        console.log((this.element.offsetLeft - this.pos3) + "px");


        this.element.style.left = (this.element.offsetLeft - this.pos1) + "px";


    }


    private onMouseUp(event) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }


}



export enum LeftOrRight {
    Left,
    Right
}