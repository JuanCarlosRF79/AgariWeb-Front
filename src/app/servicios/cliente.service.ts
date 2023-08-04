import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private url="http://192.168.0.106:3000/clientes";
  private url="http://localhost:3000/cliente";
  //private url="http://192.168.0.65:3000/clientes";

  constructor(private http:HttpClient) { }

  consultarCli(cliente:object){
    return this.http.post<any>(this.url+"/buscar/web",cliente);
  }

  insertarCli(cliente:object){
    return this.http.post<any>(this.url+"/insertar",cliente);
  }

  modificarCli(cliente:object){
    return this.http.put<any>(this.url,cliente);
  }

  eliminarCli(cliente:object){
    return this.http.post<any>(this.url+"/borrar",cliente);
  }

  filtrarCli(cliente:object){
    return this.http.post<any>(this.url+"/filtrar",cliente);
  }

  todoCli(){
    return this.http.get<any>(this.url);
  }
  
}
