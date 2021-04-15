import { Juego } from './juego';


export class Tateti extends Juego{


    lugares = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    resultado: string = "";
    espacio = 0;
    opcionUsuario: string = "";
    opcionPC: string = "";

    constructor(jugador:string,idJugador:string) {
        super('TA-TE-TI',jugador,idJugador);
    }

    public verificar(): boolean {
       return this.gano;
    }


   signo(signo:string, jugador:string) {
        let resultado: string = "";

        if (this.lugares[0] == signo && this.lugares[1] == signo && this.lugares[2] == signo) {
            if (jugador == "jugador") {
                this.gano = true;
                resultado = "Gano";
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }
        }
        else if (this.lugares[3] == signo && this.lugares[4] == signo && this.lugares[5] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }
        }
        else if (this.lugares[6] == signo && this.lugares[7] == signo && this.lugares[8] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }

        }
        else if (this.lugares[0] == signo && this.lugares[3] == signo && this.lugares[6] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }

        }
        else if (this.lugares[1] == signo && this.lugares[4] == signo && this.lugares[7] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }

        }
        else if (this.lugares[2] == signo && this.lugares[5] == signo && this.lugares[8] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }
        }
        else if (this.lugares[0] == signo && this.lugares[4] == signo && this.lugares[8] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }
        }
        else if (this.lugares[2] == signo && this.lugares[4] == signo && this.lugares[6] == signo) {
            if (jugador == "jugador") {
                resultado = "Gano";
                this.gano=true;
            }
            if (jugador == "maquina") {
                resultado = "Perdio";
                this.gano=false;
            }
        }

        for (let i = 0; i < 10; i++) {
            if (this.lugares[i] != "-") {
                this.espacio = this.espacio + 1;
            }
        }

        if (resultado == "" && this.espacio == 10){
            resultado = "Empate";
            this.gano = null!;
        }


        this.espacio = 0;
        console.log(resultado);
        return resultado;
    }

}
