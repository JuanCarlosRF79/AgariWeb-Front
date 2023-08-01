import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  empleado={
    idEmpleado: "",
    nombre_emp: "",
    apellidoPatEmp: "",
    apellidoMatEmp: "",
    puesto: "",
    sexo: "",
    turno: "",
    fechaNac: "",
    salario: "",
    ingresoEmpresa: "",
    rfc: "",
    direccionCalle: "",
    direccionColonia: "",
    telefono: "",
    correo: "",
    password: "",
    tipo: "Empleado",
    estado: "Activo"
  }

  constructor(private empleadoServ:EmpleadoService, private snackBar:MatSnackBar) {}

  ngOnInit():void{
    this.todoEmp()
  }

  todoEmp(){
    this.empleadoServ.todoEmp().subscribe(
      (res)=>{

        this.empleado=res[0]
        console.log(this.empleado)
      },
      (err)=>{
        console.log(err)
      }
    )
  }


  buscarEmp() {
    this.empleadoServ.consultarEmp(this.empleado).subscribe(
      (res) => {
        console.log(res);
        this.empleado = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

