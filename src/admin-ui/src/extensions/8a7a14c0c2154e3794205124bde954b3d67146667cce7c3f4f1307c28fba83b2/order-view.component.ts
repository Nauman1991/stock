import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrderProcess } from '@vendure/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'orderView',
    templateUrl: './order-view.component.html',
    styleUrls: ['./order-view.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class OrderViewComponent implements OnInit {

    customAPIPATH : string = "http://3.23.29.252:5001";
    orders:any={};
    _orderDetail:any={};
    public querySubscription: Subscription;

    constructor(private http: HttpClient,private modalService: NgbModal,private apollo: Apollo) {
        this.fetchOrders() ;

    }

    ngOnInit() {
       
    }

    fetchOrders(){
        
        let customAPIURL = `${this.customAPIPATH}/orders/fetchOrders`;
        return this.http
            .get(customAPIURL)
            .subscribe((resp: any) => {
                    this.orders = resp.data.rows;
                    this.orders.forEach((element:any,key:any) => {
                        let customFields = JSON.parse(element.customFields);
                        this.orders[key].pageName = customFields[0].pageName; 
                        this.orders[key].paymentType = customFields[0].paymentType; 
                        this.orders[key].sellerName = customFields[0].sellerName; 
                    });
            });
    }

    fetchOrderDetail(template: TemplateRef<any>,orderID:any){

        const GET_ORDER_DETAIL = gql`
            query GetOrder($id: ID!) {
                order(id: $id) {
                  ...OrderDetail
                  __typename
                }
              }
              
              fragment OrderDetail on Order {
                id
                createdAt
                updatedAt
                code
                state
                nextStates
                active
                customer {
                  id
                  firstName
                  lastName
                  __typename
                }
                lines {
                  ...OrderLine
                  __typename
                }
                surcharges {
                  id
                  sku
                  description
                  price
                  priceWithTax
                  taxRate
                  __typename
                }
                discounts {
                  ...Discount
                  __typename
                }
                promotions {
                  id
                  couponCode
                  __typename
                }
                subTotal
                subTotalWithTax
                total
                totalWithTax
                currencyCode
                shipping
                shippingWithTax
                shippingLines {
                  shippingMethod {
                    id
                    code
                    name
                    fulfillmentHandlerCode
                    description
                    __typename
                  }
                  __typename
                }
                taxSummary {
                  description
                  taxBase
                  taxRate
                  taxTotal
                  __typename
                }
                shippingAddress {
                  ...OrderAddress
                  __typename
                }
                billingAddress {
                  ...OrderAddress
                  __typename
                }
                payments {
                  id
                  createdAt
                  transactionId
                  amount
                  method
                  state
                  nextStates
                  errorMessage
                  metadata
                  refunds {
                    id
                    createdAt
                    state
                    items
                    adjustment
                    total
                    paymentId
                    reason
                    transactionId
                    method
                    metadata
                    orderItems {
                      id
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                fulfillments {
                  ...Fulfillment
                  __typename
                }
                modifications {
                  id
                  createdAt
                  isSettled
                  priceChange
                  note
                  payment {
                    id
                    amount
                    __typename
                  }
                  orderItems {
                    id
                    __typename
                  }
                  refund {
                    id
                    paymentId
                    total
                    __typename
                  }
                  surcharges {
                    id
                    __typename
                  }
                  __typename
                }
                __typename
              }
              fragment Discount on Discount {
                adjustmentSource
                amount
                amountWithTax
                description
                type
                __typename
              }
              fragment OrderAddress on OrderAddress {
                fullName
                company
                streetLine1
                streetLine2
                city
                province
                postalCode
                country
                countryCode
                phoneNumber
                __typename
              }
              fragment Fulfillment on Fulfillment {
                id
                state
                nextStates
                createdAt
                updatedAt
                method
                orderItems {
                  id
                  __typename
                }
                trackingCode
                __typename
              }
              fragment OrderLine on OrderLine {
                id
                featuredAsset {
                  preview
                  __typename
                }
                productVariant {
                  id
                  name
                  sku
                  trackInventory
                  stockOnHand
                  __typename
                }
                discounts {
                  ...Discount
                  __typename
                }
                unitPrice
                unitPriceWithTax
                proratedUnitPrice
                proratedUnitPriceWithTax
                quantity
                items {
                  id
                  unitPrice
                  unitPriceWithTax
                  taxRate
                  refundId
                  cancelled
                  fulfillment {
                    ...Fulfillment
                    __typename
                  }
                  __typename
                }
                linePrice
                lineTax
                linePriceWithTax
                discountedLinePrice
                discountedLinePriceWithTax
                __typename
              }
              
          ` ;

        this.querySubscription = this.apollo.watchQuery<any>({
            query: GET_ORDER_DETAIL,
            variables : {'id' : orderID}
        }).valueChanges
            .subscribe(({ data, loading }) => {
                let arr:any = [];
                let orderFind = this.orders.find(function(value,index){
                    if(value.id === orderID){
                        arr.push(value);
                        return value;
                    }
                    
                }); 
               
                this._orderDetail.customer = arr[0];
                this._orderDetail.detail = data.order;
                this.modalService.open(template, { windowClass: 'shippingModal' , size: 'lg' });
            });
        
    }

    saveOrder(){
        let customAPIURL = `${this.customAPIPATH}/orders/editOrder`;
        const body = { "data": this._orderDetail.customer};
        const headers = new HttpHeaders()
            .set('accept', '*/*')
            .set('content-type', 'application/json')
            .set('Connection', 'keep-alive')
        return this.http
            .post(customAPIURL, body, { headers: headers })
            .subscribe((resp: any) => {
                  if(resp.code == 200){
                      window.location.reload();
                  }
            });
    }
}