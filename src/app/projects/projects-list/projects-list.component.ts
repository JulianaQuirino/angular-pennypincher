import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Project } from '../project';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

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
  reportMode : boolean = false;


  constructor(private service : ProjectsService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

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

  public exportExcel(){
    let header=["ID","Nome", "Descrição"];
    this.downloadExcelService.exportExcel(this.projects, header, "Projetos", 3);
  }

  public printReports() {
    this.reportMode = true; 
  }

  public allOptions() {
    this.reportMode = false; 
  }

  public exportToPDF(elementId: string, fileName: string){
    this.downloadPDFService.exportToPDF(elementId, fileName);
  }

}


