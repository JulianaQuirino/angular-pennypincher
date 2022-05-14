import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DailyRecord } from 'src/app/dailyrecords/dailyrecord';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { ChartCategories } from 'src/app/charts/chartCategories';
import { ChartProjects } from 'src/app/charts/chartProjects';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  apiURL: string = environment.apiURLBase + '/api/charts';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  getValuesChartCategories(month: number, year: number, categoryType: string) : Observable<ChartCategories[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("categoryType", categoryType)
    .set("month", month)
    .set("year", year)
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/categoriesByTypeMonthYearUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }

  getDebitsOfProject(projectId: number) : Observable<ChartProjects[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("projectId", projectId)
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/debitsOfProject/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }


}
