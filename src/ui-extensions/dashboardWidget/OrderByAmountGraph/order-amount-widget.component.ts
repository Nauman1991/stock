import { Component, NgModule, OnInit } from '@angular/core';
import { DataService, SharedModule } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import gql from "graphql-tag";
import { ChartType, ChartOptions } from 'chart.js';
import { ChartsModule, SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'reviews-widget',
  templateUrl: './order-amount-widget.component.html',
})
export class OrderAmountWidgetComponent implements OnInit {
  hostname: any;

  public OrderAmountbarChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public OrderAmountbarChartLabels :any= [];
  public OrderAmountbarChartType = 'bar';
  public OrderAmountbarChartLegend = true;
  public OrderAmountbarChartData = [];

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
    this.fetchOrderAmountGraph();
  }

  fetchOrderAmountGraph() {


    let customAPIURL = '';
    this.hostname = window.location.hostname;
    if (this.hostname == 'localhost') {
      customAPIURL = "http://localhost:5001/orders/fetchByOrderAmount";
    } else {
      customAPIURL = "http://3.23.29.252:5001/orders/fetchByOrderAmount";
    }

    return this.http
      .get(customAPIURL)
      .subscribe((resp: any) => {
        let obj = resp.data;
        const mapped = Object.keys(obj).map(key => ({ channelName: key, value: obj[key] }));
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        let charData: any = [];
        mapped.forEach((element: any) => {
          
          charData.push({
            data: [element.value.totalAmount],
            label: element.value.channelName
          });
        });
        
        let dateMonth = new Date();
        let monthName =  monthNames[dateMonth.getMonth()];

        this.OrderAmountbarChartLabels.push(monthName);
        this.OrderAmountbarChartData = charData;
       
      });

  }

}

@NgModule({
  imports: [SharedModule, ChartsModule],
  declarations: [OrderAmountWidgetComponent],
})
export class OrderAmountWidgetModule { }