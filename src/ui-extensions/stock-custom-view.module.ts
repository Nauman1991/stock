import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { StockCustomViewComponent } from './stock-custom-view.component';

@NgModule({
  imports: [SharedModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: StockCustomViewComponent,
      data: { breadcrumb: 'Order View' },
    }]),],
  declarations:[StockCustomViewComponent],
  providers: [
    
  ]
})
export class StockCustomViewModule {}