import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UIModule } from '../ui/ui.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    UIModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class ComponentsModule { }
