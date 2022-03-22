import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { NotFondComponent } from './shared/not-fond/not-fond/not-fond.component';
const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule),
    canLoad:[AuthGuard]
  },
  {
    path:'usuarios',
    loadChildren:()=>import('./users/users.module').then(m=>m.usersModule),
    canLoad:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logout',component:LogoutComponent
  },
  {
    path:'',redirectTo:'/login',pathMatch:'full'
  },
  {
    path:'**',
    component:NotFondComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
