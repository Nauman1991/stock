import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrderProcess } from '@vendure/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'orderSummary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})

export class OrderSummaryComponent implements OnInit {

    orderSummary: any = {};
    orderTotal: any = 0;
    url: string = '';
    apiURL: string = '';
    addtionalInfo:any = {} ;
    orderID : string = '';

    customerWebsite = [
        {
            id: 1,
            name: 'Facebook'
        },
        {
            id: 2,
            name: 'Instagram'
        },
        {
            id: 3,
            name: 'Snapchat'
        },
        {
            id: 4,
            name: 'Tiktok'
        },
        {
            id: 5,
            name: 'Site'
        }
    ]

    constructor(private http: HttpClient) {
        let orderSummaryFromLocalStorage = JSON.parse(localStorage.getItem('orderSummary') as string);
        this.orderSummary = orderSummaryFromLocalStorage;
        this.orderID = orderSummaryFromLocalStorage.orderID;
        this.orderSummary.customer.customFields = JSON.parse(this.orderSummary.customer.customFields);
        if (this.orderSummary.customer.customFields.length > 0) {
            let websiteName = this.orderSummary.customer.customFields[0].website;
            this.orderSummary.customer.customFields[0].websiteName = websiteName;
        }
        this.calculateAmount(this.orderSummary.product);
    }

    ngOnInit() {
        let hostname = window.location.hostname;
        if (hostname == 'localhost') {
            this.url = "http://localhost:4200";
            this.apiURL = "http://localhost:5001" ;
        } else {
            this.url = "http://3.23.29.252:4200";
            this.apiURL = "http://3.23.29.252:5001" ;
        }
    }

    calculateAmount(product: any) {
        product.forEach(element => {
            this.orderTotal += parseInt(element.price);
        });
    }

    confirmOrder(order: any) {

        let addtionalOrderData = {
            orderID : this.orderID,
            pageName : this.addtionalInfo.pageName,
            sellerName : this.addtionalInfo.sellerName,
            paymentType : this.addtionalInfo.paymentType,
        }

        let customAPIURL = `${this.apiURL}/orders/updateOrder`
        
        const body = { "data": addtionalOrderData };
        const headers = new HttpHeaders()
            .set('accept', '*/*')
            .set('content-type', 'application/json')
            .set('Connection', 'keep-alive')
        return this.http
            .post(customAPIURL, body, { headers: headers })
            .subscribe((resp: any) => {
               if(resp.code == 200){
                window.location.href = `${this.url}/admin/orders?filter=custom&page=1`;
               }
            });
    }

}