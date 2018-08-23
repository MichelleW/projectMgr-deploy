import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getProducts() {
    return this._http.get('/productmgr-products');
  }

  //pass in id
  getProduct(id) {
    return this._http.get('/productmgr-products/' + id)
  }

  //passing newly created productObj 
  createNew(productObj) {
    return this._http.post('/productmgr-products', productObj);
  }


  update(updatedObj) {
    console.log('from data service updatedObj:', updatedObj);
    return this._http.put('/productmgr-products/' + updatedObj._id, updatedObj)
    
  }
  delete(id) {
    console.log('delete func data.service :', id);
    return this._http.delete('/productmgr-products/' + id);
  }

  
}
