import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  accounts: Account[] = [];
  selectedAccount: Account;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service: AccountsService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new() {
    this.router.navigate(['/contas/form']);
  }

  ngOnInit(): void {
    this.service
      .getAccounts()
      .subscribe(response => this.accounts = response);
  }

  prepareToDelete(Account: Account) {
    this.selectedAccount = Account;
  }

  deleteAccount() {
    this.service
      .delete(this.selectedAccount)
      .subscribe(
        response => {
          this.successMessage = 'Conta deletada com sucesso!',
            this.ngOnInit();
        },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a conta.'
      )
  }

  public exportExcel(){
    let header=["ID","Nome", "Descrição"];
    this.downloadExcelService.exportExcel(this.accounts, header, "Contas", 3);
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




