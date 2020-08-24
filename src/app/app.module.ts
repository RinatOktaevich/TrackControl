import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { EventService } from "./event.service";
import { EventInfoComponent } from './event-info/event-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    EventInfoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
