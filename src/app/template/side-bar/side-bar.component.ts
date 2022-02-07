import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  loggedUser: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getAuthenticadtedUser();
  }

  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
