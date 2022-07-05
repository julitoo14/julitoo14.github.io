
export class Carta{
    
    
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