import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddOrEditUsers } from './models/add-or-edit-users';

@Injectable({
  providedIn: 'root'
})
export class EditUsersService {

  constructor(private http:HttpClient) { }
  /*Metodo que devuelve el registro por id*/
  getUsersId(int:number):Observable<AddOrEditUsers>{
    return this.http.get<AddOrEditUsers>(`${environment.urlService}/Usuarios/${int}`)
  }

  /*Metodo editar customer*/
  editUsers(data:AddOrEditUsers):Observable<Response>{
    
    return this.http.put(`${environment.urlService}/Usuarios/Update`,data).
    pipe(
      map((response:any)=>response)
    )
  }
}