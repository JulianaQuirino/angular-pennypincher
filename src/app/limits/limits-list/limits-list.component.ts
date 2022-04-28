import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { LimitsService } from 'src/app/shared/services/limits.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';
import { LimitListItem } from '../limitListItem';

@Component({
  selector: 'app-limits-list',
  templateUrl: './limits-list.component.html',
  styleUrls: ['./limits-list.component.css']
})
export class LimitsListComponent implements OnInit {

  limits : LimitListItem[] = [];
  selectedLimit : LimitListItem;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service : LimitsService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new(){
    this.router.navigate(['/limites/form']);
  }

  ngOnInit(): void {
    this.service
    .getLimits()
    .subscribe( response => this.limits = response);
  }

  prepareToDelete( limit:LimitListItem ) {
    this.selectedLimit = limit;
  }

  deleteLimit(){
    this.service
      .delete(this.selectedLimit)
      .subscribe(
        response => {this.successMessage = 'Categoria deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar o limite.'
      )
  }

  public exportExcel(){
    let header=["ID", "Categoria", "Valor máximo", "Mês", "Ano", ];
    this.downloadExcelService.exportExcel(this.limits, header, "Limites", 5);
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
