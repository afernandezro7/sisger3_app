import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticationComponent } from './pages/notification/notication.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'',
        component: NoticationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
