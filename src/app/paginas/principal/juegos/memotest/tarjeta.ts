export class Tarjeta {
  id:number;
  imagen:string;
  posicion:number;
  idHtml:number;
  value:number;

  constructor( imagen:string, id:number, pos:number, idHtml:number, value:number){
    this.id = id;
    this.posicion = pos;
    this.idHtml = idHtml;
    this.value = value;
    this.imagen = imagen;
}


}
