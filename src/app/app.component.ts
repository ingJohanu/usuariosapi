import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuariosapi';
  _displayLogin=false;

  constructor(private authService:AuthService){

  }
  ngOnInit():void{
    this.authService.authStatus.subscribe(
      authStatus=>{
        const jwt=this.authService.getToken();
        setTimeout(()=>(this._displayLogin = !(jwt==null || jwt===''),0));
      }
    );
    
  }
  get displayMenu(){
    return this._displayLogin;
  }

}
