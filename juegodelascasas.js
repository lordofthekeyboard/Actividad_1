// Creación del tablero de 10x10
let tablero = [];
let contador = 1;

for (let f = 0; f < 10; f++) {
    let filaActual = [];
    for (let c = 0; c < 10; c++) {
        filaActual.push(contador);
        contador++;
    }
    tablero.push(filaActual);

}
console.table(tablero);



// Aca declaramos las popsiciones de las casas iniciales
let baseEquipo_1 = 1;
let baseEquipo_2 = 100;

//Generador de las 5 casas
function obtenerCasasAleatorias() {
    let casas = new Set();
    
    while (casas.size < 5) {
        let numero = Math.floor(Math.random() * 100) + 1;
        casas.add(numero);
    }
    
    return Array.from(casas);
}

// Ejemplo de uso:
const casasEnTablero = obtenerCasasAleatorias();

// 3. Insertar las casas en la matriz tablero
casasEnTablero.forEach(numero => {
    let fila = Math.floor((numero - 1) / 10);
    let columna = (numero - 1) % 10;
    
    tablero[fila][columna] = "CASA";
});

console.table(tablero);

let fila = 0
let columna = 0
 function mover(movimiento, dado) {
    if (movimiento === "arriba") {
        fila = (fila - dado + 10) % 10;
    } else if (movimiento === "abajo") {
        fila = (fila + dado) % 10;
    } else if (movimiento === "izquierda") {
        columna = (columna - dado + 10) % 10;
    } else if (movimiento === "derecha") {
        columna = (columna + dado) % 10;
    }
    return [fila, columna];
}
