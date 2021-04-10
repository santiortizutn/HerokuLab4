import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.css']
})
export class QuiensoyComponent implements OnInit {

  loading:Boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);
  }

}
