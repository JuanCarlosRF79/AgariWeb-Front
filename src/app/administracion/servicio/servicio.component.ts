import { Component } from '@angular/core';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {

  descripcionAlert="";

  filtrado:any;
  filtroEst="";
  filtroFech="";


  envio={
    codigoTick:"",
    nombreCli:"",
    apellidoPatCli:"",
    telefono:"",
   // descuento: "",        
    //descuentoDesc: "",
    metodoPago : "",
    tipoTicket :  "Envio",
    
    calle : "",
    colonia : "",
    ultimaAct : "",
    estadoEnvio : "",
    fechaFin :  "",

    nombreProd:"",
    costoIndividual:"",
    cantidadVendida:"",
    total:"",

    costoTotal : "",
    fechaTicket : ""
  }

}
