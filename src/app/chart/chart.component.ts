import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Point } from "./../../assets/Point";
import { Time } from "./../../assets/Time"
import { Directions } from "./../../assets/Direction";
import { Data } from '@angular/router';
import { EventType } from "./../../assets/EventType";
import { TimeUtil } from "./../../assets/TimeUtil";
import { DateUtil } from "./../../assets/DateUtil";
import { ColorPalette } from "./../../assets/ColorPalette";
import { DragAbleAnchor, LeftOrRight } from "./../../assets/DragAbleAnchor";
import { PathData } from 'src/assets/Data';
import { AnchorDraggedResponce } from 'src/assets/AnchorDraggedResponce';
import { cloneDeep } from "lodash"

//*
//*
//*
//Dynamic props in Data object added here in this component
//@timeInState - represent the time from the begining of an event to the next event
//@lineStroke - 
//----startPoint:Point
//----endPoint:Point
//*
//*
//*

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  private canvasWrap: HTMLElement;
  private canvas: any;
  private ctx: CanvasRenderingContext2D;

  // @Input() createdAsset: IAsset = null;
  // @Output() assetDeletedEvent: EventEmitter<IAsset> = new EventEmitter<IAsset>();

  @Input() canvasConfig: any = null;
  @Input() dataArr: Data[] = [];
  filteredArr: Data[] = [];


  private LeftAnchor_DragAble_State: DragAbleAnchor;
  private RightAnchor_DragAble_State: DragAbleAnchor;
  private wasDragged = false;


  //cell config variables
  private cellSize;

  private cellHalf;
  private cellQuarter;

  private cellSideDivider;
  private cellCenterDivider;

  // grid config variables
  private cols;
  private rows;
  private gridStartCoordinate;

  private startPoint: Point;

  private tempX: number;
  private tempY: number;

  private columnslineWidth;
  private rowsLineHeight;

  //stroke`s colors per state
  private offDutyColor = "#E53A3A";
  private offDutyColorDim = "rgba(229, 58, 58, 0.5)";

  private sleeperBerthColor = "#246299";
  private sleeperBerthColorDim = "rgba(36, 98, 153, 0.5)";

  private drivingColor = "#3E783E";
  private drivingColorDim = "rgba(62, 120, 62, 0.5)";

  private onDutyColor = "#F2BF44";
  private onDutyColorDim = "rgba(242, 190, 68, 0.5)";
  ////////////

  timeDurations = {
    offDutyTimeDur: new Time(0, 0),
    sbTimeDur: new Time(0, 0),
    onDutyTimeDur: new Time(0, 0),
    driveTimeDur: new Time(0, 0),
    reset: function () {
      this.offDutyTimeDur = new Time(0, 0);
      this.sbTimeDur = new Time(0, 0);
      this.onDutyTimeDur = new Time(0, 0);
      this.driveTimeDur = new Time(0, 0);
    }
  };



  constructor() {
  }
  private hideAnchors() {
    let strokes = document.getElementsByClassName("stroke");

    for (let index = 0; index < strokes.length; index++) {
      const element: HTMLElement = <HTMLElement>strokes[index];
      element.style.backgroundColor = this.EventTypeToColorPalette(element.classList[1]).mainColor;
    }

    // this.EventTypeToColorPalette(elem.classList[1]).mainColor;

    let leftAnc = document.getElementById("anchor__left");
    let rightAnc = document.getElementById("anchor__right");

    leftAnc.style.display = "none";
    rightAnc.style.display = "none";
  }

  private canvasOnClick() {
    this.hideAnchors();
    this.filteredArr = cloneDeep(this.dataArr);
    this.update();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById("chart");
    this.canvas.addEventListener("click", this.canvasOnClick.bind(this));

    this.ctx = this.canvas.getContext('2d');

    this.canvasWrap = document.getElementById("canvas-wrap");

    this.Render();
  }

  ngOnInit(): void {
    this.filteredArr = cloneDeep(this.dataArr);

    //cell config variables
    this.cellSize = this.canvasConfig.grid.cell.size;
    this.cellHalf = this.cellSize / 2;
    this.cellQuarter = this.cellSize / 4;
    this.cellSideDivider = this.canvasConfig.grid.cell.dividersLength.sides;
    this.cellCenterDivider = this.canvasConfig.grid.cell.dividersLength.center;

    // grid config variables
    this.cols = this.canvasConfig.grid.cols;
    this.rows = this.canvasConfig.grid.rows;
    //to make grid centered
    this.gridStartCoordinate = (this.canvasConfig.width - (this.cellSize * this.cols)) / 2;
    this.startPoint = new Point(this.gridStartCoordinate, 50);
    this.tempX = this.startPoint.x;
    this.tempY = this.startPoint.y;
    this.columnslineWidth = this.cellSize * this.cols;
    this.rowsLineHeight = this.cellSize * this.rows;
    ////////////
    let leftAnchor = document.getElementById("anchor__left");
    let rightAnchor = document.getElementById("anchor__right");

    this.LeftAnchor_DragAble_State = new DragAbleAnchor(leftAnchor, LeftOrRight.Left);
    this.RightAnchor_DragAble_State = new DragAbleAnchor(rightAnchor, LeftOrRight.Right);

    this.LeftAnchor_DragAble_State.SubscribeOnDrag(this.OnAnchorDragged.bind(this));
    this.RightAnchor_DragAble_State.SubscribeOnDrag(this.OnAnchorDragged.bind(this));

  }


  public Render() {
    this.grid();
    this.text();
    this.pathsViaHTML();
  }


  private OnAnchorDragged(_data: AnchorDraggedResponce) {

    if (this.wasDragged == false) {
      this.wasDragged = true;
    }

    let changedIndex = this.filteredArr.findIndex(v => v.id == _data.data.id);
    this.filteredArr[changedIndex].date.setHours(_data.newTime.hours);
    this.filteredArr[changedIndex].date.setMinutes(_data.newTime.minutes);

    this.update();
  }




  // private filterData() {
  //   this.filteredArr
  // }











  private pathsViaHTML() {

    for (let index = 0; index < this.filteredArr.length; index++) {
      const element: Data = this.filteredArr[index];

      let x;
      let y;
      let fillColor;
      if (index == 0) {
        x = this.tempX + TimeUtil.timeToStrokeLength(new Time(element.date.getHours(), element.date.getMinutes()), this.cellSize);
      } else {
        x = this.filteredArr[index - 1].lineStroke.endPoint.x;
      }

      switch (element.eventType) {
        case EventType.Driving:
          fillColor = this.drivingColor;
          y = this.tempY + this.cellSize * 2 + this.cellHalf;
          break;
        case EventType.OffDuty:
          fillColor = this.offDutyColor;
          y = this.tempY + this.cellHalf;

          break;
        case EventType.OnDuty:
          fillColor = this.onDutyColor;
          y = this.tempY + this.cellSize * 3 + this.cellHalf;

          break;
        case EventType.SleeperBerth:
          fillColor = this.sleeperBerthColor;
          y = this.tempY + this.cellSize + this.cellHalf;

          break;
      }

      let strokeWidth: number = TimeUtil.timeToStrokeLength(element.timeInState, this.cellSize);
      this.createAndAppendPath(x, y, strokeWidth, fillColor, element.eventType, element.id);

      let lineStroke = {
        startPoint: new Point(x, y),
        endPoint: new Point(x + strokeWidth, y)
      };

      this.dataArr[index]["lineStroke"] = lineStroke;
      element["lineStroke"] = lineStroke;

    }
  }

  private pathSelected(event) {
    if (this.wasDragged) {
      this.filteredArr = cloneDeep(this.dataArr);
      this.update();
    }


    let elem: HTMLElement = <HTMLElement>event.target;

    elem.style.backgroundColor = this.EventTypeToColorPalette(elem.classList[1]).mainColor;
    let otherElements = document.querySelectorAll(`.stroke:not(#${elem.id})`);

    for (let index = 0; index < otherElements.length; index++) {
      let node: HTMLElement = <HTMLElement>otherElements[index];
      node.style.backgroundColor = this.EventTypeToColorPalette(node.classList[1]).dimColor;
    }

    //show anchors
    let xPosOffset = 7.5;
    let yPosOffset = 28;
    let anchorHeight = (this.tempY + this.cellSize * 4) - this.PxToValue(elem.style.top) + yPosOffset;

    let elemLeftPos = this.PxToValue(elem.style.left);
    let elemTopPos = this.PxToValue(elem.style.top);
    let elemWidth = this.PxToValue(elem.style.width);
    let x1 = elemLeftPos - xPosOffset;
    let y1 = elemTopPos;

    let x2 = elemLeftPos + elemWidth - xPosOffset;
    let y2 = elemTopPos;

    let dataId: string = elem.id;

    this.showAnchors(new Point(x1, y1), new Point(x2, y2), anchorHeight, dataId);
  }


  private showAnchors(leftAnchorPoint: Point, rightAnchorPoint: Point, height, dataId: string) {

    let selecteDataIndex = this.filteredArr.findIndex((elem: Data) => elem.id == dataId);

    const nextElem = selecteDataIndex + 1 < this.filteredArr.length ? this.filteredArr[selecteDataIndex + 1] : this.filteredArr[selecteDataIndex];
    const prevElem = selecteDataIndex != 0 ? this.filteredArr[selecteDataIndex - 1] : this.filteredArr[selecteDataIndex];
    const currentElem = this.filteredArr[selecteDataIndex];

    this.LeftAnchor_DragAble_State.SetData(<PathData>currentElem, <PathData>prevElem);
    this.RightAnchor_DragAble_State.SetData(<PathData>currentElem, <PathData>nextElem);

    let leftAnc = document.getElementById("anchor__left");
    let rightAnc = document.getElementById("anchor__right");

    leftAnc.style.display = "block";
    rightAnc.style.display = "block";

    leftAnc.style.height = `${height}px`;
    rightAnc.style.height = `${height}px`;

    leftAnc.style.left = leftAnchorPoint.x.toString() + "px";
    leftAnc.style.top = leftAnchorPoint.y.toString() + "px";

    rightAnc.style.left = rightAnchorPoint.x.toString() + "px";
    rightAnc.style.top = rightAnchorPoint.y.toString() + "px";


  }

  private createAndAppendPath(x, y, length, fillColor, eventType: EventType, id: number) {
    let path = document.createElement("div");

    path.id = id.toString();
    path.classList.add("stroke", eventType.toString());
    path.style.position = "absolute";
    path.style.height = "7px";
    path.style.width = `${length}px`;
    path.style.left = `${x}px`;
    path.style.top = `${y}px`;
    path.style.backgroundColor = fillColor;
    path.style.cursor = "pointer";

    path.addEventListener("click", this.pathSelected.bind(this));

    this.canvasWrap.appendChild(path);
  }


  private grid() {
    this.ctx.strokeStyle = "#d1d0d0";
    this.ctx.lineWidth = 1;

    //horizontal lines
    for (let i = 0; i <= this.rows; i++) {
      this.stroke(this.tempX, this.tempY + (i * this.cellSize), this.columnslineWidth, Directions.right);
    }
    this.tempX = this.startPoint.x;
    //vertical lines
    for (let i = 0; i <= this.cols; i++) {
      this.stroke(this.tempX + (i * this.cellSize), this.tempY, this.rowsLineHeight, Directions.down);
    }
    //little divide strokes on each square
    for (let y = 0; y < this.rows; y++) {
      for (let i = 0; i < this.cols; i++) {
        //left quarter line on a cell
        this.stroke(this.tempX + (i * this.cellSize) + this.cellQuarter, this.tempY + (y * this.cellSize), this.cellSideDivider, Directions.down);
        //center a little bigger line on a cell
        this.stroke(this.tempX + (i * this.cellSize) + this.cellHalf, this.tempY + (y * this.cellSize), this.cellCenterDivider, Directions.down);
        //right quarter line on a cell
        this.stroke(this.tempX + (i * this.cellSize) + (this.cellHalf + this.cellQuarter), this.tempY + (y * this.cellSize), this.cellSideDivider, Directions.down);
      }
    }
  }

  private update() {
    this.calculateTimeDurations(this.timeDurations);
  }

  private text() {
    this.drawCurrentDate();
    this.drawHours();
    this.drawStateLabels();
    this.TimedurationPerState();
  }

  private drawCurrentDate() {
    let date: Date = this.filteredArr[0].date;
    let currentDate: string = DateUtil.DateConverter(date);

    this.ctx.font = "20px sans-serif";
    this.ctx.fillStyle = "#000";
    this.ctx.fillText(currentDate, this.tempX + (this.cellSize * 10), this.tempY - 30);
  }

  private TimedurationPerState() {

    // let timeDurations = {
    //   offDutyTimeDur: new Time(0, 0),
    //   sbTimeDur: new Time(0, 0),
    //   onDutyTimeDur: new Time(0, 0),
    //   driveTimeDur: new Time(0, 0)
    // };

    this.calculateTimeDurations(this.timeDurations);
    // this.drawTimeDurations(this.timeDurations);

  }

  // private drawTimeDurations(timeDurations) {
  //   this.ctx.font = "18px sans-serif";
  //   //OFF
  //   // this.ctx.fillStyle = "#AA4E44";
  //   // this.ctx.fillText(timeDurations.offDutyTimeDur, this.tempX + (this.cols * this.cellSize) + 10, this.tempY + this.cellHalf + 3);

  //   //SB
  //   this.ctx.fillStyle = "#303F4B";
  //   console.log("SB coordinates");

  //   console.log("x:" + (this.tempX + (this.cols * this.cellSize) + 10) + "    Y: "+ (this.tempY + (this.cellSize + this.cellHalf) + 3));

  //   // this.ctx.fillText(timeDurations.sbTimeDur, this.tempX + (this.cols * this.cellSize) + 10, this.tempY + (this.cellSize + this.cellHalf) + 3);

  //   //D
  //   this.ctx.fillStyle = "#627C5F";
  //   // this.ctx.fillText(timeDurations.driveTimeDur, this.tempX + (this.cols * this.cellSize) + 10, this.tempY + (this.cellSize * 2 + this.cellHalf) + 3);

  //   //ON
  //   this.ctx.fillStyle = "#D27D2A";
  //   // this.ctx.fillText(timeDurations.onDutyTimeDur, this.tempX + (this.cols * this.cellSize) + 10, this.tempY + (this.cellSize * 3 + this.cellHalf) + 3);
  // }


  private calculateTimeDurations(timeDurations) {
    timeDurations.reset();
    let endOfTheDay: Date = new Date(this.filteredArr[0].date.toUTCString());
    endOfTheDay.setHours(23);
    endOfTheDay.setMinutes(59);
    endOfTheDay.setSeconds(59);

    for (let index = 0; index < this.filteredArr.length; index++) {
      const element: Data = this.filteredArr[index];
      const nextElem = index + 1 < this.filteredArr.length ? this.filteredArr[index + 1] : null;

      let diffTime: Time = nextElem != null ? TimeUtil.differDates(nextElem.date, element.date) : TimeUtil.differDates(endOfTheDay, element.date);
      element["timeInState"] = diffTime;

      switch (element.eventType) {
        case EventType.Driving:
          timeDurations.driveTimeDur = TimeUtil.sumUpTimes(diffTime, timeDurations.driveTimeDur);
          break;
        case EventType.OffDuty:
          timeDurations.offDutyTimeDur = TimeUtil.sumUpTimes(diffTime, timeDurations.offDutyTimeDur);
          break;
        case EventType.OnDuty:
          timeDurations.onDutyTimeDur = TimeUtil.sumUpTimes(diffTime, timeDurations.onDutyTimeDur);
          break;
        case EventType.SleeperBerth:
          timeDurations.sbTimeDur = TimeUtil.sumUpTimes(diffTime, timeDurations.sbTimeDur);
          break;
      }

    }

  }


  private drawStateLabels() {
    this.ctx.font = "20px sans-serif";

    //OFF
    this.ctx.fillStyle = "#AA4E44";
    this.ctx.fillText("OFF", this.tempX - 50, this.tempY + this.cellHalf + 5);

    //SB
    this.ctx.fillStyle = "#303F4B";
    this.ctx.fillText("SB", this.tempX - 38, this.tempY + (this.cellSize + this.cellHalf) + 5);

    //D
    this.ctx.fillStyle = "#627C5F";
    this.ctx.fillText("D", this.tempX - 25, this.tempY + (this.cellSize * 2 + this.cellHalf) + 5);

    //ON
    this.ctx.fillStyle = "#D27D2A";
    this.ctx.fillText("ON", this.tempX - 40, this.tempY + (this.cellSize * 3 + this.cellHalf) + 5);
  }


  private drawHours() {
    this.ctx.fillStyle = "#d1d0d0";
    this.ctx.font = "10px serif";

    let hourSymbol = 0;
    let NM = false;

    for (let i = 0; i <= this.cols; i++) {
      if (hourSymbol == 0) {
        if (NM == false) {
          this.ctx.fillText("M", this.tempX + (i * this.cellSize) - 3, this.tempY - 5);
          NM = !NM;
        } else {
          this.ctx.fillText("N", this.tempX + (i * this.cellSize) - 3, this.tempY - 5);
          NM = !NM;
        }

        hourSymbol++;
      } else if (hourSymbol <= 11) {
        this.ctx.fillText(hourSymbol.toString(), this.tempX + (i * this.cellSize) - 3, this.tempY - 5);

        if (hourSymbol == 11) {
          hourSymbol = 0;
        } else {
          hourSymbol++;
        }
      }
    }
  }


  private stroke(x, y, length, direction) {
    let startPoint = new Point(x, y);
    let endPoint = new Point(x, y);

    switch (direction) {
      case Directions.up:
        endPoint.y -= length;
        break;
      case Directions.down:
        endPoint.y += length;
        break;
      case Directions.left:
        endPoint.x -= length;
        break;
      case Directions.right:
        endPoint.x += length;
        break;
    }

    this.ctx.beginPath()
    this.ctx.moveTo(startPoint.x, startPoint.y);
    this.ctx.lineTo(endPoint.x, endPoint.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private EventTypeToColorPalette(type: string): ColorPalette {

    let CP: ColorPalette;
    switch (type) {
      case EventType.Driving.toString():
        CP = {
          mainColor: this.drivingColor,
          dimColor: this.drivingColorDim
        }
        return CP;
        break;
      case
        EventType.OffDuty.toString():
        CP = {
          mainColor: this.offDutyColor,
          dimColor: this.offDutyColorDim
        }
        return CP;
        break;
      case EventType.OnDuty.toString():
        CP = {
          mainColor: this.onDutyColor,
          dimColor: this.onDutyColorDim
        }
        return CP;
        break;
      case EventType.SleeperBerth.toString():
        CP = {
          mainColor: this.sleeperBerthColor,
          dimColor: this.sleeperBerthColorDim
        }
        return CP;
        break;

    }
  }

  private PxToValue(styleValue: string): number {
    const res = /(.+)px/.exec(styleValue)[1];

    return +res;
  }

}
