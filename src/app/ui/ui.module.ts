import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs'
import {MatGridListModule} from '@angular/material/grid-list';
import { VerticalCardComponent } from './vertical-card/vertical-card.component';
import {MatCardModule} from '@angular/material/card'
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    ContainerComponent,
    VerticalCardComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule
  ],
  exports:[
    ContainerComponent,
    VerticalCardComponent,
    ToolbarComponent
  ]
})
export class UIModule { }
