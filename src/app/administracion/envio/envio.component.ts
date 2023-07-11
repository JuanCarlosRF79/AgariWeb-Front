import { Component } from '@angular/core';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent {

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
