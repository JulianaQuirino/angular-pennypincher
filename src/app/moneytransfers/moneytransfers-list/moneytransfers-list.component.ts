import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Moneytransfer } from '../moneytransfer';
import { MoneytransfersService } from 'src/app/shared/services/moneytransfers.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';
import { MoneytransferList } from '../moneytransferList';

@Component({
  selector: 'app-moneytransfers-list',
  templateUrl: './moneytransfers-list.component.html',
  styleUrls: ['./moneytransfers-list.component.css']
})
export class MoneytransfersListComponent implements OnInit {

  moneytransfers : MoneytransferList[] = [];
  selectedMoneytransfer : MoneytransferList;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service : MoneytransfersService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new(){
    this.router.navigate(['/transferencias/form']);
  }

  ngOnInit(): void {
    this.service
    .getMoneytransfers()
    .subscribe( response => this.moneytransfers = response);
  }

  prepareToDelete( moneytransfer : MoneytransferList ) {
    this.selectedMoneytransfer = moneytransfer;
  }

  deleteMoneytransfer(){
    this.service
      .delete(this.selectedMoneytransfer)
      .subscribe(
        response => {this.successMessage = 'Transferência deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a meta.'
      )
  }

  public exportExcel(){
    let header=["ID","Nome", "Valor"];
    this.downloadExcelService.exportExcel(this.moneytransfers, header, "Transferências", 3);
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



