import { Component, OnInit,Inject } from '@angular/core';
import { AddOrEditUsers } from '../../models/add-or-edit-users';
import { EditUsersService } from '../../edit-users.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WhiteSpaceValidator } from 'src/app/shared/validator/WhiteSpaceValidator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/*Propiedad*/
export interface DialogData{
  id:number;

}
@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  editUsersForm:FormGroup;
  customer:AddOrEditUsers;
  constructor(private service:EditUsersService,private fb:FormBuilder,
  public dialogRef:MatDialogRef<EditUsersComponent>,@Inject(MAT_DIALOG_DATA) public data:DialogData) {

    /*Envio id desde el controlador*/
    this.EditNewUsers(data.id)
   }

  ngOnInit(): void {
    this.editNewUsersForm();
  }
  editNewUsersForm():void{

    this.editUsersForm=this.fb.group({
      nombre:['',[Validators.required,WhiteSpaceValidator.cannonContainSpace]],
      identificacion:['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])],
      correo:['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])],
      contacto:['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])]
    });

  }

  EditNewUsers(id:number):void{
    
    this.service.getUsersId(id).
    subscribe(response=>{
      this.customer=response;
      this.editUsersForm.patchValue({
        nombre:response.nombre,
        identificacion:response.identificacion,
        correo:response.correo,
        contacto:response.contacto
      });
    });
  }

  EditUsers():void{
    if(this.editUsersForm.dirty &&this.editUsersForm.valid){
      const p=Object.assign({},this.customer,this.editUsersForm.value);
      p.id=this.data.id;
      this.service.editUsers(p).
      subscribe(response=>{
        this.dialogRef.close();
      });
    }else if(!this.editUsersForm.dirty){
      this.editUsersForm.reset();
    }
  }
}
