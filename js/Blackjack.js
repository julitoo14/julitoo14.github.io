class Carta{
    
    
    constructor(numero, palo){
        this.numero = numero;
        this.palo = palo;
        this.valor = 0;
        this.imagen = 'img/'+ numero + '-' + palo + '.png';
        this.convertirNumero(numero);
        this.convertirPalo(palo);
        this.convertirValor(this.numero);
    }

    convertirPalo(palo){
        switch(palo){
            case 1:
                this.palo = '♦';
                break;
            case 2:
                this.palo = '♥';
                break;
            case 3:
                this.palo = '♠';
                break;
            case 4:
                this.palo = '♣';
                break;
        }
    }

    convertirNumero(numero){
        switch(numero){
            case 1:
                this.numero = 'A';
                break;
            case 2:
                this.numero = '2';
                break;
            case 3:
                this.numero = '3';
                break;
            case 4:
                this.numero = '4';
                break;
            case 5:
                this.numero = '5';
                break;
            case 6:
                this.numero = '6';
                break;
            case 7:
                this.numero = '7';
                break;
            case 8:
                this.numero = '8';
                break;
            case 9:
                this.numero = '9';
                break;
            case 10:
                this.numero = '10';
                break;
            case 11:
                this.numero = 'J';
                break;
            case 12:
                this.numero = 'Q';
                break;
            case 13:
                this.numero = 'K';
                break;
        }
    }

    convertirValor(numero){
        switch(numero){
            case 'A':
                this.valor = 11;
                break;
            case '2':
                this.valor = 2;
                break;
            case '3':
                this.valor = 3;
                break;
            case '4':
                this.valor = 4;
                break;
            case '5':
                this.valor = 5;
                break;
            case '6':
                this.valor = 6;
                break;
            case '7':
                this.valor = 7;
                break;
            case '8':
                this.valor = 8;
                break;
            case '9':
                this.valor = 9;
                break;
            case '10':
                this.valor = 10;
                break;
            case 'J':
                this.valor = 10;
                break;
            case 'Q':
                this.valor = 10;
                break;
            case 'K':
                this.valor = 10;
                break;
        }
    }

    mostrarCarta(){
        //return this.numero + ' de ' + this.palo;
        return this.imagen;
    }

    mostrarValor(){
        return this.valor;
    }
}

class Mazo{
   
    constructor(){
        this.cartas = [];
        this.crearMazo();
    }

    crearMazo(){
        for(let i = 1; i <= 4; i++){
            for(let j = 1; j <= 13; j++){
                this.cartas.push(new Carta(j, i));
            }
        }

        for(let i = 1; i <= 4; i++){
            for(let j = 1; j <= 13; j++){
                this.cartas.push(new Carta(j, i));
            }
        }
    }

    barajarMazo(){
        for(let i = 0; i < this.cartas.length; i++){
            let posicion = Math.floor(Math.random() * this.cartas.length);
            let aux = this.cartas[i];
            this.cartas[i] = this.cartas[posicion];
            this.cartas[posicion] = aux;
        }
    }

    mostrarMazo(){
        for(let i = 0; i < this.cartas.length; i++){
            console.log(this.cartas[i].mostrarCarta());
        }
    }

    sacarCarta(){
        return this.cartas.pop();
    }
}

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.mano = [];
        this.saldo = 10000;
    }

    apostar(apuesta){
        this.saldo -= apuesta;
    }

    ganar(apuesta){
        this.saldo += apuesta*2;
    }

    empatar(apuesta){
        this.saldo += apuesta;
    }

    recibirCarta(carta){
        this.mano.push(carta);
    }

    eliminarMano(){
        this.mano = [];
    }

    mostrarMano(){
        let msg = "";
        for(let i = 0; i < this.mano.length; i++){
            msg += "<img class='carta' src='"+this.mano[i].mostrarCarta()+"'>";
        }
        return msg;
    }

    sumarValorMano(){
        let suma = 0;
        for(let i = 0; i < this.mano.length; i++){
            if(this.mano[i].mostrarValor() == [1,11]){

            }
            suma += this.mano[i].mostrarValor();
        }
        return suma;
    }

    mostrarSaldo(){
        return "Saldo de " + this.nombre + ": " + this.saldo;
    }
}

class Croupier{
    constructor(){
        this.mano = [];
    }

    eliminarMano(){
        this.mano = [];
    }
    
    getMano(){
        return this.mano;
    }

    modificarValorAs(){
        for(let i = 0; i < this.mano.length; i++){
            if(this.mano[i].mostrarValor() == 11){
                this.mano[i].valor = 1;
            }
        }
    }

