import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {


  activetab: number;

  constructor(private router: Router, private sharedService: SharedService, private cdrf: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.sharedService.getActiveTab().subscribe(
      result => {
        this.activetab = result.activetab;
        console.log(this.activetab);
      },
      error => {

      }
    )
    this.cdrf.detectChanges();
  }
  navigate(path) {
    this.router.navigate([`/${path}`]);
  }
}
