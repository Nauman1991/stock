import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, addActionBarItem, addNavMenuSection,registerDashboardWidget } from '@vendure/admin-ui/core';
import { OrderListCustomComponent } from './order-list-custom.component';
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
            items: [
            {
              id: 'order-view',
              label: 'My Orders',
              routerLink: ['/extensions/orderView'],
              icon: 'cursor-hand-open',
            },
            {
                id: 'stock-view',
              label: 'Stock',
              routerLink: ['/extensions/stockCustomView'],
              icon: 'cursor-hand-open',
            }],
          },
          // Add this section before the "settings" section
          'settings'),
          registerDashboardWidget('graphBySalePerson', {
            title: 'Report By Sales Person',
            supportedWidths: [4, 6, 8, 12],
            requiresPermissions: ['SuperAdmin'],
            loadComponent: () =>
              import('./dashboardWidget/OrderBySale/dashboard-widget.component').then(
                m => m.ReviewsWidgetComponent,
              ),
          }),
          registerDashboardWidget('graphByStock', {
            title: 'Report for Stock',
            supportedWidths: [4, 6, 8, 12],
            requiresPermissions: ['SuperAdmin'],
            loadComponent: () =>
              import('./dashboardWidget/StockGraph/stock-widget.component').then(
                m => m.StockWidgetComponent,
              ),
          }),
          registerDashboardWidget('graphByOrderAmount', {
            title: 'Report for Orders by amount - (Completed)',
            supportedWidths: [4, 6, 8, 12],
            requiresPermissions: ['SuperAdmin'],
            loadComponent: () =>
              import('./dashboardWidget/OrderByAmountGraph/order-amount-widget.component').then(
                m => m.OrderAmountWidgetComponent,
              ),
          }),

    ],
})
export class OrderListCustomModule{
}