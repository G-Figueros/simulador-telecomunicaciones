/* ============================================================
   CONSTANTES
============================================================ */

const VELOCIDAD_LUZ =
    299792458;


/* ============================================================
   LONGITUD DE ONDA
============================================================ */

/*
    Fórmula:

        λ = c / f

    λ = longitud de onda en metros
    c = velocidad de la luz
    f = frecuencia en Hz
*/

function calcularLongitudOnda(
    frecuenciaMHz
) {

    if (
        frecuenciaMHz <= 0
    ) {
        return 0;
    }


    const frecuenciaHz =
        frecuenciaMHz * 1_000_000;


    return (
        VELOCIDAD_LUZ /
        frecuenciaHz
    );

}



/* ============================================================
   FREE SPACE PATH LOSS
============================================================ */

/*
    FSPL =

    32.44
    + 20 log10(f MHz)
    + 20 log10(d km)

    Resultado:
        dB
*/

function calcularFSPL(
    frecuenciaMHz,
    distanciaMetros
) {

    if (
        frecuenciaMHz <= 0 ||
        distanciaMetros <= 0
    ) {
        return 0;
    }


    const distanciaKm =
        distanciaMetros / 1000;


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

}



/* ============================================================
   ATENUACIÓN DEL MATERIAL
============================================================ */

/*
    Modelo simplificado:

        Lmaterial = α × t

    α = coeficiente en dB/m
    t = grosor en metros
*/

function calcularPerdidaMaterial(
    coeficiente,
    grosorMetros
) {

    if (
        coeficiente < 0 ||
        grosorMetros < 0
    ) {
        return 0;
    }


    return (
        coeficiente *
        grosorMetros
    );

}



/* ============================================================
   PÉRDIDA TOTAL
============================================================ */

function calcularPerdidaTotal(
    fspl,
    perdidaMaterial
) {

    return (
        fspl +
        perdidaMaterial
    );

}



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

    Pt = potencia transmitida dBm
    Gt = ganancia TX dBi
    Gr = ganancia RX dBi
*/

function calcularPotenciaRecibida(
    potenciaTx,
    gananciaTx,
    gananciaRx,
    perdidaTotal
) {

    return (

        potenciaTx +

        gananciaTx +

        gananciaRx -

        perdidaTotal

    );

}



/* ============================================================
   MARGEN CONTRA EL UMBRAL
============================================================ */

function calcularMargen(
    potenciaRecibida,
    umbral
) {

    return (
        potenciaRecibida -
        umbral
    );

}



/* ============================================================
   ESTADO
============================================================ */

function evaluarSenal(
    potenciaRecibida,
    umbral
) {

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

}



/* ============================================================
   FORMATO DE FRECUENCIA
============================================================ */

function formatearFrecuencia(
    frecuenciaMHz
) {

    if (
        frecuenciaMHz >= 1000
    ) {

        const ghz =
            frecuenciaMHz /
            1000;


        return (
            ghz.toFixed(
                ghz % 1 === 0
                    ? 0
                    : 1
            ) +
            " GHz"
        );

    }


    return (
        frecuenciaMHz +
        " MHz"
    );

}



/* ============================================================
   LIMITAR VALORES
============================================================ */

function limitarValor(
    valor,
    minimo,
    maximo
) {

    return Math.min(
        Math.max(
            valor,
            minimo
        ),
        maximo
    );

}