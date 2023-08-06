import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servicioLogin:LoginService,
    private usuarioServ:UsuarioService, 
    private servicioEmp:EmpleadoService,
    private router:Router) { }

  usuario={
    //Los atributos se deben de llamar igual que los de mi formulario
    // req.body.<atributo>
    correo:"",
    password:""
  }

  ngOnInit(){
    this.verificarUsuario()
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
              this.usuarioServ.setInicio(res.nombre_emp+" "+res[0].apellidoPat_emp)
              this.router.navigate(['/administracion/inicio']);
            },
            (err)=>{
              //console.log(err);
            }
          );
          //Iniciar sesión como CLIENTE
        }else{
          alert("¡Bienvenid@ "+res[0].nombre_emp+" "+res[0].apellidoPat_emp+"!");
        }
      },
      (err)=>{
        //console.log(err);
        alert("¡Usuario o contraseña incorrectos!");
      }
    );
  }

  verificarUsuario(){
    if(this.usuarioServ.getInicio()){
     this.router.navigate(['administracion/inicio'])
    }
   }

}


