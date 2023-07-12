import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url="http://localhost:3000/servicio";

  constructor(private http:HttpClient) { }

  consultarServInicio(){
    return this.http.get<any>(this.url+"/inicio");
  }

  consultarTodoServ(servicio:any){
    return this.http.get<any>(this.url+"/");
  }

  consultarServ(servicio:object){
    return this.http.post<any>(this.url+"/buscar",servicio);
  }

  insertarServ(servicio:object){
    return this.http.post<any>(this.url,servicio);
  }

  modificarServ(servicio:object){
    return this.http.put<any>(this.url,servicio);
  }

  eliminarServ(servicio:object){
    return this.http.post<any>(this.url+"/borrar",servicio);
  }

  todoServ(){
    return this.http.get<any>(this.url);
  }

}
