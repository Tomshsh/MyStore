import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  products!: Product[]
  @Input() sortEvent!: Event

  sort(by: 'name' | 'recentlyAdded') {
    this.products.sort((a, b) => {
      if (by == "name") return this.sortByName(a, b)
      if (by == "recentlyAdded") return this.sortByDate(a, b)
      return 0
    })
  }

  sortByName(a: Product, b: Product) {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    return nameA < nameB
      ? -1
      : nameA > nameB
        ? 1
        : 0;
  }

  sortByDate(a: Product, b: Product) {
    const dateA = a.creationDate
    const dateB = b.creationDate
    return dateA < dateB
      ? -1 : dateA > dateB ? 1 : 0
  }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      products => {
        this.products = products

      }
    )
  }

  ngOnChanges(a: SimpleChanges) {
    if (a.sortEvent && !a.sortEvent.isFirstChange()) {
      console.log(a)
      const by: 'name' | 'recentlyAdded' = a.sortEvent.currentValue
      this.sort(by)
    }
  }

  ngOnDestroy() {
  }

  deleteProduct(id: number) {
    this.router.navigate([''])
    this.productService.deleteProduct(id)
  }
}
