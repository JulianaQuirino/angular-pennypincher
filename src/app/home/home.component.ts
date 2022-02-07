import { Component, OnInit } from '@angular/core';
import { Account } from '../accounts/account';
import { Category } from '../categories/category';
import { Record } from '../dailyrecords/record';
import { Project } from '../projects/project';
import { AccountsService } from '../shared/services/accounts.service';
import { CategoriesService } from '../shared/services/categories.service';
import { ProjectsService } from '../shared/services/projects.service';
import { RecordsService } from '../shared/services/records.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numberOfAccounts: number;
  numberOfCategories: number;
  numberOfProjects: number;
  numberOfRecords: number;
  accounts: Account[] = [];
  categories: Category[] = [];
  projects: Project[] = [];
  records: Record[] = [];

  constructor(private accountsService: AccountsService, private categoriesService: CategoriesService,
    private projectsService: ProjectsService, private recordsService: RecordsService) { }

  ngOnInit(): void {

    this.accountsService.getAccounts()
      .subscribe(response => {
        this.accounts = response;
        this.numberOfAccounts = this.accounts.length != null ? this.accounts.length : 0;
      }
      );

      this.categoriesService.getCategories()
      .subscribe(response => {
        this.categories = response;
        this.numberOfCategories = this.categories.length != null ? this.categories.length : 0;
      });

      this.projectsService.getProjects()
      .subscribe(response => {
        this.projects = response;
        console.log(this.projects);
        console.log(this.projects.length);
        this.numberOfProjects = this.projects.length != null ? this.projects.length : 0;
      });

      this.recordsService.getRecords()
      .subscribe(response => {
        this.records = response;
        console.log(this.records);
        console.log(this.records.length);
        this.numberOfRecords = this.records.length != null ? this.records.length : 0;
      });

  }

}
