import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticationComponent } from './pages/notification/notification/notication.component';
import { DispatchComponent } from './pages/container-dispatch/dispatch/dispatch.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: 'notificaciones',
        component: NoticationComponent
      },
      {
        path: 'despacho',
        component: DispatchComponent
      },
      {
        path:'**',
        redirectTo: 'notificaciones'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SisgerRoutingModule { }
