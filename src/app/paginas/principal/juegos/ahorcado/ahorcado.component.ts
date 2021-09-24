import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Juego } from 'src/app/clases/juego';
import { ListadosService } from 'src/app/servicios/listados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {


  logueado = false;
  loading:Boolean = false;
  usuarioActual:any;
  juegoActual:string = "ahorcado";
  comenzo : boolean = false;
  perdio = false;

  arrayPalabras = ["murcielago", "conciencia", "amor", "auto", "mesada", "renacuajo", "espina",
                   "oceano", "ecografia", "parlante", "disco", "dinosaurio", "taza", "columna",
                   "raqueta", "pelota", "programa", "mouse", "perro", "secuencia", "interfaz",
                   "mosquito", "ñandu", "pediatra", "urologo", "atun", "celular", "bailar",
                   "victoria", "marihuana", "pedo", "dormir", "zodiaco", "uruguay", "molestar",
                   "hervir", "huevo", "uña", "alcohol", "palta", "venganza", "agua", "hojaldre"];
  palabraMisteriosa : Array<string> = [];
  letrasAcertadas : Array<string> = [];
  letrasUsadas : Array<string> = [];
  letraSeleccionada : string = "";
  contadorErrores = 0;

  constructor(private router: Router, private fireAuth:AngularFireAuth, private listadoService:ListadosService) { }

  ngOnInit(): void {
    this.loading = true;
    this.randomizarPalabra();
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

  seleccionar(letra : string){

    let acertada = false;
    this.letraSeleccionada = letra;
    this.letrasUsadas.push(letra);
    for (let i = 0; i < this.palabraMisteriosa.length; i++) {
      if (this.palabraMisteriosa[i] == letra) {
        acertada = true;
        this.letrasAcertadas.push(letra);
      }
    }

    if (!acertada) {
      this.contadorErrores++;
      if (this.contadorErrores == 7) {
        this.perdio = true;
        Swal.fire({
          position: 'bottom',
          icon:'error',
          title: 'Perdiste, volve a intentar!',
          showConfirmButton: false,
          timer:3000
        }).then(()=>{
          this.listadoService.registrarEnBD(new Juego("ahorcado",this.usuarioActual,"Perdio",new Date().toLocaleString(),new Date().getTime())).subscribe(
            ()=>{
              this.reset();
            });
        });
      }
    }else{
      if (this.letrasAcertadas.length == this.palabraMisteriosa.length) {

        Swal.fire({
          position: 'bottom',
          icon:'success',
          title: 'Bien, ganaste!',
          showConfirmButton: false,
          timer:2000
        }).then(()=>{
          this.listadoService.registrarEnBD(new Juego("ahorcado",this.usuarioActual,"Gano",new Date().toLocaleString(),new Date().getTime())).subscribe(
            ()=>{
              this.reset();
            });});
      }
    }
  }

  acertadas(letra : string) : boolean{
    for (let i = 0; i < this.letrasAcertadas.length; i++) {
      if(this.letrasAcertadas[i] == letra){
        return true;
      }
    }

    return false;
  }

  usadas(letra : string) : boolean{
    for (let i = 0; i < this.letrasUsadas.length; i++) {
      if(this.letrasUsadas[i] == letra){
        return true;
      }
    }

    return false;
  }

  randomizarPalabra(){
    let palabraRandom = this.arrayPalabras[Math.floor(Math.random() * this.arrayPalabras.length)];

    for (let i = 0; i < palabraRandom.length; i++) {
      this.palabraMisteriosa.push(palabraRandom.charAt(i).toUpperCase());
    }


  }

  reset(){
    this.comenzo = false;
    this.perdio = false;
    this.contadorErrores = 0;
    this.palabraMisteriosa = [];
    this.randomizarPalabra();
    this.letrasAcertadas = [];
    this.letrasUsadas = [];
    this.letraSeleccionada = "";
  }

}
