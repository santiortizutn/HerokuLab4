import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Ejercicio1';
  edadUno:number = 0;
  edadDos:number = 0;
  prom:number = 0;
  sum:number = 0;


  suma(){
    this.sum = this.edadUno + this.edadDos;
  }

  promedio(){
    this.prom = (this.edadUno + this.edadDos) / 2;
  }

  calcular(){
    this.suma();
    this.promedio();
  }

  limpiar(){
    this.edadUno = 0;
    this.edadDos = 0;
    this.prom = 0;
    this.sum = 0;
  }
}
