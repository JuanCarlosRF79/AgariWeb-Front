import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url="http://localhost:3000/empleado";

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
    return this.http.post<any>(this.url+"/borrar",empleado);
  }

  todoEmp(){
    return this.http.get<any>(this.url);
  }

}
