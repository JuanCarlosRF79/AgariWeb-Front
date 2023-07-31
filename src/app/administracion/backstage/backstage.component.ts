import { Component,OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-backstage',
  templateUrl: './backstage.component.html',
  styleUrls: ['./backstage.component.css']
})
export class BackstageComponent implements OnInit {
  
  servicios:any;
  
  constructor(private servicioSev:ServicioService) { }
  
  ngOnInit(): void {
    this.inicioServ();
  }


  inicioServ(){
    this.servicioSev.consultarServInicio().subscribe(
      (res)=>{
        this.servicios=res;
        //console.log(this.servicios);
      },(err)=>{
        console.log(err);
      }
    );
  }

  formatoFecha(dates:any){
  var date = (dates);
  var currentDate = date.slice(0, 10);
  return currentDate;
  }

  formatoCosto(costo:any){
    return costo.toLocaleString('en-US')
  }

  masInformacion(codigo:any){
    this.servicioSev.setIdServicio(codigo)
  }

  formatoTelefono(telefono:any){
    var apoyo = telefono.slice(0,2)+" "+telefono.slice(2,6)+" "+telefono.slice(6,10)
    return apoyo
  }

}
