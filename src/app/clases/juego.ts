export class Juego {

  nombre;
  jugador: string;
  idJugador: string;
  resultado = false;

  constructor(nombre: string, jugador:string, idJugador:string, resultado?: boolean) {

      this.nombre = nombre;
      this.jugador = jugador;
      this.idJugador  = idJugador;
      if (resultado) this.resultado = resultado;

  }


}
