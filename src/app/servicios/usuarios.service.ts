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

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.usuarios = this.firebase.list('usuarios');
  }


  obtenerUsuarios(){
    return this.usuarios;
  }

  registrarEnBD(usuario : Usuario){
    return this.http.post(`${environment.hostFirebase}/usuarios.json`, usuario);
  }



}
