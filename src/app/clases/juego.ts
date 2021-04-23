export class Juego {
  nombre : string;
  jugador : string;
  resultado : string;
  fecha : string;
  timestamp:number;

  constructor(nombre : string, jugador : string, resultado : string, fecha : string, timestamp : number){
    this.nombre = nombre;
    this.jugador = jugador;
    this.resultado = resultado;
    this.fecha = fecha;
    this.timestamp = timestamp;
  }
}
