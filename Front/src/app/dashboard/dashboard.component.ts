import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ApexNonAxisChartSeries, ApexResponsive, ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions} from 'ng-apexcharts';
import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOptions: any;
  chartSeries: any;
  chartPieOptions: any;
  chartUserOptions:any;
  chartOptions2: any;
  constructor(private http: HttpClient) { }

  
  ngOnInit() {
    this.http.get('http://127.0.0.1:9000/votes/avgVote').subscribe((data2:any)=>{
      console.log(data2.message)

      const data = [
        { info: 'Information 1', avgRating: 4.5 },
        { info: 'Information 2', avgRating: 3.8 },
        { info: 'Information 3', avgRating: 4.2 },
        { info: 'Information 4', avgRating: 4.9 },
        { info: 'Information 5', avgRating: 3.5 },
      ];
      
      // Prepare data for the chart
      const categories = data2.message.map((item:any) => item.formationName[0]);
      const avgRatings = data2.message.map((item:any) => item.averageRating);
      this.chartOptions2 = 
      {
        chart: {
          type: 'bar',
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          max: 5,
          tickAmount: 5,
        },
      };
  
      // Create the chart series
      this.chartSeries = [
        {
          name: 'Average Rating',
          data: avgRatings,
        },
      ];
    
      



    },(error:any)=>{
      console.log(error)
    })







    this.http.get('http://127.0.0.1:9000/stats').subscribe((data: any) => {
      this.chartOptions = {
        series: [
          {
           name: 'Utilisateurs',
          data: [data.count,data.nb],
          }
        ],
        chart: {
          id:'user_inscrit',
          type: "bar",
          width:800,
          height: 200
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        }
      }
      this.chartPieOptions = {
        series: [data.count,data.nb],
        chart: {
          id: 'pie',
          type: "pie",
          width: 380
        },
        labels: ["users", "formations"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    })





    
    this.http.get('http://127.0.0.1:9000/stats/inscrit').subscribe((data: any) => {
      this.chartOptions = {
        series: [
          {
           name: 'Utilisateurs',
          data: [data.count,data.nb],
          }
        ],
        chart: {
          id:'kk',
          type: "pie",
          width:800,
          height: 200
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        }
      }
    });
    this.getStatistics();
  };
  getStatistics() {
    this.http.get<any[]>('http://127.0.0.1:9000/stats/inscrit').subscribe(
      (data: any[]) => {
        const seriesData = data.map(stat => stat.count); // Obtenir les données des utilisateurs inscrits depuis les statistiques
        const categories = data.map(stat => stat.formationName); // Obtenir les formationIds pour les catégories de l'axe x
    
        this.chartUserOptions = {
          series: [
            {
              name: "users",
              data: seriesData
            }
          ],
          chart: {
            id: 'user-inscription',
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: categories
          }
        };
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération des statistiques.', error);
      }
    );
  }
  }
  

