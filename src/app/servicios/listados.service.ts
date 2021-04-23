import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Juego } from '../clases/juego';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  private listadoBD : AngularFireList<any> | any;
  private resultados: Array<Juego> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) { }

  obtenerListado(){
    this.listadoBD = this.firebase.list('resultados');
    return this.listadoBD;
  }

  registrarEnBD(juego : Juego){
    return this.http.post(`${environment.hostFirebase}/resultados.json`, juego);
  }
}
