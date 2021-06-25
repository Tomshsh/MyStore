import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<Product> {

  constructor(private ps: ProductsService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get('id')

    return this.ps.getProduct(Number(id)).pipe(
      take(1),
      mergeMap(p => {
        if(p) return of(p)
        else {
          this.router.navigate([''])
          return EMPTY
        }
      })
    )
  }
}
