import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar/action-bar.component';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatFormFieldModule} from '@angular/material/form-field'
import { TextFieldModule } from '@angular/cdk/text-field';


@NgModule({
  declarations: [
    ActionBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatFormFieldModule,
  ],
  exports:[
    ActionBarComponent
  ]
})
export class ProductActionsModule { }
