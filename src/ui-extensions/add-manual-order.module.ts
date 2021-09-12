import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { AddManualOrderComponent } from './add-manual-order.component';

@NgModule({
    imports: [
      SharedModule,
      RouterModule.forChild([{
        path: '',
        pathMatch: 'full',
        component: AddManualOrderComponent,
        data: { breadcrumb: 'Greeter' },
      }]),
    ],
    declarations: [AddManualOrderComponent],
  })


export class AddManualOrderModule{
}