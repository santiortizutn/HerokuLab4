import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../clases/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  host = "https://pokeapi.co/api/v2/pokemon/"
  constructor(private http:HttpClient) { }

  traerTodos(){
    return this.http.get(`${this.host}`).toPromise();
  }

  traerPorId(id : any){
    return this.http.get(`${this.host}${id}`).toPromise();
  }



}
