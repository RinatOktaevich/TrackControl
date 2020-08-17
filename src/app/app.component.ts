import { Component, OnInit } from '@angular/core';
import { canvasConf } from "./../assets/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // canvasConf: any;

  canvasConf;

  ngOnInit(): void {
    this.canvasConf = canvasConf;
  }
}
