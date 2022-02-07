import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../project';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css']
})
export class ProjectsFormComponent implements OnInit {

  project: Project;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: ProjectsService, 
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.project = new Project();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getProjectById(this.id)
          .subscribe (
            response => this.project = response,
            errorResponse => this.project = new Project()
          )
      }
    })
  }

  backtoList() {
    this.router.navigate(['/projetos/list']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update(this.project)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o projeto.']
        })
    } else {
      this.project.usernameAppUser = this.authService.getAuthenticadtedUser();
      console.log(this.project)
      this.service
        .save(this.project)
        .subscribe(response => {
          this.success = true;
          this.project = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}



