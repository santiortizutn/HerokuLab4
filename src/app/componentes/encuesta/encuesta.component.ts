import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestasService } from 'src/app/servicios/encuestas.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  @Input("usuario") usuarioActual!: string;

  encuesta! : Encuesta;
  formGroup : FormGroup;

  constructor(private fb : FormBuilder, private eService : EncuestasService, private snackBar : MatSnackBar) {

    this.formGroup = this.fb.group({
      "nombre": ['', [Validators.required, this.spacesValidator]],
      "apellido": ['', [Validators.required, this.spacesValidator]],
      "edad": ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      "telefono": ['', [Validators.required, this.telValidator, this.numbersValidator]],
      "valoracion": ['', Validators.required],
      "juego": ['', Validators.required],
      "comentario": ['', [Validators.required, this.comentValidator]]

    });

  }

  ngOnInit(): void {

    // popup
    const popup = document.querySelector('.encuesta-popup')!;
    const encuestaBtn = document.querySelector('.encuesta-btn')!;


    encuestaBtn.addEventListener('click', ()=>{
      popup.classList.toggle('show');

    })
    //
  }
  spacesValidator(control : AbstractControl) : null | object {
    const nombre = <string>control.value;
    const espacios  = nombre.includes(' ');
    if (espacios) {
      return { contieneEspacios:true };
    }else{
      return null;
    }
  }

  numbersValidator(control : AbstractControl) : null | object {
    const valor = <string>control.value;

    if (isNaN(parseInt(valor, 10))) {
      return { contieneLetras:true };
    }else{
      return null;
    }
  }

  telValidator(control : AbstractControl): null | object {
    const telefono = <string>control.value;
    const tamaño  = telefono.length;
    if (tamaño > 10) {
      return { mayorADiez:true };
    }else{
      return null;
    }
  }

  comentValidator(control : AbstractControl): null | object {
    const telefono = <string>control.value;
    const tamaño  = telefono.length;
    if (tamaño > 120) {
      return { mayor120:true };
    }else{
      return null;
    }
  }

  aceptar(){
    this.encuesta  = new Encuesta(this.formGroup.controls['nombre'].value, this.formGroup.controls['apellido'].value,
    this.formGroup.controls['edad'].value, this.formGroup.controls['telefono'].value, this.formGroup.controls['valoracion'].value,
    this.formGroup.controls['juego'].value, this.formGroup.controls['comentario'].value, new Date().toLocaleString(), this.usuarioActual);


    this.eService.registrarEnBD(this.encuesta).subscribe(()=>{
      console.log(    this.encuesta );
    });
    this.formGroup.reset({'nombre': '', 'apellido':'', 'edad': '', 'telefono':'', 'valoracion': '', 'juego':'', 'comentario': ''});
    this.snackBar.open(this.usuarioActual + ", tu encuesta fue cargada correctamente 👍", "",{duration:2000});

  }
}
