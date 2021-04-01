import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal  from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logueado = false;


  constructor(private router: Router, private fireAuth:AngularFireAuth, private auth:AuthService) { }

  ngOnInit(): void {

    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        console.log("respuestaa ", resp?.email);
        this.logueado  = true;
      }else{
        this.logueado = false;
      }
    })

  }

  noLog(){
    Swal.fire({
      title: 'Error',
      text: 'Debes estar logueado para usar estas funciones.',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'rgba(255, 2, 2, 0.774)'
    });
  }

  salir(){
    this.auth.logOut().then( resp =>{
      this.logueado = false;
      console.log("respuestaa ", resp);
      Swal.fire({
        title: 'Perfecto',
        text: 'Deslogueo exitoso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
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
