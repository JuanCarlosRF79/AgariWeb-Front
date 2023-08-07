import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url="http://localhost:3000/empleado";
  //private url="http://192.168.0.65:3000/empleado";

  constructor(private http:HttpClient) { }

  consultarEmpLogin(empleado:any){
    return this.http.get<any>(this.url+`/${empleado}`);
  }

  consultarEmp(empleado:object){
    return this.http.post<any>(this.url+"/buscar",empleado);
  }

  insertarEmp(empleado:object){
    return this.http.post<any>(this.url,empleado);
  }

  modificarEmp(empleado:object){
    return this.http.put<any>(this.url,empleado);
  }

  eliminarEmp(empleado:object){
    return this.http.post<any>(this.url+"/eliminar",empleado);
  }

  filtrarEmp(empleado:object){
    return this.http.post<any>(this.url+"/estado",empleado);
  }

  todoEmp(){
    return this.http.get<any>(this.url);
  }

}
