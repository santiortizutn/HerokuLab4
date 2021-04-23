import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Juego } from 'src/app/clases/juego';
import { ListadosService } from 'src/app/servicios/listados.service';
import { PokemonService } from 'src/app/servicios/pokemon.service';
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
  movimientos = 18;
  tarjetas : Array<Tarjeta> = [];
  arraIndices = ['1', '10', '19', '28', '39', '55', '89', '123', '139', '150', '169', '233', '254',
                 '270', '281', '288', '293', '308', '336', '340', '348', '354', '401', '412', '426',
                 '435', '451', '467', '501', '513', '526', '533', '548', '570', '582', '600', '629'];
  idHtml = 10;
  value = 0
  indice1 = "";
  indice2 = "";
  idValue1 = "";
  idValue2 = "";
  flag = false;


  constructor(private fireAuth:AngularFireAuth, private router: Router, private pokes: PokemonService, private listadoService: ListadosService) {}

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
    var img = document.getElementById(item.idHtml);
    var auxClases = img?.className;
    var id = item.idHtml.toString();
    console.log("indices1y2: ", this.indice1 + "-" + this.indice2);
    if (!auxClases?.includes("encontrada")) {

      if (this.indice2 == "" && this.indice1 != "") {
        console.log("entro c2");
        this.mostrarTarjeta(id);
        this.indice2 = id;
        console.log("idHTml: ", this.indice2);
        this.idValue2 = item.value;
        console.log("idValue: ", this.idValue2);
        this.flag = true;
      }

      if (this.indice1 == "" && this.indice2 == "") {
        console.log("entro c1");
        this.mostrarTarjeta(id);
        this.indice1 = id;
        console.log("idHTml: ", this.indice1);
        this.idValue1 = item.value;
        console.log("idValue: ", this.idValue1);
      }



      if (this.flag == true) {
        console.log("revisa");
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
        this.coninciden();
        this.reiniciar();
      } else {
        this.ocultarTarjetas();
        this.reiniciar();
      }

      this.controlMovimientos();
      this.movimientos--;

    }, 1000);
  }

  controlMovimientos() {

    if (this.movimientos == 0) {
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
      this.listadoService.registrarEnBD(new Juego("memotest",this.usuarioActual,"Perdio",new Date().toLocaleString(),new Date().getTime())).subscribe();
      Swal.fire({
        icon:'error',
        title: 'Perdiste, volve a intentar!',
        showConfirmButton: true
      }).then(()=>{this.router.navigateByUrl('/juegos', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/juegos/memo'])})});
    }
    if (aux == "gano") {
      this.listadoService.registrarEnBD(new Juego("memotest",this.usuarioActual,"Gano",new Date().toLocaleString(),new Date().getTime())).subscribe();
      Swal.fire({
        icon:'success',
        title: 'Felicidades, ganaste!',
        showConfirmButton: true
      }).then(()=>{this.router.navigateByUrl('/juegos', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/juegos/memo'])})});
    }
  }

  reiniciar() {
    this.indice1 = "";
    this.indice2 = "";
    this.idValue1 = "";
    this.idValue2 = "";
  }



}
