import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servicioLogin:LoginService, 
    private servicioEmp:EmpleadoService,
    private router:Router) { }

  usuario={
    //Los atributos se deben de llamar igual que los de mi formulario
    // req.body.<atributo>
    correo:"",
    password:""
  }

  login(){
    console.log(this.usuario)
    this.servicioLogin.login(this.usuario).subscribe(
      (res)=>{
        console.log(res[0]);
        //INICIAR SESIÓN COMO EMPLEADO
        if(res[0].tipoUsuario == "Empleado"){
          //Enviar atributo de busqueda
          this.servicioEmp.consultarEmpLogin(res[0].idEmpleado).subscribe(
            (res)=>{
              alert("¡Bienvenid@ "+res[0].nombre_emp+" "+res[0].apellidoPat_emp+"!");
              localStorage.setItem("nombre",res[0].nombre_emp);
              localStorage.setItem("puesto",res[0].puesto);
              console.log(res[0]);
              this.router.navigate(['/administracion/inicio']);
            },
            (err)=>{
              //console.log(err);
            }
          );
          //Iniciar sesión como CLIENTE
        }else{
          console.log("Alerta de que no es valido el usuario")
        }
      },
      (err)=>{
        //console.log(err);
        alert("¡Usuario o contraseña incorrectos!");
      }
    );
  }

}