    recibirCarta(carta){
        this.mano.push(carta);
    }

    mostrarMano(){
        let msg = "";
        for(let i = 0; i < this.mano.length; i++){
            msg += "<img class='carta' src='"+this.mano[i].mostrarCarta()+"'>";
        }
        return msg;
}
    sumarValorMano(){
        let suma = 0;
        for(let i = 0; i < this.mano.length; i++){
            if(this.mano[i].mostrarValor() == [1,11]){

            }
            suma += this.mano[i].mostrarValor();
        }
        return suma;
    }
}
/*
class Partida{
    constructor(jugador, croupier, mazo){
        this.mazo = mazo;
        this.jugador = jugador;
        this.croupier = croupier;
        this.ganador = "";
        this.resultado = "";
    }

    iniciarPartida(){
        if(jugador.saldo >= apuesta && apuesta > 0){
            manoC.innerHTML = "";
            manoJ.innerHTML = "";
            jugador.apostar(apuesta);
            saldo.innerHTML = jugador.mostrarSaldo();
            jugador.recibirCarta(mazo.sacarCarta());
            croupier.recibirCarta(mazo.sacarCarta());
            jugador.recibirCarta(mazo.sacarCarta());
            manoC.innerHTML = croupier.mostrarMano()+ '<img class="carta" src="img/BACK.png">';
            croupier.recibirCarta(mazo.sacarCarta());
            valorManoC.innerHTML = croupier.sumarValorMano();
            manoJ.innerHTML = jugador.mostrarMano();
            valorManoJ.innerHTML = jugador.sumarValorMano();
            
            result.innerHTML = "Desea otra carta?";
            yesButton.style.display = 'inline-block';
            noButton.style.display = 'inline-block';
        }else{
            
            result.innerHTML = "No tiene saldo suficiente para apostar";
            jugarButton.style.display = 'block';
            raiseBetButton.style.display = 'inline-block';
            lowBetButton.style.display = 'inline-block';
            if(apuesta==0){
                result.innerHTML="No ha apostado";
            }
    
        }
        this.jugador.eliminarMano();
        this.croupier.eliminarMano();
        this.jugador.mano.push(mazo.sacarCarta());
        this.croupier.mano.push(mazo.sacarCarta());
        this.jugador.mano.push(mazo.sacarCarta());
        this.croupier.mano.push(mazo.sacarCarta());
        jugarButton.style.display = 'none';
        raiseBetButton.style.display = 'none';
        lowBetButton.style.display = 'none';
        
    }

    mostrarManos(){
        
    }
}
*/
function repartir(){
    result.style.color = 'black';
    
    if(manosJugadas > 6){
        mazo = new Mazo();
        mazo.barajarMazo();
        manosJugadas = 0;
    }
    manosJugadas++;
    jugador.eliminarMano();
    croupier.eliminarMano();
    jugarButton.style.display = 'none';
    raiseBetButton.style.display = 'none';
    lowBetButton.style.display = 'none';
    
    if(jugador.saldo >= apuesta && apuesta > 0){
        manoC.innerHTML = "";
        manoJ.innerHTML = "";
        jugador.apostar(apuesta);
        saldo.innerHTML = jugador.mostrarSaldo();
        croupier.recibirCarta(mazo.sacarCarta());
        jugador.recibirCarta(mazo.sacarCarta());
        jugador.recibirCarta(mazo.sacarCarta());

        manoC.innerHTML = croupier.mostrarMano()+ '<img class="carta" src="img/BACK.png">';
        valorManoC.innerHTML = croupier.sumarValorMano();
        manoJ.innerHTML = jugador.mostrarMano();
        valorManoJ.innerHTML = jugador.sumarValorMano();
        
        result.innerHTML = "Desea otra carta?";
        yesButton.style.display = 'inline-block';
        noButton.style.display = 'inline-block';
    }else{
        
        result.innerHTML = "No tiene saldo suficiente para apostar";
        jugarButton.style.display = 'block';
        raiseBetButton.style.display = 'inline-block';
        lowBetButton.style.display = 'inline-block';
        if(apuesta==0){
            result.innerHTML="No ha apostado";
        }

    }
}

