import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { Mensaje } from 'src/app/clases/mensaje';
import { EmojiButton } from '@joeattardi/emoji-button';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  @Input("juego") juegoActual!: string;
  @Input("usuario") usuarioActual!: string;

  @ViewChild('chatArea') private chatArea!: ElementRef;


  mensajes : Array<Mensaje>;
  mensaje : Mensaje;
  inputFormControl:any
  btnDisabled = true;

  constructor(private msj:MensajesService) {
    this.mensajes = [];
    this.mensaje = new Mensaje("", "", new Date().toLocaleString(), new Date().getTime());
  }

  ngAfterViewChecked() {
    this.scrollDown();
  }

  ngOnInit() {
    this.msj.obtenerMensajes(this.juegoActual).snapshotChanges().forEach(elementos =>{
      this.mensajes = [];
      elementos.forEach(snapshot => {
        const mensaje = snapshot.payload.toJSON() as Mensaje;
        this.mensajes.push(mensaje);

      })
    });
    this.mensajes = this.mensajes.sort((a:any, b:any)=>{
      return parseFloat(a.timestamp) - parseFloat(b.timestamp)
    });
    // emoji selector
    const picker = new EmojiButton();
    const trigger = document.querySelector('#emojiBtn')!;

    picker.on('emoji', selection => {
      console.log(selection.emoji);
      this.mensaje.contenido +=selection.emoji;
      console.log(this.mensaje.contenido);
      this.btnDisabled = false;
    })
    trigger.addEventListener('click', () => {
      picker.togglePicker(<HTMLElement>trigger)
    } );
    //

    // popup chat
    const popup = document.querySelector('.chat-popup')!;
    const chatBtn = document.querySelector('.chat-btn')!;


    chatBtn.addEventListener('click', ()=>{
      popup.classList.toggle('show');
    })
    //
    document.querySelector('input')?.addEventListener('input', () => {
      this.validarBoton();
    });
  }


  scrollDown(){
    // chat scroll siempre abajo
    this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
  }


  enviar(){
    if (this.usuarioActual) {
      this.mensaje.usuario = this.usuarioActual;
      this.mensaje.contenido = this.mensaje.contenido.trim();
      this.msj.registrarEnBD(this.mensaje, this.juegoActual).subscribe( data =>{
        console.log("Data:", this.mensaje);
        this.mensaje.contenido = "";
        this.btnDisabled = true;
      });
    }
  }

  validarBoton(){

    if (!/^\s*$/.test(this.mensaje.contenido)) {
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }
  }

}
