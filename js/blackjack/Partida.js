import {Jugador} from './Jugador.js';
import {Croupier} from './Croupier.js';
import {Mazo} from './Mazo.js';

class Partida{
    constructor(jugador, croupier){
        this.pj = JSON.parse(localStorage.getItem("usuariosLogueados"));
        this.mazo = new Mazo();
        this.mazo.barajarMazo();
        this.jugador = jugador;
        this.croupier = croupier;
        this.ganador = "";
        this.resultado = "";
        this.manosJugadas = 0;
        this.apuesta = 100;
        this.manoC = document.getElementById('manoC');
        this.manoJ = document.getElementById('manoJ');
        this.valorManoJ = document.getElementById('valorJ');
        this.valorManoC = document.getElementById('valorC');
        this.result = document.getElementById('result');
        this.saldo = document.getElementById('saldo');
        this.yesButton = document.getElementById('yesButton');
        this.noButton = document.getElementById('noButton');
        this.jugarButton = document.getElementById('jugar');
        this.showBet = document.getElementById('bet');
        this.raiseBetButton = document.getElementById('raiseBet');
        this.lowBetButton = document.getElementById('lowBet');
        this.nombreJugador = document.getElementById('nombreJugador');
        this.nombreCroupier = document.getElementById('nombreCroupier');
    }

    prepararPartida(){
        //se carga la pantalla inicial
        this.mazo.barajarMazo();
        this.manoC.innerHTML = '<img class="carta" src="img/BACK.png"><img class="carta" src="img/BACK.png">';
        this.manoJ.innerHTML = '<img class="carta" src="img/BACK.png"><img class="carta" src="img/BACK.png">';
        this.valorManoJ.innerHTML = "";
        this.valorManoC.innerHTML = "";
        this.saldo.innerHTML = jugador.mostrarSaldo();
        this.yesButton.style.display = "none";
        this.noButton.style.display = "none";
        this.jugarButton.style.display = "block";
        this.showBet.innerHTML = "apuesta: " + this.apuesta;
        this.raiseBetButton.style.display = "inline-block";
        this.lowBetButton.style.display = "inline-block";
        this.nombreJugador.innerHTML = jugador.nombre;
        this.nombreCroupier.innerHTML = "Croupier";
    }

    jugar(){
        //se limpian manos
        jugador.eliminarMano();
        croupier.eliminarMano();
        this.jugarButton.style.display = "none";
        this.raiseBetButton.style.display = "none";
        this.lowBetButton.style.display = "none";
        this.nombreJugador.style.display = "block";
        this.nombreCroupier.style.display = "block";

        //se cuentan las manos para renovar el mazo si es necesario
        this.manosJugadas++;
        if(this.manosJugadas > 5){
                this.mazo = new Mazo();
                this.mazo.barajarMazo();
                this.manosJugadas = 0;
                
            }
        
        //se reparten las cartas si el jugador tiene saldo suficiente
        if(jugador.saldo >= this.apuesta && this.apuesta > 0){
            this.manoC.innerHTML = "";
            this.manoJ.innerHTML = "";
            jugador.apostar(this.apuesta);
            this.saldo.innerHTML = jugador.mostrarSaldo();
            jugador.recibirCarta(this.mazo.sacarCarta());
            croupier.recibirCarta(this.mazo.sacarCarta());
            jugador.recibirCarta(this.mazo.sacarCarta());
            this.manoC.innerHTML = this.croupier.mostrarMano()+ '<img class="carta" src="img/BACK.png">';
            this.valorManoC.innerHTML = croupier.sumarValorMano();
            croupier.recibirCarta(this.mazo.sacarCarta());
            this.manoJ.innerHTML = jugador.mostrarMano();
            this.valorManoJ.innerHTML = jugador.sumarValorMano();

            
            this.result.innerHTML = "Desea otra carta?";
            this.yesButton.style.display = 'inline-block';
            this.noButton.style.display = 'inline-block';
        }else{
            this.result.innerHTML = "No tiene saldo suficiente para apostar";
            this.jugarButton.display = "block";
            if(this.apuesta==0){
                this.result.innerHTML="No ha apostado";
            }
        }
    }
        
    actualizarSaldo(){
        pj.saldo = jugador.saldo;
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        for (const usuario of usuarios){
            if(pj.name === usuario.name){
                usuario.saldo = jugador.saldo;
            }
        }
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuariosLogueados", JSON.stringify(pj));
        
    }


