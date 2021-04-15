import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input('componente') componenteActual! : string;
  @Output() evento = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  deslogueo(){
    this.evento.emit(true);
  }

}
