import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Limit } from '../limit';
import { LimitsService } from '../../shared/services/limits.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-limits-form',
  templateUrl: './limits-form.component.html',
  styleUrls: ['./limits-form.component.css']
})
export class LimitsFormComponent implements OnInit {

  limit: Limit;
  success: boolean = false;
  errors: String[];
  id: number;
  selectedType: string = 'D';
  categories: Category[] = [];
  month: number;
  year: number;

  constructor(private service: LimitsService, 
    private categoryService: CategoriesService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.limit = new Limit();
  }

  ngOnInit(): void {
    this.changeCategories(this.selectedType);
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getLimitById(this.id)
          .subscribe (
            response => this.limit = response,
            errorResponse => this.limit = new Limit()
          )
          console.log(this.limit)
      }
    })
  }

  backtoList() {
    this.router.navigate(['/limites/list']);
  }

  onSubmit() {
    console.log(this.limit)
    if (this.id) {
      this.service
        .update(this.limit)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a categoria.']
        })
    } else {
      this.limit.usernameAppUser = this.authService.getAuthenticadtedUser();
      this.service
        .save(this.limit)
        .subscribe(response => {
          this.success = true;
          this.limit = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }
  }

  changeCategories(newType: string) {
    console.log(newType);
    this.selectedType = newType;
    if (newType) {
      this.categoryService.getCategoriesByTypeUsername(this.selectedType)
        .subscribe(response => {
          this.categories = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        })
    }
  }


}


