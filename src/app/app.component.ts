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
    this.dataArray = this.initDataId(dataArr);
    console.log(this.dataArray);



  }

  private initDataId(data: Data[]): Data[] {
    for (let index = 0; index < data.length; index++) {
      const element: Data = data[index];
      element.id = this.generateId(3);
    }

    return data;
  }


  private generateId(length): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
