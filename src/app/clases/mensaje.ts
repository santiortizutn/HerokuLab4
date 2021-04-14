
export class Mensaje {

  id:any;
  usuario:string;
  contenido:string = "";
  fecha:string="";
  timestamp:number;

  constructor(usuario:string, contenido:string, fecha:string, timestamp:number, id?:any){
    this.usuario = usuario;
    this.contenido = contenido;
    this.fecha = fecha;
    this.timestamp = timestamp;
    if (id) {
      this.id = id;
    }
  }

}
