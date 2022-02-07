import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../user';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  user: User;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    this.user = new User();
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      console.log(this.id);
      if (this.id){
        this.service
          .getUserById(this.id)
          .subscribe (
            response => {this.user = response,
            console.log(this.user)},
            errorResponse => this.user = new User()
          )
      }
    })
  }

  backtoList() {
    this.router.navigate(['/usuarios/list']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update(this.user)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o usuário.']
        })
    } else {
      this.service
        .save(this.user)
        .subscribe(response => {
          this.success = true;
          this.user = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}

