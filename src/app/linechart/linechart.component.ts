import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { SharedService } from '../services/shared.service';
import { StockModel } from '../model/stock.model';


@Component({
  selector: 'app-linechart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  title = 'Line Chart';
  stock: StockModel[];

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  activeTabValue = { 'activetab': 2 }
  constructor(private sharedService: SharedService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.sharedService.setActiveTab(this.activeTabValue);
    this.sharedService.getLineDate('assets/stocks.json')
      .subscribe(
        result => {
          let STOCK = [];
          result.map(d => {
            STOCK.push({
              date: new Date(d.date),
              value: d.value
            })
          })

          this.stock = STOCK;
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawLine();
        },
        error => {

        }
      )
  }

  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.stock, (d) => d.date));
    this.y.domain(d3Array.extent(this.stock, (d) => d.value));
  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.stock)
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
