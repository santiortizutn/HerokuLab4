export class Encuesta {
  nombre : string;
  apellido : string;
  edad : number;
  telefono : number;
  valoracion : string;
  juegoFav : string;
  comentario : string;
  fecha : string;
  usuario : string;

  constructor(nombre : string, apellido : string, edad : number, telefono : number,
     valoracion : string, juegoFav : string, comentario : string , fecha : string, usuario : string){

    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.valoracion = valoracion;
    this.juegoFav = juegoFav;
    this.comentario = comentario;
    this.fecha = fecha;
    this.usuario = usuario;
  }
}
