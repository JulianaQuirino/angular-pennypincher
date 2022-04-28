import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { DailyRecord } from '../dailyrecord';
import { DailyRecordsService } from 'src/app/shared/services/dailyrecords.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

@Component({
  selector: 'app-dailyrecords-list',
  templateUrl: './dailyrecords-list.component.html',
  styleUrls: ['./dailyrecords-list.component.css']
})
export class DailyrecordsListComponent implements OnInit {

  dailyRecords : DailyRecord[] = [];
  selectedDailyRecord : DailyRecord;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service : DailyRecordsService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new(){
    this.router.navigate(['/lancamentos/form']);
  }

  ngOnInit(): void {
    this.service
    .getDailyRecords()
    .subscribe( response => this.dailyRecords = response);
  }

  prepareToDelete( dailyRecord:DailyRecord ) {
    this.selectedDailyRecord = dailyRecord;
  }

  deleteDailyRecord(){
    this.service
      .delete(this.selectedDailyRecord)
      .subscribe(
        response => {this.successMessage = 'Lançamento deletado com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar o lançamento.'
      )
  }


  public exportExcel(){
    let header=["ID","Data", "Débitos", "Créditos"];
    this.downloadExcelService.exportExcel(this.dailyRecords, header, "Lançamentos", 4);
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



