import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { OrderSummaryComponent } from './order-summary.component' ;

@NgModule({
    imports: [
      SharedModule,
      RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: OrderSummaryComponent,
        data: { breadcrumb: 'Order Summary' },
      }]),
    ],
    declarations: [OrderSummaryComponent],
  })


export class OrderSummaryModule{
}