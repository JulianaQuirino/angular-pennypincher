import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Goal } from '../goal';
import { GoalsService } from 'src/app/shared/services/goals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-goals-form',
  templateUrl: './goals-form.component.html',
  styleUrls: ['./goals-form.component.css']
})
export class GoalsFormComponent implements OnInit {

  goal: Goal;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: GoalsService, 
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.goal = new Goal();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getGoalById(this.id)
          .subscribe (
            response => this.goal = response,
            errorResponse => this.goal = new Goal()
          )
      }
    })
  }

  backtoList() {
    this.router.navigate(['/metas/list']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update(this.goal)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a meta.']
        })
    } else {
      this.goal.usernameAppUser = this.authService.getAuthenticadtedUser();
      console.log(this.goal)
      this.service
        .save(this.goal)
        .subscribe(response => {
          this.success = true;
          this.goal = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}




