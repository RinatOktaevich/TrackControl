import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Point } from "./../../assets/Point";
import { Time } from "./../../assets/Time"
import { Directions } from "./../../assets/Direction";
import { Data } from '@angular/router';
import { EventType } from "./../../assets/EventType";
import { TimeUtil } from "./../../assets/TimeUtil";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewChecked {

  private canvas: any;
  private ctx: CanvasRenderingContext2D;

  // @Input() createdAsset: IAsset = null;
  // @Output() assetDeletedEvent: EventEmitter<IAsset> = new EventEmitter<IAsset>();

  @Input() canvasConfig: any = null;
  @Input() dataArr: Data[] = [];


  //cell config variables
  private cellSize;

  private cellHalf;
  private cellQuarter;

  private cellSideDivider;
  private cellCenterDivider;

  // grid config variables
  //to make grid centered
  private cols;
  private rows;
  private gridStartCoordinate;

  private startPoint;

  private tempX;
  private tempY;

  private columnslineWidth;
  private rowsLineHeight;



  constructor() {
  }

  ngAfterViewChecked() {
    this.canvas = document.getElementById("chart");
    this.ctx = this.canvas.getContext('2d');


    this.Render();
  }

  ngOnInit(): void {

    //cell config variables
    this.cellSize = this.canvasConfig.grid.cell.size;

    this.cellHalf = this.cellSize / 2;
    this.cellQuarter = this.cellSize / 4;

    this.cellSideDivider = this.canvasConfig.grid.cell.dividersLength.sides;
    this.cellCenterDivider = this.canvasConfig.grid.cell.dividersLength.center;

    // grid config variables
    //to make grid centered
    this.cols = this.canvasConfig.grid.cols;
    this.rows = this.canvasConfig.grid.rows;
    this.gridStartCoordinate = (this.canvasConfig.width - (this.cellSize * this.cols)) / 2;

    this.startPoint = new Point(this.gridStartCoordinate, 30);

    this.tempX = this.startPoint.x;
    this.tempY = this.startPoint.y;

    this.columnslineWidth = this.cellSize * this.cols;
    this.rowsLineHeight = this.cellSize * this.rows;

  }


  public Render() {
    this.grid();
    this.text();
  }



  private grid() {
    this.ctx.strokeStyle = "#d1d0d0";

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


  private text() {
    this.drawHours();
    this.drawStateLabels();
    this.drawTimedurationPerState();
  }


  private drawTimedurationPerState() {

    let offDutyTimeDur: Time;
    let sbTimeDur: Time;
    let onDutyTimeDur: Time;
    let driveTimeDur: Time;

    this.calculateTimeDurations(offDutyTimeDur, sbTimeDur, onDutyTimeDur, driveTimeDur);

  }


  private calculateTimeDurations(offDutyTimeDur: Time, sbTimeDur: Time, onDutyTimeDur: Time, driveTimeDur: Time) {
    for (let index = 0; index < this.dataArr.length; index++) {
      const element = this.dataArr[index];
      const nextElem = index + 1 < this.dataArr.length ? this.dataArr[index + 1] : null;


      switch (element.eventType) {
        case EventType.Driving:

          if (nextElem != null) {
            let diffTime = TimeUtil.differDates(nextElem.date, element.date);
            driveTimeDur = TimeUtil.sumUpTimes(diffTime, driveTimeDur);
          } else {
            let endOfTheDay = element.date;
            endOfTheDay.setHour(23);
            endOfTheDay.setMinutes(59);
            endOfTheDay.setSeconds(59);

            let diffTime = TimeUtil.differDates(endOfTheDay, element.date);
            driveTimeDur = TimeUtil.sumUpTimes(diffTime, driveTimeDur);
          }
          break;
        case EventType.OffDuty:
          if (nextElem != null) {
            let diffTime = TimeUtil.differDates(nextElem.date, element.date);
            offDutyTimeDur = TimeUtil.sumUpTimes(diffTime, offDutyTimeDur);
          } else {
            let endOfTheDay = element.date;
            endOfTheDay.setHour(23);
            endOfTheDay.setMinutes(59);
            endOfTheDay.setSeconds(59);

            let diffTime = TimeUtil.differDates(endOfTheDay, element.date);
            offDutyTimeDur = TimeUtil.sumUpTimes(diffTime, offDutyTimeDur);
          }
          break;
        case EventType.OnDuty:
          if (nextElem != null) {
            let diffTime = TimeUtil.differDates(nextElem.date, element.date);
            onDutyTimeDur = TimeUtil.sumUpTimes(diffTime, onDutyTimeDur);
          } else {
            let endOfTheDay = element.date;
            endOfTheDay.setHour(23);
            endOfTheDay.setMinutes(59);
            endOfTheDay.setSeconds(59);

            let diffTime = TimeUtil.differDates(endOfTheDay, element.date);
            onDutyTimeDur = TimeUtil.sumUpTimes(diffTime, onDutyTimeDur);
          }
          break;
        case EventType.SleeperBerth:
          if (nextElem != null) {
            let diffTime = TimeUtil.differDates(nextElem.date, element.date);
            sbTimeDur = TimeUtil.sumUpTimes(diffTime, sbTimeDur);
          } else {
            let endOfTheDay = element.date;
            endOfTheDay.setHour(23);
            endOfTheDay.setMinutes(59);
            endOfTheDay.setSeconds(59);

            let diffTime = TimeUtil.differDates(endOfTheDay, element.date);
            sbTimeDur = TimeUtil.sumUpTimes(diffTime, sbTimeDur);
          }
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

    // D27D2A
    //ON
    this.ctx.fillStyle = "#D27D2A";
    this.ctx.fillText("ON", this.tempX - 40, this.tempY + (this.cellSize * 3 + this.cellHalf) + 5);
  }


  private drawHours() {
    this.ctx.fillStyle = "#d1d0d0";
    this.ctx.font = "10px serif";
    // ctx.fillText("M", 50, 100);


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

    this.ctx.moveTo(startPoint.x, startPoint.y);
    this.ctx.lineTo(endPoint.x, endPoint.y);
    this.ctx.stroke();
  }

}
