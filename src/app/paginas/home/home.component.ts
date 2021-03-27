import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  constructor(private router: Router) { }

  ngOnInit(): void {


  }


  ejercicio(){
    this.router.navigate(["/ejercicios"]);
  }
  login(){
    this.router.navigate(["/login"]);
  }
  quiensoy(){
    this.router.navigate(["/quiensoy"]);
  }
  registro(){
    this.router.navigate(["/registro"]);
  }


}
