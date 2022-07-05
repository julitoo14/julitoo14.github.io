import {Carta} from './Carta.js';
export class Mazo{
   
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
