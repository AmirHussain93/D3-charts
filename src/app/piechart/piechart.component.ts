import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  title = 'Pie Chart';
  activeTabValue = { 'activetab': 3 }
  population: any[];

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  constructor(private sharedService: SharedService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.sharedService.setActiveTab(this.activeTabValue);
    this.sharedService.getPieData('assets/population.json')
      .subscribe(
        result => {
          this.population = result;
          this.initSvg();
          this.drawPie();
        },
        error => {

        }
      )
  }

  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.population);
    console.log(this.pie)
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawPie() {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(this.population))
      .enter().append('g')
      .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.age));
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.age);
  }


}
