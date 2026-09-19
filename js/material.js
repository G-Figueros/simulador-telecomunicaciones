/* ============================================================
   MATERIALS.JS
   Datos utilizados por el simulador RF
============================================================ */

console.log("materials.js cargado correctamente");


/* ============================================================
   TECNOLOGÍAS Y FRECUENCIAS
============================================================ */

/*
    Las frecuencias representan escenarios académicos
    definidos para el proyecto.

    Una tecnología celular real puede operar en diferentes
    bandas dependiendo del país y operador.
*/

window.tecnologias = {

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
    IMPORTANTE:

    Los siguientes coeficientes son valores académicos
    simplificados para demostrar el comportamiento del modelo.

    Unidad:
        dB por metro

    No deben considerarse valores certificados para diseño
    de infraestructura real.
*/

window.materiales = {

    concreto: {

        nombre:
            "Concreto reforzado",

        descripcion:
            "Material constructivo de alta densidad con refuerzo estructural.",

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
   UMBRAL DEL PROYECTO
============================================================ */

/*
    Umbral indicado en la guía académica.

    No representa un umbral universal para todas las
    tecnologías celulares.
*/

window.UMBRAL_PROYECTO_DBM = -95;


/* ============================================================
   VERIFICACIÓN
============================================================ */

console.log(
    "Tecnologías disponibles:",
    window.tecnologias
);

console.log(
    "Materiales disponibles:",
    window.materiales
);

console.log(
    "Umbral del proyecto:",
    window.UMBRAL_PROYECTO_DBM,
    "dBm"
);