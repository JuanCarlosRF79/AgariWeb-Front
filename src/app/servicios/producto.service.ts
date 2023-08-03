import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url="http://localhost:3000/producto";

  constructor(private http:HttpClient) { }

  consultarProd(producto:object){
    return this.http.post<any>(this.url+"/buscar",producto);
  }

  buscarProd(codigo: String){
    return this.http.get<any>(this.url+"/buscar/:"+codigo);
  }

  insertarProd(producto:object){
    return this.http.post<any>(this.url+"/",producto);
  }

  modificarProd(producto:object){
    return this.http.put<any>(this.url+"/modificar",producto);
  }

  eliminarProd(producto:object){
    return this.http.post<any>(this.url+"/borrar",producto);
  }

  todoProd(){
    return this.http.get<any>(this.url);
  }

  filtrarProd(producto:object){
    return this.http.post<any>(this.url+"/filtrar",producto);
  }

}
