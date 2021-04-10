import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal  from "sweetalert2";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  usuarios:Array<Usuario>;
  registro:Boolean= false;
  claveConfirmada:string = "";
  loading:Boolean = false;

  constructor(private auth:AuthService, private us:UsuariosService, private router:Router, private snackBar:MatSnackBar) {
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

  registrarse(){
    if(this.us.validarEmail(this.usuario.correo)){
      if (this.us.validaAlta(this.usuario)) {
        if(this.us.validarContraseña(this.usuario.clave, this.claveConfirmada)){
          this.registro = true;
        }else{
          Swal.fire({
            title: 'ERROR',
            text: 'Las contraseñas deben coincidir y tener al menos 6 caracteres.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
          });
        }
      } else {
          Swal.fire({
            title: 'ERROR',
            text: 'El correo ya esta registrado.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
          });
      }
    }else{
      Swal.fire({
        title: 'ERROR',
        text: 'El formato del correo es invalido.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
      });
    }
    console.log(this.registro);
    if (this.registro == true) {
      this.auth.registro(this.usuario.correo, this.usuario.clave).then(
        data => {
          this.usuario.id = data.user?.uid;
          this.us.registrarEnBD(this.usuario).subscribe(
            data =>{
              console.log(data);
              Swal.fire({
                title: 'PERFECTO',
                text: 'Registro exitoso!',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then((result)=>{
              if (result.isConfirmed) {
                this.router.navigate(["/principal"]);
                this.snackBar.open("Bienvenido "+this.usuario.correo+"! 🍕", "",{duration:2000});
              }
            });
            })
        });
    } else {
        Swal.fire({
          title: 'ERROR',
          text: 'El usuario ya existe',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'rgba(255, 2, 2, 0.774)',
        });
    }


  }

}
