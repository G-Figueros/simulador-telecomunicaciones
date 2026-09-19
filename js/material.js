/* ============================================================
   TECNOLOGÍAS
============================================================ */

/*
    Frecuencias representativas utilizadas por el modelo.

    IMPORTANTE:
    Una generación celular puede utilizar diferentes bandas
    dependiendo del operador y país.

    Estas frecuencias se utilizan únicamente como escenarios
    académicos definidos por el proyecto.
*/

const tecnologias = {

    850: {
        nombre: "2G",
        frecuenciaMHz: 850,
        etiqueta: "850 MHz"
    },

    1900: {
        nombre: "3G",
        frecuenciaMHz: 1900,
        etiqueta: "1900 MHz"
    },

    2100: {
        nombre: "4G",
        frecuenciaMHz: 2100,
        etiqueta: "2100 MHz"
    },

    3500: {
        nombre: "5G Sub-6",
        frecuenciaMHz: 3500,
        etiqueta: "3.5 GHz"
    },

    28000: {
        nombre: "5G mmWave",
        frecuenciaMHz: 28000,
        etiqueta: "28 GHz"
    }

};



/* ============================================================
   MATERIALES
============================================================ */

/*
    ATENCIÓN:

    Los coeficientes utilizados a continuación son valores
    académicos ilustrativos.

    No representan valores certificados de laboratorio ni deben
    emplearse en diseño real de infraestructura.

    El propósito es demostrar matemáticamente cómo un coeficiente
    dependiente de la frecuencia modifica el balance de potencia.

    Unidad utilizada:
        dB / metro
*/

const materiales = {

    concreto: {

        nombre:
            "Concreto reforzado",

        descripcion:
            "Material de alta densidad con refuerzo estructural.",

        coeficientes: {

            850: 12,

            1900: 18,

            2100: 20,

            3500: 28,

            28000: 75

        }

    },


    ladrillo: {

        nombre:
            "Ladrillo",

        descripcion:
            "Material constructivo de densidad media.",

        coeficientes: {

            850: 6,

            1900: 9,

            2100: 10,

            3500: 15,

            28000: 42

        }

    },


    acero: {

        nombre:
            "Malla de acero / Blindaje",

        descripcion:
            "Representación conceptual de una barrera metálica.",

        coeficientes: {

            850: 25,

            1900: 35,

            2100: 38,

            3500: 50,

            28000: 95

        }

    }

};



/* ============================================================
   UMBRAL
============================================================ */

/*
    Umbral definido en la guía del proyecto.

    Este valor NO representa un umbral universal para
    todas las redes celulares.
*/

const UMBRAL_PROYECTO_DBM = -95;