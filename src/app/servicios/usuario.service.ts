import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ipServer="192.168.0.65:3000"
  constructor() { }

  getip(){
    return this.ipServer
  }
}
