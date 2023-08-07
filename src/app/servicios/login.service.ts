import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Ruta de conexión
  //private url="http://localhost:3000/usuario/iniciarsesion";
  private url="http://agari.mx:3000/usuario/iniciarsesion";
  

  constructor(private http:HttpClient,
    private router:Router) { }
  
    login(usuario: object){
      return this.http.post<any>(this.url,usuario);
    }

    esEmpleado():boolean{
      return !!localStorage.getItem("puesto");
    }
  
    perfil(){
      return localStorage.getItem("puesto");
    }
  
    //this.http.put();
  
    esUsuario():boolean{
      return !!localStorage.getItem("nombre");
    }
  
    cerrarSesion(){
    
      //eliminar una variable
      //localStorage.removeItem("puesto");
  
      //eliminar todo
      localStorage.removeItem("tipo");
      localStorage.removeItem("nombre");
      localStorage.removeItem("puesto");
      this.router.navigate(['./inicio']);
    }
}
