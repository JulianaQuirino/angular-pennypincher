import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Project } from 'src/app/projects/project';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiURL: string = environment.apiURLBase + '/api/projects';

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  save(project: Project) : Observable<Project> { 
    return this.http.post<Project>(`${this.apiURL}`, project);
  }

  update(project: Project) : Observable<any> {
    return this.http.put<Project>(`${this.apiURL}/${project.id}`, project);
  }

  getProjects() : Observable<Project[]>{

    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = this.apiURL + "/projectsByUsername/?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getProjectById (id: number): Observable<Project> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete (project:Project) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${project.id}`);
  }

}
