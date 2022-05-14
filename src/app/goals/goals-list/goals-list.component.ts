import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Goal } from '../goal';
import { GoalsService } from 'src/app/shared/services/goals.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent implements OnInit {

  goals : Goal[] = [];
  selectedGoal : Goal;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service : GoalsService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new(){
    this.router.navigate(['/metas/form']);
  }

  ngOnInit(): void {
    this.service
    .getGoals()
    .subscribe( response => this.goals = response);
  }

  prepareToDelete( goal : Goal ) {
    this.selectedGoal = goal;
  }

  deleteGoal(){
    this.service
      .delete(this.selectedGoal)
      .subscribe(
        response => {this.successMessage = 'Meta deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a meta.'
      )
  }

  public exportExcel(){
    let header=["ID","Nome", "Valor"];
    this.downloadExcelService.exportExcel(this.goals, header, "Metas", 3);
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


