/* ============================================================
   APP.JS
   Lógica principal del simulador RF
============================================================ */

console.log("app.js encontrado");

/*
    Se espera a que TODO el HTML esté cargado antes
    de buscar botones, sliders, selects, etc.
*/
document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM cargado - iniciando simulador");


    /* ========================================================
       ELEMENTOS DEL FORMULARIO
    ======================================================== */

    const tecnologiaSelect =
        document.getElementById("tecnologia");

    const distanciaInput =
        document.getElementById("distancia");

    const materialSelect =
        document.getElementById("material");

    const grosorInput =
        document.getElementById("grosor");

    const potenciaTxInput =
        document.getElementById("potenciaTx");

    const gananciaTxInput =
        document.getElementById("gananciaTx");

    const gananciaRxInput =
        document.getElementById("gananciaRx");

    const resetButton =
        document.getElementById("resetButton");


    /* ========================================================
       VALORES DE LOS SLIDERS
    ======================================================== */

    const distanciaValor =
        document.getElementById("distanciaValor");

    const grosorValor =
        document.getElementById("grosorValor");


    /* ========================================================
       REPRESENTACIÓN VISUAL
    ======================================================== */

    const txPowerVisual =
        document.getElementById("txPowerVisual");

    const rxPowerVisual =
        document.getElementById("rxPowerVisual");

    const wall =
        document.getElementById("wall");

    const wallLabel =
        document.getElementById("wallLabel");

    const wallThicknessLabel =
        document.getElementById("wallThicknessLabel");

    const signalAfter =
        document.getElementById("signalAfter");


    /* ========================================================
       INFORMACIÓN DEL ESCENARIO
    ======================================================== */

    const scenarioDistance =
        document.getElementById("scenarioDistance");

    const scenarioFrequency =
        document.getElementById("scenarioFrequency");

    const scenarioMaterial =
        document.getElementById("scenarioMaterial");


    /* ========================================================
       RESULTADOS
    ======================================================== */

    const resultadoFrecuencia =
        document.getElementById("resultadoFrecuencia");

    const resultadoLambda =
        document.getElementById("resultadoLambda");

    const resultadoFSPL =
        document.getElementById("resultadoFSPL");

    const resultadoCoeficiente =
        document.getElementById("resultadoCoeficiente");

    const resultadoMaterial =
        document.getElementById("resultadoMaterial");

    const resultadoTotal =
        document.getElementById("resultadoTotal");

    const resultadoPotencia =
        document.getElementById("resultadoPotencia");

    const resultadoMargen =
        document.getElementById("resultadoMargen");

    const resultadoEstado =
        document.getElementById("resultadoEstado");

    const statusBox =
        document.getElementById("statusBox");


    /* ========================================================
       TABLA Y GRÁFICA
    ======================================================== */

    const materialsTableBody =
        document.getElementById("materialsTableBody");

    const comparisonChart =
        document.getElementById("comparisonChart");


    /* ========================================================
       VALIDAR ARCHIVOS JS
    ======================================================== */

    if (!window.materiales) {

        console.error(
            "ERROR: window.materiales no existe. Revisa materials.js"
        );

        return;
    }


    if (!window.calcularFSPL) {

        console.error(
            "ERROR: calcularFSPL no existe. Revisa calculations.js"
        );

        return;
    }


    console.log(
        "Materiales cargados:",
        window.materiales
    );


    /* ========================================================
       VALIDAR ELEMENTOS HTML
    ======================================================== */

    const elementosObligatorios = {

        tecnologiaSelect,
        distanciaInput,
        materialSelect,
        grosorInput,
        potenciaTxInput,
        gananciaTxInput,
        gananciaRxInput,
        resetButton,

        distanciaValor,
        grosorValor,

        resultadoFrecuencia,
        resultadoLambda,
        resultadoFSPL,
        resultadoCoeficiente,
        resultadoMaterial,
        resultadoTotal,
        resultadoPotencia,
        resultadoMargen,
        resultadoEstado,

        statusBox

    };


    let errorHTML = false;


    for (
        const [nombre, elemento]
        of Object.entries(elementosObligatorios)
    ) {

        if (!elemento) {

            console.error(
                `ERROR: No se encontró el elemento HTML: ${nombre}`
            );

            errorHTML = true;
        }

    }


    if (errorHTML) {

        console.error(
            "El simulador se detuvo porque faltan elementos en index.html"
        );

        return;
    }


    /* ========================================================
       OBTENER PARÁMETROS
    ======================================================== */

    function obtenerParametros() {

        return {

            frecuencia:
                Number(tecnologiaSelect.value),

            distancia:
                Number(distanciaInput.value),

            material:
                materialSelect.value,

            grosor:
                Number(grosorInput.value),

            potenciaTx:
                Number(potenciaTxInput.value),

            gananciaTx:
                Number(gananciaTxInput.value),

            gananciaRx:
                Number(gananciaRxInput.value)

        };

    }


    /* ========================================================
       CALCULAR ESCENARIO
    ======================================================== */

    function calcularEscenario(
        frecuencia,
        distancia,
        materialId,
        grosor,
        potenciaTx,
        gananciaTx,
        gananciaRx
    ) {

        const material =
            window.materiales[materialId];


        if (!material) {

            console.error(
                "Material no encontrado:",
                materialId
            );

            return null;
        }


        const coeficiente =
            material.coeficientes[frecuencia];


        if (
            coeficiente === undefined
        ) {

            console.error(
                `No existe coeficiente para ${frecuencia} MHz`
            );

            return null;
        }


        const lambda =
            window.calcularLongitudOnda(
                frecuencia
            );


        const fspl =
            window.calcularFSPL(
                frecuencia,
                distancia
            );


        const perdidaMaterial =
            window.calcularPerdidaMaterial(
                coeficiente,
                grosor
            );


        const perdidaTotal =
            window.calcularPerdidaTotal(
                fspl,
                perdidaMaterial
            );


        const potenciaRecibida =
            window.calcularPotenciaRecibida(
                potenciaTx,
                gananciaTx,
                gananciaRx,
                perdidaTotal
            );


        const margen =
            window.calcularMargen(
                potenciaRecibida,
                window.UMBRAL_PROYECTO_DBM
            );


        const evaluacion =
            window.evaluarSenal(
                potenciaRecibida,
                window.UMBRAL_PROYECTO_DBM
            );


        return {

            material,
            coeficiente,
            lambda,
            fspl,
            perdidaMaterial,
            perdidaTotal,
            potenciaRecibida,
            margen,
            evaluacion

        };

    }


    /* ========================================================
       ACTUALIZAR SIMULACIÓN
    ======================================================== */

    function actualizarSimulacion() {

        console.log(
            "Actualizando simulación..."
        );


        const parametros =
            obtenerParametros();


        console.log(
            "Parámetros:",
            parametros
        );


        const resultado =
            calcularEscenario(

                parametros.frecuencia,
                parametros.distancia,
                parametros.material,
                parametros.grosor,
                parametros.potenciaTx,
                parametros.gananciaTx,
                parametros.gananciaRx

            );


        if (!resultado) {

            console.error(
                "No fue posible calcular el escenario"
            );

            return;
        }


        /* ------------------------------------
           Sliders
        ------------------------------------ */

        distanciaValor.textContent =
            parametros.distancia;


        grosorValor.textContent =
            parametros.grosor.toFixed(2);


        /* ------------------------------------
           Resultados
        ------------------------------------ */

        resultadoFrecuencia.textContent =
            window.formatearFrecuencia(
                parametros.frecuencia
            );


        resultadoLambda.textContent =
            resultado.lambda.toFixed(4) +
            " m";


        resultadoFSPL.textContent =
            resultado.fspl.toFixed(2) +
            " dB";


        resultadoCoeficiente.textContent =
            resultado.coeficiente.toFixed(2) +
            " dB/m";


        resultadoMaterial.textContent =
            resultado.perdidaMaterial.toFixed(2) +
            " dB";


        resultadoTotal.textContent =
            resultado.perdidaTotal.toFixed(2) +
            " dB";


        resultadoPotencia.textContent =
            resultado.potenciaRecibida.toFixed(2) +
            " dBm";


        resultadoMargen.textContent =
            resultado.margen.toFixed(2) +
            " dB";


        resultadoEstado.textContent =
            resultado.evaluacion.estado;


        /* ------------------------------------
           Estado
        ------------------------------------ */

        statusBox.classList.remove(
            "status-ok",
            "status-low"
        );


        statusBox.classList.add(
            resultado.evaluacion.clase
        );


        /* ------------------------------------
           Escenario visual
        ------------------------------------ */

        if (txPowerVisual) {

            txPowerVisual.textContent =
                parametros.potenciaTx.toFixed(1) +
                " dBm";

        }


        if (rxPowerVisual) {

            rxPowerVisual.textContent =
                resultado.potenciaRecibida.toFixed(1) +
                " dBm";

        }


        if (scenarioDistance) {

            scenarioDistance.textContent =
                parametros.distancia +
                " m";

        }


        if (scenarioFrequency) {

            scenarioFrequency.textContent =
                window.formatearFrecuencia(
                    parametros.frecuencia
                );

        }


        if (scenarioMaterial) {

            scenarioMaterial.textContent =
                resultado.material.nombre;

        }


        if (wallLabel) {

            wallLabel.textContent =
                resultado.material.nombre;

        }


        if (wallThicknessLabel) {

            wallThicknessLabel.textContent =
                parametros.grosor.toFixed(2) +
                " m";

        }


        /* ------------------------------------
           Grosor visual del muro
        ------------------------------------ */

        if (wall) {

            const anchoMuro =
                25 +
                (
                    parametros.grosor / 2
                ) *
                65;


            wall.style.width =
                anchoMuro +
                "px";

        }


        /* ------------------------------------
           Opacidad de señal
        ------------------------------------ */

        if (signalAfter) {

            const intensidad =
                window.limitarValor(

                    (
                        resultado.potenciaRecibida +
                        120
                    ) / 60,

                    0.08,

                    1

                );


            signalAfter.style.opacity =
                intensidad;

        }


        /* ------------------------------------
           Gráfica
        ------------------------------------ */

        dibujarGrafica(
            parametros
        );


        console.log(
            "Resultado:",
            resultado
        );

    }


    /* ========================================================
       TABLA DE MATERIALES
    ======================================================== */

    function crearTablaMateriales() {

        if (!materialsTableBody) {

            console.warn(
                "No existe materialsTableBody"
            );

            return;
        }


        materialsTableBody.innerHTML =
            "";


        Object.values(
            window.materiales
        ).forEach(

            function (material) {

                const fila =
                    document.createElement(
                        "tr"
                    );


                fila.innerHTML = `

                    <td>
                        ${material.nombre}
                    </td>

                    <td>
                        ${material.coeficientes[850]} dB/m
                    </td>

                    <td>
                        ${material.coeficientes[1900]} dB/m
                    </td>

                    <td>
                        ${material.coeficientes[2100]} dB/m
                    </td>

                    <td>
                        ${material.coeficientes[3500]} dB/m
                    </td>

                    <td>
                        ${material.coeficientes[28000]} dB/m
                    </td>

                `;


                materialsTableBody
                    .appendChild(
                        fila
                    );

            }

        );

    }


    /* ========================================================
       GRÁFICA
    ======================================================== */

    function dibujarGrafica(
        parametros
    ) {

        if (!comparisonChart) {

            return;
        }


        const ctx =
            comparisonChart.getContext(
                "2d"
            );


        if (!ctx) {

            return;
        }


        const frecuencias = [

            850,
            1900,
            2100,
            3500,
            28000

        ];


        const etiquetas = [

            "850 MHz",
            "1.9 GHz",
            "2.1 GHz",
            "3.5 GHz",
            "28 GHz"

        ];


        const valores =
            frecuencias.map(

                function (frecuencia) {

                    const resultado =
                        calcularEscenario(

                            frecuencia,

                            parametros.distancia,

                            parametros.material,

                            parametros.grosor,

                            parametros.potenciaTx,

                            parametros.gananciaTx,

                            parametros.gananciaRx

                        );


                    return resultado
                        .potenciaRecibida;

                }

            );


        /*
            Ajustar canvas.
        */

        const rect =
            comparisonChart
                .getBoundingClientRect();


        const width =
            Math.max(
                rect.width,
                500
            );


        const height =
            Math.max(
                rect.height,
                300
            );


        const dpr =
            window.devicePixelRatio ||
            1;


        comparisonChart.width =
            width * dpr;


        comparisonChart.height =
            height * dpr;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* ------------------------------------
           Márgenes
        ------------------------------------ */

        const padding = {

            left: 65,
            right: 30,
            top: 30,
            bottom: 55

        };


        const chartWidth =
            width -
            padding.left -
            padding.right;


        const chartHeight =
            height -
            padding.top -
            padding.bottom;


        /* ------------------------------------
           Escala
        ------------------------------------ */

        const todosValores = [

            ...valores,

            window.UMBRAL_PROYECTO_DBM

        ];


        let minY =
            Math.floor(
                (
                    Math.min(...todosValores) -
                    10
                ) / 10
            ) * 10;


        let maxY =
            Math.ceil(
                (
                    Math.max(...todosValores) +
                    10
                ) / 10
            ) * 10;


        if (minY === maxY) {

            maxY =
                minY + 10;

        }


        function convertirY(valor) {

            return (

                padding.top +

                (
                    (
                        maxY -
                        valor
                    ) /
                    (
                        maxY -
                        minY
                    )
                ) *

                chartHeight

            );

        }


        /* ------------------------------------
           Fondo
        ------------------------------------ */

        ctx.fillStyle =
            "#ffffff";


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* ------------------------------------
           Grid
        ------------------------------------ */

        const divisiones =
            5;


        for (
            let i = 0;
            i <= divisiones;
            i++
        ) {

            const valor =
                maxY -
                (
                    (
                        maxY -
                        minY
                    ) /
                    divisiones
                ) *
                i;


            const y =
                convertirY(
                    valor
                );


            ctx.strokeStyle =
                "#e2e8f0";


            ctx.lineWidth =
                1;


            ctx.beginPath();


            ctx.moveTo(
                padding.left,
                y
            );


            ctx.lineTo(
                width -
                padding.right,
                y
            );


            ctx.stroke();


            ctx.fillStyle =
                "#64748b";


            ctx.font =
                "12px Arial";


            ctx.textAlign =
                "right";


            ctx.textBaseline =
                "middle";


            ctx.fillText(

                valor.toFixed(0) +
                " dBm",

                padding.left -
                10,

                y

            );

        }


        /* ------------------------------------
           Línea del umbral
        ------------------------------------ */

        const yUmbral =
            convertirY(
                window.UMBRAL_PROYECTO_DBM
            );


        ctx.strokeStyle =
            "#b91c1c";


        ctx.lineWidth =
            2;


        ctx.setLineDash(
            [7, 6]
        );


        ctx.beginPath();


        ctx.moveTo(
            padding.left,
            yUmbral
        );


        ctx.lineTo(
            width -
            padding.right,
            yUmbral
        );


        ctx.stroke();


        ctx.setLineDash(
            []
        );


        ctx.fillStyle =
            "#b91c1c";


        ctx.font =
            "12px Arial";


        ctx.textAlign =
            "left";


        ctx.fillText(

            "Umbral -95 dBm",

            padding.left + 5,

            yUmbral - 10

        );


        /* ------------------------------------
           Puntos
        ------------------------------------ */

        const espacioX =
            chartWidth /
            (
                frecuencias.length -
                1
            );


        const puntos =
            valores.map(

                function (
                    valor,
                    index
                ) {

                    return {

                        x:
                            padding.left +
                            espacioX *
                            index,

                        y:
                            convertirY(
                                valor
                            ),

                        valor

                    };

                }

            );


        /* ------------------------------------
           Línea
        ------------------------------------ */

        ctx.strokeStyle =
            "#2563eb";


        ctx.lineWidth =
            3;


        ctx.beginPath();


        puntos.forEach(

            function (
                punto,
                index
            ) {

                if (index === 0) {

                    ctx.moveTo(
                        punto.x,
                        punto.y
                    );

                }
                else {

                    ctx.lineTo(
                        punto.x,
                        punto.y
                    );

                }

            }

        );


        ctx.stroke();


        /* ------------------------------------
           Dibujar puntos
        ------------------------------------ */

        puntos.forEach(

            function (
                punto,
                index
            ) {

                ctx.beginPath();


                ctx.arc(
                    punto.x,
                    punto.y,
                    5,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    "#1d4ed8";


                ctx.fill();


                ctx.fillStyle =
                    "#0f172a";


                ctx.font =
                    "11px Arial";


                ctx.textAlign =
                    "center";


                ctx.fillText(

                    punto.valor
                        .toFixed(1),

                    punto.x,

                    punto.y -
                    14

                );


                ctx.fillStyle =
                    "#64748b";


                ctx.fillText(

                    etiquetas[index],

                    punto.x,

                    height -
                    22

                );

            }

        );

    }


    /* ========================================================
       RESTABLECER PARÁMETROS
    ======================================================== */

    function restablecerParametros() {

        console.log(
            "Restableciendo parámetros"
        );


        tecnologiaSelect.value =
            "1900";

        distanciaInput.value =
            "20";

        materialSelect.value =
            "concreto";

        grosorInput.value =
            "0.30";

        potenciaTxInput.value =
            "20";

        gananciaTxInput.value =
            "0";

        gananciaRxInput.value =
            "0";


        actualizarSimulacion();

    }


    /* ========================================================
       EVENTOS
    ======================================================== */

    tecnologiaSelect.addEventListener(
        "change",
        actualizarSimulacion
    );


    distanciaInput.addEventListener(
        "input",
        actualizarSimulacion
    );


    materialSelect.addEventListener(
        "change",
        actualizarSimulacion
    );


    grosorInput.addEventListener(
        "input",
        actualizarSimulacion
    );


    potenciaTxInput.addEventListener(
        "input",
        actualizarSimulacion
    );


    gananciaTxInput.addEventListener(
        "input",
        actualizarSimulacion
    );


    gananciaRxInput.addEventListener(
        "input",
        actualizarSimulacion
    );


    resetButton.addEventListener(
        "click",
        restablecerParametros
    );


    /* ========================================================
       INICIAR
    ======================================================== */

    crearTablaMateriales();

    actualizarSimulacion();


    console.log(
        "SIMULADOR INICIADO CORRECTAMENTE"
    );

});