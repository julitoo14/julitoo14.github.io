class Casillero{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.mina = false;
        this.abierto = false;
    }
}

class Mina extends Casillero{
    constructor(x, y){
        super(x, y);
        this.mina = true;
        this.abierto = false;
    }
}

class Tablero{
    constructor(cantidadMinas){
        this.cantidadMinas = cantidadMinas;
        this.tablero = document.getElementById('tablero');
        this.generarTablero();
        this.generarCasilleros();
        this.generarMinas(cantidadMinas);
    }

    generarMinas(cantidadMinas){
        for(let i = 0; i < cantidadMinas; i++){
            document.getElementById('casilla' + (Math.floor(Math.random() * 25))).value() = 'mina';
        }
    }

    generarCasilleros(){
        for(let i = 0; i < 25; i++){
            let casilla = document.getElementById('casilla' + (i+1)).innerHTML = '<img class="img-casillero" src="img/casillero.png">';
        }
    }

    generarTablero(){
        for(let i = 0; i < 25; i++){
            this.tablero.innerHTML += '<div class="casilla" id="casilla'+ (i+1) + '"></div>';
        }

    }

    revelarCasilla(casilla){
        if(casilla.value() == 'mina'){
            casilla.innerHTML = '<img class="img-casillero" src="img/mina.png">';
        }else{
            casilla.innerHTML = '<img class="img-casillero" src="img/casillero.png">';
        }
    }
}

const tablero = new Tablero(4);

console.log(tablero.tablero);