    hit(){ //metodo para recibir carta, se llama desde el boton "hit"
        jugador.recibirCarta(this.mazo.sacarCarta());
        this.manoJ.innerHTML = jugador.mostrarMano();
        this.valorManoJ.innerHTML = jugador.sumarValorMano();
        if(jugador.sumarValorMano() > 21){ // si el jugador se paso se muestra el mensaje y aparecen los botones para volver a jugar
            this.result.innerHTML = `Te pasaste con ${jugador.sumarValorMano()}`;
            this.yesButton.style.display = 'none';
            this.noButton.style.display = 'none';
            this.jugarButton.style.display = 'block';
            this.raiseBetButton.style.display = 'inline-block';
            this.lowBetButton.style.display = 'inline-block';
            this.actualizarSaldo();
        }else{
            this.result.innerHTML = "Desea otra carta?";
        }
    }

    fold(){ //metodo para pasar, se llama desde el boton "fold"
        this.yesButton.style.display = "none";
        this.noButton.style.display = "none";
        this.result.innerHTML = "";
        this.playCroupier();
    }

    playCroupier(){ //mientras que el croupier no tenga 17, se le reparten cartas
        this.manoC.innerHTML = croupier.mostrarMano();
        this.valorManoC.innerHTML = croupier.sumarValorMano();
        while(croupier.sumarValorMano() < 17){
            croupier.recibirCarta(this.mazo.sacarCarta());
            this.manoC.innerHTML = croupier.mostrarMano();
            this.valorManoC.innerHTML = croupier.sumarValorMano();
        }
        this.jugarButton.style.display = "block";
        this.raiseBetButton.style.display = "inline-block";
        this.lowBetButton.style.display = "inline-block";
        this.getGanador(); //cuando termina el turno del croupier se determina el ganador
    }

    getGanador(){ // metodo para determinar el ganador
        
        if(jugador.sumarValorMano() == 21 && jugador.getMano().length == 2){ //si el jugador tiene blackjack se gana automaticamente
            this.result.innerHTML = `Blackjack! Ganaste ${this.apuesta*2.5}`;
            jugador.ganar(this.apuesta *2.5);
        }else if(jugador.sumarValorMano() > 21){ //si el jugador se paso
            this.result.innerHTML = "Te pasaste";
            this.ganador = croupier;
        }else if(croupier.sumarValorMano() > 21){  //si el croupier se paso
            this.result.innerHTML = "Ganaste "+ this.apuesta*2 +" , el croupier se paso";
            this.ganador = jugador;
            jugador.ganar(this.apuesta*2);
        }else if(jugador.sumarValorMano() > croupier.sumarValorMano()){ //si el jugador tiene mas puntos que el croupier
            this.result.innerHTML = "Ganaste "+ this.apuesta*2;
            this.ganador = jugador;
            jugador.ganar(this.apuesta*2);
        }else if(jugador.sumarValorMano() < croupier.sumarValorMano()){ //si el croupier tiene mas puntos que el jugador
            this.ganador = croupier;
            this.result.innerHTML = "Perdiste";
        }else{ //si el jugador y el croupier tienen el mismo numero de puntos
            this.result.innerHTML = "Empate";
            jugador.ganar(this.apuesta);
        }
        
        this.saldo.innerHTML = jugador.mostrarSaldo();
        this.actualizarSaldo();
    }

    subirApuesta(){ //metodo para subir la apuesta
        this.result.innerHTML = "";
        if (this.apuesta < jugador.saldo){
            this.apuesta += 100;
            this.showBet.innerHTML = "apuesta: " + this.apuesta;
        }else{
            this.result.innerHTML = "No tiene saldo suficiente para apostar";
        }
    }

    bajarApuesta(){ //metodo para bajar la apuesta
        this.result.innerHTML = "";
        if (this.apuesta > 100){
            this.apuesta -= 100;
            this.showBet.innerHTML = "apuesta: " + this.apuesta;
        }
    }

}

const closeButton = document.getElementById('cerrarSesion');
const pj =JSON.parse(localStorage.getItem("usuariosLogueados"));
const jugador = new Jugador(pj.name, pj.saldo);
const croupier = new Croupier();
const partida = new Partida(jugador, croupier);
const saludo = document.getElementById("saludo");
saludo.innerHTML = `Bienvenido ${pj.name}`;
partida.prepararPartida();
partida.jugarButton.addEventListener("click", function jugarButton(){partida.jugar();});
partida.yesButton.addEventListener("click", function hitButton(){partida.hit();});
partida.noButton.addEventListener("click", function foldButton(){partida.fold();});
partida.raiseBetButton.addEventListener("click", function raiseBetButton(){partida.subirApuesta();});
partida.lowBetButton.addEventListener("click", function lowBetButton(){partida.bajarApuesta();});
closeButton.addEventListener('click', function(){
    partida.actualizarSaldo();
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    usuarios.push(JSON.parse(localStorage.getItem("usuariosLogueados")));
    localStorage.removeItem("usuariosLogueados");
    window.location.replace('./index.html');
});

