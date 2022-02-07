import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { User } from 'src/app/users/user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users : User[] = [];
  selectedUser : User;
  successMessage: string;
  errorMessage: string;


  constructor(private service : AuthService, 
    private router: Router) { }

  new(){
    this.router.navigate(['/usuarios/form']);
  }

  ngOnInit(): void {
    this.service
    .getAllUsers()
    .subscribe( response => this.users = response);
  }

  prepareToDelete( user : User ) {
    this.selectedUser = user;
  }

  deleteUser(){
    this.service
      .delete(this.selectedUser.username)
      .subscribe(
        response => {this.successMessage = 'Usuário deletado com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar o usuário.'
      )
  }



}
