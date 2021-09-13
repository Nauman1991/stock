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
    constructor(private apollo: Apollo, private modalService: NgbModal, private http: HttpClient) {
        this.fetchCountries();
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
                resp.forEach(element => {
                    let productVaient = element.variants;
                    productVaient.forEach(e => {
                        let imgSource = e.assets.length > 0 ? e.assets[0].source : 'http://localhost:4200/assets/source/no-image.jpeg';

                        this.products.push({
                            productID: element.id,
                            product_varient_id: e.id,
                            product_varient_name: e.name,
                            product_varient_price: e.price,
                            product_varient_stock_level: e.stockLevel,
                            product_varient_enabled: e.enabled,
                            product_varient_stock_on_hand: e.stockOnHand,
                            product_varient_stock_allocated: e.stockAllocated,
                            product_varient_image_source: imgSource
                        });
                    });

                });

                this.modalService.open(template, { windowClass: 'shippingModal' });
                // this.products 
                // debugger;
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
        // this.apollo.mutate({
        //     mutation: ADD_CUSTOMER,
        //     variables: {
        //         title: title,
        //         firstName: firstName,
        //         lastName: lastName,
        //         phoneNumber: phoneNumber,
        //         emailAddress: emailAddress,
        //         customFields: json
        //     }
        // }).subscribe((data: any) => {

        //     let customerID = data.data.createCustomer.id;

        //     debugger;




        // }, (error) => {
        //     debugger;
        // });

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

            debugger;




        }, (error) => {
            debugger;
        });

    }

    showShippingModal(template: TemplateRef<any>) {
        let countryID = this.manualOrder.country;
        if (countryID == 195) {
            this.modalService.open(template, { windowClass: 'shippingModal' });
        }

    }

    productSelect(data: any, checked: any, index: any) {
        // debugger;
        /**Ned to push item to array if checked is true otherwise need to remove it */
        if (checked) {
            if (this.manualOrder.product.length > 0) {
                this.manualOrder.product = this.manualOrder.product.filter((ele) => {
                    return ele.product_vaient_id != data.product_varient_id
                });
            }

            this.manualOrder.product.push({
                'product_id': data.productID,
                "product_vaient_id": data.product_varient_id,
                "sold": (this.productStock[index] == undefined ? 0 : this.productStock[index]),
                "price" : data.product_varient_price
            });
        } else {
            this.manualOrder.product = this.manualOrder.product.filter((ele) => {
                return ele.product_vaient_id != data.product_varient_id
            });
        }

        this.manualOrder.product
        debugger
    }

    changeProductStock(data: any, index: any) {
        if (this.manualOrder.product.length > 0) {
            this.manualOrder.product = this.manualOrder.product.filter((ele) => {
                return ele.sold = (this.productStock[index] == undefined ? 0 : this.productStock[index])
            });
        }
        this.manualOrder.product;
        debugger;
    }

    saveOrder() {

        let customAPIURL = "http://3.23.29.252:5001/addManualOrder";

        // this.http.post(`${customAPIURL}`, this.manualOrder).subscribe((res: any) => {
        //     debugger;
        // });

        const body = {"data" : this.manualOrder};
        const headers = new HttpHeaders()

            .set('accept', '*/*')
            .set('content-type', 'application/json')
            .set('Connection', 'keep-alive')
            .set('vendure-token', 'co9zs05smg5c16lh6w2i')
            // .set('cookie','session=eyJ0b2tlbiI6IjZlZTc3NmFiN2UwOTRiZmU2MmFjMjY2YmM5YTZkMDkyMjQ1MjliYjZhYjVmN2E2YzE1ODc0N2EyNGY2ODM2NTkifQ==; session.sig=xa-OD-vkGcTmIGC8sSr1p3YCbfE')
            ;
        return this.http
            .post(customAPIURL, body, { headers: headers })
            .subscribe((resp) => {
                debugger;
            });
        
        return;








        this.sendOrderCurl();
        return;


        // let apolloClient = new ApolloClient({
        //     uri: '<http://localhost:3000/shop-api>',
        //     cache: new InMemoryCache().restore(initialState || {})
        // });

        // let aClient = this.apollo.client({
        //     uri: '<http://localhost:3000/shop-api>',
        // });


        return;
        let manualOrder = this.manualOrder;

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

            // let customerID = data.data.createCustomer.id;
            data
            debugger;




        }, (error) => {
            debugger;
        }); alert("i m in");
    }


    sendOrderCurl() {


        var data = JSON.stringify({
            query: "mutation CreateOrder(\n  $productVariantId:ID!,\n  $quantity:Int!,\n $title : String!,\n  $firstName : String!,\n  $lastName : String!,\n  $phoneNumber : String!,\n  $emailAddress : String!\n){\n  addItemToOrder(productVariantId : $productVariantId,quantity:$quantity){\n                    	...order\n  },\n  setCustomerForOrder(\n    input : {\n                        title: $title,\n                        firstName: $firstName,\n                        lastName: $lastName,\n                        phoneNumber: $phoneNumber,\n                        emailAddress: $emailAddress\n                      }\n  ){\n    ...order\n  }\n}\n\n\nfragment order on Order {\n            id\n            code\n  					state\n  					active\n  orderPlacedAt\n  					customer{\n              id\n              firstName\n              lastName\n              title\n            }\n}",
            variables: { "productVariantId": 1, "quantity": 1, "title": "Testing From Curl", "firstName": "Curl Firstname", "lastName": "Curl Lastname", "phoneNumber": "23232323", "emailAddress": "test@test.com" }
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "http://localhost:4200/shop-api");
        xhr.setRequestHeader("Content-Type", "application/json");
        //   xhr.setRequestHeader("Cookie", "session=eyJ0b2tlbiI6ImMzNzFjMzFjZTg4ZTQ1MWI2NzU0MjNlZmZiNTU4MzQwNjNmMGE0ZjcxNjI3M2ZmZjMzOGU4NDFiMjI1ODhlNDIifQ==; session.sig=-0QjqAhA-J_yYiZ_aYpVqnMSSzY");

        let resp = xhr.send(data);
        debugger;


        return;
        let url: string = "http://localhost:4200/shop-api";


        const headers = new HttpHeaders()

            .set('accept', '*/*')
            .set('content-type', 'application/json')
            .set('Connection', 'keep-alive')
            .set('vendure-token', 'co9zs05smg5c16lh6w2i')
            // .set('cookie','session=eyJ0b2tlbiI6IjZlZTc3NmFiN2UwOTRiZmU2MmFjMjY2YmM5YTZkMDkyMjQ1MjliYjZhYjVmN2E2YzE1ODc0N2EyNGY2ODM2NTkifQ==; session.sig=xa-OD-vkGcTmIGC8sSr1p3YCbfE')
            ;
        //  

        const body = { "query": "mutation CreateOrder(\n  $productVariantId:ID!,\n  $quantity:Int!,\n  $state:String!,\n  $title : String!,\n  $firstName : String!,\n  $lastName : String!,\n  $phoneNumber : String!,\n  $emailAddress : String!\n){\n  addItemToOrder(productVariantId : $productVariantId,quantity:$quantity){\n                    \t...order\n  },\n  transitionOrderToState(state:$state){\n    ...order\n  },\n  setCustomerForOrder(\n    input : {\n                        title: $title,\n                        firstName: $firstName,\n                        lastName: $lastName,\n                        phoneNumber: $phoneNumber,\n                        emailAddress: $emailAddress\n                      }\n  ){\n    ...order\n  }\n}\n\n\nfragment order on Order {\n            id\n            code\n  \t\t\t\t\tstate\n  \t\t\t\t\tactive\n  orderPlacedAt\n  \t\t\t\t\tcustomer{\n              id\n              firstName\n              lastName\n              title\n            }\n}", "variables": { "productVariantId": 1, "quantity": 1, "state": "Active", "title": "Testing From Curl3333", "firstName": "Curl Firstname3333", "lastName": "Curl Lastname", "phoneNumber": "23232332323", "emailAddress": "test2323@test.com" } }

        return this.http
            .post(url, body, { headers: headers })
            .subscribe((resp) => {
                debugger;
            });

        //         curl --location --request POST 'http://localhost:4200/shop-api' \
        // --header 'Content-Type: application/json' \
        // --header 'Cookie: session=eyJ0b2tlbiI6IjU5N2E4NjliMTkwOWQ2NGY3MjdjMzk3NGMwYzRhNTM3ODVlMmY4NGRhNDFmYmNiMjdmNzlhZTlkNDcyNmIzZmEifQ==; session.sig=SKdr2tCMF7zTS_QYHDNh1dezo8I' \
        // --data-raw '{"query":"mutation CreateOrder(\n  $productVariantId:ID!,\n  $quantity:Int!,\n  $state:String!,\n  $title : String!,\n  $firstName : String!,\n  $lastName : String!,\n  $phoneNumber : String!,\n  $emailAddress : String!\n){\n  addItemToOrder(productVariantId : $productVariantId,quantity:$quantity){\n                    \t...order\n  },\n  transitionOrderToState(state:$state){\n    ...order\n  },\n  setCustomerForOrder(\n    input : {\n                        title: $title,\n                        firstName: $firstName,\n                        lastName: $lastName,\n                        phoneNumber: $phoneNumber,\n                        emailAddress: $emailAddress\n                      }\n  ){\n    ...order\n  }\n}\n\n\nfragment order on Order {\n            id\n            code\n  \t\t\t\t\tstate\n  \t\t\t\t\tactive\n  orderPlacedAt\n  \t\t\t\t\tcustomer{\n              id\n              firstName\n              lastName\n              title\n            }\n}","variables":{"productVariantId":1,"quantity":1,"state":"Active","title":"Testing From Curl","firstName":"Curl Firstname","lastName":"Curl Lastname","phoneNumber":"23232323","emailAddress":"test@test.com"}}'
    }
}