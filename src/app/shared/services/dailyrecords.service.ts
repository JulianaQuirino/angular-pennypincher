import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DailyRecord } from 'src/app/dailyrecords/dailyrecord';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DailyRecordsService {

  apiURL: string = environment.apiURLBase + '/api/dailyRecords';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(dailyRecord: DailyRecord) : Observable<DailyRecord> { 
    return this.http.post<DailyRecord>(`${this.apiURL}`, dailyRecord);
  }

  update(dailyRecord: DailyRecord) : Observable<any> {
    return this.http.put<DailyRecord>(`${this.apiURL}/${dailyRecord.id}`, dailyRecord);
  }

  getDailyRecords() : Observable<DailyRecord[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/dailyRecordsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getDailyRecordById (id: number): Observable<DailyRecord> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (dailyRecord:DailyRecord) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${dailyRecord.id}`);
  }

}
