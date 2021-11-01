import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import {FormsModule}  from '@angular/forms';
import { ReviewsWidgetComponent } from './dashboard-widget.component';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
// import Chart from 'chart.js';

@NgModule({
  imports: [SharedModule,ChartsModule,FormsModule],
   
  declarations:[ReviewsWidgetComponent],
  providers: [
    
  ]
})
export class ReviewsWidgetModule {}