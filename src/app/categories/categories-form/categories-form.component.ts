
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Category } from '../category';
import { CategoriesService } from '../../shared/services/categories.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  category: Category;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: CategoriesService, 
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.category = new Category();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getCategoryById(this.id)
          .subscribe (
            response => this.category = response,
            errorResponse => this.category = new Category()
          )
          console.log(this.category)
      }
    })
  }

  backtoList() {
    this.router.navigate(['/categorias/list']);
  }

  onSubmit() {
    if (this.id) {
      this.service
        .update(this.category)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a categoria.']
        })
    } else {
      this.category.usernameAppUser = this.authService.getAuthenticadtedUser();
      this.service
        .save(this.category)
        .subscribe(response => {
          this.success = true;
          this.category = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}

