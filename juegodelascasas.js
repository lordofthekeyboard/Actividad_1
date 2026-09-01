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



// Aca declaramos las popsiciones de las casas iniciales
let baseEquipo_1 = 1;
let baseEquipo_2 = 100;

//Generar determinadamente las casas
function generarCasasConSemilla(semilla, cantidadCasas) {
    let casas = [];
    let num = semilla;

    while (casas.length < cantidadCasas) {
        num = (num * 9301 + 49297) % 233280;
        let casilla = Math.floor((num / 233280) * 100) + 1;

        let esBase = (casilla === baseEquipo_1 || casilla === baseEquipo_2);
        if (!esBase && !casas.includes(casilla)) {
            casas.push(casilla);
        }
    }
    return casas;
}

//Conversor a coordenadas de la matriz
function obtenerCoordenadas(casilla) {
    let indice = casilla - 1;
    let fila = Math.floor(indice / 10);
    let columna = indice % 10;
    return { fila, columna };
}

//Ejecución
let casasParaConquistar = generarCasasConSemilla(42, 5);

casasParaConquistar.forEach(casilla => {
    let { fila, columna } = obtenerCoordenadas(casilla);
    console.log(`Fila: ${fila}, Columna: ${columna}`);
});