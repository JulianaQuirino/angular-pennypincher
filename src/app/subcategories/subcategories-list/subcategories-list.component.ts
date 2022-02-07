import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Subcategory } from '../subcategories';
import { SubcategoriesService } from 'src/app/shared/services/subcategories.service';
import { SubcategoryItem } from '../subcategoriesItem';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css']
})
export class SubcategoriesListComponent implements OnInit {

  subcategoryItens : SubcategoryItem[] = [];
  selectedSubcategory : SubcategoryItem;
  successMessage: string;
  errorMessage: string;


  constructor(private service : SubcategoriesService, 
    private router: Router) { }

  new(){
    this.router.navigate(['/subcategorias/form']);
  }

  ngOnInit(): void {
    this.service
    .getSubcategories()
    .subscribe( response => this.subcategoryItens = response);
  }

  prepareToDelete( subcategory:SubcategoryItem ) {
    this.selectedSubcategory = subcategory;
  }

  deleteSubcategory(){
    this.service
      .delete(this.selectedSubcategory)
      .subscribe(
        response => {this.successMessage = 'Subcategoria deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a subcategoria.'
      )
  }



}
