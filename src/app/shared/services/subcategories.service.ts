import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subcategory } from 'src/app/subcategories/subcategories';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import { SubcategoryItem } from 'src/app/subcategories/subcategoriesItem';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  apiURL: string = environment.apiURLBase + '/api/subcategories';

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  save(subcategory: Subcategory) : Observable<Subcategory> { 
    return this.http.post<Subcategory>(`${this.apiURL}`, subcategory);
  }

  update(subcategory: Subcategory) : Observable<any> {
    return this.http.put<Subcategory>(`${this.apiURL}/${subcategory.id}`, subcategory);
  }

  getSubcategories() : Observable<SubcategoryItem[]>{
    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/subcategoriesByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getSubcategoriesByIdCategory(idCategory: number) : Observable<SubcategoryItem[]>{
    const httpParams = new HttpParams()
      .set("idCategory", idCategory);

    const url = this.apiURL + "/subcategoriesByIdCategory/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getSubcategoryById (id: number): Observable<Subcategory> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (subcategory:SubcategoryItem) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${subcategory.id}`);
  }

}
