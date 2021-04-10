import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal  from "sweetalert2";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Log } from 'src/app/clases/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  usuarios:Array<Usuario>;
  logueo:Boolean = false;
  loading:Boolean = false;
  ahora:Date = new Date;

  constructor(private router: Router, private us:UsuariosService, private auth:AuthService, private snackBar:MatSnackBar) {
    this.usuarios = [];
    this.usuario = new Usuario("", "");
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);


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
                title: 'PERFECTO',
                text: 'Logueo exitoso!',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then((result)=>{
              if (result.isConfirmed) {
                this.us.registrarLogEnBD(new Log(data.user?.email+'', this.ahora)).subscribe();
                this.router.navigate(["/home", { Usuario: this.usuario }]);
                this.snackBar.open("Bienvenido "+data.user?.email+"! 🍕", "",{duration:2000});
              }
            });

        });

    } else {
        Swal.fire({
          title: 'ERROR',
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
