import { Component, OnInit } from '@angular/core';
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

  constructor(private auth:AuthService, private us:UsuariosService) {
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
    })
  }

  registrarse(){

    this.usuarios.forEach(u => {
      if (this.usuario.correo != u.correo) {
        this.auth.registro(this.usuario.correo, this.usuario.clave).then(
          data => {
            this.usuario.id = data.user?.uid;
            this.us.registrarEnBD(this.usuario).subscribe(
              data =>{
                console.log(data);
                alert("Se registro correctamente!!");

              })
          });



      } else {
        alert("El usuario ya existe!!");
      }


    });

  }

}
