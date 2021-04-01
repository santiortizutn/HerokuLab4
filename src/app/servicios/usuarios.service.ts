import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  private usuarios: AngularFireList<any>;
  private users: Array<Usuario> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.usuarios = this.firebase.list('usuarios');
    this.usuarios.snapshotChanges().forEach(elementos =>{
      this.users = [];
      elementos.forEach(snapshot => {
        const usuario = snapshot.payload.toJSON() as Usuario;
        this.users.push(usuario);
      })
    });
  }


  obtenerUsuarios(){
    return this.usuarios;
  }

  registrarEnBD(usuario : Usuario){
    return this.http.post(`${environment.hostFirebase}/usuarios.json`, usuario);
  }

  validaLogin(us:Usuario) : Boolean{
    let log : Boolean = false;
    this.users.forEach(u => {
      if (us.correo == u.correo && us.clave == u.clave){
        log = true;
      }
    });
    return log;
  }

  validaAlta(us:Usuario) : Boolean{
    let log : Boolean = true;
    this.users.forEach(u => {
      if (us.correo == u.correo){
        log = false;
      }
    });
    return log;
  }

  validarEmail(valor:string) {
    if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor)) {
      return false;
    }
    return true;
  }

  validarContraseña( clave:string, claveConfirmada:string) {
    if ( clave !== claveConfirmada ) {
      return false;
    }
    return true;
  }
























}
