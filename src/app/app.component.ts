import { Component, OnInit } from '@angular/core';
import { canvasConf, dataArr } from "./../assets/constants";
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // canvasConf: any;

  canvasConf;
  dataArray: Data[];

  ngOnInit(): void {
    this.canvasConf = canvasConf;
    this.dataArray = dataArr;


  }
}
