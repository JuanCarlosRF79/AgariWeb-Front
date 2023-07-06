import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  cliente={
    nombreCli: "",
    apellidoPatCli: "",
    apellidoMatCli: "",
    sexo: "",
    fechaNac: "",
    rfc: "",
    direccionCalle: "",
    direccionColonia: "",
    telefono: "",
    correo: "",
    estado: "Activo",
    password: "",
    tipo: "Cliente"
  }
}
