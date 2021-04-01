export class Usuario {

  id: any;
  correo : string = '';
  clave : string = '';

  constructor(correo:string, clave:string){
    this.correo = correo;
    this.clave = clave;
  }
}
