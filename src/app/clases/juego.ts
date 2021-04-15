export abstract class Juego {

  public nombre = 'Sin Nombre';
  public jugador: string;
  public idJugador: string;
  public gano = false;

  constructor(nombre: string, jugador:string, idJugador:string, gano?: boolean) {

      this.nombre = nombre;
      this.jugador = jugador;
      this.idJugador  = idJugador;
      if (gano) this.gano = gano;

  }

  public abstract verificar():boolean;

  public retornarAyuda() {

    return "NO hay Ayuda definida";
  }
}