function tirarCarta(){
    
    jugador.recibirCarta(mazo.sacarCarta());
    manoJ.innerHTML = jugador.mostrarMano();
    valorManoJ.innerHTML = jugador.sumarValorMano();
    result.innerHTML = "Desea otra carta?";
    yesButton.style.display = 'inline-block';
    noButton.style.display = 'inline-block';
    
    if(jugador.sumarValorMano() > 21){
        let contieneAs = false;
        for(let i = 0; i < jugador.mano.length; i++){
            if(jugador.mano[i].mostrarValor() == 11){
                contieneAs = true;
                jugador.mano[i].valor = 1;
                valorManoJ.innerHTML = jugador.sumarValorMano();
            }
        }
        if(contieneAs == false){

            result.innerHTML = 'Has superado los 21, perdiste con una mano de: ' + jugador.sumarValorMano();
            result.style.color = 'red';
            jugarButton.style.display = 'block';
            raiseBetButton.style.display = 'inline-block';
            lowBetButton.style.display = 'inline-block';
            yesButton.style.display = 'none';
            noButton.style.display = 'none';
        }

    }
    
}

function jugarCroupier(){
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    while(croupier.sumarValorMano() < 17){
        croupier.recibirCarta(mazo.sacarCarta());
        manoC.innerHTML = croupier.mostrarMano();
        valorManoC.innerHTML = croupier.sumarValorMano();
        
        jugarButton.style.display = 'block';
        raiseBetButton.style.display = 'inline-block';
        lowBetButton.style.display = 'inline-block';
        // el croupier se pasa y el jugador no
        if(croupier.sumarValorMano() > 21 && jugador.sumarValorMano() <= 21){
            result.style.color = 'green';
            result.innerHTML = 'El croupier ha superado los 21. Ganaste con ' + jugador.sumarValorMano();
            jugador.ganar(apuesta);
            break;
        }
        // nadie se pasa y gana el croupier
        if(croupier.sumarValorMano() >= 17 && croupier.sumarValorMano() <= 21 && croupier.sumarValorMano() > jugador.sumarValorMano()){
            result.style.color = 'red';
            result.innerHTML = 'El croupier ha ganado con ' + croupier.sumarValorMano() + ', tu tenias ' + jugador.sumarValorMano();
            break;
        }
        
        //nadie se pasa y gana el jugador
        if(croupier.sumarValorMano() >= 17 && croupier.sumarValorMano() <= 21 && croupier.sumarValorMano() < jugador.sumarValorMano() && jugador.sumarValorMano() <= 21){
            result.style.color = 'green';
            result.innerHTML = 'El croupier tenia '+ croupier.sumarValorMano() +'. Ganaste con ' + jugador.sumarValorMano();
            jugador.ganar(apuesta);
            break;
        }
        
        //nadie se pasa y empatan
        if(croupier.sumarValorMano() >= 17 && croupier.sumarValorMano() <= 21 && croupier.sumarValorMano() == jugador.sumarValorMano()){
            result.style.color = 'orange';
            result.innerHTML = 'tu tenias ' + jugador.sumarValorMano() + ' y el croupier tenia ' + croupier.sumarValorMano() + '. Empataron';
            jugador.empatar(apuesta);
            break;
        }
    }
    
    //limpio las manos de ambos jugadores
    saldo.innerHTML = jugador.mostrarSaldo();
    jugador.eliminarMano();
    croupier.eliminarMano();
    
}

function bajarApuesta(){
    if (apuesta >= 100){
        apuesta -= 100;
        showBet.innerHTML = "apuesta: " + apuesta;
        result.innerHTML = "";
    }
}

function subirApuesta(){
    if (apuesta < jugador.saldo){
        apuesta += 100;
        showBet.innerHTML = "apuesta: " + apuesta;
        result.innerHTML = "";
    }else{
        result.innerHTML = "No tiene saldo suficiente para apostar";
    }
}

//instancio mazo y jugadores
let manosJugadas = 0;
let mazo = new Mazo();
mazo.barajarMazo();
const jugador = new Jugador('Julito');
const croupier = new Croupier();
const manoC = document.getElementById('manoC');
const manoJ = document.getElementById('manoJ');
const result = document.getElementById('result');
const saldo = document.getElementById('saldo');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const jugarButton = document.getElementById('jugar');
saldo.innerHTML = jugador.mostrarSaldo();
const showBet = document.getElementById('bet');
let apuesta = 100;
const raiseBetButton = document.getElementById('raiseBet');
const lowBetButton = document.getElementById('lowBet');
showBet.innerHTML = "apuesta: " + apuesta;
const nombreJugador = document.getElementById('nombreJugador');
nombreJugador.innerHTML = jugador.nombre;
let valorManoJ = document.getElementById('valorJ');
let valorManoC = document.getElementById('valorC');
