import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Account } from '../account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-accounts-form',
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.css']
})
export class AccountsFormComponent implements OnInit {

  account: Account;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: AccountsService, 
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.account = new Account();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getAccountById(this.id)
          .subscribe (
            response => this.account = response,
            errorResponse => this.account = new Account()
          )
      }
    })
  }

  backtoList() {
    this.router.navigate(['/contas/list']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update(this.account)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a conta.']
        })
    } else {
      this.account.usernameAppUser = this.authService.getAuthenticadtedUser();
      console.log(this.account)
      this.service
        .save(this.account)
        .subscribe(response => {
          this.success = true;
          this.account = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}


