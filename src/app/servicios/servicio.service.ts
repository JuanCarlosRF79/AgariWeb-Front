import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url="http://localhost:3000/servicio";
  private idServicio:any;

  constructor(private http:HttpClient) { }

  //Ejecutar función desde otro componente para el modal
  private subject = new Subject<any>();
  
  sendClickEvent(idServicio: any) {
    this.subject.next(idServicio);
    this.setIdServicio(idServicio)
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

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

  filtrarServ(servicio:object){
    return this.http.post<any>(this.url+"/filtrar/web",servicio);
  }

  insertarServ(servicio:object){
    return this.http.post<any>(this.url+"/insertar",servicio);
  }

  modificarServ(servicio:object){
    return this.http.put<any>(this.url,servicio);
  }

  confirmarServ(servicio:object){
    return this.http.post<any>(this.url+"/confirmar",servicio)
  }

  completarServ(servicio:object){
    return this.http.post<any>(this.url+"/completar",servicio)
  }

  eliminarServ(servicio:object){
    return this.http.post<any>(this.url+"/cancelar",servicio);
  }

  todoServ(){
    return this.http.get<any>(this.url);
  }

}
