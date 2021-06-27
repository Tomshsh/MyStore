import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/types';
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute) { }

  id!: number
  product$!: Observable<Product>

  saveNewDetails($event: Product) {
    this.productService.editProduct(this.id, $event)
  }

  ngOnInit(): void {
    this.product$ = this.route.data.pipe(
      map((data) => {
        const product: Product = data.product
        return product
      })
    );
  }

}
