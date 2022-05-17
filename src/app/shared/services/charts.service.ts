import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DailyRecord } from 'src/app/dailyrecords/dailyrecord';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { ChartCategories } from 'src/app/charts/chartCategories';
import { ChartProjects } from 'src/app/charts/chartProjects';
import { ChartGoals } from 'src/app/charts/chartGoals';
import { ChartAccounts } from 'src/app/charts/chartAccounts';
import { ChartSubcategories } from 'src/app/charts/chartSubcategories';

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

  
  getGoalsStatus() : Observable<ChartGoals[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/goalsStatusByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }

  getAccountsBalanceByMonthYear(month: number, year: number) : Observable<ChartAccounts[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("month", month)
    .set("year", year)
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/accountsBalanceByMonthYearUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }

  getValuesChartSubcategories(categoryId: number, month: number, year: number) : Observable<ChartSubcategories[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
    .set("categoryId", categoryId)
    .set("month", month)
    .set("year", year)
    .set("username", usernameAppUser);

    console.log(httpParams.toString());

    const url = this.apiURL + "/subcategoriesByCategoryMonthYearUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);

  }


}
