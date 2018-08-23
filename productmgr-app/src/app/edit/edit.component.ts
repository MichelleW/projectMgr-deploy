import { DataService } from './../data.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: any;
  productId: number;
  productDetails: any;
  msg: any;

  constructor(private _route: ActivatedRoute, private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
    // this.product = { title: "Canon EOS 5D MK III", price:  3500, imgUrl: "https://www.practicalecommerce.com/wp-content/uploads/images/0006/0918/nikon_d800_lightbox.jpg" };

    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.productId = params['id'];
    });
    this.msg = "";
    this.productDetails = { title: "", price: 0, imgUrl: "" };
    this.getProduct(this.productId);

  }
  goToProducts() {
    this._router.navigate(['/products']);
  }

  getProduct(id) {
    console.log('get product id ', id);
    this._dataService.getProduct(id)
      .subscribe(
        (response) => {
          console.log('get product :', response);
          this.product = response;
          this.productDetails = response;
        },
        (err) => {
          console.log('product component err :', err);
        }

      )
  }

  update() {
    console.log('update func clicked ');
    this._dataService.update(this.productDetails)
      .subscribe(
        (response) => {
          this.productDetails = response;
          this.msg = "Product was updated  success!";
          this.goToProducts();
        },
        (error) => {
          console.log('update func err :', error);
        }
      )
  }

  delete(id) {
    console.log("hi from delete func in edit component, id: ", id);
    const tempObservable = this._dataService.delete(id);
    tempObservable.subscribe(
      (success) => {
        console.log('delete success :', success);
        this.goToProducts();
      },
      (error) => {
        console.log('delete error :', error);
      }
    );

  }

}
