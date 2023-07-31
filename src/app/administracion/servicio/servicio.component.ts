import { Component,OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {

  constructor(private servicioSev:ServicioService, 
    private clienteServ:ClienteService) { }

    ngOnInit(): void {
      this.consultarClientes()
      this.todoServ()
    }

  alertaArriba=false
  alertaAbajo=false
  exito=false

  descripcionAlert=""

  filtrado:any
  filtroEst=""
  filtroFech=""

  clientes:any
  maxId:any
  servicios:any

  servicio={
    idServicio:"",
    idCliente:"",
    nombreEmp:"",
    apellidoPatEmp:"",
    telefono:"",
    estado: "Jalisco",
    ciudad: "",
    calle : "",
    colonia : "",
    descripcionDireccion : "",
    descripcionProblema : "",
    fechaOrden : "",
    estadoServicio : "",
    fechaFinalizado :  "",
    proximaCita :  "",
    pagoServicio : ""
  }

  consultarClientes(){
    this.clienteServ.todoCli().subscribe(
      (res)=>{
        this.clientes=res
        console.log(this.clientes)
      },(err)=>{
        console.log(err);
      }
    );
  }

  todoServ(){
    this.servicioSev.todoServ().subscribe(
      (res)=>{
        this.servicios=res
        this.maxId=res.length
        console.log(this.servicios)
      },(err)=>{
        alert(err.error)
        console.log(err);
      }
    );
  }

  insertarServ(){

  }

  modificarServ(){

  }

  formatoFecha(fecha:any){
    var apoyo = fecha.split("T")
    return apoyo[0]
  }

  formatoCosto(costo:any){
    return costo.toLocaleString('en-US')
  }

  formatoTelefono(telefono:any){
    var apoyo = telefono.slice(0,2)+" "+telefono.slice(2,6)+" "+telefono.slice(6,10)
    return apoyo
  }

  buscarServ(idServicio:any){
    this.servicio.idServicio=idServicio
    this.servicioSev.consultarServ(this.servicio).subscribe(
      (res)=>{
        this.servicio=res[0];
        
        var fechas = res[0].fechaOrden.split("T")
        this.servicio.fechaOrden = fechas[0]
        fechas=res[0].proximaCita.split("T")
        this.servicio.proximaCita = fechas[0]
        fechas=res[0].fechaFinalizado.split("T")
        this.servicio.fechaFinalizado = fechas[0]

        
      },(err)=>{
        alert(err.error)
        console.log(err);
      }
    );
  }

  consultarServ(){
    this.servicioSev.consultarServ(this.servicio).subscribe(
      (res)=>{
        this.servicio=res[0];
        
        var fechas = res[0].fechaOrden.split("T")
        this.servicio.fechaOrden = fechas[0]
        fechas=res[0].proximaCita.split("T")
        this.servicio.proximaCita = fechas[0]
        fechas=res[0].fechaFinalizado.split("T")
        this.servicio.fechaFinalizado = fechas[0]

      },(err)=>{
        alert(err.error)
        console.log(err);
      }
    );
  }

  eliminarServ(){

  }

  limpiar(){

  }

}
