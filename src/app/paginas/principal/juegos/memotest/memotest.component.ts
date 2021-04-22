import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import { StorageService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';
import { Tarjeta } from './tarjeta';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  loading:Boolean = false;
  juegoActual:string = "Memotest";
  usuarioActual:string = "";
  logueado:boolean = false;
  // para el juego
  comenzo : boolean = false;
  intentos = 16;
  tarjetas : Array<Tarjeta> = [];
  arraIndices = ['1', '10', '19', '28', '39', '55', '89', '123', '139', '150', '169', '233', '254', '270', '308', '336', '340', '348', '401', '600'];
  idHtml = 10;
  value = 0
  indice1 = "";
  indice2 = "";
  idValue1 = "";
  idValue2 = "";
  flag = false;


  constructor(private fireAuth:AngularFireAuth, private router: Router, private pokes: PokemonService) {}

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
       // this.router.navigate(["/"]);
      }
    });

    let array = this.randomizarIndices();
    array.forEach(index =>{
      console.log(index);
      this.pokes.traerPorId(index).then((poke : any) =>{
        let tarj = new Tarjeta(poke.sprites.front_default, poke.id, Math.floor(Math.random() * 100), this.idHtml++, this.value);
        this.tarjetas.push(tarj);
        var tarj2: Tarjeta = JSON.parse(JSON.stringify(tarj))
        tarj2.posicion = Math.floor(Math.random() * 100)
        tarj2.idHtml = this.idHtml++;
        this.tarjetas.push(tarj2);

        this.value++;
        this.tarjetas = this.tarjetas.sort((a: any, b: any) => { if (a.posicion > b.posicion) { return 1 } return -1 });
      });
    });
  }


  randomizarIndices() {

    let array: string[] = [];
    for (let index = 0; index < 8; index++) {

      let aux = this.arraIndices[Math.floor(Math.random() * this.arraIndices.length)];
      array.push(aux);

      let index = this.arraIndices.indexOf(aux);
      if (index > -1) {
        this.arraIndices.splice(index, 1);
      }
    }
    return array;
  }

  seleccionar(item: any) {
    let img = document.getElementById(item.idHtml);
    let auxClases = img?.className;

    if (!auxClases?.includes("encontrada")) {

      if (this.indice1 == "" && this.indice2 == "") {

        this.mostrarTarjeta(item.idHtml.toString());
        this.indice1 = item.idHTml;
        this.idValue1 = item.value;
      }

      if (this.indice2 == "" && this.indice1 != "") {

        this.mostrarTarjeta(item.idHtml.toString());
        this.indice2 = item.idHTml;
        this.idValue2 = item.value;
        this.flag = true;;
      }

      if (this.flag) {
        this.flag = false;
        this.controlarTarjetas();
      }
    }
  }

  coninciden() {
    let img1 = document.getElementById(this.indice1);
    img1?.classList.add('class', "encontrada");
    let img2 = document.getElementById(this.indice2);
    img2?.classList.add('class', "encontrada");
  }

  mostrarTarjeta(idHtml: string) {
    let img = document.getElementById(idHtml);
    img?.classList.remove("bloque");
  }

  ocultarTarjetas() {
    let img1 = document.getElementById(this.indice1);
    img1?.classList.add('class', "bloque");
    let img2 = document.getElementById(this.indice2);
    img2?.classList.add('class', "bloque");
  }

  controlarTarjetas() {
    setTimeout(() => {
      if (this.idValue1 == this.idValue2) {
        console.log("coinciden");
        this.coninciden();
        this.reiniciar();
      } else {
        this.ocultarTarjetas();
        this.reiniciar();
      }
      this.controlIntentos();
      this.intentos--;
    }, 1000);
  }

  controlIntentos() {
    if (this.intentos == 1) {
      this.mostrarMensaje("perdio");
    }
    else {
      let auxImg;
      let flag = true;
      this.tarjetas.forEach(item => {
        let img = document.getElementById(item.idHtml.toString());
        auxImg = img?.className;
        if (!auxImg?.includes("encontrada")) {
          flag = false;
        }
      });
      if(flag == true){
        this.mostrarMensaje("gano");
      }
    }

  }

  mostrarMensaje(aux: string) {
    if (aux == "perdio") {
      Swal.fire({
        icon:'error',
        title: 'Perdiste, volve a intentar!',
        showConfirmButton: true,
        timer:2000
      })
    }
    if (aux == "gano") {
      Swal.fire({
        icon:'success',
        title: 'Felicidades, ganaste!',
        showConfirmButton: true,
        timer:2000
      })
    }
  }

  reiniciar() {
    this.indice1 = "";
    this.indice2 = "";
    this.idValue1 = "";
    this.idValue2 = "";
  }



}
