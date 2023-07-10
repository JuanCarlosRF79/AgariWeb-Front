import { Component } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  empleado={
    nombreEmp: "",
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
}
