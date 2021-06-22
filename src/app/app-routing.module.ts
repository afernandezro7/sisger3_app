import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./sisger/sisger.module').then( m => m.SisgerModule) 
  },
  {
    path: '**',
    redirectTo: 'auth' 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
