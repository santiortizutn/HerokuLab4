import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  loading:Boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);
  }

}
