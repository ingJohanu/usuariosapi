import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component'
import { RouterModule } from '@angular/router';
import {NotFondComponent } from './not-fond/not-fond/not-fond.component';



@NgModule({
  declarations: [
    NavBarComponent,
    NotFondComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavBarComponent,
    NotFondComponent
  ]
})
export class SharedModule { }