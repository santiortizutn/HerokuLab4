import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private encuestas: AngularFireList<any> | any;


  constructor(private http:HttpClient, private firebase:AngularFireDatabase){
  }


  obtenerEncuestas(){
    this.encuestas = this.firebase.list('encuestas');
    return this.encuestas;
  }

  registrarEnBD(encuesta : any){
    return this.http.post(`${environment.hostFirebase}/encuestas.json`, encuesta);
  }

}
