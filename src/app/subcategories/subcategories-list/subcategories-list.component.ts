import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { SubcategoriesService } from 'src/app/shared/services/subcategories.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

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
  reportMode : boolean = false;


  constructor(private service : SubcategoriesService, private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService, private router: Router) { }

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

  public exportExcel(){
    let header=["ID","Nome", "Categoria"];
    this.downloadExcelService.exportExcel(this.subcategoryItens, header, "Subcategorias", 3);
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
