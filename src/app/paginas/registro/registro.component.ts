import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal  from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  usuarios:Array<Usuario>;
  registro:Boolean= true;
  claveConfirmada:string = "";

  constructor(private auth:AuthService, private us:UsuariosService, private router:Router) {
    this.usuarios = [];
    this.usuario = new Usuario("", "");
  }

  ngOnInit() {
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
      if (this.us.validarContraseña(this.usuario.clave, this.claveConfirmada)) {
        this.registro = this.us.validaAlta(this.usuario);
      } else {
        alert("las contraseñas deben coincidir");
      }
    }else{
      alert("correo mal escrito");
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
                title: 'Perfecto',
                text: 'Registro exitoso!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
            }).then((result)=>{
              if (result.isConfirmed) {
                this.router.navigate(["/login"]);
              }
            });
            })
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El usuario ya existe',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
    });
    }


  }

}
