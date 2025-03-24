let simulaciones = 0;
let escalerasObtenidas = 0;
let resultados = [];

function lanzarDados() {
    let dados = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    dados.sort((a, b) => a - b);

    let esEscalera = (dados[4] - dados[0] === 4) && (new Set(dados).size === 5);

    if (esEscalera) escalerasObtenidas++;
    simulaciones++;

    // Guardar resultados en la matriz
    resultados.push({ tiro: simulaciones, dados: dados.join(', '), escalera: esEscalera ? "Sí" : "No" });

    actualizarInterfaz(dados, esEscalera);
    actualizarTablaResultados();
}

function lanzarHastaEscalera() {
    let esEscalera = false;
    let i = 0;
    
    function ejecutarSimulacion() {
        if (!esEscalera) {
            let dados = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
            dados.sort((a, b) => a - b);

            esEscalera = (dados[4] - dados[0] === 4) && (new Set(dados).size === 5);

            if (esEscalera) escalerasObtenidas++;
            simulaciones++;

            // Guardar resultados en la matriz
            resultados.push({ tiro: simulaciones, dados: dados.join(', '), escalera: esEscalera ? "Sí" : "No" });

            actualizarInterfaz(dados, esEscalera);
            actualizarTablaResultados();

            i++;
            setTimeout(ejecutarSimulacion, 50); // Retrasa la siguiente simulación por 500 ms (medio segundo)
        }
    }

    ejecutarSimulacion(); // Inicia el proceso
}


function simularVariasVeces() {
    let n = parseInt(document.getElementById("numSimulaciones").value);
    if (isNaN(n) || n <= 0) {
        alert("Ingresa un número válido de simulaciones.");
        return;
    }

    let i = 0;
    function ejecutarSimulacion() {
        if (i < n) {
            lanzarDados();
            document.getElementById("progreso").innerText = `Progreso: ${i + 1} de ${n}`;
            i++;
            setTimeout(ejecutarSimulacion, 50);
        }
    }
    ejecutarSimulacion();
}

function actualizarInterfaz(dados, esEscalera) {
    let dadoImgs = document.querySelectorAll(".dado");
    dados.forEach((valor, index) => {
        dadoImgs[index].src = `img/${valor}.png`;
    });

    document.getElementById("resultado").innerText = esEscalera ? "¡Escalera!" : "No hay escalera";
    
    let probabilidad = (escalerasObtenidas / simulaciones) * 100;
    document.getElementById("probabilidad").innerText = `Probabilidad Experimental: ${probabilidad.toFixed(4)}%`;
    document.getElementById("contador").innerText = `Simulaciones: ${simulaciones}`;
    document.getElementById("contadorEscaleras").innerText = `Escaleras Obtenidas: ${escalerasObtenidas}`;
}

function actualizarTablaResultados() {
    let tabla = document.getElementById("tablaResultados").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar tabla
    resultados.forEach((resultado) => {
        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = resultado.tiro;
        fila.insertCell(1).innerText = resultado.dados;
        fila.insertCell(2).innerText = resultado.escalera;
    });
}

function recargarPagina() {
    location.reload();
}
