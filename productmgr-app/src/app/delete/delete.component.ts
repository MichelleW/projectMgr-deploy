import { DataService } from './../data.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  productId: any;
  product: any;
  
  constructor(private _route: ActivatedRoute, private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.productId = params['id'];
    });
    this.product = { title: "", price: 0, imgUrl: "" };
    this.delete(this.productId);
  }

  delete(id) {
    console.log('log id :', id);
    this._dataService.getProduct(id)
      .subscribe(
        (response) => {
          console.log('delete product :', response);
          this.product = response;
        },
        (err) => {
          console.log('delete component err :', err);
        }

      )
  }
}
