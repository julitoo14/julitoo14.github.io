class Carta{
    
    
    constructor(numero, palo){
        this.numero = numero;
        this.palo = palo;
        this.valor = 0;
        this.convertirNumero(numero);
        this.convertirPalo(palo);
        this.convertirValor(this.numero);
    }

    convertirPalo(palo){
        switch(palo){
            case 1:
                this.palo = '♥';
                break;
            case 2:
                this.palo = '♦';
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
        return this.numero + ' de ' + this.palo;
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
        let msg = "Mano de " + this.nombre + ": <br>";
        for(let i = 0; i < this.mano.length; i++){
            msg += this.mano[i].mostrarCarta() + "<br>";
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

    recibirCarta(carta){
        this.mano.push(carta);
    }

    mostrarMano(){
        let msg = "Mano del croupier: <br>";
        for(let i = 0; i < this.mano.length; i++){
            msg += this.mano[i].mostrarCarta() + "<br>";
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

//instancio mazo y jugadores
let manosJugadas = 0;
let mazo = new Mazo();
mazo.barajarMazo();
let jugador = new Jugador('Julito');
let croupier = new Croupier();
let manoC = document.getElementById('manoC');
let manoJ = document.getElementById('manoJ');
let result = document.getElementById('result');
let saldo = document.getElementById('saldo');
saldo.innerHTML = jugador.mostrarSaldo();
yesButton = document.getElementById('yesButton');
noButton = document.getElementById('noButton');
jugarButton = document.getElementById('jugar');
let apuesta = 1000;

function repartir(){
    console.log(mazo.mostrarMazo());
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
    
    if(jugador.saldo >= apuesta){
        manoC.innerHTML = "";
        manoJ.innerHTML = "";
        jugador.apostar(apuesta);
        saldo.innerHTML = jugador.mostrarSaldo();
        croupier.recibirCarta(mazo.sacarCarta());
        jugador.recibirCarta(mazo.sacarCarta());
        jugador.recibirCarta(mazo.sacarCarta());

        manoC.innerHTML = croupier.mostrarMano()+ 'el valor de la mano es: ' + croupier.sumarValorMano();
        manoJ.innerHTML = jugador.mostrarMano() + ' el valor de la mano es: ' + jugador.sumarValorMano();
        
        result.innerHTML = "Desea otra carta?";
        yesButton.style.display = 'inline-block';
        noButton.style.display = 'inline-block';
    }else{
        result.innerHTML = "No tiene saldo suficiente para apostar";
        jugarButton.style.display = 'block';
    }
}

function tirarCarta(){
    
    jugador.recibirCarta(mazo.sacarCarta());
    manoJ.innerHTML = jugador.mostrarMano()+ 'el valor de la mano es: ' + jugador.sumarValorMano();
    result.innerHTML = "Desea otra carta?";
    yesButton.style.display = 'inline-block';
    noButton.style.display = 'inline-block';
    
    if(jugador.sumarValorMano() > 21){
        result.innerHTML = 'Has superado los 21, perdiste con una mano de: ' + jugador.sumarValorMano();
        result.style.color = 'red';
        jugarButton.style.display = 'block';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    }
}

function jugarCroupier(){
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    while(croupier.sumarValorMano() < 17){
        croupier.recibirCarta(mazo.sacarCarta());
        manoC.innerHTML = croupier.mostrarMano()+ 'el valor de la mano es: ' + croupier.sumarValorMano();
        
        jugarButton.style.display = 'block';
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