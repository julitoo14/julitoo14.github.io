export class Croupier{
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