import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsResolver } from './details.resolver';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: "", children: [
      { path: ':id', component: ProductDetailsComponent, resolve:{product: DetailsResolver} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
