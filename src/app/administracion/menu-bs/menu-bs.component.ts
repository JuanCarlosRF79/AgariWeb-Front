import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bs',
  templateUrl: './menu-bs.component.html',
  styleUrls: ['./menu-bs.component.css']
})
export class MenuBsComponent {

  constructor(private usuarioServ:UsuarioService, private router:Router){}

  ngOnInit(){
    //this.verificarUsuario()
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    closeBtn?.addEventListener("click", ()=>{
      sidebar?.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
    });

    /* searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
    }); */

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if(sidebar?.classList.contains("open")){
        closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
      }else {
        closeBtn?.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
      }
    }
  }

  cerrarSesion(){
    this.usuarioServ.limpiarUsuario()
    this.router.navigate(["/login"])
  }

  verificarUsuario(){
   if(!this.usuarioServ.getInicio()){
    this.router.navigate(["/login"])
   }
  }

}
