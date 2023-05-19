import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../models/product';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl('') // Add this line for the description field
  });
  

  products: Product[] = [];
  id = '';

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts()
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe(response => {
        const { products } = response;
        this.products = products;
      });
  }

  addProduct(): void {
    this.apiService.addProduct(this.productForm.value)
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getProducts();
        this.productForm.reset({ name: '', price: '', description: '' });

        // this.productForm.reset('');
      });
  }
  deleteProduct(id: string | undefined): void {
    if (window.confirm("¿Estás seguro de querer eliminar?")) {
      if (id) {
        this.apiService.deleteProduct(id)
          .pipe(
            catchError(error => {
              console.error(error);
              return EMPTY;
            })
          )
          .subscribe(() => {
            this.getProducts();
          });
      }
    }
  }

  getProduct(id: string | undefined): void {
    if (id) {
      this.apiService.getProduct(id)
        .pipe(
          catchError(error => {
            console.error(error);
            return EMPTY;
          })
        )
        .subscribe(response => {
          const { id, name, price, description } = response.data;
          this.id = id;
          this.productForm.setValue({ name, price,description});
        });
    }
  }
  

  updateProduct(): void {
    const obj: Product = {
      id: this.id,
      name: this.productForm.value.name ?? '',
      price: this.productForm.value.price ?? '',
      description: this.productForm.value.description ?? ''
    };

    this.apiService.updateProduct(obj)
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getProducts();
        this.productForm.reset();
      });
  }
  
  




// closing tag
}
