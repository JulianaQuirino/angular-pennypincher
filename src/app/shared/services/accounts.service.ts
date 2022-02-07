import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Account } from 'src/app/accounts/account';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  apiURL: string = environment.apiURLBase + '/api/accounts';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(account: Account) : Observable<Account> { 
    return this.http.post<Account>(`${this.apiURL}`, account);
  }

  update(account: Account) : Observable<any> {
    return this.http.put<Account>(`${this.apiURL}/${account.id}`, account);
  }

  getAccounts() : Observable<Account[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/accountsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getAccountById (id: number): Observable<Account> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (account:Account) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${account.id}`);
  }

}
