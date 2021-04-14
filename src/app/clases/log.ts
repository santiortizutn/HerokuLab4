export class Log {

  date: string;
  usuario : string = '';

  constructor(usuario:string, date:string){
    this.usuario = usuario;
    this.date = date;
  }

}
