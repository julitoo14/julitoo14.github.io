class Dado{
    constructor(lados){
        this.lados = lados;
        this.valor = 0;
    }
    
    tirar(){
        this.valor = Math.floor(Math.random() * this.lados) + 1;
    }

    getValor(){
        return this.valor;
    }
}

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.puntos = 0;
    }

    sumarPuntos(puntos){
        this.puntos += puntos;
    }

    getPuntos(){
        return this.puntos;
    }
}

class Partida {
    constructor(jugador1, jugador2){
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.dado1 = new Dado(6);
        this.dado2 = new Dado(6);
        this.dado3 = new Dado(6);
        this.dado4 = new Dado(6);
        this.dado5 = new Dado(6);
        this.jugadorActual = this.jugador1;
    }

    comenzarTurno(){
        this.dado1.tirar();
        this.dado2.tirar();
        this.dado3.tirar();
        this.dado4.tirar();
        this.dado5.tirar();
    }
}