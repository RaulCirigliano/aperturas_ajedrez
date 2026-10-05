Objetivo Principal:
Desarrollar y mantener una aplicación web interactiva y 100% offline (Ajedrez Maestro) para estudiar, comprender y entrenar aperturas de ajedrez. Debe incluir un modo de estudio (paso a paso), un modo de práctica activa (entrenador interactivo) y un modo de tablero libre contra un motor de IA nativo.

Estado Actual (Octubre 2026):
- Repositorio y Despliegue: Inicializado con Git, subido a GitHub (`RaulCirigliano/aperturas_ajedrez`) y publicado en GitHub Pages.
- Funcionalidades: 
  - Tablero interactivo, visor de jugadas con flechas, motor de reglas, sonido sintetizado (Web Audio API) y temas visuales.
  - IA Offline integrada (`ai-engine.js`) con niveles de dificultad (600 a 2000+ ELO).
  - **Sistema de Progreso:** Guarda estadísticas de aperturas completadas en el modo Práctica (completadas/perfectas) y muestra un "✅" en el selector.
  - **Sistema de ELO:** Un ELO dinámico (comienza en 1200) que se actualiza si el jugador gana o pierde contra la IA en la continuación del tablero libre (Free Play) al terminar la apertura.
- Base de Datos de Aperturas (`openings-data.js`): Contiene aperturas clásicas más variantes añadidas (ej. "Italiana: Dos Caballos (Ataque Fegatello)").

Restricciones y Reglas:
- Autonomía 100% Frontend: Cero dependencias externas o CDNs. Todo funciona offline. Las piezas y el motor (incluyendo la IA de evaluación) están embebidos en JS.
- Sonido Sintetizado: Generado con `sound.js`.
- Arquitectura Modular: Lógica separada (`chess-engine.js`, `board-ui.js`, `ai-engine.js`, `app.js`, `openings-data.js`, `pieces.js`, `sound.js`).
- Persistencia: Uso exclusivo de `localStorage` (`chess_openings_stats` y `chess_user_elo`).

Directorio de Trabajo:
Carpeta operativa en `/home/raul/Escritorio/proyectos/aperturas_ajedrez-main`.

Próximos Pasos Posibles:
- Seguir ampliando `openings-data.js` con más variantes tácticas y planes estratégicos.
- Solucionar y depurar bloqueos del ciclo de turnos de la IA (`state.aiThinking`) en caso de que el usuario cambie de modo abruptamente.

## Sincronización de Proyectos
**Nota Importante:** Este proyecto ("aperturas_ajedrez") y su versión avanzada ("Ajedrez - Entrenador Personalizado") comparten el mismo núcleo. A partir de ahora, cualquier mejora en la interfaz de usuario, corrección de errores generales o refactorización del código base debe **aplicarse en ambos repositorios** para mantenerlos sincronizados. 
Sin embargo, las **funciones exclusivas de Inteligencia Artificial** (como el Coach Virtual o la integración con LLMs locales) pertenecen **únicamente** a la versión del "Entrenador Personalizado" y **NO** deben incluirse ni mezclarse en este repositorio, el cual debe mantenerse exclusivamente como una aplicación web frontend sin dependencias externas complejas.

### Últimas Actualizaciones (Coach Virtual y ELO)
Las funciones de "Entrenador Personalizado" (Coach Virtual vía Ollama, Modal de Estadísticas, y Tracking de ELO) ya han sido **implementadas con éxito** en el repositorio hermano (`ajedrez_entrenador-personalizado`). 
*Nota:* Se descubrió y parcheó un error temporal donde el ELO parecía perderse al cambiar de app (las variables `chess_user_elo` y `chess_coach_profile` ahora se sincronizan correctamente).
