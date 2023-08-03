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
    estadoProd:"",
    img: "",
  }

  todoProd(){
    this.productoServ.todoProd().subscribe(
      (res)=>{
        this.productos=res
        //console.log(this.productos)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  buscarProd(){
    if(this.producto.idProducto!=""){
      this.productoServ.consultarProd(this.producto).subscribe(
        (res)=>{
          //console.log(res[0])
          this.productos=[]
          this.productos.push(res[0])

          this.producto=res[0]

          if(this.producto.ultimaVenta!=null){
            this.producto.ultimaVenta=this.formatoFecha(this.producto.ultimaVenta)
          }
          
          if(this.producto.ultimoSurtido){
            this.producto.ultimoSurtido=this.formatoFecha(this.producto.ultimoSurtido)
          }
          
        },
        (err)=>{
          console.log(err)
        }
      )
    }else{
      this.filtrarProd()
    }
  }

  consultarProd(codigo:any){
    this.producto.idProducto=codigo
    this.productoServ.consultarProd(this.producto).subscribe(
      (res)=>{
        //console.log(res[0])
        this.producto=res[0]
        if(this.producto.ultimaVenta!=null){
          this.producto.ultimaVenta=this.formatoFecha(this.producto.ultimaVenta)
        }
        
        if(this.producto.ultimoSurtido){
          this.producto.ultimoSurtido=this.formatoFecha(this.producto.ultimoSurtido)
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  modificarProd(){
    if(this.producto.idProducto!=""&&this.producto.condicion!=""&&this.producto.costoIndividual!=""&&this.producto.descripcionProd!=""
    &&this.producto.estado!=""&&this.producto.img!=""&&this.producto.marca!=""&&this.producto.nombre!=""
    &&this.producto.stock!=""){
      if(this.producto.ultimaVenta==null){
        this.producto.ultimaVenta=""
      }
      if(this.producto.ultimoSurtido==null){
        this.producto.ultimoSurtido=""
      }
      if(this.producto.img==null){
        this.producto.img=""
      }

      this.productoServ.modificarProd(this.producto).subscribe(
        (res)=>{
          if(res>0){
            this.buscarProd()
            this.alerta("Producto modificado","Aceptar")
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }else{
      this.alerta("Por favor llena todos los campos","Aceptar")
    }
  }

  eliminarProd(){
    if(this.producto.idProducto!=""&&this.producto.condicion!=""&&this.producto.costoIndividual!=""&&this.producto.descripcionProd!=""
    &&this.producto.estado!=""&&this.producto.img!=""&&this.producto.marca!=""&&this.producto.nombre!=""
    &&this.producto.stock!=""){
      
      this.producto.estado="Descontinuado"

      if(this.producto.ultimaVenta==null){
        this.producto.ultimaVenta=""
      }
      if(this.producto.ultimoSurtido==null){
        this.producto.ultimoSurtido=""
      }
      if(this.producto.img==null){
        this.producto.img=""
      }

      this.productoServ.modificarProd(this.producto).subscribe(
        (res)=>{
          if(res>0){
            this.buscarProd()
            this.alerta("Producto eliminado","Aceptar")
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }else{
      this.alerta("Por favor llena todos los campos","Aceptar")
    }
  }

  insertarProd(){
    if(this.producto.condicion!=""&&this.producto.costoIndividual!=""&&this.producto.descripcionProd!=""
    &&this.producto.estado!=""&&this.producto.img!=""&&this.producto.marca!=""&&this.producto.nombre!=""
    &&this.producto.stock!=""){
      this.productoServ.insertarProd(this.producto).subscribe(
        (res)=>{
          if(res>0){
            this.producto.idProducto=res
            this.buscarProd()
            this.alerta("Producto registrado","Aceptar")
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }else{
      this.alerta("Por favor llena todos los campos","Aceptar")
    }
  }

  filtrarProd(){
    this.producto.estadoProd=this.producto.estado
    this.productoServ.filtrarProd(this.producto).subscribe(
      (res)=>{
          this.alerta("Productos filtrados","Aceptar")
          this.productos=res
      },
      (err)=>{
        if(err.error.text=="No hay productos registrados"){
          this.alerta("No hay productos que coincidan","Aceptar")
        }else{
          this.alerta("Error al filtrar productos","Aceptar")
          console.log(err)
        }
      }
    )
  }

  vaciar(){
    this.producto.idProducto=""
    this.producto.nombre= ""
    this.producto.descripcionProd= ""
    this.producto.costoIndividual= ""
    this.producto.marca= ""
    this.producto.condicion= ""
    this.producto.stock= ""
    this.producto.ultimaVenta= ""
    this.producto.ultimoSurtido= ""
    this.producto.estado= ""
    this.producto.img= ""
    this.producto.estadoProd=""

    var input = document.getElementById('imagen') as HTMLInputElement | null;
    if(input!=null){
      input.value=""
    }
  }

  limpiar(){
    this.vaciar()
    this.todoProd()
  }

  formatoFecha(fecha:any){
    var apoyo = fecha.split("T")
    return apoyo[0]
  }

  alerta(mensaje:string,accion:string){
    this.snackBar.open(mensaje,accion)
  }

  /* ()=> es para funciones asincronas wtf! */

  getBase64(event:any) {
    let hola:any
    let verificar=false
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      if(reader.result!=null){
        hola = reader.result.toString().split(',')[1]
        this.producto.img=hola;
        console.log(this.producto)
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      verificar=false
    };
 }

}
