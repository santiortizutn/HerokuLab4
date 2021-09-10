import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ListadosService } from 'src/app/servicios/listados.service';

@Component({
  selector: 'app-masmenos',
  templateUrl: './masmenos.component.html',
  styleUrls: ['./masmenos.component.css']
})
export class MasmenosComponent implements OnInit {

  logueado = false;
  loading:Boolean = false;
  usuarioActual:any;
  juegoActual:string = "masmenos";
  comenzo : boolean = false;

  constructor(private router: Router, private fireAuth:AngularFireAuth, private listadoService:ListadosService) { }

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
        this.router.navigate(["/"]);
      }
    });
  }
}
