import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  loading:Boolean = false;
  juegoActual:string = "Tateti";
  usuarioActual:string = "";
  logueado:boolean = false;

  // para el juego
  espacio : number = 0;
  comenzo : boolean = false;
  eligio : boolean = false;
  disabled  : boolean = false;
  resultado : string | any = "";
  jugador : string = "";
  pc : string = "";
  celdas = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  random : number | any  = 0;

  constructor(private fireAuth:AngularFireAuth, private router: Router) { }

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
        //this.router.navigate(["/"]);
      }
    })
  }

  eleccion(signo : string){
    if (signo == "x") {
      this.jugador = "x";
      this.pc = "o";
    }
    else {
      this.jugador = "o";
      this.pc = "x";
    }
    this.eligio = true;
  }

  modificar(id : number | any){

    if (this.celdas[id] == "-") {
      this.celdas[id] = this.jugador;
      document.images[!'celda' + id].src = "../../../../../assets/tateti/"+this.jugador+".png";
      document.images[!'celda' + id].alt = this.jugador;
      this.resultado = this.verificarResultado(this.jugador);
      this.movimientoPc();
    }



  }

  movimientoPc(){
    this.random = Math.floor(Math.random() * 8);
    if (this.celdas[this.random] == "-") {
      this.celdas[this.random] = this.pc;
      document.images[!'celda' + this.random].src = "../../../../../assets/tateti/"+this.pc+".png";
      document.images[!'celda' + this.random].alt = this.pc;
      this.resultado = this.verificarResultado(this.pc);
    }else{
      this.movimientoPc();
    }

  }

  mostrarResultado(resultado : string | any){
    if (resultado == "gano") {
        Swal.fire({
          position: 'bottom',
          icon:'success',
          title: 'Felicidades, ganaste!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.eligio = false;
          this.celdas = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];});
    }else{
      if (resultado == "perdio") {
        Swal.fire({
          position: 'bottom',
          icon:'error',
          title: 'Perdiste, segui intentando!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.eligio = false;
          this.celdas = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];});
      } else {
        if (resultado == "empate") {
          Swal.fire({
            position: 'bottom',
            icon:'warning',
            title: 'Empate, intenta de nuevo!',
            showConfirmButton: false,
            timer:2000
          }).then(()=>{this.eligio = false;
            this.celdas = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];})
        }

      }
    }

  }


  verificarResultado(signo : string){
    let res = "";
    console.info("juego: "+this.celdas)
    if (this.celdas[0] == signo && this.celdas[1] == signo && this.celdas[2] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[3] == signo && this.celdas[4] == signo && this.celdas[5] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[6] == signo && this.celdas[7] == signo && this.celdas[8] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[0] == signo && this.celdas[3] == signo && this.celdas[6] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[1] == signo && this.celdas[4] == signo && this.celdas[7] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[2] == signo && this.celdas[5] == signo && this.celdas[8] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[0] == signo && this.celdas[4] == signo && this.celdas[8] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }else if (this.celdas[2] == signo && this.celdas[4] == signo && this.celdas[6] == signo) {
      if (signo == this.jugador) {
        res = "gano";
      }

      if (signo == this.pc) {
        res = "perdio"
      }
    }

    for (let i = 0; i < this.celdas.length; i++) {
      if (this.celdas[i] != "-") {
        this.espacio = this.espacio + 1;

      }
    }

    if (res == "" && this.espacio == 9){
      console.log("entra?");
      res = "empate";
    }

    this.espacio = 0;
    console.log("res:" + res);
    this.mostrarResultado(res);

  }




















}
