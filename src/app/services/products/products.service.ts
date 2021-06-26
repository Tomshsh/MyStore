import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { Product } from 'src/app/types';
import { LocalStorageService } from 'src/app/utilities/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private lsService: LocalStorageService) {
    lsService.loadInfo()
    lsService.lsProducts$.pipe(take(1))
      .subscribe(products => {
        this.products = products
        this.products.map(p => this.productIdMap.set(p.id, 1))
      })
  }

  products: Product[] = []

  productIdMap = new Map<number, number>()

  getProducts = () => {
    return this.lsService.lsProducts$
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
    if (!this.products.length || this.products[this.products.length - 1].name != "...") {
      const key = this.keyGenerator(this.products.length)
      const newProduct = { id: key, creationDate: new Date(), name: "...", price: 0, description: "" }
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

  keyGenerator(startPos: number): number {
    let key = startPos
    let i = 1
    while (this.productIdMap.has(key)) {
      key = key + i * i
      i++
    }
    this.productIdMap.set(key, 1)
    return key
  }

}
