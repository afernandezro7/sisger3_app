import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: 'notification',
        loadChildren: () => import('./modules/notifications/notifications.module').then( m => m.NotificationsModule)
      },
      {
        path:'**',
        redirectTo: 'notification'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SisgerRoutingModule { }
