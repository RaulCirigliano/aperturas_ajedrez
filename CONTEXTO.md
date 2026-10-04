Objetivo Principal:
Desarrollar y mantener una aplicación web interactiva y 100% offline (Ajedrez Maestro) para estudiar, comprender y entrenar aperturas de ajedrez. Debe incluir un modo de estudio (paso a paso con explicaciones y flechas tácticas) y un modo de práctica activa (entrenador interactivo contra la base de datos).

Estado Actual:
- Despliegue: Completamente funcional de forma local sirviéndolo con `python3 server.py` (puerto 8080) o abriendo el `index.html` directamente.
- Funcionalidades: Tablero interactivo (Drag & Drop), visor de jugadas con flechas y resaltados, motor de reglas de ajedrez personalizado, efectos de sonido sintetizados (Web Audio API), soporte de temas visuales para el tablero y giro de piezas (Flip).
- Base de Datos de Aperturas: Contiene 8 aperturas clásicas documentadas detalladamente (Italiana, Española, Siciliana Najdorf, Francesa, Caro-Kann, Gambito de Dama, Sistema Londres e India de Rey), junto a sus respectivas celadas y planes estratégicos.

Restricciones y Reglas:
- Autonomía 100% Frontend: No se permite el uso de dependencias externas (CDNs de librerías) para que funcione totalmente offline. Las piezas SVG y el motor están embebidos en el código JS.
- Sonido: No se utilizan archivos de audio (.mp3 o .wav), todos los sonidos (movimientos, capturas, fanfarrias) son sintetizados en tiempo real mediante `sound.js`.
- Arquitectura Modular: El código está estrictamente dividido en motor lógico (`chess-engine.js`), UI del tablero (`board-ui.js`), controlador principal (`app.js`), base de datos (`openings-data.js`), piezas (`pieces.js`) y sonido (`sound.js`).

Entregable Actual:
Carpeta operativa en `/home/raul/Escritorio/proyectos/chess-openings-trainer` con la siguiente estructura:
- `index.html` (Estructura de la aplicación)
- `styles.css` (Temas y responsividad)
- Lógica JS (`app.js`, `chess-engine.js`, `board-ui.js`)
- Recursos embebidos (`pieces.js`, `sound.js`, `openings-data.js`)
- `server.py` (Script lanzador local)

Próximo Paso:
Definir con el usuario si se desea agregar nuevas aperturas o variantes a la base de datos (`openings-data.js`), refinar el comportamiento del motor de ajedrez, o agregar un sistema de registro de progreso/estadísticas local (LocalStorage).
