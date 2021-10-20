// project/ui-extensions/greeter.component.ts
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrderProcess } from '@vendure/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export const customerValidationProcess: CustomOrderProcess<'ValidatingCustomer'> = {
    transitions: {
        AddingItems: {
            to: ['ValidatingCustomer'],
            mergeStrategy: 'replace',
        },
        ValidatingCustomer: {
            to: ['ArrangingPayment', 'AddingItems'],
        },
    },
};

@Component({
    selector: 'addManualOrderList',
    templateUrl: './add-manual-order.component.html',
    styleUrls: ['./add-manual-order.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class AddManualOrderComponent implements OnInit {

    manualOrder: any = {};
    shippingCarrierModal: any = {};
    countries = null;
    products: any = [];
    productStock: any = [];
    modalRef?: BsModalRef;
    url: string = '';
    hostname: string = '';
    shippingCitites = '';
    userChannel: string = '';
    public querySubscription: Subscription;

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

    shippingCarrier = [
        {
            id: 1,
            name: 'Aramex'
        },
        {
            id: 2,
            name: 'Xturbo'
        },
        {
            id: 3,
            name: 'Fastlo'
        },
        {
            id: 4,
            name: 'Custom'
        }
    ];

    config = {
        backdrop: false,
        ignoreBackdropClick: true
    };

    constructor(
        private apollo: Apollo,
        private modalService: NgbModal,
        private http: HttpClient,
        private router: Router) {
        this.fetchCountries();
        this.fetchOrderChannel();
    }

    ngOnInit() {
        // this.countries = null;
        this.manualOrder.country = "";
        this.manualOrder.website = "";
        this.manualOrder.product = [];
        this.shippingCarrierModal.shipping = "";
        this.shippingCarrierModal.city = "";
        this.shippingCarrierModal.street = "";
        this.shippingCarrierModal.address_complement = "";

        this.hostname = window.location.hostname;
        if (this.hostname == 'localhost') {
            this.url = "http://localhost:4200";
        } else {
            this.url = "http://3.23.29.252:4200";
        }
    }


    fetchOrderChannel() {
        const GET_CURRENT_USER = gql`
      query me {
        me {
            id
            identifier
            channels {
                id
                token
                code
            }
        }
    }
      `;

        this.querySubscription = this.apollo.watchQuery<any>({
            query: GET_CURRENT_USER,

        }).valueChanges
            .subscribe(({ data, loading }) => {
                this.userChannel = data.me.channels[0].id;
            });
    }

    fetchCountries() {

        const GET_COUNTRIES = gql`{
            countries(options:{filter : {name:{in:["Saudi Arabia","Oman","Qatar","Kuwait","UAE"]}}}){
                items{
                id    
                code
                name
              }
            }
          }` ;

        this.querySubscription = this.apollo.watchQuery<any>({
            query: GET_COUNTRIES,

        }).valueChanges
            .subscribe(({ data, loading }) => {
                this.countries = data.countries.items;
            });
    }

    selectProduct(template: TemplateRef<any>) {


        const GET_PRODUCTS = gql`{
            products(options:{}){
                items{
                id  
                name
                variants{
                  id
                  name
                  price
                  stockLevel
                  enabled
                  stockOnHand
                  stockAllocated
                  assets{
                    source
                  }
                }
              }
                  
            }
          }` ;

        this.querySubscription = this.apollo.watchQuery<any>({
            query: GET_PRODUCTS,

        }).valueChanges
            .subscribe(({ data, loading }) => {

                let resp = data.products.items;
                this.products = [];
                resp.forEach(element => {
                    let productVaient = element.variants;

                    productVaient.forEach(e => {
                        let imgSource = e.assets.length > 0 ? e.assets[0].source : 'http://localhost:4200/assets/source/no-image.jpeg';
                        this.hostname = window.location.hostname;
                        let customAPIPATH = "";
                        if (this.hostname == 'localhost') {
                            customAPIPATH = "http://localhost:5001";
                        } else {
                            customAPIPATH = "http://3.23.29.252:5001";
                        }

                        let customAPIURL = `${customAPIPATH}/orders/getOrderCountVariant/${e.id}/${this.userChannel}`;
                        return this.http
                            .get(customAPIURL)
                            .subscribe((resp: any) => {
                                let orderCount = resp.data.orderCount;
                                this.products.push({
                                    productID: element.id,
                                    product_varient_id: e.id,
                                    product_varient_name: e.name,
                                    product_varient_price: e.price,
                                    product_varient_stock_level: e.stockLevel,
                                    product_varient_enabled: e.enabled,
                                    product_varient_stock_on_hand: e.stockOnHand,
                                    product_varient_stock_allocated: e.stockAllocated,
                                    product_varient_image_source: imgSource,
                                    order_count : orderCount
                                });
                                    
                                
                            });
                    });

                });
                this.modalService.open(template, { windowClass: 'shippingModal' });
            });
    }

    saveCustomer() {

        let title = '';
        let firstName = this.manualOrder.firstName;
        let lastName = this.manualOrder.lastName;
        let phoneNumber = this.manualOrder.phoneNumber;
        let emailAddress = `${this.manualOrder.firstName}@notfound.com`;
        let username_website = this.manualOrder.username_website;
        let whatsapp_number = this.manualOrder.whatsapp_number;

        let customFields = {
            'username_website': username_website,
            'whatsapp_number': whatsapp_number
        }
        let json = JSON.stringify(customFields);


        const ADD_CUSTOMER = gql`
        mutation CreateCustomer(
                $title : String!,
                $firstName : String!,
                $lastName : String!,
                $phoneNumber : String!,
                $emailAddress : String!,
                $customFields : JSON
            ){
            createCustomer(
                      input : {
                        title: $title,
                        firstName: $firstName,
                        lastName: $lastName,
                        phoneNumber: $phoneNumber,
                        emailAddress: $emailAddress,
                        customFields : $customFields
                      },
                      password : ""
            ){ 
                  ...Customer
              ...ErrorResult
            }
          }
          
          
          fragment Customer on Customer {
            id
            title
            firstName
            lastName
            phoneNumber
            emailAddress
            customFields
          }
          
          
          fragment ErrorResult on ErrorResult {
                        errorCode
                        message
                        __typename
                      }
        
        `;


        const ADD_CUSTOMER_ORDER = gql`
mutation CreateOrder(
  $productVariantId:ID!,
  $quantity:Int!,
  $state:String!,
  $title : String!,
  $firstName : String!,
  $lastName : String!,
  $phoneNumber : String!,
  $emailAddress : String!
){
  addItemToOrder(productVariantId : $productVariantId,quantity:$quantity){
                    	...order
  },
  transitionOrderToState(state:$state){
    ...order
  },
  setCustomerForOrder(
    input : {
                        title: $title,
                        firstName: $firstName,
                        lastName: $lastName,
                        phoneNumber: $phoneNumber,
                        emailAddress: $emailAddress
                      }
  ){
    ...order
  }
}


fragment order on Order {
            id
            code
  					state
  					active
  orderPlacedAt
  					customer{
              id
              firstName
              lastName
              title
            }
}

`;

        this.apollo.mutate({
            mutation: ADD_CUSTOMER_ORDER,
            variables: {
                "productVariantId": 1,
                "quantity": 6,
                "state": "Completed",
                "title": "testing-from-api",
                "firstName": "testing-first-name",
                "lastName": "testing-last-name",
                "phoneNumber": "92929292929299292",
                "emailAddress": "test@test.com"
            }
        }).subscribe((data: any) => {
            let customerID = data.data.createCustomer.id;
        }, (error) => {

        });

    }

    showShippingModal(template: TemplateRef<any>) {
        let countryID = this.manualOrder.country;
        if (countryID == 195) {
            this.modalService.open(template, { windowClass: 'shippingModal' });
        }

    }

    productSelect(data: any, checked: any, index: any) {

        /**Ned to push item to array if checked is true otherwise need to remove it */
        if (checked) {
            if (this.manualOrder.product.length > 0) {
                this.manualOrder.product = this.manualOrder.product.filter((ele) => {
                    return ele.product_vaient_id != data.product_varient_id
                });
            }
          
            let orderPrice = 0 ;
            if(data.order_count == 1){
                orderPrice = data.product_varient_price;
            }else if(data.order_count <= 1 || data.order_count >= 1){
                orderPrice = data.product_varient_price / 100;
            }else{
                orderPrice = data.product_varient_price;
            }

            this.manualOrder.product.push({
                'product_id': data.productID,
                "product_vaient_id": data.product_varient_id,
                "name": data.product_varient_name,
                "sold": (this.productStock[index] == undefined ? 0 : this.productStock[index]),
                "price": orderPrice
            });

        } else {
            this.manualOrder.product = this.manualOrder.product.filter((ele: any) => {
                return ele.product_vaient_id != data.product_varient_id
            });
        }
    }

    changeProductStock(data: any, index: any) {
        if (this.manualOrder.product.length > 0) {
            this.manualOrder.product.forEach((element: any, key: any) => {
                if (element.product_vaient_id == data.product_varient_id) {
                    this.manualOrder.product[key].sold = (this.productStock[index] == undefined ? 0 : this.productStock[index])
                }
            });
        }
        this.manualOrder.product;
    }

    saveOrder() {
        let customAPIURL = '';
        if (this.hostname == 'localhost') {
            customAPIURL = "http://localhost:5001/addManualOrder";
        } else {
            customAPIURL = "http://3.23.29.252:5001/addManualOrder";
        }

        this.manualOrder.shippingData = this.shippingCarrierModal;
        this.manualOrder.userChannel = this.userChannel;

        let data = this.manualOrder;
        const body = { "data": this.manualOrder };
        const headers = new HttpHeaders()
            .set('accept', '*/*')
            .set('content-type', 'application/json')
            .set('Connection', 'keep-alive')
        return this.http
            .post(customAPIURL, body, { headers: headers })
            .subscribe((resp: any) => {
                localStorage.setItem('orderSummary', '');
                localStorage.setItem('orderSummary', JSON.stringify(resp.data.createOrder.result));
                window.location.href = `${this.url}/admin/extensions/orderSummary`;
            });

    }

    fetchCity() {
        let shippingID = this.shippingCarrierModal.shipping;
        if (shippingID == "1") {
            let customAPIURL = '';
            if (this.hostname == 'localhost') {
                customAPIURL = "http://localhost:5001/fetchAramxCity";
            } else {
                customAPIURL = "http://3.23.29.252:5001/fetchAramxCity";
            }

            return this.http
                .get(customAPIURL)
                .subscribe((resp: any) => {
                    this.shippingCitites = '';
                    this.shippingCitites = resp.data;
                });
        } else if (shippingID == 2) {
            let customAPIURL = '';
            if (this.hostname == 'localhost') {
                customAPIURL = "http://localhost:5001/fetchxturboCity";
            } else {
                customAPIURL = "http://3.23.29.252:5001/fetchxturboCity";
            }

            return this.http
                .get(customAPIURL)
                .subscribe((resp: any) => {
                    this.shippingCitites = '';
                    this.shippingCitites = resp.data;
                });
        } else if (shippingID == 3) {
            let customAPIURL = '';
            if (this.hostname == 'localhost') {
                customAPIURL = "http://localhost:5001/fetchfastloCity";
            } else {
                customAPIURL = "http://3.23.29.252:5001/fetchfastloCity";
            }

            return this.http
                .get(customAPIURL)
                .subscribe((resp: any) => {
                    this.shippingCitites = '';
                    this.shippingCitites = resp.data;
                });
        }
    }

    changeCityModel() {
        this.manualOrder.city = this.shippingCarrierModal.city;
    }
}