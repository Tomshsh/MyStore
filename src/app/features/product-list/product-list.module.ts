import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { UIModule } from 'src/app/ui/ui.module';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule { }
