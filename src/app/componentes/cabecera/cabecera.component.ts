import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input('componente') componenteActual! : string;
  @Input("usuario") usuarioActual!: string;
  @Output() evento = new EventEmitter<boolean>();

  usuario : string = localStorage.getItem('usuario')!;


  constructor() { }

  ngOnInit(): void {
  }

  deslogueo(){
    this.evento.emit(true);
  }

}
