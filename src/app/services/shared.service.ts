import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  activelink: string;

  private subject = new Subject<any>();

  constructor(private _http: HttpClient) { }

  getBarData(url) {
    return this._http.get<any>(url)
      .pipe(catchError(this.errorHandler));
  }

  getLineDate(url) {
    return this._http.get<any>(url)
      .pipe(catchError(this.errorHandler));
  }

  getPieData(url) {
    return this._http.get<any>(url)
      .pipe(catchError(this.errorHandler));
  }

  getMultiSeriesData(url) {
    return this._http.get<any>(url)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  setActiveTab(activetab: any) {
    this.subject.next(activetab);
  }

  getActiveTab(): Observable<any> {
    return this.subject.asObservable();
  }


}
