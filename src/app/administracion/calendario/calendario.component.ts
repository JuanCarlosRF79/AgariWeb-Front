import { Component } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})

export class CalendarioComponent {
  selected: Date | null;
  showModal: boolean = false;

  constructor(private servicioSev:ServicioService, private clienteServ:ClienteService, private snackBar:MatSnackBar,
    private dateAdapter:DateAdapter<any>) {
      this.dateAdapter.setLocale('mx')
      this.selected = null;
  }
  ngOnInit(): void {
    this.todoServ()
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

servicios:any

filtro={
  estadoServicio:"",
  fechaFiltro:""
}

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
  pagoServicio : "",

  descDire:"",
  descProb:"",
  pago:"",
  municipio:"",
  costo:""

}

buscarServ(idServicio:any){
  this.servicioSev.setIdServicio(idServicio)
  this.servicioSev.sendClickEvent(idServicio)
  this.onOpenModal()
}

onOpenModal() {
  this.showModal = true;
}

onCloseModal() {
  this.vaciar()
  this.showModal = false;
}

todoServ(){
  this.servicioSev.todoServ().subscribe(
    (res)=>{
      this.servicios=res
      //console.log(this.servicios)
    },(err)=>{
      alert(err.error)
      console.log(err);
    }
  );
}

filtrarServ(){
  this.servicioSev.filtrarServ(this.filtro).subscribe(
    (res)=>{
      this.servicios=res
      this.alerta("Servicios filtrados","Aceptar")
    },
    (err)=>{
      if(err.error.text=="No hay servicios registrados"){
        this.alerta("No hay servicios que coincidan","Aceptar")
      }else{
        this.alerta("Error al buscar servicio","Aceptar")
        console.log(err)
      }
    })
}

vaciar(){
  this.servicio.idServicio=""
  this.servicio.idCliente=""
  this.servicio.nombreEmp=""
  this.servicio.apellidoPatEmp=""
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

  this.filtro.estadoServicio=""
  this.filtro.fechaFiltro=""
  this.selected=null
}

limpiar(){
  this.vaciar()
  this.todoServ()
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

  formatSelectedDate(): string {
    if (!this.selected) {
      this.filtro.fechaFiltro=""
      return ''; // Manejar el caso en el que selected sea null o undefined.
    }

    const year = this.selected.getFullYear();
    const month = (this.selected.getMonth() + 1).toString().padStart(2, '0');
    const day = this.selected.getDate().toString().padStart(2, '0');

    this.filtro.fechaFiltro=`${year}-${month}-${day}`
    return `${year}-${month}-${day}`;
  }
}
