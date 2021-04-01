import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal  from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  usuarios:Array<Usuario>;
  logueo:Boolean = false;

  constructor(private router: Router, private us:UsuariosService, private auth:AuthService) {
    this.usuarios = [];
    this.usuario = new Usuario("", "", "");
  }

  ngOnInit() {
    this.auth.logOut();
    this.us.obtenerUsuarios().snapshotChanges().forEach(elementos =>{
      this.usuarios = [];
      elementos.forEach(snapshot => {
        const usuario = snapshot.payload.toJSON() as Usuario;
        this.usuarios.push(usuario);
      })
      console.log(this.usuarios);
    })

  }

  logearse(){
    this.logueo = this.us.validaLogin(this.usuario);
    console.log(this.logueo);
    if (this.logueo == true) {
      this.auth.login(this.usuario.correo, this.usuario.clave).then(
        data => {
          this.usuario = data.user?.toJSON() as Usuario;
          console.log(this.usuario);
          Swal.fire({
                title: 'Perfecto',
                text: 'Logueo exitoso!',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then((result)=>{
              if (result.isConfirmed) {
                this.router.navigate(["/home", { Usuario: this.usuario }]);
              }
            });

        });

    } else {
        Swal.fire({
          title: 'Error',
          text: 'La clave o el usuario son incorrectos!',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
      });

    }




  }
















  error(){
    this.router.navigate(["/error"]);
  }

}
