import { DeleteComponent } from './../delete/delete.component';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  product: any;
  productId: any;
  constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.products = [];
    this.product = { title: "", price: 0, imgUrl: "" };
    this.getProducts(); 
  }

  getProducts() {
    this._dataService.getProducts()
      .subscribe(
        (response) => { this.products = response },
        (err) => { console.log('products component err :', err); }

      )
  }

  delete(id) {
    console.log("hi from delete func in produc component, id: ", id);
    const tempObservable = this._dataService.delete(id);
    tempObservable.subscribe(
      (success) => {
        console.log('delete success :', success);
        this.getProducts();
      },
      (error) => {
        console.log('delete error :', error);
      }
    );

  }
 

}

