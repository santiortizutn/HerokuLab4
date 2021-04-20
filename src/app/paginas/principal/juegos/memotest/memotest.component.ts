import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  @ViewChild('btn') private btn!: ElementRef;
  loading:Boolean = false;

  array1:Array<string> = [];
  array2:Array<string> = [];
  arrayFinal:Array<string> = [];
  juegoActual:string = "Memotest";
  usuarioActual:string = "";
  logueado:boolean = false;
  comenzo : boolean = false;
  dadovuelta : boolean = false;
  opciones = ["ensalada", "hamburguesa", "nachos", "papas", "pizza", "pancho"];
  botones = ["", "", "", "", "", "", "", "", "", "", "", ""];

  constructor(private fireAuth:AngularFireAuth, private router: Router, private storageService: StorageService,
    private el : ElementRef) {}

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

    this.array1 = this.generarArrays();
    this.array2 = this.generarArrays();
    this.arrayFinal = this.array1.concat(this.array2).map(String);
    console.log(this.arrayFinal);
    this.generar();


    console.log("A vER: " + this.btn.nativeElement.value);


  }



 darVuelta(){
   this.dadovuelta = true;
 }

  generarArrays(){
    let array:Array<string> = [];
    let cantidad = 6
    let index = 0;
    let repetido = false;
    let random = "";

    while(index < cantidad) {

      random = this.opciones[Math.floor(Math.random() * this.opciones.length)];
      repetido = false;

      while (!repetido) {

        for (let i = 0; i < index; i++) {

          if (random == array[i]) {
            repetido = true;
            break;
          }
        }
        if (!repetido) {
          array.push(random);
          index++;
        }

      }

    }
    return array;
  }

  generar(){
    for (let i = 0; i < this.arrayFinal.length; i++) {

      switch (this.arrayFinal[i]) {
        case "ensalada":
          this.storageService.obtenerImagen("ensalada").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        case "pancho":
          this.storageService.obtenerImagen("pancho").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        case "hamburguesa":
          this.storageService.obtenerImagen("hamburguesa").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        case "papas":
          this.storageService.obtenerImagen("papas").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        case "nachos":
          this.storageService.obtenerImagen("nachos").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        case "pizza":
          this.storageService.obtenerImagen("pizza").then((url: any) =>{
            this.botones[i] = url;
           });
          break;
        default:
          break;
      }

    }

    console.log("ARRAY FINAL: ", this.arrayFinal);
  }



}
