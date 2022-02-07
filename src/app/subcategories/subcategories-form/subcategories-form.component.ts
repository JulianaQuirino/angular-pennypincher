import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subcategory } from '../subcategories';
import { Category } from 'src/app/categories/category';
import { Observable } from 'rxjs';
import { SubcategoriesService } from 'src/app/shared/services/subcategories.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-subcategories-form',
  templateUrl: './subcategories-form.component.html',
  styleUrls: ['./subcategories-form.component.css']
})
export class SubcategoriesFormComponent implements OnInit {

  subcategory: Subcategory;
  categories: Category[] = [];

  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: SubcategoriesService, 
    private categoryService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.subcategory = new Subcategory();
  }

  ngOnInit(): void {

    this.categoryService
    .getCategories()
    .subscribe(response => this.categories = response);

    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getSubcategoryById(this.id)
          .subscribe (
            response => this.subcategory = response,
            errorResponse => this.subcategory = new Subcategory()
          )
          console.log(this.subcategory)
      }
    })
  }

  backtoList() {
    this.router.navigate(['/subcategorias/list']);
  }

  onSubmit() {
    console.log(this.subcategory);
    if (this.id) {
      this.service
        .update(this.subcategory)
        .subscribe (response =>{
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        })
    } else {
      this.service
        .save(this.subcategory)
        .subscribe(response => {
          this.success = true;
          this.subcategory = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }


}

