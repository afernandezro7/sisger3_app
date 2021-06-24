import { NgModule } from '@angular/core';


import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  exports: [
    MatCardModule,
    DragDropModule
  ]
})
export class MaterialModule { }
