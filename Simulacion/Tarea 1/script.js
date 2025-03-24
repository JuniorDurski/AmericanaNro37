let simulaciones = 0;
let escalerasObtenidas = 0;

function lanzarDados() {
    let dados = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    dados.sort((a, b) => a - b);

    let esEscalera = (dados[4] - dados[0] === 4) && (new Set(dados).size === 5);

    if (esEscalera) escalerasObtenidas++;
    simulaciones++;

    actualizarInterfaz(dados, esEscalera);
}

function lanzarHastaEscalera() {
    let esEscalera = false;
    while (!esEscalera) {
        let dados = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
        dados.sort((a, b) => a - b);

        esEscalera = (dados[4] - dados[0] === 4) && (new Set(dados).size === 5);

        if (esEscalera) escalerasObtenidas++;
        simulaciones++;

        actualizarInterfaz(dados, esEscalera);
    }
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
}
