import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';
import { RouterModule, Routes } from '@angular/router';

const usersRoutes:Routes=[
{
  
  path:'',
  children:[
    {
      path:'',
      component:ListUsersComponent
    }
 ],
 canActivate:[AuthGuard],
 data:{expectedRole:Role.AdminSupplier}
}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(usersRoutes),
    CommonModule
  ]
})
export class UsersRoutingModule { }
