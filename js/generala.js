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

class Reglas{
    constructor(){
        this.reglas = [];
    }

    agregarRegla(regla){
        this.reglas.push(regla);
    }

    getReglas(){
        return this.reglas;
    }
}