import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild,CanLoad {
  private currentAuthStatus:IAuthStatus;
  constructor(private authService:AuthService,private router:Router){
    this.authService.authStatus.subscribe(
      authStatus=> (this.currentAuthStatus=(this.authService.getAuthStatus()))
    );

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkPermissions(childRoute);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermissions(next);
  }
  protected checkLogin(){
    if((this.authService.getToken()==null || this.authService.getToken()==='')){
      alert('You must login to continue');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  protected checkPermissions(route?:ActivatedRouteSnapshot){
    let roleMatch=true;
   
    if(route){

      const expectedRole=route.data.expectedRole;
      
      if(expectedRole){
        roleMatch=this.currentAuthStatus.role===expectedRole;
      }
    }
    if(!roleMatch){
      alert('You do not have the permission to view resource');
      this.router.navigate(['home']);
      
      return false;
    }
    return true;
  }
}