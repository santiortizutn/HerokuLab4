import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  usuarios:Array<Usuario>;
  registro:Boolean= true;

  constructor(private auth:AuthService, private us:UsuariosService, private router:Router) {
    this.usuarios = [];
    this.usuario = new Usuario("", "", "");
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
    this.registro = this.us.validaAlta(this.usuario);
    console.log(this.registro);
    if (this.registro == true) {
      this.auth.registro(this.usuario.correo, this.usuario.clave).then(
        data => {
          this.usuario.id = data.user?.uid;
          this.us.registrarEnBD(this.usuario).subscribe(
            data =>{
              console.log(data);
              alert("Se registro correctamente!!");
              this.router.navigate(["/login"]);
            })
        });
    } else {
      alert("El usuario ya existe!!");
    }


  }

}
