import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  constructor(private clienteServ:ClienteService,private snackBar:MatSnackBar){}

  ngOnInit(){
    this.todoCli()
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

  cliente={
    idCliente:"",
    nombre_cli: "",
    apellidoPat_cli: "",
    apellidoMat_cli: "",
    sexo: "",
    fechaNac: "",
    rfc: "",
    ciudad:"",
    calle: "",
    colonia: "",
    telefono: "",
    email: "",
    estado: "",
    contrasenia: "",
  }


  todoCli(){
    this.clienteServ.todoCli().subscribe(
      (res)=>{
        this.clientes=res
      },
      (err)=>{

      }
    )
  }

  buscarCli(){
   if(this.verificarCli()){
    this.clienteServ.consultarCli(this.cliente).subscribe(
      (res)=>{
        this.clientes=[]
        this.cliente=res
        this.cliente.fechaNac=this.formatoFecha(this.cliente.fechaNac)
        this.clientes.push(res)
      },
      (err)=>{
        console.log(err)
        this.alerta("Error al buscar cliente","Aceptar")
      }
    )
   }else if(this.cliente.estado!=""){
    this.filtrarCli() 
   }else{
    this.alerta("Ingresa un código o nombre y apellido","Aceptar")
   } 
  }

  consultarCli(codigo:any){
    this.cliente.idCliente=codigo
    this.clienteServ.consultarCli(this.cliente).subscribe(
      (res)=>{
        this.cliente=res
        this.cliente.fechaNac=this.formatoFecha(this.cliente.fechaNac)
      },
      (err)=>{
        console.log(err)
        this.alerta("Error al buscar cliente","Aceptar")
      })
  }

  insertarCli(){
    if(this.cliente.nombre_cli!= ""&& this.cliente.apellidoPat_cli!= ""&& this.cliente.apellidoMat_cli!= ""
    && this.cliente.sexo!= "" && this.cliente.fechaNac!= ""&& this.cliente.rfc!= "" && this.cliente.ciudad!="" 
    && this.cliente.calle!= ""&& this.cliente.colonia!= "" && this.cliente.telefono!= "" && this.cliente.email!= "" 
    && this.cliente.contrasenia!= ""){

      this.clienteServ.insertarCli(this.cliente).subscribe(
        (res)=>{
          if(res>0){
            this.cliente.idCliente=res
            this.buscarCli()
            this.alerta("Cliente registrado","Aceptar")
          }
        },
        (err)=>{
          console.log(err)
        })

    }else{
      this.alerta("Por favor llena todos los campos","Aceptar")
    }
  }

  modificarCli(){
  if(this.cliente.idCliente!=""&& this.cliente.nombre_cli!= ""&& this.cliente.apellidoPat_cli!= ""&& this.cliente.apellidoMat_cli!= ""
  && this.cliente.sexo!= "" && this.cliente.fechaNac!= ""&& this.cliente.rfc!= "" && this.cliente.ciudad!="" 
  && this.cliente.calle!= ""&& this.cliente.colonia!= "" && this.cliente.telefono!= "" && this.cliente.email!= "" 
  && this.cliente.estado!= "" && this.cliente.contrasenia!= ""){
    this.clienteServ.modificarCli(this.cliente).subscribe(
      (res)=>{
        if(res>0){
          this.buscarCli()
          this.alerta("Cliente modificado","Aceptar")
        }else{
          this.alerta("Error al modificar cliente","Aceptar")
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

  eliminarCli(){
    if(this.cliente.idCliente!=""&& this.cliente.nombre_cli!= ""&& this.cliente.apellidoPat_cli!= ""&& this.cliente.apellidoMat_cli!= ""
  && this.cliente.sexo!= "" && this.cliente.fechaNac!= ""&& this.cliente.rfc!= "" && this.cliente.ciudad!="" 
  && this.cliente.calle!= ""&& this.cliente.colonia!= "" && this.cliente.telefono!= "" && this.cliente.email!= "" 
  && this.cliente.estado!= "" && this.cliente.contrasenia!= ""){
    this.cliente.estado="De baja"
    this.clienteServ.modificarCli(this.cliente).subscribe(
      (res)=>{
        if(res>0){
          this.buscarCli()
          this.alerta("Cliente eliminado","Aceptar")
        }else{
          this.alerta("Error al eliminar cliente","Aceptar")
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

  filtrarCli(){
    this.clienteServ.filtrarCli(this.cliente).subscribe(
      (res)=>{
        this.alerta("Clientes filtrados","Aceptar")
        this.clientes=res
      },
      (err)=>{
        if(err.error.text=="No hay clientes registrados"){
          this.alerta("No hay clientes que coincidan","Aceptar")  
        }else{
          this.alerta("Error al filtrar clientes","Aceptar")
          console.log(err)
        }
      }
    )
  }

  vaciar(){
   this.cliente.idCliente=""
   this.cliente.nombre_cli= ""
   this.cliente.apellidoPat_cli= ""
   this.cliente.apellidoMat_cli= ""
   this.cliente.sexo= ""
   this.cliente.fechaNac= ""
   this.cliente.rfc= ""
   this.cliente.ciudad=""
   this.cliente.calle= ""
   this.cliente.colonia= ""
   this.cliente.telefono= ""
   this.cliente.email= ""
   this.cliente.estado= ""
   this.cliente.contrasenia= ""
  }

  limpiar(){
    this.vaciar()
    this.todoCli()
  }

  verificarCli(){
    if(this.cliente.idCliente!="" && this.cliente.idCliente!=null){
      return true
    }
    if(this.cliente.nombre_cli!=""&&this.cliente.nombre_cli!=null
    &&this.cliente.apellidoPat_cli!=""&&this.cliente.apellidoPat_cli!=null){
      return true
    }
    return false
  }

  formatoFecha(fecha:any){
    var apoyo = fecha.split("T")
    return apoyo[0]
  }

  formatoTelefono(telefono:any){
    var apoyo = telefono.slice(0,2)+" "+telefono.slice(2,6)+" "+telefono.slice(6,10)
    return apoyo
  }

  alerta(mensaje:string,accion:string){
    this.snackBar.open(mensaje,accion)
  }

}
