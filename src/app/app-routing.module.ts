import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { SubcategoriesFormComponent } from './subcategories/subcategories-form/subcategories-form.component';
import { SubcategoriesListComponent } from './subcategories/subcategories-list/subcategories-list.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { AccountsFormComponent } from './accounts/accounts-form/accounts-form.component';
import { ProjectsFormComponent } from './projects/projects-form/projects-form.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DailyrecordsListComponent } from './dailyrecords/dailyrecords-list/dailyrecords-list.component';
import { DailyrecordsFormComponent } from './dailyrecords/dailyrecords-form/dailyrecords-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path: 'home', component: HomeComponent, canActivate : [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'categorias', component: CategoriesListComponent, canActivate : [AuthGuard] },
    { path: 'categorias/list', component: CategoriesListComponent, canActivate : [AuthGuard] },
    { path: 'categorias/form', component: CategoriesFormComponent, canActivate : [AuthGuard] },
    { path: 'categorias/form/:id', component: CategoriesFormComponent, canActivate : [AuthGuard] },
    { path: 'subcategorias', component: SubcategoriesListComponent, canActivate : [AuthGuard] },
    { path: 'subcategorias/list', component: SubcategoriesListComponent, canActivate : [AuthGuard] },
    { path: 'subcategorias/form', component: SubcategoriesFormComponent, canActivate : [AuthGuard] },
    { path: 'subcategorias/form/:id', component: SubcategoriesFormComponent, canActivate : [AuthGuard] },
    { path: 'contas', component: AccountsListComponent, canActivate : [AuthGuard] },
    { path: 'contas/list', component: AccountsListComponent, canActivate : [AuthGuard] },
    { path: 'contas/form', component: AccountsFormComponent, canActivate : [AuthGuard] },
    { path: 'contas/form/:id', component: AccountsFormComponent, canActivate : [AuthGuard] },
    { path: 'projetos', component: ProjectsListComponent, canActivate : [AuthGuard] },
    { path: 'projetos/list', component: ProjectsListComponent, canActivate : [AuthGuard] },
    { path: 'projetos/form', component: ProjectsFormComponent, canActivate : [AuthGuard] },
    { path: 'projetos/form/:id', component: ProjectsFormComponent, canActivate : [AuthGuard] },
    { path: 'lancamentos', component: DailyrecordsListComponent, canActivate : [AuthGuard] },
    { path: 'lancamentos/list', component: DailyrecordsListComponent, canActivate : [AuthGuard] },
    { path: 'lancamentos/form', component: DailyrecordsFormComponent, canActivate : [AuthGuard] },
    { path: 'lancamentos/form/:id', component: DailyrecordsFormComponent, canActivate : [AuthGuard] },
    { path: 'usuarios', component: UsersListComponent, canActivate : [AuthGuard] },
    { path: 'usuarios/list', component: UsersListComponent, canActivate : [AuthGuard] },
    { path: 'usuarios/form', component:UsersFormComponent, canActivate : [AuthGuard] },
    { path: 'usuarios/form/:id', component: UsersFormComponent, canActivate : [AuthGuard] },
    
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
