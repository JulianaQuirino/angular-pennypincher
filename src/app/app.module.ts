import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesService } from './shared/services/categories.service';
import { ProjectsService } from './shared/services/projects.service';
import { SubcategoriesFormComponent } from './subcategories/subcategories-form/subcategories-form.component';
import { SubcategoriesListComponent } from './subcategories/subcategories-list/subcategories-list.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { AccountsFormComponent } from './accounts/accounts-form/accounts-form.component';
import { ProjectsFormComponent } from './projects/projects-form/projects-form.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DailyrecordsListComponent } from './dailyrecords/dailyrecords-list/dailyrecords-list.component';
import { DailyrecordsFormComponent } from './dailyrecords/dailyrecords-form/dailyrecords-form.component';
import { LimitsFormComponent } from './limits/limits-form/limits-form.component';
import { LimitsListComponent } from './limits/limits-list/limits-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { GoalsFormComponent } from './goals/goals-form/goals-form.component';
import { GoalsListComponent } from './goals/goals-list/goals-list.component';
import { MoneytransfersListComponent } from './moneytransfers/moneytransfers-list/moneytransfers-list.component';
import { MoneytransfersFormComponent } from './moneytransfers/moneytransfers-form/moneytransfers-form.component';
import { ChartsListComponent } from './charts/charts-list/charts-list.component';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    SubcategoriesFormComponent,
    SubcategoriesListComponent,
    AccountsListComponent,
    AccountsFormComponent,
    ProjectsFormComponent,
    ProjectsListComponent,
    DailyrecordsListComponent,
    DailyrecordsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    LimitsFormComponent,
    LimitsListComponent,
    GoalsFormComponent,
    GoalsListComponent,
    MoneytransfersListComponent,
    MoneytransfersFormComponent,
    ChartsListComponent,
    ReportsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
  ],
  providers: [
    CategoriesService,
    ProjectsService,
    AuthService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
