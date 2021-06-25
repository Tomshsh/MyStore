import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

type SortOption = 'name' | 'recentlyAdded' | undefined

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  constructor(private productService: ProductsService, private router: Router) { }

  @Output() filter = new EventEmitter<string>()
  @Output() sort = new EventEmitter<SortOption>()

  sorters = [
    { value: 'name', title: 'Name' },
    { value: 'recentlyAdded', title: 'Recently Added' }
  ]

  sortBy!: SortOption

  ngOnInit(): void {
  }

  onSorted($event?: MatButtonToggleChange) {
    this.sortBy=$event?.source.value
    this.sort.emit($event?.source.value)
  }

  onFilter($event: any) {
    console.log($event)
  }

  clearChoice() {
    this.onSorted()
  }

  addProduct() {
    const newProduct = this.productService.addProduct()
    if (newProduct) {
      this.router.navigate(['details', newProduct.id])
    }
  }

}
