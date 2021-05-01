import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private fb : FormBuilder) {
    this.formGroup = this.fb.group({
      "nombre": ['', [Validators.required, this.spacesValidator]],
      "apellido": ['', [Validators.required, this.spacesValidator]],
      "edad": ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      "telefono": ['', [Validators.required, this.telValidator, this.numbersValidator]],
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
    console.log(this.formGroup.getRawValue());
  }
}
