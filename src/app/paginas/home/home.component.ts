import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading:Boolean = false;
  usuarioActual:any;

  constructor(private router: Router, private fireAuth:AngularFireAuth, private auth:AuthService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);

    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        this.logueado  = true;
        this.usuarioActual = resp.email;
      }else{
        this.logueado = false;
        this.router.navigate(["/login"]);
      }
    })

    console.log("RUTA: ", this.router.routerState.snapshot.url);

  }

  noLog(){
    Swal.fire({
      title: 'ERROR',
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
      this.snackBar.open("Hasta pronto!! ", "",{duration:1000});
      this.router.navigate(["/login"]);
    });
  }

  juegos(){
    this.router.navigate(["/juegos"]);
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
