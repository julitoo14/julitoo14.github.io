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

    getNombre(){
        return this.nombre;
    }

    apostar(apuesta){
        this.saldo -= apuesta;
    }

    ganar(apuesta){
        this.saldo += apuesta;
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

    getMano(){
        return this.mano;
    }

    mostrarMano(){
        let msg = "";
        for(let i = 0; i < this.mano.length; i++){
            msg += `<img class='carta' src='${this.mano[i].mostrarCarta()}'>`;
        }
        return msg;
    }

    sumarValorMano(){
        let suma = 0;
        let hayAs = 0;
        for(let i = 0; i < this.mano.length; i++){
            if(this.mano[i].mostrarValor() == 11){
                hayAs++;
            }
            suma += this.mano[i].mostrarValor();
            if(hayAs > 0 && suma > 21){
                suma -= 10;
                hayAs--;
            }
            
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
        let hayAs = 0;
        for(let i = 0; i < this.mano.length; i++){
            if(this.mano[i].mostrarValor() == 11){
                hayAs++;
            }
            suma += this.mano[i].mostrarValor();
            if(hayAs > 0 && suma > 21){
                suma -= 10;
                hayAs--;
            }
            
        }
        return suma;
    }
}

class Partida{
    constructor(jugador, croupier){
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
        this.manoC.innerHTML = "";
        this.manoJ.innerHTML = "";
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

const jugador = new Jugador('Julito');
const croupier = new Croupier();
const partida = new Partida(jugador, croupier);
partida.prepararPartida();
console.log();
