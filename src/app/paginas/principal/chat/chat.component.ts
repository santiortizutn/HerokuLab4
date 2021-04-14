import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { Mensaje } from 'src/app/clases/mensaje';
import { EmojiButton } from '@joeattardi/emoji-button';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  @Input("juego") juegoActual: string | undefined;
  @ViewChild('chatArea') private chatArea!: ElementRef;
  mensajes : Array<Mensaje>;

  constructor(private msj:MensajesService) {
    this.mensajes = [];
  }

  ngAfterViewChecked() {
    // chat scroll siempre abajo
    this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
  }

  ngOnInit() {
    this.msj.obtenerMensajes(this.juegoActual).snapshotChanges().forEach(elementos =>{
      this.mensajes = [];
      elementos.forEach(snapshot => {
        const mensaje = snapshot.payload.toJSON() as Mensaje;
        this.mensajes.push(mensaje);

      })
      console.log(this.mensajes);
    });
    this.mensajes = this.mensajes.sort((a:any, b:any)=>{
      return parseFloat(a.timestamp) - parseFloat(b.timestamp)
    });
    // emoji selector
    const picker = new EmojiButton();
    const trigger = document.querySelector('#emojiBtn')!;

    picker.on('emoji', selection => {
      console.log(selection.emoji);
      document.querySelector('input')!.value += selection.emoji;
    });
    trigger.addEventListener('click', () => picker.togglePicker(<HTMLElement>trigger));
    //

    // popup chat
    const popup = document.querySelector('.chat-popup')!;
    const chatBtn = document.querySelector('.chat-btn')!;


    chatBtn.addEventListener('click', ()=>{
      popup.classList.toggle('show');
    })
    //



  }


  enviar(){

  }

}
