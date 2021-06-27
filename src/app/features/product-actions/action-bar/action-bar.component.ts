import { Component, OnInit, Output, EventEmitter, ViewChild, KeyValueDiffers, DoCheck, KeyValueDiffer } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

type SortOption = 'name' | 'recentlyAdded' | undefined

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit, DoCheck {

  constructor(private productService: ProductsService, private router: Router, private differs: KeyValueDiffers) { }

  @Output() filter = new EventEmitter<string>()
  @Output() sort = new EventEmitter<SortOption>()

  sorters = [
    { value: 'name', title: 'Name' },
    { value: 'recentlyAdded', title: 'Recently Added' }
  ]

  filterVal = {val: ""}
  filterValDiff!: KeyValueDiffer<string, string>

  sortBy!: SortOption

  ngOnInit(): void {
    this.filterValDiff = this.differs.find(this.filterVal).create()
  }

  ngDoCheck(){
    const changed = this.filterValDiff.diff(this.filterVal)
    if(changed){
      this.onFilter(this.filterVal.val)
    }
  }

  onSorted($event?: MatButtonToggleChange) {
    this.sortBy=$event?.source.value
    this.sort.emit($event?.source.value)
  }

  onFilter(val: string) {
    this.filter.emit(val)
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
