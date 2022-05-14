import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Moneytransfer } from 'src/app/moneytransfers/moneytransfer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { MoneytransferList } from 'src/app/moneytransfers/moneytransferList';

@Injectable({
  providedIn: 'root'
})
export class MoneytransfersService {

  apiURL: string = environment.apiURLBase + '/api/moneytransfers';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(moneytransfer: Moneytransfer) : Observable<Moneytransfer> { 
    return this.http.post<Moneytransfer>(`${this.apiURL}`, moneytransfer);
  }

  getMoneytransfers() : Observable<MoneytransferList[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/moneytransfersByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getMoneytransferById (id: number): Observable<Moneytransfer> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (moneytransfer:MoneytransferList) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${moneytransfer.id}`);
  }

}

