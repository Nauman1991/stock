import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, addActionBarItem } from '@vendure/admin-ui/core';
import { OrderListCustomComponent } from './order-list-custom.component';
// import { AddManualOrderComponent } from './modal/add-manual-order.component';
// declare const $: any;

import $ from 'jquery';

@NgModule({
    imports: [SharedModule],
    declarations: [OrderListCustomComponent],
    providers: [
        addActionBarItem({
            id: 'order-list',
            label: 'Add Manual Order',
            locationId: 'order-list',
            buttonStyle: 'outline',
            onClick : () => {
                
                window.location.href = 'http://3.23.29.252:4200/admin/extensions/addManualOrder' ;
            },
            routerLink: route => {
                // const id = 'order-list';
                return ['greet',];
            },
            requiresPermission: 'SuperAdmin'
        }),
    ],
})
export class OrderListCustomModule{
}