
import { DataService } from './../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProductObj: any;
  errMsg: any;

  constructor(private _route: ActivatedRoute, private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.newProductObj = { title: "", price: "", imgUrl: "" };
    this.errMsg = "";
  }
 
  goToProducts() {
    console.log('goto products func clicked');
    this._router.navigate(['/products']);
  }

  createNew() {
    const tempObservable = this._dataService.createNew(this.newProductObj);
    tempObservable.subscribe(
      (response) => {
        if(response){
          console.log('res in createNew()',response);
          this.errMsg = response['errors'];
          console.log('err msg ', this.errMsg)
        }
        else{
          this.goToProducts();
        }
        
      },
      (error) => {
        console.log(error);
        this.errMsg = error;
      }
    );
  }
}
