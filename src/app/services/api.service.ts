import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';

// import { ClassGetter } from '@angular/compiler/src/output/output';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost/exam-ang-API/'; // API URL
  // baseUrl = environment.baseUlr;
  // baseUlr= 'http://localhost/apifasi/'
  constructor(public http:HttpClient ) { }

  getProducts() {
   return this.http.get<any>(this.baseUrl);
  }

  addProduct(obj: any) {
    return this.http.post<Product>(this.baseUrl, obj)
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(this.baseUrl+`?id=${id}`);
  }

  getProduct(id: string) {
    return this.http.get<any>(this.baseUrl+`?id=${id}`);
  }
  
  updateProduct(obj: Product) {
    return this.http.put<Product>(this.baseUrl, obj)
  }


}
