import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Juego } from 'src/app/clases/juego';
import { ListadosService } from 'src/app/servicios/listados.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  logueado = false;
  loading : Boolean = false;
  usuarioActual : any;
  resultados : Array<Juego> = [];
  listaMemo : Array<Juego> = [];
  listaTtt : Array<Juego> = [];
  listaPpt : Array<Juego> = [];
  listaDados : Array<Juego> = [];

  constructor(private router: Router, private fireAuth:AngularFireAuth, private listadoService : ListadosService) { }

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
        //this.router.navigate(["/"]);
      }})

      this.listadoService.obtenerListado().snapshotChanges().forEach((elementos : any) =>{
        this.resultados = [];
        elementos.forEach((snapshot : any) => {
          const resultado = snapshot.payload.toJSON() as Juego;
          this.resultados.push(resultado);
        })
        console.log(this.resultados);

        this.resultados = this.resultados.sort((a:any, b:any)=>{
          return parseFloat(b.timestamp) - parseFloat(a.timestamp)
        });

        for (let i = 0; i < this.resultados.length; i++) {
          switch (this.resultados[i].nombre) {

            case "memotest":
            this.listaMemo.push(this.resultados[i]);
              break;
            case "tateti":
              this.listaTtt.push(this.resultados[i]);
              break;
            case "ppt":
              this.listaPpt.push(this.resultados[i]);
              break;
            case "dados21":
              this.listaDados.push(this.resultados[i]);
              break;

            default:
              break;
          }
        }
      });




  }









}
