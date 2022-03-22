import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrEditUsers } from '../../models/add-or-edit-users';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewUsersService {

    /*Injecion de dependencias del httpClient*/
    constructor(private http:HttpClient) { }
    /*Metodo de consumo del  servicio*/
     saveUsers(data:AddOrEditUsers):Observable<Response>{
       data.id=undefined;
       /*Consumo metodo post*/
       return this.http.post(`${environment.urlService}/Usuarios/add`,data).
       pipe(
         map((response:any)=>response)
       )
     }
}
