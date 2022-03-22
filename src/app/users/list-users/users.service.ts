import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {

  }
  /*Devolver arreglo de customer*/
  getUsersList(page:number,rows:number):Observable<Users[]>{
    return this.http.get<Users[]>(`${environment.urlService}/Usuarios/GetPaginateUsers/${page}/${rows}`);
  }
}
