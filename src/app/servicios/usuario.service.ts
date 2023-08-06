import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor() { }

  setInicio(usuario:string){
    localStorage.clear()
    localStorage.setItem("Usuario",usuario)
  }

  getInicio(){
    if(localStorage.getItem("Usuario")!=null){
      return true
    }
    return false
  }

  limpiarUsuario(){
    localStorage.clear()
  }

}
