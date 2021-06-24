import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SisgerRoutingModule } from './sisger-routing.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { ClientPipe } from './pipes/client.pipe';
import { DispatchComponent } from './pages/container-dispatch/dispatch/dispatch.component';
import { NoticationComponent } from './pages/notification/notification/notication.component';



@NgModule({
  declarations: [
    HomeComponent,
    DispatchComponent,
    NoticationComponent,
    ClientPipe
  ],
  imports: [
    CommonModule,
    SisgerRoutingModule,
    MaterialModule,
  ]
})
export class SisgerModule { }
