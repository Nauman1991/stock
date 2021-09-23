import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { OrderViewComponent } from './order-view.component' ;

@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: OrderViewComponent,
      data: { breadcrumb: 'Order View' },
    }]),],
  declarations:[OrderViewComponent],
  providers: [
    
  ]
})
export class OrderViewModule {}