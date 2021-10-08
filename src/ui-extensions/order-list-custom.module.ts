import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, addActionBarItem, addNavMenuSection } from '@vendure/admin-ui/core';
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
                
                window.location.href = 'http://localhost:4200/admin/extensions/addManualOrder' ;
            },
            routerLink: route => {
                // const id = 'order-list';
                return ['greet',];
            },
            requiresPermission: 'SuperAdmin'
        }),
        addNavMenuSection({
            id: 'order-view',
            label: 'My Extensions',
            items: [{
              id: 'order-view',
              label: 'My Orders',
              routerLink: ['/extensions/orderView'],
              // Icon can be any of https://clarity.design/icons
              icon: 'cursor-hand-open',
            }],
          },
          // Add this section before the "settings" section
          'settings')
    ],
})
export class OrderListCustomModule{
}