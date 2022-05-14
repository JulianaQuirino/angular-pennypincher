import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Moneytransfer } from '../moneytransfer';
import { MoneytransfersService } from 'src/app/shared/services/moneytransfers.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Account } from 'src/app/accounts/account';
import { Goal } from 'src/app/goals/goal';
import { GoalsService } from 'src/app/shared/services/goals.service';

@Component({
  selector: 'app-moneytransfers-form',
  templateUrl: './moneytransfers-form.component.html',
  styleUrls: ['./moneytransfers-form.component.css']
})
export class MoneytransfersFormComponent implements OnInit {

  moneytransfer: Moneytransfer;
  success: boolean = false;
  errors: String[];
  id: number;
  debitAccounts: Account[] = [];
  creditAccounts: Account[] = [];
  goals: Goal[] = [];

  constructor(private service: MoneytransfersService, 
    private authService: AuthService,
    private accountService: AccountsService,
    private goalService: GoalsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.moneytransfer = new Moneytransfer();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getMoneytransferById(this.id)
          .subscribe (
            response => this.moneytransfer = response,
            errorResponse => this.moneytransfer = new Moneytransfer()
          )
      }
    })

    this.accountService
    .getAccounts()
    .subscribe(
      response => this.debitAccounts = response,
      errorResponse => this.debitAccounts = []
    )

    this.accountService
    .getAccounts()
    .subscribe(
      response => this.creditAccounts = response,
      errorResponse => this.creditAccounts = []
    )

    this.goalService
    .getGoals()
    .subscribe(
      response => this.goals = response,
      errorResponse => this.goals = []
    )
  }

  backtoList() {
    this.router.navigate(['/transferencias/list']);
  }

  // Used only to save the instance
  onSubmit() {
    if (this.id == null) {
      this.moneytransfer.usernameAppUser = this.authService.getAuthenticadtedUser();
      console.log(this.moneytransfer)
      this.service
        .save(this.moneytransfer)
        .subscribe(response => {
          this.success = true;
          this.moneytransfer = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}





