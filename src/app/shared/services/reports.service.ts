import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { ChartCategories } from 'src/app/charts/chartCategories';
import { RecordsReport } from 'src/app/reports/recordsReports';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  apiURL: string = environment.apiURLBase + '/api/reports';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  getRecordsReport(month: number, year: number, categoryId: number) : Observable<RecordsReport[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("categoryId", categoryId)
    .set("month", month)
    .set("year", year)
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/recordsByTypeIdMonthYearUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }

}
