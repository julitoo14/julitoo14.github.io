export class Jugador{
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
