# Simulador de Atenuación RF

Proyecto académico desarrollado para el curso de Telecomunicaciones.

## Tema

Control conceptual de señales no autorizadas en centros penitenciarios mediante análisis de propagación y atenuación pasiva.

## Objetivo

Demostrar de forma interactiva cómo diferentes variables físicas afectan la potencia recibida de una señal de radiofrecuencia.

El simulador permite modificar:

- Tecnología celular.
- Frecuencia.
- Distancia.
- Material de la barrera.
- Grosor de la barrera.
- Potencia transmitida.
- Ganancia de la antena transmisora.
- Ganancia de la antena receptora.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Canvas API

No requiere:

- Backend
- Base de datos
- Node.js
- Frameworks
- Librerías externas

## Estructura del proyecto

```text
telecom-signal-simulator/
│
├── index.html
├── README.md
├── .nojekyll
│
├── css/
│   └── styles.css
│
├── js/
│   ├── materials.js
│   ├── calculations.js
│   └── app.js
│
└── assets/
    └── images/