import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Project } from '../project';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects : Project[] = [];
  selectedProject : Project;
  successMessage: string;
  errorMessage: string;


  constructor(private service : ProjectsService, 
    private router: Router) { }

  new(){
    this.router.navigate(['/projetos/form']);
  }

  ngOnInit(): void {
    this.service
    .getProjects()
    .subscribe( response => this.projects = response);
  }

  prepareToDelete( Project:Project ) {
    this.selectedProject = Project;
  }

  deleteProject(){
    this.service
      .delete(this.selectedProject)
      .subscribe(
        response => {this.successMessage = 'Projeto deletado com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar o projeto.'
      )
  }



}


