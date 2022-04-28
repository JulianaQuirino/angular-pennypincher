import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Limit } from 'src/app/limits/limit';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { LimitListItem } from 'src/app/limits/limitListItem';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  apiURL: string = environment.apiURLBase + '/api/limits';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(limit: Limit) : Observable<Limit> { 
    return this.http.post<Limit>(`${this.apiURL}`, limit);
  }

  update(limit: Limit) : Observable<any> {
    return this.http.put<Limit>(`${this.apiURL}/${limit.id}`, limit);
  }

  getLimits() : Observable<LimitListItem[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/limitsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getLimitById (id: number): Observable<Limit> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (limit:LimitListItem) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${limit.id}`);
  }

}

