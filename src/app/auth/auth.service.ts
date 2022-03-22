import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,throwError as observableThrowError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from './role.enum';
import {map,catchError} from'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { transformError } from '../common/common';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService{

  private readonly authProvider:(usuario:string,contraseña:string)=>Observable<IServiceAuthResponse>;

  authStatus=new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);
  
  constructor(private httpClient:HttpClient) { 
    super();
    this.authStatus.subscribe(authStatus=>{
   
      this.setItem('authStatus',authStatus);
     
    });
    this.authProvider=this.userAuthProvider;
  }
  
  private userAuthProvider(usuario:string,contraseña:string):Observable<IServiceAuthResponse>{
    
    return this.httpClient.post<IServiceAuthResponse>(`${environment.urlService}/Token`,{usuario:usuario,contraseña:contraseña});
  }

  login(usuario:string,contraseña:string):Observable<IAuthStatus>{
    this.logout();

    const loginResponse=this.authProvider(usuario,contraseña).pipe(
      map(value =>{
        this.setToken(value.access_Token);
        const result= jwt_decode(value.access_Token);
       
        return result as IAuthStatus;
      }),
      catchError(transformError)
    );
    loginResponse.subscribe(res=>{
      this.authStatus.next(res);
    },
    err=>{
    this.logout();
    return observableThrowError(err);

    });
    
    return loginResponse;
  }

  logout(){
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: string){
    this.setItem('jwt',jwt);
  }

  getToken():string{
    return this.getItem('jwt') || '';
  }

  private clearToken(){
    this.removeItem('jwt');
  }
  getAuthStatus():IAuthStatus{
    return this.getItem('authStatus');
  }

}

export interface IAuthStatus{
  role:Role,
  primarysid:number,
  unique_name:string
  
}
interface IServiceAuthResponse{
  access_Token:string;
}
const defaultAuthStatus:IAuthStatus= {role:Role.None,primarysid:null,unique_name:null};
