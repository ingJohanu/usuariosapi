import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { NewUsersComponent } from '../../new-users/new-users/new-users.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUsersComponent } from '../../edit-users/edit-users/edit-users.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users:Users[]=[];
  numberRecords:number=0;
  pageSize:number=10;
  pageSizeOptions:number[]=[10,20,30];
  pageIndex:number=0;
  
  constructor(private usersService:UsersService,public dialog:MatDialog) {
    this.getUsers(1,this.pageSize);
   }

  ngOnInit(): void {
  }
  getUsers(page:number,rows:number):void{
    this.usersService.getUsersList(page,rows).
    subscribe(
      response=>{
        this.users=response;
        /*Guardamos la posicion totalRecords en la variable numberRecords*/
        this.numberRecords=response[0].totalRecords;
        
      }
    );
  }
  changePage(event:any):void{
    this.getUsers(event.pageIndex+1,event.pageSize);
  }

  /*Popad adderir newCustomer*/
  newUsers():void{
    const dialogRef=this.dialog.open(NewUsersComponent,{
      /*Propiedad poner el ancho del popad*/
      panelClass:"new-customer-modal-dialog"
    
       });
       dialogRef.afterClosed().subscribe(result=>{
        this.getUsers(1,10)
        
       });
    
  }
  editUsers(id:number):void{
    const dialogRef=this.dialog.open(EditUsersComponent,{
      panelClass:"new-customer-modal-dialog",
      
      data:{id:id}

    });
    
    dialogRef.afterClosed().subscribe(result=>{
        this.getUsers(1,10)
    });
  }
  detailUsers(id:number):void{

  }
}
