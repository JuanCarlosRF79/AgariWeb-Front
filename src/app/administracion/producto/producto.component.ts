import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  producto={
    nombreProd: "",
    descripcionProd: "",
    costoIndividual: "",
    marca: "",
    condicion: "",
    stock: "",
    ultimaVenta: "",
    ultimoSurtido: "",
    estado: "",
    imgurl: ""
  };
}
