import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SisgerRoutingModule } from './sisger-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SisgerRoutingModule,
    NotificationsModule,
    MaterialModule
  ]
})
export class SisgerModule { }
