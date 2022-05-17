import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { Chart, registerables } from 'chart.js';
import { ChartCategories } from '../chartCategories';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Project } from 'src/app/projects/project';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

Chart.register(...registerables);

@Component({
    selector: 'app-charts-list',
    templateUrl: './charts-list.component.html',
    styleUrls: ['./charts-list.component.css']
})
export class ChartsListComponent implements OnInit {

    chartCategories: ChartCategories[] = [];
    year: number;
    month: number;
    chartType: number;
    categoryType: string = 'D';
    errorMessage: string;
    categories: string[] = [];
    categoriesTotals: number[] = [];
    categoriesList: Category[] = [];
    subcategories: string[] = [];
    subcategoriesTotals: number[] = [];
    projectMonthYear: string[] = [];
    projectTotals: number[] = [];
    goalNames: string[] = [];
    goalValues: number[] = [];
    goalAccumulatedValues: number[] = [];
    goalDataSets: string[] = [];
    accountsNames: string[] = [];
    accountsBalance: number[] = [];
    myChart: Chart;
    projects: Project[] = [];
    projectId: number;
    categoryId: number;

    constructor(private chartService: ChartsService,
        private projectService: ProjectsService,
        private categoryService: CategoriesService) { }

    ngOnInit(): void {

        this.month = (new Date().getMonth() + 1)
        this.year = new Date().getFullYear();

        const ctx = document.getElementById('myChart');
        console.log(ctx);

        this.projectService
            .getProjects()
            .subscribe(
                response => this.projects = response,
                errorResponse => this.projects = []
            )

        this.categoryService
            .getCategories()
            .subscribe(response => this.categoriesList = response);

    }

    restartChart() {
        if (this.myChart) {
            this.myChart.clear();
        }
    }

    loadChartCategories() {

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.chartService
            .getValuesChartCategories(this.month, this.year, this.categoryType)
            .subscribe(response => {

                if (response) {

                    this.categories = response.map(
                        function (a) {
                            return a.categoryName!;
                        });

                    this.categoriesTotals = response.map(
                        function (a) {
                            return a.total!;
                        });

                    console.log(this.categories)

                    this.renderChartCategories();
                }
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de categorias.'
            )
    }

    renderChartCategories() {
        this.myChart = new Chart("myChart", {
            type: 'doughnut',
            data: {
                labels: this.categories,
                datasets: [{
                    label: 'R$',
                    data: this.categoriesTotals,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    loadChartProjects() {

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.chartService
            .getDebitsOfProject(this.projectId)
            .subscribe(response => {

                if (response) {
                    this.projectMonthYear = response.map(
                        function (a) {
                            return a.monthYear!;
                        });

                    this.projectTotals = response.map(
                        function (a) {
                            return a.total!;
                        });

                    console.log(this.categories)

                    this.renderChartProjects();

                }
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de projetos.'
            )
    }

    renderChartProjects() {
        this.myChart = new Chart("myChart", {
            type: 'line',
            data: {
                labels: this.projectMonthYear,
                datasets: [{
                    label: 'R$',
                    data: this.projectTotals,
                    borderColor: '#8e5eb5',
                    backgroundColor: '#8e5eb5',
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    loadChartGoals() {

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.chartService
            .getGoalsStatus()
            .subscribe(response => {

                if (response) {

                    this.goalNames = response.map(
                        function (a) {
                            return a.goalName;
                        });

                    console.log(this.goalNames)

                    this.goalValues = response.map(
                        function (a) {
                            return a.goalValue;
                        });

                    console.log(this.goalValues)

                    this.goalAccumulatedValues = response.map(
                        function (a) {
                            return a.accumulatedValue;
                        });

                    console.log(this.goalAccumulatedValues)

                    this.renderChartGoals();
                }
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de metas.'
            )

    }

    renderChartGoals() {
        this.myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.goalNames,
                datasets: [{
                    label: 'Valor total',
                    data: this.goalValues,
                    borderColor: '#8e5eb5',
                    backgroundColor: '#8e5eb5',
                },
                {
                    label: "Acumulado",
                    data: this.goalAccumulatedValues,
                    borderColor: 'rgba(3, 252, 127, 1)',
                    backgroundColor: 'rgba(3, 252, 127, 1)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    loadChartAccounts() {

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.chartService
            .getAccountsBalanceByMonthYear(this.month, this.year)
            .subscribe(response => {

                if (response) {

                    this.accountsNames = response.map(
                        function (a) {
                            return a.accountName;
                        });

                    this.accountsBalance = response.map(
                        function (a) {
                            return a.balance;
                        });

                    console.log(this.accountsNames)
                    console.log(this.accountsBalance)

                    this.renderChartAccounts();
                }
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de categorias.'
            )
    }

    renderChartAccounts() {
        this.myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.accountsNames,
                datasets: [{
                    label: 'R$',
                    data: this.accountsBalance,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    loadChartSubcategories() {

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.chartService
            .getValuesChartSubcategories(this.categoryId, this.month, this.year)
            .subscribe(response => {

                if (response) {

                    this.subcategories = response.map(
                        function (a) {
                            return a.subcategoryName;
                        });

                    this.subcategoriesTotals = response.map(
                        function (a) {
                            return a.total;
                        });

                    console.log(this.subcategories)
                    console.log(this.subcategoriesTotals)

                    this.renderChartSubcategories();
                }
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de subcategorias.'
            )
    }

    renderChartSubcategories() {
        this.myChart = new Chart("myChart", {
            type: 'pie',
            data: {
                labels: this.subcategories,
                datasets: [{
                    label: 'R$',
                    data: this.subcategoriesTotals,
                    backgroundColor: [
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'                        
                    ],
                    borderColor: [
                        'rgba(3, 252, 127, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }




}
