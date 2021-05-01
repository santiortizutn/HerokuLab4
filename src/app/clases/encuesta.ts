export class Encuesta {
  nombre : string;
  apellido : string;
  edad : number;
  telefono : number;
  valGeneral : string;
  valJuegos : string;
  comentario : string;
  fecha : string;

  constructor(nombre : string, apellido : string, edad : number, telefono : number, valGeneral : string, valJuegos : string, comentario : string , fecha : string){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.valGeneral = valGeneral;
    this.valJuegos = valJuegos;
    this.comentario = comentario;
    this.fecha = fecha;
  }
}
