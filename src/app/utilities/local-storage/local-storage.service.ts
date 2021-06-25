import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockProducts } from 'src/app/mocks';
import { Product } from 'src/app/types';
import { LocalStorageRefService } from '../local-storage-ref/local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _localStorage!: Storage

  constructor(private lsRefService: LocalStorageRefService) {
    this._localStorage = lsRefService.localStorage
  }

  private _lsProducts$ = new BehaviorSubject<Product[]>([])

  public lsProducts$ = this._lsProducts$.asObservable()

  setData(data:Product[]){
    const parsedData = data.map(d => ({
      ...d,
      creationDate: new Date(d.creationDate),
      id: Number(d.id),
      price: Number(d.price),
    }))

    this._lsProducts$.next(parsedData)
  }

  setInfo(data: Product[]) {
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem('products', jsonData)
    this._lsProducts$.next(data)
  }

  loadInfo() {
    const data = JSON.parse(this._localStorage.getItem('products') ?? "[]")
    if (data.length) {
      this._lsProducts$.next(data)
    } else {
      this.setInfo([])
    }
  }

  clearInfo() {
    this._localStorage.removeItem('products')
    this._lsProducts$.next([])
  }

  clearAllLocalStorage() {
    this._localStorage.clear()
    this._lsProducts$.next([])
  }
}
