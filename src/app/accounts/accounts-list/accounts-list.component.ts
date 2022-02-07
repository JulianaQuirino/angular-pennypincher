import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Account } from '../account';
import { AccountsService } from 'src/app/shared/services/accounts.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  accounts : Account[] = [];
  selectedAccount : Account;
  successMessage: string;
  errorMessage: string;


  constructor(private service : AccountsService, 
    private router: Router) { }

  new(){
    this.router.navigate(['/contas/form']);
  }

  ngOnInit(): void {
    this.service
    .getAccounts()
    .subscribe( response => this.accounts = response);
  }

  prepareToDelete( Account:Account ) {
    this.selectedAccount = Account;
  }

  deleteAccount(){
    this.service
      .delete(this.selectedAccount)
      .subscribe(
        response => {this.successMessage = 'Conta deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a conta.'
      )
  }



}

