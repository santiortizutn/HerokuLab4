import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Juego } from 'src/app/clases/juego';
import { ListadosService } from 'src/app/servicios/listados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dados21',
  templateUrl: './dados21.component.html',
  styleUrls: ['./dados21.component.css']
})
export class Dados21Component implements OnInit {

  logueado = false;
  loading:Boolean = false;
  usuarioActual:any;
  juegoActual:string = "Dados21";
  comenzo : boolean = false;

  //para el juego
  dado1 : number = 1;
  dado2 : number = 1;
  acumulado : number = 0;
  tiros : number = 0;
  puntosPc : number = 0;


  constructor(private router: Router, private fireAuth:AngularFireAuth, private listadoService:ListadosService) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);

    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        this.logueado  = true;
        this.usuarioActual = resp.email;
      }else{
        this.logueado = false;
        this.router.navigate(["/"]);
      }
    });
  }


  tirarDados(){
    if (this.tiros < 3) {

      this.dado1 = Math.floor(Math.random() * 6) + 1;
      this.dado2 = Math.floor(Math.random() * 6) + 1;
      this.acumulado = this.acumulado + this.dado1 + this.dado2;
      console.log("ACUMULADO: ", this.acumulado);
      this.tiros++;

      if (this.tiros == 3) {
        this.calcularResultado();
      }

    }else{
      this.calcularResultado();
    }
  }

  calcularResultado(){
    this.puntosPc = Math.floor(Math.random() * 20) + 6;
    console.log("PC: ", this.puntosPc);
    console.log("YO: ", this.acumulado);

    if (this.acumulado > 21) {
      this.mostrarResultado('perdio');
    }
    if (this.acumulado == 21 && this.puntosPc == 21) {
      this.mostrarResultado('perdio');
    }
    if (this.puntosPc <= 21 && this.acumulado < this.puntosPc) {
      this.mostrarResultado('perdio');
    }
    if (this.acumulado == 21 && this.puntosPc < 21) {
      this.mostrarResultado('gano');
    }
    if (this.acumulado <= 21 && this.puntosPc < this.acumulado) {
      this.mostrarResultado('gano');
    }
    if (this.acumulado <= 21 && this.puntosPc > 21) {
      this.mostrarResultado('gano');
    }
    if (this.acumulado == this.puntosPc) {
      this.mostrarResultado('perdio');
    }

  }

  reiniciar(){
    this.comenzo = false;
    this.dado1 = 1;
    this.dado2 = 1;
    this.acumulado = 0;
    this.tiros = 0;
    this.puntosPc = 0;
  }

  mostrarResultado(resultado : string | any){
    if (resultado == "gano") {
      this.listadoService.registrarEnBD(new Juego("dados21",this.usuarioActual,"Gano",new Date().toLocaleString(),new Date().getTime())).subscribe();
        Swal.fire({
          position: 'bottom',
          icon:'success',
          title: 'Ganaste, la pc saco ' + + this.puntosPc,
          showConfirmButton: false,
          timer:2000
        }).then(()=>{ this.reiniciar()});
    }else{
      if (resultado == "perdio") {
      this.listadoService.registrarEnBD(new Juego("dados21",this.usuarioActual,"Perdio",new Date().toLocaleString(),new Date().getTime())).subscribe();
        Swal.fire({
          position: 'bottom',
          icon:'error',
          title: 'Perdiste, la pc saco ' + this.puntosPc,
          showConfirmButton: false,
          timer:2000
        }).then(()=>{this.reiniciar()});
      }

    }

  }
}
