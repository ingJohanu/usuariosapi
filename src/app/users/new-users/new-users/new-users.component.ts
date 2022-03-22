import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AddOrEditUsers } from '../../models/add-or-edit-users';
import { NewUsersService } from './new-users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { WhiteSpaceValidator } from 'src/app/shared/validator/WhiteSpaceValidator';
@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements OnInit {

  newUsersForm:FormGroup;
  users:AddOrEditUsers;
  /*Cargamos constructor con lo que vamos a utilizar*/

  constructor(private fb:FormBuilder, private service:NewUsersService,public dialogRef:MatDialogRef<NewUsersComponent>) { }

  buildNewCustomerForm():void{
    this.newUsersForm=this.fb.group({
      nombre:['',[Validators.required,WhiteSpaceValidator.cannonContainSpace]],
      identificacion: ['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])],
      correo:['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])],
      contacto:['',Validators.compose([Validators.required,WhiteSpaceValidator.cannonContainSpace])]
    
    });
  }

  ngOnInit(): void {
    this.buildNewCustomerForm();
  }
  SaveUsers():void{
    const p=Object.assign({},this.users,this.newUsersForm.value);
    /*Condicion de validacion de formulario*/
    if(this.newUsersForm.dirty &&this.newUsersForm.valid){
      const p=Object.assign({},this.users,this.newUsersForm.value);
      this.service.saveUsers(p).subscribe(response=>{
        this.dialogRef.close();
      });
    }else if(!this.newUsersForm.dirty){
      this.newUsersForm.reset();
    }
   
  }

}
