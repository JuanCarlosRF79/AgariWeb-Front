import { Component } from '@angular/core';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {

  alertaArriba=false;
  alertaAbajo=false;
  exito=false;

  descripcionAlert="";

  filtrado:any;
  filtroEst="";
  filtroFech="";

  servicios:any;

  servicio={
    codigoTick:"",
    nombreCli:"",
    apellidoPatCli:"",
    nombreEmp:"",
    apellidoPatEmp:"",
    telefono:"",
   // descuento: "",        
    //descuentoDesc: "",
    metodoPago : "",
    tipoTicket :  "Servicio",
    
    calle : "",
    colonia : "",
    descViv : "",
    descProb : "",
    fechaSol : "",
    estado : "",
    fechaFin :  "",

    costoTotal : "",
    fechaTicket : ""
  }

}
