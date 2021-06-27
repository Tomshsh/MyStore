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
        this._products = products
        this._products.map(p => this.productIdMap.set(p.id, 1))
      })
  }

  private _products: Product[] = []

  private productIdMap = new Map<number, number>()

  getProducts = () => {
    return this.lsService.lsProducts$
  }

  getProduct(id: number) {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.id === +id) || this._products.find(p => p.id == id)!)
    );
  }

  editProduct(id: number, newProduct: Product) {
    let index = this._products.findIndex(p => p.id == id)
    const original = this._products[index]
    this._products[index] = { ...original, ...newProduct }
    this.lsService.setInfo(this._products)
  }

  addProduct() {
    if (!this._products.length || this._products[this._products.length - 1].name != "...") {
      const key = this.keyGenerator(this._products.length)
      const newProduct = { id: key, creationDate: new Date(), name: "...", price: 0, description: "" }
      this._products.push(newProduct)
      return newProduct
    }
    return
  }

  deleteProduct(id: number) {
    const index = this._products.findIndex(p => p.id == id)
    this._products.splice(index, 1)
    this.lsService.setInfo(this._products)
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
