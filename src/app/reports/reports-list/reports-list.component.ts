import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecordsReport } from '../recordsReports';
import { DailyRecordsService } from 'src/app/shared/services/dailyrecords.service';
import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  recordsReport: RecordsReport[] = [];
  successMessage: string;
  errorMessage: string;
  categoryId: number;
  month: number;
  year: number;
  categoriesList: Category[] = [];


  constructor(private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService,
    private categoryService: CategoriesService,
    private reportsService: ReportsService,
    private router: Router) { }


  ngOnInit(): void {

    this.categoryService
      .getCategories()
      .subscribe(response => this.categoriesList = response);

  }

  filtrar() {
    this.reportsService
      .getRecordsReport(this.month, this.year, this.categoryId)
      .subscribe(response => {

        this.recordsReport = response;
        console.log(this.recordsReport)

      },
        erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do relatório de lançamentos.'
      )
  }

  public exportExcel() {
    let header = ["Data", "Categoria", "Subcategoria", "Tipo categoria", "Descrição", "Valor", "Conta", "Nome do projeto"];
    this.downloadExcelService.exportExcel(this.recordsReport, header, "Relatório", 8);
  }

  public exportToPDF(elementId: string, fileName: string) {
    this.downloadPDFService.exportToPDF(elementId, fileName);
  }



}



