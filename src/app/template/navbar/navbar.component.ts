import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/users/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : User;

  constructor(private authservice : AuthService) { 
    
  }

  ngOnInit(): void {
    this.authservice.getUserByUsername()
    .subscribe(response => this.user = response);
  }

  isUserAdmin(){
    if(this.user && this.user.admin){
      return true;
    } 
    return false;
  }

}
