import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/shared/services/charts.service';
import { Chart, registerables } from 'chart.js';
import { ChartCategories } from '../chartCategories';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Project } from 'src/app/projects/project';

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
    totals: number[] = [];
    projectMonthYear: string[] = [];
    projectTotals: number[] = [];
    myChart: Chart;
    projects: Project[] = [];
    projectId: number;

    constructor(private chartService: ChartsService, 
        private projectService: ProjectsService) { }

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

    }

    loadChartCategories() {

        if (this.myChart) {
            this.myChart.destroy();
        }           

        this.chartService
            .getValuesChartCategories(this.month, this.year, this.categoryType)
            .subscribe(response => {

                this.categories = response.map(
                    function (a) {
                        return a.categoryName!;
                    });

                this.totals = response.map(
                    function (a) {
                        return a.total!;
                    });

                console.log(this.categories)
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de categorias.'
            )


        this.myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.categories,
                datasets: [{
                    label: 'R$',
                    data: this.totals,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
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

                this.projectMonthYear = response.map(
                    function (a) {
                        return a.monthYear!;
                    });

                this.projectTotals = response.map(
                    function (a) {
                        return a.total!;
                    });

                console.log(this.categories)
            },
                erro => this.errorMessage = 'Ocorreu um erro ao buscar dados do gráfico de projetos.'
            )


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





}
