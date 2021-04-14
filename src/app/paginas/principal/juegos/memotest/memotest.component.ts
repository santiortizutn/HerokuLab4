import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  loading:Boolean = false;

  array1:Array<number> = [];
  array2:Array<number> = [];
  arrayFinal:Array<string> = [];
  juegoActual:string = "Memotest";
  usuarioActual:string = "";
  logueado:boolean = false;

  constructor(private fireAuth:AngularFireAuth, private router: Router) {

  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);

    // usuario logueado actual
    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        this.logueado  = true;
        this.usuarioActual = resp.email!;
        console.log(this.usuarioActual);
      }else{
        this.logueado = false;
        this.router.navigate(["/"]);
      }
    })

    this.array1 = this.generarArrays();
    this.array2 = this.generarArrays();
    this.arrayFinal = this.array1.concat(this.array2).map(String);
    console.log(this.arrayFinal);
    this.generarColores();
  }

  randomInt(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

  generarArrays(){
    let array:Array<number> = [];
    let cantidad = 6
    let index = 0;
    let repetido = false;
    let random = 0;

    while(index < cantidad) {

      random = this.randomInt(1, 6);
      repetido = false;

      while (!repetido) {

        for (let i = 0; i < index; i++) {

          if (random == array[i]) {
            repetido = true;
            break;
          }
        }
        if (!repetido) {
          array.push(random);
          index++;
        }

      }

    }
    return array;
  }

  generarColores(){
    for (let i = 0; i < this.arrayFinal.length; i++) {

      switch (this.arrayFinal[i]) {
        case "1":
          this.arrayFinal[i] = "verde";
          break;
        case "2":
          this.arrayFinal[i] = "rojo";
          break;
        case "3":
          this.arrayFinal[i] = "amarillo";
          break;
        case "4":
          this.arrayFinal[i] = "azul";
          break;
        case "5":
          this.arrayFinal[i] = "negro";
          break;
        case "6":
          this.arrayFinal[i] = "blanco";
          break;
        default:
          break;
      }

    }

    console.log("ARRAY FINAL: ", this.arrayFinal);

  }







}
