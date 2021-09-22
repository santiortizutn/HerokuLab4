export class Pregunta {
  id : string;
  imagen : any;
  correcta : string;
  incorrecta1 : string;
  incorrecta2 : string;
  incorrecta3 : string;

  constructor(){
    this.id = "";
    this.correcta = "";
    this.incorrecta1 = "";
    this.incorrecta2 = "";
    this.incorrecta3 = "";
  }
}
