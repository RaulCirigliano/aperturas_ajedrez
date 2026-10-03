# ♟️ Ajedrez Maestro: Entrenador de Aperturas con Guía y Ejemplos

Una aplicación web interactiva, moderna y completamente autónoma (100% offline, sin dependencias externas) diseñada específicamente para **estudiar, comprender y entrenar aperturas de ajedrez**.

---

## 🚀 Cómo Iniciar la Aplicación

Tienes dos opciones muy sencillas:

### Opción 1: Servidor Local con Python (Recomendado)
Abre una terminal en la carpeta del proyecto y ejecuta:
```bash
python3 server.py
```
O con el módulo nativo de Python:
```bash
python3 -m http.server 8080
```
Luego abre tu navegador en: [http://localhost:8080](http://localhost:8080)

### Opción 2: Abrir directamente en el navegador
Puedes hacer doble clic en el archivo `index.html` o abrirlo en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).

---

## 🎯 Características Principales

### 1. 🎓 Modo Guía / Estudio Paso a Paso
- **Visualización jugada a jugada**: Navega hacia adelante y hacia atrás con los botones del tablero o las teclas de flecha (`◀` y `▶`).
- **Explicación pedagógica de cada jugada**: Descubre *por qué* se juega cada movimiento, qué casillas controla y qué debilidades evita.
- **Flechas tácticas dinámicas**: Indicadores visuales en el tablero que muestran amenazas, clavadas y líneas de presión.
- **Resaltado de casillas clave**: Muestra las casillas críticas del centro y puntos débiles como f7.
- **Planes estratégicos detallados**: Guía completa de ideas a medio y largo plazo tanto para las piezas **Blancas** como para las **Negras**.
- **Reproducción automática (Auto)**: Observa la apertura jugarse a un ritmo didáctico.

### 2. ⚔️ Modo Práctica Activa (Entrenador Interactivo)
- **Pon a prueba tu memoria**: La app te pide que encuentres la jugada teórica en el tablero.
- **Mueve las piezas**: Arrastra o haz clic para mover en el tablero interactivo.
- **Respuesta automática del rival**: Al acertar tu jugada, el oponente responde automáticamente con la línea principal.
- **Sistema de pistas**: ¿Te has bloqueado? Pulsa **Pista** para ver la pieza a mover y la idea conceptual, o **Mostrar Jugada** si te rindes.
- **Barra de progreso**: Mide tu avance y porcentaje de aciertos en la apertura.

### 3. 🛡️ Alerta de Celadas y Errores Típicos
- Cada apertura incluye una sección de advertencias tácticas (por ejemplo, la *Trampa de Légal*, la *Trampa del Arca de Noé*, o el *Ataque Griego*).

### 4. 🎨 Tablero y Piezas de Alta Calidad
- **Piezas vectoriales SVG** nítidas y escalables (estándar internacional de torneos).
- **Temas de tablero**:
  - *Emerald* (Verde clásico de competición)
  - *Madera Clásica* (Tonos cálidos de nogal)
  - *Océano Slate* (Azul moderno)
  - *Medianoche Dark* (Gris oscuro elegante)
- **Girar Tablero (Flip)**: Entrena tanto desde la perspectiva de Blancas como de Negras.
- **Efectos de sonido por sintetizador Web Audio**: Sonido de piezas de madera, capturas, jaques y fanfarria de éxito sin necesidad de descargar archivos de audio.

---

## 📚 Aperturas Incluidas en la Base de Datos

1. **Aperturas Abiertas (1.e4 e5)**:
   - **Apertura Italiana (Giuoco Piano)** (*ECO C50*): Dominio de c4, presión sobre f7 y ruptura central c3-d4. Incluye la Trampa de Légal.
   - **Apertura Española / Ruy López** (*ECO C65*): Variante Morphy y Variante Cerrada. Presión duradera sobre el centro negro e5. Incluye la Trampa del Arca de Noé.
2. **Aperturas Semi-abiertas (1.e4 ...)**:
   - **Defensa Siciliana: Variante Najdorf** (*ECO B90*): La respuesta más combativa y asimétrica con ...a6 y lucha por el centro.
   - **Defensa Francesa: Variante del Avance** (*ECO C02*): Cadena de peones y contraataque feroz a la base en d4 con ...c5 y ...Db6.
   - **Defensa Caro-Kann: Variante Clásica** (*ECO B18*): Solidez legendaria desarrollando activamente el alfil a f5.
3. **Aperturas Cerradas (1.d4 d5 & Indias)**:
   - **Gambito de Dama: Variante Clásica** (*ECO D35*): Lucha por la iniciativa y el centro. Incluye la Celada del Elefante.
   - **Sistema Londres** (*ECO D02*): Esquema piramidal universal c3-d4-e3 con alfil activo en f4.
   - **Defensa India de Rey: Variante Mar del Plata** (*ECO E97*): Hipermodernismo y avalancha de peones en el flanco de rey.

---

## 📁 Estructura del Proyecto

```
chess-openings-trainer/
├── index.html          # Interfaz de usuario principal
├── styles.css          # Estilos modernos, diseño responsivo y temas de tablero
├── pieces.js           # Definición de piezas vectoriales SVG
├── chess-engine.js     # Motor de reglas de ajedrez completo (movimientos legales, jaques, enroques)
├── sound.js            # Sintetizador de efectos de sonido con Web Audio API
├── openings-data.js    # Base de datos didáctica de aperturas, planes y celadas
├── board-ui.js         # Tablero interactivo (arrastrar y soltar, flechas, resaltados)
├── app.js              # Controlador principal de la aplicación y modos de juego
├── server.py           # Servidor local ligero en Python
└── README.md           # Documentación del proyecto
```
