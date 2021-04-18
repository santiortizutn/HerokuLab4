import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  loading:Boolean = false;
  juegoActual:string = "Tateti";
  usuarioActual:string = "";
  logueado:boolean = false;

  // para el juego
  comenzo : boolean = false;
  eligio : boolean = false;

  constructor(private fireAuth:AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);

    // usuario logueado actual
    this.fireAuth.currentUser.then(resp=>{
      if(resp){
        this.logueado  = true;
        this.usuarioActual = resp.email!;
        console.log(this.usuarioActual);
      }else{
        this.logueado = false;
       // this.router.navigate(["/"]);
      }
    })
  }


  comenzar(){
    this.comenzo = true;
  }

}
