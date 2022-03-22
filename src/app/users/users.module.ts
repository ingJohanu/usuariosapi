import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatCardModule } from '@angular/material/card';
import {  MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NewUsersComponent } from './new-users/new-users/new-users.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditUsersComponent } from './edit-users/edit-users/edit-users.component';



@NgModule({
  declarations: [
    ListUsersComponent,
    NewUsersComponent,
    EditUsersComponent
  ],
  imports: [
    MatCardModule,
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents:[NewUsersComponent,EditUsersComponent ],
  exports:[
    ListUsersComponent
  ]
})
export class usersModule { }
