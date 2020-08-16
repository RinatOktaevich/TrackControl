import { Component, OnInit, Input } from '@angular/core';
import { Point } from "./../../assets/Point";
import { Directions } from "./../../assets/Direction";
import { Data } from '@angular/router';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private ctx: CanvasRenderingContext2D;

  // @Input() createdAsset: IAsset = null;
  // @Output() assetDeletedEvent: EventEmitter<IAsset> = new EventEmitter<IAsset>();

  @Input() canvasConf: any = null;
  @Input() data: Data[] = [];


  //cell config variables
  private cellSize = this.canvasConf.grid.cell.size;

  private cellHalf = this.cellSize / 2;
  private cellQuarter = this.cellSize / 4;

  private cellSideDivider = this.canvasConf.grid.cell.dividersLength.sides;
  private cellCenterDivider = this.canvasConf.grid.cell.dividersLength.center;

  // grid config variables
  //to make grid centered
  private cols = this.canvasConf.grid.cols;
  private rows = this.canvasConf.grid.rows;
  private gridStartCoordinate = (this.canvasConf.width - (this.cellSize * this.cols)) / 2;

  private startPoint = new Point(this.gridStartCoordinate, 30);

  private tempX = this.startPoint.x;
  private tempY = this.startPoint.y;

  private columnslineWidth = this.cellSize * this.cols;
  private rowsLineHeight = this.cellSize * this.rows;



  constructor() {
    let canvas: any = document.getElementById("chart");
    this.ctx = canvas.getContext('2d');
  }

  ngOnInit(): void {
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
