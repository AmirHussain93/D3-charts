import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { PiechartComponent } from './piechart/piechart.component';
import { MultilineseriesComponent } from './multilineseries/multilineseries.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    LinechartComponent,
    PiechartComponent,
    MultilineseriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: BarchartComponent },
      { path: 'barchart', component: BarchartComponent },
      { path: 'linechart', component: LinechartComponent },
      { path: 'piechart', component: PiechartComponent },
      { path: 'multilinechart', component: MultilineseriesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
