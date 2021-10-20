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
  selector: 'stockCustomView',
  templateUrl: './stock-custom-view.component.html',
  styleUrls: ['./stock-custom-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class StockCustomViewComponent implements OnInit {

  url: string = '';
  apiURL: string = '';
  imageURL : string = '';
  stock: any = {};
  public querySubscription: Subscription;

  constructor(private http: HttpClient, private apollo: Apollo,) {
    let hostname = window.location.hostname;
    if (hostname == 'localhost') {
      this.url = "http://localhost:4200";
      this.apiURL = "http://localhost:5001";
      this.imageURL = "http://localhost:4200/assets";
    } else {
      this.url = "http://3.23.29.252:4200";
      this.apiURL = "http://3.23.29.252:5001";
      this.imageURL = "http://3.23.29.252:4200/assets";
    }
    this.fetchStock();
  }

  ngOnInit() {
  }

  fetchStock() {
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
        let userID = data.me.id;
        let userIdentifier = data.me.identifier;
        let userChannelID = data.me.channels[0].id

        let customAPIURL = `${this.apiURL}/orders/fetchStock/${userID}/${userChannelID}`;
        return this.http
          .get(customAPIURL)
          .subscribe((resp: any) => {
            this.stock = resp.data.rows;
          });
        
      });

    return;

  }
}