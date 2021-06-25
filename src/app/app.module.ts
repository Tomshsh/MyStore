import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIModule } from './ui/ui.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductListModule } from './features/product-list/product-list.module';
import { ProductActionsModule } from './features/product-actions/product-actions.module';
import { ProductModule } from './features/product/product.module';
import {MatDividerModule} from '@angular/material/divider'
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UIModule,
    MatGridListModule,
    ProductListModule,
    ProductActionsModule,
    ProductModule,
    MatDividerModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
