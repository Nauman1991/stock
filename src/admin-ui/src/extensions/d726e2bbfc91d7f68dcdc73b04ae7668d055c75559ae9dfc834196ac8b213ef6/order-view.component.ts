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

  customAPIPATH: string = "";
  customPath: string = "";
  hostname: string = '';
  orders: any = {};
  _orderDetail: any = {};
  _orderDetailProduct: any = [];
  productStock: any = [];
  _orderUpdate: any = [];

  products: any = [];
  _searchOrder: any = {};
  userChannel: string = '';

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
  public querySubscription: Subscription;

  constructor(private http: HttpClient, private modalService: NgbModal, private apollo: Apollo) {
    this.fetchOrderChannel();


    this.hostname = window.location.hostname;
    if (this.hostname == 'localhost') {
      this.customAPIPATH = "http://localhost:5001";
      this.customPath = "http://localhost:4200";
    } else {
      this.customAPIPATH = "http://3.23.29.252:5001";
      this.customPath = "http://3.23.29.252:4200";
    }
  }

  ngOnInit() {
    this.fetchOrders();
    this._searchOrder.phoneNumber = '';
    this._searchOrder.username = '';
    this._searchOrder.trackingNumber = '';
    this._searchOrder.website = '';
    this._searchOrder.pageName = '';
    this._searchOrder.sellerName = '';
    this._searchOrder.shippingCarrier = '';
    this._orderUpdate.product = [];
  }

  async fetchOrderChannel() {
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

  fetchOrders() {

    this.hostname = window.location.hostname;
    if (this.hostname == 'localhost') {
      this.customAPIPATH = "http://localhost:5001";
    } else {
      this.customAPIPATH = "http://3.23.29.252:5001";
    }

    let customAPIURL = `${this.customAPIPATH}/orders/fetchOrders/${this.userChannel}`;
    return this.http
      .get(customAPIURL)
      .subscribe((resp: any) => {
        this.orders = resp.data.rows;
        this.orders.forEach((element: any, key: any) => {
          let customFields = JSON.parse(element.customFields);
          // if (customFields) {
          this.orders[key].pageName = (customFields) ? customFields[0].pageName : '';
          this.orders[key].paymentType = (customFields) ? customFields[0].paymentType : '';
          this.orders[key].sellerName = (customFields) ? customFields[0].sellerName : '';
          this.orders[key].conversationLink = (customFields) ? customFields[0].conversationLink : '';
          this.orders[key].notes = (customFields) ? customFields[0].notes : '';
          // }

        });
        this._orderDetail.customer.status = 'shipped';
      });
  }

  fetchOrderDetail(template: TemplateRef<any>, orderID: any) {

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
      variables: { 'id': orderID }
    }).valueChanges
      .subscribe(({ data, loading }) => {

        let arr: any = [];
        let product: any = [];
        this._orderDetailProduct = [];

        let orderFind = this.orders.find(function (value, index) {
          if (value.id === orderID) {
            arr.push(value);
            return value;
          }

        });

        product.push(data.order);

        product.forEach((element: any, key: any) => {
          element.lines.forEach((ele: any, key2: any) => {
            this._orderDetailProduct.push({
              previousQuantity: ele.items.length,
              price: ele.proratedUnitPrice / ele.items.length,
              quantity: ele.items.length,
              lineID: ele.id,
              productVarientID: ele.productVariant.id
            })
          });
        });

        this._orderDetail.customer = arr[0];
        this._orderDetail.detail = data.order;
        this.modalService.open(template, { windowClass: 'shippingModal', size: 'lg' });
      });

  }

  saveOrder() {
    const data = {
      customer: this._orderDetail.customer,
      orderProduct: this._orderDetailProduct
    }

    let customAPIURL = `${this.customAPIPATH}/orders/editCustomOrder`;
    const body = { "data": data };
    const headers = new HttpHeaders()
      .set('accept', '*/*')
      .set('content-type', 'application/json')
      .set('Connection', 'keep-alive')
    return this.http
      .post(customAPIURL, body, { headers: headers })
      .subscribe((resp: any) => {
        if (resp.code == 200) {
          window.location.reload();
        }
      });
  }

  searchOrder() {
    this._searchOrder.userChannel = this.userChannel;
    let customAPIURL = `${this.customAPIPATH}/orders/getSearchOrder`;
    const body = { "data": this._searchOrder };
    const headers = new HttpHeaders()
      .set('accept', '*/*')
      .set('content-type', 'application/json')
      .set('Connection', 'keep-alive')
    return this.http
      .post(customAPIURL, body, { headers: headers })
      .subscribe((resp: any) => {
        this.orders = {};
        this.orders = resp.data.rows;
        this.orders.forEach((element: any, key: any) => {
          let customFields = JSON.parse(element.customFields);
          this.orders[key].pageName = customFields[0].pageName;
          this.orders[key].paymentType = customFields[0].paymentType;
          this.orders[key].sellerName = customFields[0].sellerName;
        });
      });
  }

  searchOrderByStatus(status: any) {

    let customAPIURL = `${this.customAPIPATH}/orders/getOrderByStatus`;
    const body = { "data": status, "userChannel": this.userChannel };
    const headers = new HttpHeaders()
      .set('accept', '*/*')
      .set('content-type', 'application/json')
      .set('Connection', 'keep-alive')
    return this.http
      .post(customAPIURL, body, { headers: headers })
      .subscribe((resp: any) => {
        this.orders = {};
        this.orders = resp.data.rows;
        this.orders.forEach((element: any, key: any) => {
          let customFields = JSON.parse(element.customFields);
          this.orders[key].pageName = customFields[0].pageName;
          this.orders[key].paymentType = customFields[0].paymentType;
          this.orders[key].sellerName = customFields[0].sellerName;
        });
      });
  }

  redirectManualOrder() {
    window.location.href = `${this.customPath}/admin/extensions/addManualOrder`;
  }

  openProductPopUp(template: TemplateRef<any>) {
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
            let checkOrderExist = this._orderDetailProduct.find(x => x.productVarientID == e.id);
            if (!checkOrderExist) {
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
                  let orderPrice = 0;
                  if (orderCount == 1) {
                    orderPrice = e.price;
                  } else if (orderCount <= 1 || orderCount >= 1) {
                    orderPrice = e.price / 100;
                  } else {
                    orderPrice = e.price;
                  }
                 
                  this.products.push({
                    productID: element.id,
                    product_varient_id: e.id,
                    product_varient_name: e.name,
                    product_varient_price: orderPrice,
                    product_varient_stock_level: e.stockLevel,
                    product_varient_enabled: e.enabled,
                    product_varient_stock_on_hand: e.stockOnHand,
                    product_varient_stock_allocated: e.stockAllocated,
                    product_varient_image_source: imgSource,
                    order_count: orderCount
                  });


                });


              // this.products.push({
              //   productID: element.id,
              //   product_varient_id: e.id,
              //   product_varient_name: e.name,
              //   product_varient_price: e.price,
              //   product_varient_stock_level: e.stockLevel,
              //   product_varient_enabled: e.enabled,
              //   product_varient_stock_on_hand: e.stockOnHand,
              //   product_varient_stock_allocated: e.stockAllocated,
              //   product_varient_image_source: imgSource
              // });
            }

          });

        });

        this.modalService.open(template, { windowClass: 'shippingModal' });
      });
  }

  // addProductToList(){

  // }

  productSelect(data: any, checked: any, index: any) {

    /**Ned to push item to array if checked is true otherwise need to remove it */
    if (checked) {
      if (this._orderUpdate.product.length > 0) {
        this._orderUpdate.product = this._orderUpdate.product.filter((ele) => {
          return ele.product_vaient_id != data.product_varient_id
        });
      }

      this._orderUpdate.product.push({
        'product_id': data.productID,
        "product_vaient_id": data.product_varient_id,
        "name": data.product_varient_name,
        "sold": (this.productStock[index] == undefined ? 0 : this.productStock[index]),
        "price": data.product_varient_price
      });
    } else {
      this._orderUpdate.product = this._orderUpdate.product.filter((ele: any) => {
        return ele.product_vaient_id != data.product_varient_id
      });
    }
  }

  changeProductStock(data: any, index: any) {
    if (this._orderUpdate.product.length > 0) {
      this._orderUpdate.product.forEach((element: any, key: any) => {
        if (element.product_vaient_id == data.product_varient_id) {
          this._orderUpdate.product[key].sold = (this.productStock[index] == undefined ? 0 : this.productStock[index])
        }
      });
    }
    this._orderUpdate.product;
  }

  addProductToList() {
    let orderProductUpdate = {
      'orderID': this._orderDetail.customer.id,
      'customerID': this._orderDetail.customer.customerId,
      'product': this._orderUpdate.product
    }

    let customAPIURL = `${this.customAPIPATH}/orders/updateOrderProduct`;
    const body = { "data": orderProductUpdate };
    const headers = new HttpHeaders()
      .set('accept', '*/*')
      .set('content-type', 'application/json')
      .set('Connection', 'keep-alive')
    return this.http
      .post(customAPIURL, body, { headers: headers })
      .subscribe((resp: any) => {
        // if (resp.code == 200) {
        //   window.location.reload();
        // }
      });

  }

}