import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListCustomModule } from './extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/order-list-custom.module';


@NgModule({
    imports: [CommonModule, OrderListCustomModule],
})
export class SharedExtensionsModule {}
