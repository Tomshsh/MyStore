import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/types';
import { LocalStorageService } from 'src/app/utilities/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private lsService: LocalStorageService) {
    lsService.loadInfo()
  }

  products: Product[] = []

  getProducts = () => {
    return this.lsService.lsProducts$.pipe(
      tap(products => { this.products = products })
    )
  }

  getProduct(id: number) {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.id === +id) || this.products.find(p => p.id == id)!)
    );
  }

  editProduct(id: number, newProduct: Product) {
    let index = this.products.findIndex(p => p.id == id)
    const original = this.products[index]
    this.products[index] = { ...original, ...newProduct }
    this.lsService.setInfo(this.products)
  }

  addProduct() {
    if (!this.products.length || this.products[this.products.length-1].name != "...") {
      const newProduct = { id: this.products.length, creationDate: new Date(), name: "...", price: 0, description: "" }
      this.products.push(newProduct)
      return newProduct
    }
    return
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex(p => p.id == id)
    this.products.splice(index, 1)
    this.lsService.setInfo(this.products)
  }

}
