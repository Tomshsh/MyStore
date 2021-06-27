import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  products!: Product[]

  filteredProducts!: Product[]
  pageProducts!: Product[]

  pageIndex!: number
  @ViewChild('paginator') paginator!: MatPaginator
  @Input() sortEvent!: Event
  @Input() filterEvent!: Event

  sort(by: 'name' | 'recentlyAdded') {
    this.products.sort((a, b) => {
      if (by == "name") return this.sortByName(a, b)
      if (by == "recentlyAdded") return this.sortByDate(a, b)
      return 0
    })
  }

  filter(val: string){
    this.filteredProducts = this.products.filter(p => p.name.includes(val) || p.description?.includes(val))
    this.onPage(0)
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

  onPage(pageIndex: number = this.pageIndex) {
    this.pageIndex = pageIndex
    this.pageProducts = this.filteredProducts.slice(pageIndex * 4, (pageIndex + 1) * 4)
  }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      products => {
        const formerLength = this.products?.length
        const newLength = products.length
        this.products = products
        this.filteredProducts = products
        if (!this.pageIndex) return this.onPage(0)
        if (formerLength < newLength) return this.onPage(Math.floor(newLength/4))
      }
    )

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sortEvent && !changes.sortEvent.isFirstChange()) {
      const by: 'name' | 'recentlyAdded' = changes.sortEvent.currentValue
      this.sort(by)
    }
    if(changes.filterEvent && !changes.filterEvent.isFirstChange()){
      this.filter(changes.filterEvent.currentValue)
    }

  }

  ngOnDestroy() {
  }

  deleteProduct(id: number) {
    this.router.navigate([''])
    this.productService.deleteProduct(id)
  }
}
