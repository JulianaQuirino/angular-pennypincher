import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Record } from 'src/app/dailyrecords/record';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { RecordList } from 'src/app/dailyrecords/recordList';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  apiURL: string = environment.apiURLBase + '/api/records';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(record: Record) : Observable<Record> { 
    return this.http.post<Record>(`${this.apiURL}`, record);
  }

  update(record: Record) : Observable<any> {
    return this.http.put<Record>(`${this.apiURL}/${record.id}`, record);
  }

  getRecords() : Observable<Record[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/recordsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getRecordsByDailyRecord(idDailyRecord: number) : Observable<RecordList[]>{

    const httpParams = new HttpParams()
      .set("idDailyRecord", idDailyRecord);

    const url = this.apiURL + "/recordsByDailyRecord/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getRecordById (id: number): Observable<Record> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (record:Record) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${record.id}`);
  }

}
