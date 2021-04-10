export class Log {

  date: Date = new Date;
  usuario : string = '';

  constructor(usuario:string, date:Date){
    this.usuario = usuario;
    this.date = new Date;
  }

}
