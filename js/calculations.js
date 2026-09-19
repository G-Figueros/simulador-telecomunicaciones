/* ============================================================
   CALCULATIONS.JS
   Funciones matemáticas del simulador RF
============================================================ */

console.log("calculations.js cargado correctamente");


/* ============================================================
   VELOCIDAD DE LA LUZ
============================================================ */

window.VELOCIDAD_LUZ = 299792458;


/* ============================================================
   LONGITUD DE ONDA
============================================================ */

/*
    Fórmula:

        λ = c / f

    λ = longitud de onda en metros
    c = velocidad de la luz en m/s
    f = frecuencia en Hz
*/

window.calcularLongitudOnda = function (
    frecuenciaMHz
) {

    frecuenciaMHz =
        Number(frecuenciaMHz);


    if (
        !Number.isFinite(frecuenciaMHz) ||
        frecuenciaMHz <= 0
    ) {

        return 0;

    }


    const frecuenciaHz =
        frecuenciaMHz * 1000000;


    const longitudOnda =
        window.VELOCIDAD_LUZ /
        frecuenciaHz;


    return longitudOnda;

};


/* ============================================================
   FREE SPACE PATH LOSS
============================================================ */

/*
    Fórmula:

        FSPL =
        32.44
        + 20 log10(f MHz)
        + 20 log10(d km)

    Resultado:
        dB
*/

window.calcularFSPL = function (
    frecuenciaMHz,
    distanciaMetros
) {

    frecuenciaMHz =
        Number(frecuenciaMHz);


    distanciaMetros =
        Number(distanciaMetros);


    if (
        !Number.isFinite(frecuenciaMHz) ||
        !Number.isFinite(distanciaMetros) ||
        frecuenciaMHz <= 0 ||
        distanciaMetros <= 0
    ) {

        return 0;

    }


    const distanciaKm =
        distanciaMetros /
        1000;


    const fspl =

        32.44 +

        20 *
        Math.log10(
            frecuenciaMHz
        ) +

        20 *
        Math.log10(
            distanciaKm
        );


    return fspl;

};


/* ============================================================
   PÉRDIDA DEL MATERIAL
============================================================ */

/*
    Modelo simplificado:

        Lmaterial = α × t

    α = coeficiente de atenuación en dB/m
    t = grosor del material en metros
*/

window.calcularPerdidaMaterial = function (
    coeficiente,
    grosorMetros
) {

    coeficiente =
        Number(coeficiente);


    grosorMetros =
        Number(grosorMetros);


    if (
        !Number.isFinite(coeficiente) ||
        !Number.isFinite(grosorMetros) ||
        coeficiente < 0 ||
        grosorMetros < 0
    ) {

        return 0;

    }


    return (
        coeficiente *
        grosorMetros
    );

};


/* ============================================================
   PÉRDIDA TOTAL
============================================================ */

/*
    Ltotal =
        FSPL
        +
        Lmaterial
*/

window.calcularPerdidaTotal = function (
    fspl,
    perdidaMaterial
) {

    fspl =
        Number(fspl);


    perdidaMaterial =
        Number(perdidaMaterial);


    if (
        !Number.isFinite(fspl) ||
        !Number.isFinite(perdidaMaterial)
    ) {

        return 0;

    }


    return (
        fspl +
        perdidaMaterial
    );

};


/* ============================================================
   POTENCIA RECIBIDA
============================================================ */

/*
    Balance simplificado:

        Pr =
        Pt
        + Gt
        + Gr
        - Ltotal

    Pt = potencia transmitida en dBm
    Gt = ganancia de antena TX en dBi
    Gr = ganancia de antena RX en dBi
*/

window.calcularPotenciaRecibida = function (
    potenciaTx,
    gananciaTx,
    gananciaRx,
    perdidaTotal
) {

    potenciaTx =
        Number(potenciaTx);


    gananciaTx =
        Number(gananciaTx);


    gananciaRx =
        Number(gananciaRx);


    perdidaTotal =
        Number(perdidaTotal);


    if (
        !Number.isFinite(potenciaTx) ||
        !Number.isFinite(gananciaTx) ||
        !Number.isFinite(gananciaRx) ||
        !Number.isFinite(perdidaTotal)
    ) {

        return 0;

    }


    return (

        potenciaTx +

        gananciaTx +

        gananciaRx -

        perdidaTotal

    );

};


/* ============================================================
   MARGEN CONTRA EL UMBRAL
============================================================ */

/*
    Margen =
        Pr - Umbral
*/

window.calcularMargen = function (
    potenciaRecibida,
    umbral
) {

    potenciaRecibida =
        Number(potenciaRecibida);


    umbral =
        Number(umbral);


    if (
        !Number.isFinite(potenciaRecibida) ||
        !Number.isFinite(umbral)
    ) {

        return 0;

    }


    return (
        potenciaRecibida -
        umbral
    );

};


/* ============================================================
   EVALUAR SEÑAL
============================================================ */

window.evaluarSenal = function (
    potenciaRecibida,
    umbral
) {

    potenciaRecibida =
        Number(potenciaRecibida);


    umbral =
        Number(umbral);


    if (
        potenciaRecibida <
        umbral
    ) {

        return {

            estado:
                "Por debajo del umbral",

            clase:
                "status-low"
        };

    }


    return {

        estado:
            "Por encima del umbral",

        clase:
            "status-ok"
    };

};


/* ============================================================
   FORMATEAR FRECUENCIA
============================================================ */

window.formatearFrecuencia = function (
    frecuenciaMHz
) {

    frecuenciaMHz =
        Number(frecuenciaMHz);


    if (
        !Number.isFinite(frecuenciaMHz)
    ) {

        return "--";

    }


    if (
        frecuenciaMHz >= 1000
    ) {

        const frecuenciaGHz =
            frecuenciaMHz /
            1000;


        if (
            Number.isInteger(
                frecuenciaGHz
            )
        ) {

            return (
                frecuenciaGHz +
                " GHz"
            );

        }


        return (
            frecuenciaGHz
                .toFixed(1) +
            " GHz"
        );

    }


    return (
        frecuenciaMHz +
        " MHz"
    );

};


/* ============================================================
   LIMITAR VALOR
============================================================ */

window.limitarValor = function (
    valor,
    minimo,
    maximo
) {

    valor =
        Number(valor);


    minimo =
        Number(minimo);


    maximo =
        Number(maximo);


    return Math.min(

        Math.max(
            valor,
            minimo
        ),

        maximo

    );

};


/* ============================================================
   PRUEBAS AUTOMÁTICAS BÁSICAS
============================================================ */

console.log(
    "Prueba longitud de onda 1900 MHz:",
    window.calcularLongitudOnda(1900)
        .toFixed(4),
    "m"
);


console.log(
    "Prueba FSPL 1900 MHz / 20 m:",
    window.calcularFSPL(
        1900,
        20
    ).toFixed(2),
    "dB"
);