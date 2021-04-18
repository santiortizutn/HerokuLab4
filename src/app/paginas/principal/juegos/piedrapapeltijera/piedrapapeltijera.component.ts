import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-piedrapapeltijera',
  templateUrl: './piedrapapeltijera.component.html',
  styleUrls: ['./piedrapapeltijera.component.css']
})
export class PiedrapapeltijeraComponent implements OnInit {


  loading:Boolean = false;
  juegoActual:string = "Ppt";
  usuarioActual:string = "";
  logueado:boolean = false;

  // para el juego
  eleccionPC : string = "";
  eleccionJugador : string = "";
  opciones : Array<string> = ["piedra", "papel", "tijera"];
  piedra : boolean = false;
  papel : boolean = false;
  tijera : boolean = false;
  piedraPc : boolean = false;
  papelPc : boolean = false;
  tijeraPc : boolean = false;
  comenzo : boolean = false;
  gano : boolean | any;


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
        // this.router.navigate(['/']);
      }
    })
  }



  comenzar(){
    this.comenzo = true;
    this.sinSeleccion();

  }

  sinSeleccion(){
    this.piedra = false;
    this.papel = false;
    this.tijera = false;
    this.piedraPc = false;
    this.papelPc = false;
    this.tijeraPc = false;
  }


  elegirOpcion(opcion:string){
    this.eleccionJugador = opcion;
    this.eleccionPC = this.opciones[Math.floor(Math.random() * this.opciones.length)];
    this.mostrarEleccionUsuario(this.eleccionJugador);
    this.mostrarEleccionPc(this.eleccionPC);

    this.gano = this.resultado();
    this.mostrarResultado(this.gano);


  }

  mostrarEleccionUsuario(opcion:string){
    if (opcion === "piedra") {
      this.papel = true;
      this.tijera = true;
    } else {
      if (opcion === "papel") {
        this.piedra = true;
        this.tijera = true;
      } else {
        this.piedra = true;
        this.papel = true;
      }

    }
  }

  mostrarEleccionPc(opcion:string){
    if (opcion === "piedra") {
      this.papelPc = true;
      this.tijeraPc = true;
    } else {
      if (opcion === "papel") {
        this.piedraPc = true;
        this.tijeraPc = true;
      } else {
        this.piedraPc = true;
        this.papelPc = true;
      }

    }
  }

  resultado() :boolean | any{
    if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'piedra' ) {
      return null;
    }
    if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'papel' ) {
        return null;
    }
    if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'tijera' ) {
        return null;
    }

    if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'tijera' ) {
        return true;
    }
    if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'papel' ) {
        return false;
    }

    if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'tijera' ) {
        return false;
    }
    if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'piedra' ) {
        return true;
    }

    if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'piedra' ) {
        return false;
    }
    if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'papel' ) {
        return true;
    }

  }

  mostrarResultado(resultado : boolean | any){
    if (resultado) {
        Swal.fire({
          position: 'bottom',
          icon:'success',
          title: 'Felicidades, ganaste!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.comenzar()});
    }else{
      if (resultado == false) {
        Swal.fire({
          position: 'bottom',
          icon:'error',
          title: 'Perdiste, segui intentando!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.comenzar()});
      } else {
        if (resultado == null) {
          Swal.fire({
            position: 'bottom',
            icon:'warning',
            title: 'Empate, intenta de nuevo!',
            showConfirmButton: false,
            timer:2000
          }).then(()=>{this.comenzar()})
        }

      }
    }





  }












}
