import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Goal } from 'src/app/goals/goal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  apiURL: string = environment.apiURLBase + '/api/goals';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(goal: Goal) : Observable<Goal> { 
    return this.http.post<Goal>(`${this.apiURL}`, goal);
  }

  update(goal: Goal) : Observable<any> {
    return this.http.put<Goal>(`${this.apiURL}/${goal.id}`, goal);
  }

  getGoals() : Observable<Goal[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/goalsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getGoalById (id: number): Observable<Goal> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (goal:Goal) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${goal.id}`);
  }

}

