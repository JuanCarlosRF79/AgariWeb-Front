import { Component } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  constructor(private productoServ:ProductoService, private snackBar:MatSnackBar){}

  ngOnInit():void{
    this.todoProd()
  }

  productos:any

  producto={
    idProducto:"",
    nombre: "",
    descripcionProd: "",
    costoIndividual: "",
    marca: "",
    condicion: "",
    stock: "",
    ultimaVenta: "",
    ultimoSurtido: "",
    estado: "",
    img: ""
  }

  todoProd(){
    this.productoServ.todoProd().subscribe(
      (res)=>{
        this.productos=res
        console.log(this.productos)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  buscarProd(){
    this.productoServ.consultarProd(this.producto).subscribe(
      (res)=>{
        console.log(res[0])
        this.producto=res[0]
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  alerta(mensaje:string,accion:string){
    this.snackBar.open(mensaje,accion)
  }

}
