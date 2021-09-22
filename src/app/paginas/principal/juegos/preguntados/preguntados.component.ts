import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/clases/pregunta';
import { ListadosService } from 'src/app/servicios/listados.service';
import { PokemonService } from 'src/app/servicios/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnInit {
  logueado = false;
  loading: Boolean = false;
  usuarioActual: any;
  juegoActual: string = 'preguntados';
  comenzo: boolean = false;

  repetidor: any;
  puntos: number = 0;
  segundos: number = 10;
  botonesIndex: Array<number> = [];
  listaPreguntas: Array<Pregunta> = [];
  preguntaActual!: Pregunta;
  indiceActual: number = 0;
  listaIndices: Array<number> = [];
  preguntasVistas: number = 0;
  mostrarRespuestas: boolean = false;
  respondido: boolean = false;

  constructor(
    private router: Router,
    private pokeService: PokemonService,
    private fireAuth: AngularFireAuth,
    private listadoService: ListadosService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.fireAuth.currentUser.then((resp) => {
      if (resp) {
        this.logueado = true;
        this.usuarioActual = resp.email;
      } else {
        this.logueado = false;
        this.router.navigate(['/']);
      }
    });

    this.listadoService
      .obtenerPreguntas()
      .snapshotChanges()
      .forEach((elementos: any) => {
        this.listaPreguntas = [];
        elementos.forEach((snapshot: any) => {
          const pregunta = snapshot.payload.toJSON() as Pregunta;
          this.pokeService.traerPorId(pregunta.imagen).then((poke: any) => {
            pregunta.imagen = poke.sprites.front_default;
          });
          this.listaPreguntas.push(pregunta);
        });
        this.indiceActual =
          Math.floor(Math.random() * this.listaPreguntas.length) + 1;
      });
  }

  randomizarCartas() {
    this.comenzo = true;
    this.segundos = 10;
    this.respondido = false;
    if (this.listaIndices.length != 10) {
      for (let i = 0; i < this.listaIndices.length; ) {
        if (this.listaIndices[i] == this.indiceActual) {
          this.indiceActual =
            Math.floor(Math.random() * this.listaPreguntas.length) + 1;
          i = 0;
        } else {
          i++;
        }
      }
      this.botonesIndex = [];
      this.randomizarBotones();
      this.listaIndices.push(this.indiceActual);
      this.preguntaActual = this.listaPreguntas[this.indiceActual];
      this.mostrarRespuestas = false;
      this.preguntasVistas++;

      if (this.segundos == 10) {
        this.repetidor = setInterval(() => {
          this.segundos--;
          if (this.segundos == 0) {
            clearInterval(this.repetidor);
            this.incorrecto();
          }
          if (this.respondido) {
            clearInterval(this.repetidor);
          }
        }, 1000);
      }
    } else {
      if (this.puntos >= 60) {
        Swal.fire({
          position: 'bottom',
          icon: 'success',
          title: '¡Ganaste!',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.reset();
        });
      } else {
        Swal.fire({
          position: 'bottom',
          icon: 'error',
          title: 'Perdiste...',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.reset();
        });
      }
    }
  }

  randomizarBotones() {
    let indice = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < 4; ) {
      if (!this.botonesIndex.includes(indice, 0)) {
        this.botonesIndex.push(indice);
        i++;
      } else {
        indice = Math.floor(Math.random() * 4) + 1;
      }
    }
  }

  correcto() {
    this.mostrarRespuestas = true;
    this.respondido = true;
    this.puntos = this.puntos + 10;
    Swal.fire({
      position: 'bottom',
      icon: 'success',
      title: 'Correcto',
      showConfirmButton: false,
      toast: true,
      timer: 2000,
    }).then(() => {
      this.randomizarCartas();
    });
  }

  incorrecto() {
    this.mostrarRespuestas = true;
    this.respondido = true;
    Swal.fire({
      position: 'bottom',
      icon: 'error',
      title: 'Incorrecto',
      showConfirmButton: false,
      toast: true,
      timer: 2000,
    }).then(() => {
      this.randomizarCartas();
    });
  }

  reset() {
    this.comenzo = false;
    this.puntos = 0;
    this.botonesIndex = [];
    this.indiceActual = 0;
    this.listaIndices = [];
    this.preguntasVistas = 0;
    this.mostrarRespuestas = false;
  }
}
