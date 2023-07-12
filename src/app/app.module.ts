import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './principal/menu/menu.component';
import { InicioComponent } from './principal/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackstageComponent } from './administracion/backstage/backstage.component';
import { ClienteComponent } from './administracion/cliente/cliente.component';
import { DetalleComponent } from './administracion/detalle/detalle.component';
import { EmpleadoComponent } from './administracion/empleado/empleado.component';
import { EnvioComponent } from './administracion/envio/envio.component';
import { FooterComponent } from './administracion/footer/footer.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { ServicioComponent } from './administracion/servicio/servicio.component';
import { TicketComponent } from './administracion/ticket/ticket.component';
import { MenuBsComponent } from './administracion/menu-bs/menu-bs.component';
import { LoginComponent } from './principal/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    BackstageComponent,
    ClienteComponent,
    DetalleComponent,
    EmpleadoComponent,
    EnvioComponent,
    FooterComponent,
    ProductoComponent,
    ServicioComponent,
    TicketComponent,
    MenuBsComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
