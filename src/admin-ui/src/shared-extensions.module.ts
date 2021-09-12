import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListCustomModule } from './extensions/afc3a97fa7f4cd1822755b0eab6c094ef4d5e962518cf42b80394ef5d37e3059/order-list-custom.module';


@NgModule({
    imports: [CommonModule, OrderListCustomModule],
})
export class SharedExtensionsModule {}
