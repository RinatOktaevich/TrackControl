import { Injectable } from '@angular/core';
import { dataArr } from "./../assets/constants";
import { cloneDeep } from "lodash";
import { Event } from "./../assets/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsArr: Event[];

  constructor() {
    //emulate backend...
    this.eventsArr = cloneDeep(dataArr);
    this.initDataWithIds(this.eventsArr);
  }



  getEvents(): Event[] {
    return this.eventsArr;
  }

  setEvent(event: Event) {
    let index = this.eventsArr.findIndex(v => v.id == event.id);
    this.eventsArr[index] = cloneDeep(event);
  }




  private initDataWithIds(data: Event[]): Event[] {
    for (let index = 0; index < data.length; index++) {
      const element: Event = data[index];
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
