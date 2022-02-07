import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Category } from 'src/app/categories/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURL: string = environment.apiURLBase + '/api/categories';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(category: Category) : Observable<Category> { 
    return this.http.post<Category>(`${this.apiURL}`, category);
  }

  update(category: Category) : Observable<any> {
    return this.http.put<Category>(`${this.apiURL}/${category.id}`, category);
  }

  getCategories() : Observable<Category[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/categoriesByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getCategoriesByTypeUsername(type: string) : Observable<Category[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("categoryType", type)
      .set("username", usernameAppUser);

    const url = this.apiURL + "/categoriesByTypeUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getCategoryById (id: number): Observable<Category> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (category:Category) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${category.id}`);
  }

}
