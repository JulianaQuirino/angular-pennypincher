import { Component, OnInit, Type } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DailyRecord } from '../dailyrecord';
import { DailyRecordsService } from 'src/app/shared/services/dailyrecords.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Record } from '../record';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SubcategoriesService } from 'src/app/shared/services/subcategories.service';
import { SubcategoryItem } from 'src/app/subcategories/subcategoriesItem';
import { Account } from 'src/app/accounts/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Project } from 'src/app/projects/project';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { RecordsService } from 'src/app/shared/services/records.service';
import { RecordList } from '../recordList';

import { DownloadPDFService } from 'src/app/shared/services/download-pdf.service';
import { DownloadExcelService } from 'src/app/shared/services/download-excel.service';

declare var $: any;

@Component({
  selector: 'app-dailyrecords-form',
  templateUrl: './dailyrecords-form.component.html',
  styleUrls: ['./dailyrecords-form.component.css']
})
export class DailyrecordsFormComponent implements OnInit {

  // Daily Record
  dailyRecordId: number;
  dailyRecord: DailyRecord;

  // Record
  recordId: number;
  record: Record = new Record();
  selectedRecord: Record = new Record();
  records: RecordList[] = [];
  //recordDescription: string;
  //recordValue: string;

  // Account
  //idSelectedAccount: number;
  accounts: Account[] = [];

  // Category
  selectedType: string;
  //idSelectedCategory: number;
  categories: Category[] = [];

  // Subcategory
  //idSelectedSubcategory: number;
  subcategories: SubcategoryItem[] = [];

  // Project
  //idSelectedProject: number;
  projects: Project[] = [];

  // Messages
  success: boolean = false;
  errors: String[];
  reportMode : boolean = false;

  constructor(private service: DailyRecordsService,
    private recordService: RecordsService,
    private authService: AuthService,
    private accountService: AccountsService,
    private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService,
    private projectService: ProjectsService,
    private downloadPDFService: DownloadPDFService,
    private downloadExcelService: DownloadExcelService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.dailyRecord = new DailyRecord();
  }

  ngOnInit(): void {
    this.record = new Record();

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.dailyRecordId = urlParams['id'];
      if (this.dailyRecordId) {
        this.service
          .getDailyRecordById(this.dailyRecordId)
          .subscribe(
            response => this.dailyRecord = response,
            errorResponse => this.dailyRecord = new DailyRecord
          )
        this.loadRecords();

      }
    })

    this.accountService
      .getAccounts()
      .subscribe(
        response => this.accounts = response,
        errorResponse => this.accounts = []
      )

    this.projectService
      .getProjects()
      .subscribe(
        response => this.projects = response,
        errorResponse => this.projects = []
      )
  }

  loadRecords() {
    if (this.dailyRecordId) {
      this.recordService
        .getRecordsByDailyRecord(this.dailyRecordId)
        .subscribe(
          response => this.records = response,
          errorResponse => this.records = []
        )
    }
  }

  backtoList() {
    this.router.navigate(['/lancamentos/list']);
  }

  onSubmit() {
    console.log(this.dailyRecord);
    if (this.dailyRecordId) {
      this.service
        .update(this.dailyRecord)
        .subscribe(response => {
          //this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a data de lançamento.']
        })
    } else {
      console.log(this.dailyRecord)
      this.dailyRecord.usernameAppUser = this.authService.getAuthenticadtedUser();
      this.service
        .save(this.dailyRecord)
        .subscribe(response => {
          //this.success = true;
          this.dailyRecord = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }

  }

  prepareToAddRecord() {
    this.success = false;
    this.errors = [];
    if (!this.dailyRecordId) {
      // Save the daily record
      this.dailyRecord.usernameAppUser = this.authService.getAuthenticadtedUser();
      this.service
        .save(this.dailyRecord)
        .subscribe(response => {
          //this.success = true;
          this.dailyRecord = response;
          this.dailyRecordId = this.dailyRecord.id != null ? this.dailyRecord.id : 0;
          this.errors = [];
          $("#recordModal").modal('show');
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    } else {
      $("#recordModal").modal('show');
    }
    

  }

  saveRecord() {
    console.log(this.recordId);
    console.log(this.record);
    if (this.recordId) {
      this.recordService
        .update(this.record)
        .subscribe(response => {
          this.success = true;
          this.record = new Record();
          this.errors = [];
          this.loadRecords();
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o lançamento.']
        })
    } else {
      this.record.dailyRecordId = this.dailyRecordId;
      console.log(this.record)
      this.recordService
        .save(this.record)
        .subscribe(response => {
          this.success = true;
          this.record = new Record();
          this.errors = [];
          this.loadRecords();
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        }
        )
    }
  }

  editRecord(idSelectedRecord: number){
    if (idSelectedRecord){
      this.recordService
        .getRecordById(idSelectedRecord)
        .subscribe(response => {
          this.record = response;
          this.recordId = this.record.id != null ? this.record.id : 0;
          if (this.record.type){
            this.selectedType = this.record.type != null ? this.record.type : '';
            this.changeCategories(this.selectedType);
            this.changeSubcategories(this.record.categoryId);
          }
          console.log(this.record)
          $("#recordModal").modal('show');
        }, errorResponse => {
          this.errors = ['Erro ao buscar o lançamento.']
        })
    }
  }

  prepareToDeleteRecord(idSelectedRecord: number) {
    if (idSelectedRecord){
      this.recordService
        .getRecordById(idSelectedRecord)
        .subscribe(response => {
          this.selectedRecord = response;
        }, errorResponse => {
          this.errors = ['Erro ao deletar o lançamento.']
        })
    }
  }

  deleteRecord(){
    console.log("Passou aqui" + this.selectedRecord)
    this.recordService
      .delete(this.selectedRecord)
      .subscribe(
        response => {
          this.selectedRecord = new Record;
          this.loadRecords();
      },
        erro => this.errors = ['Erro ao deletar o lançamento.']
      )
  }

  changeCategories(newType: string) {
    console.log(newType);
    this.selectedType = newType;
    this.subcategories = [];
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

  changeSubcategories(newCategory: number) {
    console.log(newCategory);
    this.record.categoryId = newCategory;
    if (newCategory) {
      this.subcategoryService.getSubcategoriesByIdCategory(this.record.categoryId)
        .subscribe(response => {
          this.subcategories = response;
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        })
    }
  }

  public exportExcel(){
    var date = this.dailyRecord.date;
    let header=["ID","Conta", "Categoria", "Tipo", "Subcategoria", "Valor", "Descrição", "Projeto"];
    this.downloadExcelService.exportExcel(this.records, header, "Lançamentos_" + date.replace('//', "_"), 8);
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




