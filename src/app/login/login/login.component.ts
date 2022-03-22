import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { WhiteSpaceValidator } from 'src/app/shared/validator/WhiteSpaceValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError='';
  loginForm: FormGroup=new FormGroup({});

  constructor(private fb:FormBuilder,private authService:AuthService,private router: Router ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm()
  }

  login(submittedForm:FormGroup){
    this.authService.login(submittedForm.value.usuario,submittedForm.value.contraseña).
    subscribe(authResponse=>{
      this.router.navigate(['/home'])
    },error=>{
      this.loginError=error
    });
  }

  buildLoginForm():void{
    this.loginForm=this.fb.group({
      usuario:['',[Validators.required,WhiteSpaceValidator.cannonContainSpace]],
      contraseña:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50),WhiteSpaceValidator.cannonContainSpace]]
    });
  }

}

