import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {

  constructor(private empleadoServ:EmpleadoService, private snackBar:MatSnackBar) {}

  ngOnInit():void{
    this.todoEmp()
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

  empleado={
    idEmpleado: "",
    nombre_emp: "",
    apellidoPat_emp: "",
    apellidoMat_emp: "",
    puesto: "",
    sexo: "",
    turno: "",
    fechaNac: "",
    salario: "",
    ingresoEmpresa: "",
    rfc: "",
    ciudad:"",
    calle: "",
    colonia: "",
    telefono: "",
    email: "",
    contrasenia: "",
    estado: ""
  }

  empleados:any

  todoEmp(){
    this.empleadoServ.todoEmp().subscribe(
      (res)=>{
        this.empleados=res
      },
      (err)=>{
        console.log(err)
      }
    )
  }


  buscarEmp() {
    if(this.verificarEmp()){
    this.empleadoServ.consultarEmp(this.empleado).subscribe(
      (res) => {
        console.log(res);
        this.empleado = res[0];
        this.empleado.fechaNac=this.formatoFecha(res[0].fechaNac)
        this.empleado.ingresoEmpresa=this.formatoFecha(res[0].ingresoEmpresa)
      },
      (err) => {
        console.log(err);
        this.alerta("Error al buscar empleado","Aceptar")
      }
    );
    }else{
      this.alerta("Por favor llenar todos los campos","Aceptar")
    }
  }

  consultarEmp(codigo:any){
    this.empleado.idEmpleado=codigo
    this.empleadoServ.consultarEmp(this.empleado).subscribe(
      (res)=>{
        this.empleado=res
        this.empleado.fechaNac=this.formatoFecha(this.empleado.fechaNac)
      },
      (err)=>{
        console.log(err)
        this.alerta("Error al buscar empleado", "Aceptar")
      }
    )
  }

  vaciar(){
    this.empleado.idEmpleado=""
    this.empleado.nombre_emp= ""
    this.empleado.apellidoPat_emp= ""
    this.empleado.apellidoMat_emp= ""
    this.empleado.puesto=""
    this.empleado.sexo= ""
    this.empleado.turno=""
    this.empleado.fechaNac= ""
    this.empleado.rfc= ""
    this.empleado.ciudad=""
    this.empleado.calle= ""
    this.empleado.colonia= ""
    this.empleado.telefono= ""
    this.empleado.email= ""
    this.empleado.estado= ""
    this.empleado.contrasenia= ""
   }

  limpiar(){
    this.vaciar()
    this.todoEmp()
  }


  verificarEmp(){
    if(this.empleado.idEmpleado!="" && this.empleado.idEmpleado!=null){
      return true
    }
    if(this.empleado.nombre_emp!=""&&this.empleado.nombre_emp!=null
    &&this.empleado.apellidoPat_emp!=""&&this.empleado.apellidoPat_emp!=null){
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

