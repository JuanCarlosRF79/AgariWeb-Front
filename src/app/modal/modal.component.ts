import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{
  @Input() showModal: boolean = false;
  @Input() idServicio: string = "0";
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  constructor(private servicioSev:ServicioService, 
    private clienteServ:ClienteService, private snackBar:MatSnackBar) { }


    //Ejecutar función por fuera

    clickEventsubscription=this.servicioSev.getClickEvent().subscribe(
      ()=>{
        this.buscarServ(this.servicioSev.getIdServicio( ))
      }
    )

    ngOnInit(): void {
      this.consultarClientes()
    }

  municipios=[
    "Acatic", "Acatlan de Juarez", "Ahualulco de Mercado", "Amacueca", "Amatitan",
    "Ameca", "Arandas", "Atemajac de Brizuela", "Atengo", "Atenguillo",
    "Atotonilco el Alto", "Atoyac", "Autlan de Navarro","Ayotlan","Ayutla","Bolanos",
    "Cabo Corrientes","Canadas de Obregon","Casimiro Castillo","Chapala","Chimaltitan",
    "Chiquilistlan","Cihuatlan","Cocula","Colotlan","Concepcion de Buenos Aires",
    "Cuautitlan de Garcia Barragan","Cuautla","Cuquio","Degollado","Ejutla",
    "El Arenal","El Grullo","El Limon","El Salto","Encarnacion de Diaz","Etzatlan",
    "Gomez Farias","Guachinango","Guadalajara","Hostotipaquillo","Huejucar",
    "Huejuquilla el Alto","Ixtlahuacan de los Membrillos","Ixtlahuacan del Rio",
    "Jalostotitlan","Jamay","Jesus Maria","Jilotlan de los Dolores","Jocotepec",
    "Juanacatlan","Juchitlan","La Barca","La Huerta","La Manzanilla de la Paz",
    "Lagos de Moreno","Magdalena","Mascota","Mazamitla","Mexticacan","Mezquitic",
    "Mixtlan","Ocotlan","Ojuelos de Jalisco","Pihuamo","Poncitlan","Puerto Vallarta",
    "Quitupan","San Cristobal de la Barranca","San Diego de Alejandria","San Gabriel",
    "San Ignacio Cerro Gordo","San Juan de los Lagos","San Juanito de Escobedo",
    "San Julian","San Marcos","San Martin Hidalgo","San Martin de Bolanos",
    "San Miguel el Alto","San Pedro Tlaquepaque","San Sebastian del Oeste",
    "Santa Maria de los Angeles","Santa Maria del Oro","Sayula","Tala",
    "Talpa de Allende","Tamazula de Gordiano","Tapalpa","Tecalitlan",
    "Techaluta de Montenegro","Tecolotlan","Tenamaxtlan","Teocaltiche",
    "Teocuitatlan de Corona","Tepatitlan de Morelos","Tequila","Teuchitlan",
    "Tizapan el Alto","Tlajomulco de Zuniga","Toliman","Tomatlan","Tonala","Tonaya",
    "Tonila","Totatiche","Tototlan","Tuxcacuesco","Tuxcueca","Tuxpan",
    "Union de San Antonio","Union de Tula","Valle de Guadalupe","Valle de Juarez",
    "Villa Corona","Villa Guerrero","Villa Hidalgo","Villa Purificacion",
    "Yahualica de Gonzalez Gallo","Zacoalco de Torres","Zapopan","Zapotiltic",
    "Zapotitlan de Vadillo","Zapotlan del Rey","Zapotlan el Grande","Zapotlanejo"
  ];

  clientes:any
  maxId:any
  servicios:any

  servicio={
    idServicio:"",
    idCliente:"",
    nombre_cli:"",
    apellidoPat_cli:"",
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
    pagoServicio : "",

    descDire:"",
    descProb:"",
    pago:"",
    municipio:"",
    costo:""

  }

  consultarClientes(){
    this.clienteServ.todoCli().subscribe(
      (res)=>{
        this.clientes=res
        //console.log(this.clientes)
      },(err)=>{
        console.log(err);
      }
    );
  }

  buscarServ(idServicio:any){
    this.servicio.idServicio=idServicio
    this.servicioSev.consultarServ(this.servicio).subscribe(
      (res)=>{
        this.servicio=res[0];
        
        var fechas = res[0].fechaOrden.split("T")
        this.servicio.fechaOrden = fechas[0]

        if(res[0].proximaCita!=null){
          fechas=res[0].proximaCita.split("T")
          this.servicio.proximaCita = fechas[0]
        }

        if(res[0].fechaFinalizado!=null){
          fechas=res[0].fechaFinalizado.split("T")
          this.servicio.fechaFinalizado = fechas[0]
        }

      },(err)=>{
        alert(err.error)
        console.log(err);
      }
    );
  }

  alertado(){
    alert(this.idServicio+"")
  }

  eliminarServ(){
    if(this.servicio.idServicio!=""){
      if(this.servicio.pagoServicio=="300" && this.servicio.estadoServicio=="Solicitado"){
        this.servicio.pagoServicio="0.0"
      }

      this.servicioSev.eliminarServ(this.servicio).subscribe(
        (res)=>{
          if(res>0){
            this.alerta("Servicio cancelado","Aceptar")
            this.servicioSev.senActualizar("a")
            this.onCloseModal()
          }
        },
        (err)=>{
          this.alerta("Error al cancelar servicio","Aceptar")
          console.log(err)
        }
      )
    }else{
      this.alerta("Ingresa un código de servicio","Aceptar")
    }
  }

  completarServ(){
    this.servicioSev.completarServ(this.servicio).subscribe(
      (res)=>{

        if(res>0){
          this.alerta("Servicio completado","Aceptar")
          this.servicioSev.senActualizar("a")
          this.onCloseModal()
        }
      },
      (err)=>{

        this.alerta("Error al completar servicio","Aceptar")
        console.log(err)
      }
    )
  }

  confirmarServ(){
    if(this.servicio.pagoServicio!=""&&this.servicio.proximaCita!=""){
      this.servicioSev.confirmarServ(this.servicio).subscribe(
        (res)=>{
          if(res>0){
            this.alerta("Servicio agendado","Aceptar")
            this.servicioSev.senActualizar("a")
            this.onCloseModal()
          }
        },
        (err)=>{

          this.alerta("Error al agendar servicio","Aceptar")
          console.log(err)
        }
      )
    }else{
      this.alerta("Por favor llena todos los campos","Aceptar")
    }
  }

  

  vaciar(){
    this.servicio.idServicio=""
    this.servicio.idCliente=""
    this.servicio.nombre_cli=""
    this.servicio.apellidoPat_cli=""
    this.servicio.telefono=""
    this.servicio.ciudad= ""
    this.servicio.calle = ""
    this.servicio.colonia = ""
    this.servicio.descripcionDireccion = ""
    this.servicio.descripcionProblema = ""
    this.servicio.fechaOrden = ""
    this.servicio.estadoServicio = ""
    this.servicio.fechaFinalizado =  ""
    this.servicio.proximaCita =  ""
    this.servicio.pagoServicio = ""
  }

  limpiar(){
    this.vaciar()
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

  alerta(mensaje:string,accion:string){
    this.snackBar.open(mensaje,accion)
  }
}
