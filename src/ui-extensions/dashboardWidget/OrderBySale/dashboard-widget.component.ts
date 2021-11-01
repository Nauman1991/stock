import { Component, NgModule, OnInit } from '@angular/core';
import { DataService, SharedModule } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import gql from "graphql-tag";
import { ChartType, ChartOptions } from 'chart.js';
import { ChartsModule, SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'reviews-widget',
  templateUrl: './dashboard-widget.component.html',
})
export class ReviewsWidgetComponent implements OnInit {
  hostname: any;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels :any= [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dataService: DataService, private http: HttpClient) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.fetchOrderBySales();
  }

  fetchOrderBySales() {


    let customAPIURL = '';
    this.hostname = window.location.hostname;
    if (this.hostname == 'localhost') {
      customAPIURL = "http://localhost:5001/orders/fetchBySale";
    } else {
      customAPIURL = "http://3.23.29.252:5001/orders/fetchBySale";
    }

    return this.http
      .get(customAPIURL)
      .subscribe((resp: any) => {
        let obj = resp.data;
        const mapped = Object.keys(obj).map(key => ({ sellerName: key, value: obj[key] }));
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        let charData: any = [];
        let dateMonth: any = '';
        mapped.forEach((element: any) => {
          dateMonth = element.value.date;
          charData.push({
            data: [element.value.orderCount],
            label: element.sellerName
          });
        });
        charData;
        
        dateMonth = new Date(dateMonth);
        let monthName =  monthNames[dateMonth.getMonth()];

        this.barChartLabels.push(monthName);
        this.barChartData = charData;
       
      });

  }

}

@NgModule({
  imports: [SharedModule, ChartsModule],
  declarations: [ReviewsWidgetComponent],
})
export class ReviewsWidgetModule { }