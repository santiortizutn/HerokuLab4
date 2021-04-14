import { Injectable } from '@angular/core';
import { Mensaje } from '../clases/mensaje';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajes: AngularFireList<any> | undefined;


  constructor(private http:HttpClient, private firebase:AngularFireDatabase){
  }


  obtenerMensajes(juego:string | undefined){
    this.mensajes = this.firebase.list('mensajes'+juego);
    return this.mensajes;
  }






  registrarEnBD(mensaje : Mensaje, juego : string){
    return this.http.post(`${environment.hostFirebase}/mensajes${juego}.json`, mensaje);
  }






}
