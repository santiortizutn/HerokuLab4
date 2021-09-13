import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ListadosService } from 'src/app/servicios/listados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-masmenos',
  templateUrl: './masmenos.component.html',
  styleUrls: ['./masmenos.component.css']
})
export class MasmenosComponent implements OnInit {

  logueado = false;
  loading:Boolean = false;
  usuarioActual:any;
  juegoActual:string = "masmenos";
  comenzo : boolean = false;

  arrayCartas : Array<number> = [];
  cartaActual : number = Math.floor(Math.random() * 10) + 1;
  cartaAnterior : number = 0;
  puntos : number = 0;
  resultado : string = "";


  constructor(private router: Router, private fireAuth:AngularFireAuth, private listadoService:ListadosService) { }

  ngOnInit(): void {
    this.loading = true;
    this.randomizarCartas();
    setTimeout(()=>{
      this.loading = false;
    },2000);

    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        this.logueado  = true;
        this.usuarioActual = resp.email;
      }else{
        this.logueado = false;
        //this.router.navigate(["/"]);
      }
    });
  }

  randomizarCartas(){
    if (this.arrayCartas.length != 10) {
      for (let i = 0; i < this.arrayCartas.length; ) {
        if (this.arrayCartas[i] == this.cartaActual) {
          this.cartaActual = Math.floor(Math.random() * 10) + 1;
          i = 0;
        }else{
          i++;
        }
      }

      this.arrayCartas.push(this.cartaActual);
      console.log(this.arrayCartas);
    }

  }

  jugar(eleccion : string){

    this.cartaAnterior = this.cartaActual;
    this.randomizarCartas();
    if (this.cartaActual >  this.cartaAnterior) {
      this.resultado = "mayor";
    }else{
      this.resultado = "menor"
    }
    if (eleccion == this.resultado) {
      this.puntos++;
    }
    if (this.arrayCartas.length == 10) {
      if (this.puntos >= 6) {
        Swal.fire({
          position: 'bottom',
          icon:'success',
          title: 'Bien, ganaste!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.reset()});
      }else{
        Swal.fire({
          position: 'bottom',
          icon:'error',
          title: 'Perdiste, intenta de nuevo!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.reset()});
      }
    }
  }

  reset(){
    this.comenzo = false;
    this.arrayCartas = [];
    this.puntos = 0;
    this.cartaActual = Math.floor(Math.random() * 10) + 1;
    this.randomizarCartas();
  }

}
