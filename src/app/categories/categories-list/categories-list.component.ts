import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Category } from '../category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories : Category[] = [];
  selectedCategory : Category;
  successMessage: string;
  errorMessage: string;
  reportMode : boolean = false;


  constructor(private service : CategoriesService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

  new(){
    this.router.navigate(['/categorias/form']);
  }

  ngOnInit(): void {
    this.service
    .getCategories()
    .subscribe( response => this.categories = response);
  }

  prepareToDelete( category:Category ) {
    this.selectedCategory = category;
  }

  deleteCategory(){
    this.service
      .delete(this.selectedCategory)
      .subscribe(
        response => {this.successMessage = 'Categoria deletada com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar a categoria.'
      )
  }

  public exportExcel(){
    let header=["ID","Nome", "Tipo"];
    this.downloadExcelService.exportExcel(this.categories, header, "Categorias", 3);
  }

  public printReports() {
    this.reportMode = true; 
  }

  public allOptions() {
    this.reportMode = false; 
  }

  public exportToPDF(elementId: string, fileName: string){
    this.downloadPDFService.exportToPDF(elementId, fileName);
  }



}
