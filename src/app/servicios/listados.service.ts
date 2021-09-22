import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Juego } from '../clases/juego';
import { Pregunta } from '../clases/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  private listadoBD : AngularFireList<any> | any;
  private preguntasBD : AngularFireList<any> | any;

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) { }

  obtenerListado(){
    this.listadoBD = this.firebase.list('resultados');
    return this.listadoBD;
  }

  obtenerPreguntas(){
    this.preguntasBD = this.firebase.list('preguntas');
    return this.preguntasBD;
  }

  registrarPregEnBD(pregunta : Pregunta){
    return this.http.post(`${environment.hostFirebase}/preguntas.json`, pregunta);
  }

  registrarEnBD(juego : Juego){
    return this.http.post(`${environment.hostFirebase}/resultados.json`, juego);
  }
}
