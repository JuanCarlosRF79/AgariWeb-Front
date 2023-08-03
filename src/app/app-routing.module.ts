import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes Administracion
import { BackstageComponent } from './administracion/backstage/backstage.component';
import { ClienteComponent } from './administracion/cliente/cliente.component';
import { DetalleComponent } from './administracion/detalle/detalle.component';
import { EmpleadoComponent } from './administracion/empleado/empleado.component';
import { EnvioComponent } from './administracion/envio/envio.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { ServicioComponent } from './administracion/servicio/servicio.component';
import { TicketComponent } from './administracion/ticket/ticket.component';
import { CalendarioComponent } from './administracion/calendario/calendario.component';

//Componentes Principal
import { InicioComponent } from './principal/inicio/inicio.component';
import { LoginComponent } from './principal/login/login.component';

const routes: Routes = [
  //Rutas Principal
  {path: 'inicio', component:InicioComponent},
  {path: 'login', component:LoginComponent},

  //Rutas Administración
  {path: 'administracion/inicio', component:BackstageComponent},
  {path: 'administracion/cliente', component:ClienteComponent},
  {path: 'administracion/detalle', component:DetalleComponent},
  {path: 'administracion/empleado', component:EmpleadoComponent},
  {path: 'administracion/envio', component:EnvioComponent},
  {path: 'administracion/producto', component:ProductoComponent},
  {path: 'administracion/servicio', component:ServicioComponent},
  {path: 'administracion/ticket', component:TicketComponent},
  {path: 'administracion/calendario', component:CalendarioComponent},
  //Reedirigir rutas inexistente a inicio
  {path:"**", redirectTo:"inicio"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
