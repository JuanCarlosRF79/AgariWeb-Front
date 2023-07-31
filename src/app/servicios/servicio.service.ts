import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url="http://localhost:3000/servicio";
  private idServicio:any;

  constructor(private http:HttpClient) { }

  setIdServicio(codigoServ:any){
    this.idServicio=codigoServ
  }

  getIdServicio(){
    if(this.idServicio!=null){
      return this.idServicio  
    }else{
      return null
    }
  }

  consultarServInicio(){
    return this.http.get<any>(this.url+"/inicio");
  }

  consultarServ(servicio:object){
    return this.http.post<any>(this.url+"/buscar",servicio);
  }

  insertarServ(servicio:object){
    return this.http.post<any>(this.url+"/insertar",servicio);
  }

  modificarServ(servicio:object){
    return this.http.put<any>(this.url,servicio);
  }

  confirmarServ(servicio:object){
    return this.http.put<any>(this.url+"/confirmar",servicio)
  }

  eliminarServ(servicio:object){
    return this.http.post<any>(this.url+"/cancelar",servicio);
  }

  todoServ(){
    return this.http.get<any>(this.url);
  }

}
