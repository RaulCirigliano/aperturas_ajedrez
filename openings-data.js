/**
 * Base de datos completa de aperturas de ajedrez en español.
 * Contiene líneas teóricas principales, explicaciones jugada a jugada,
 * conceptos estratégicos, flechas tácticas, planes típicos y celadas/errores comunes.
 */

const OPENINGS_DATA = [
  {
    id: "italiana-giuoco-piano",
    category: "Abiertas (1.e4 e5)",
    name: "Italiana: Giuoco Piano (Línea Principal) (blancas)",
    eco: "C50",
    side: "w", // w = blancas, b = negras
    difficulty: "Principiante - Intermedio",
    style: "Estratégico / Táctico Clásico",
    ratingRange: "800 - 2200",
    summary: "Una de las aperturas más instructivas y practicadas del ajedrez. Las blancas desarrollan rápidamente el alfil a c4 apuntando a la casilla más vulnerable de las negras (f7) y preparan la ruptura central con c3 y d4.",
    plansWhite: [
      "Presión sobre f7 con el alfil de casillas claras en c4.",
      "Preparar el avance central c3 seguido de d4 para ganar espacio y dominar el centro.",
      "Enroque corto rápido y conectar las torres.",
      "Controlar las casillas centrales d4 y e5."
    ],
    plansBlack: [
      "Contrarrestar el alfil blanco con ...Ac5 o presionar el peón e4 con ...Cf6.",
      "Mantener la solidez central con ...d6 o contragolpear con ...d5 cuando sea favorable.",
      "Enrocar rápido y buscar contrajuego en el flanco de dama con ...a6 y ...b5."
    ],
    keySquares: ["f7", "c4", "d4", "e4", "e5"],
    moves: [
      {
        san: "e4",
        from: "e2",
        to: "e4",
        name: "Peón de Rey",
        comment: "Ocupa el centro, controla casillas vitales (d5 y f5) y abre paso para la dama blanca y el alfil de casillas claras.",
        highlightSquares: ["e4", "d5", "f5"],
        arrows: [{ from: "e2", to: "e4", color: "#38bdf8" }]
      },
      {
        san: "e5",
        from: "e7",
        to: "e5",
        name: "Respuesta clásica de Peón de Rey",
        comment: "Las negras igualan el espacio central frenando el avance blanco a e5 y controlando las casillas d4 y f4.",
        highlightSquares: ["e5", "d4", "f4"],
        arrows: [{ from: "e7", to: "e5", color: "#38bdf8" }]
      },
      {
        san: "Nf3",
        from: "g1",
        to: "f3",
        name: "Desarrollo del Caballo de Rey",
        comment: "Desarrolla una pieza menor con ganancia de tiempo al amenazar directamente el peón de e5 y controlar la casilla d4.",
        highlightSquares: ["e5", "d4"],
        arrows: [{ from: "f3", to: "e5", color: "#ef4444" }]
      },
      {
        san: "Nc6",
        from: "b8",
        to: "c6",
        name: "Defensa con el Caballo de Dama",
        comment: "Desarrollo natural que defiende sólidamente el peón atacado de e5 y controla la casilla central d4.",
        highlightSquares: ["e5", "d4"],
        arrows: [{ from: "c6", to: "e5", color: "#22c55e" }]
      },
      {
        san: "Bc4",
        from: "f1",
        to: "c4",
        name: "El Alfil Italiano",
        comment: "¡La jugada definitoria! El alfil apunta a f7, el punto más débil de las negras porque solo está defendido por el rey.",
        highlightSquares: ["f7", "c4"],
        arrows: [{ from: "c4", to: "f7", color: "#f97316" }]
      },
      {
        san: "Bc5",
        from: "f8",
        to: "c5",
        name: "Giuoco Piano (Juego Tranquilo)",
        comment: "El alfil negro se activa simétricamente, dominando la casilla d4 y evitando que las blancas jueguen d4 sin preparación.",
        highlightSquares: ["d4", "f2"],
        arrows: [{ from: "c5", to: "d4", color: "#38bdf8" }]
      },
      {
        san: "c3",
        from: "c2",
        to: "c3",
        name: "Preparación de la ruptura central",
        comment: "Jugada estratégica clave. Prepara el empuje d2-d4 con el apoyo del peón c3 para construir un formidable centro de peones.",
        highlightSquares: ["d4"],
        arrows: [{ from: "c3", to: "d4", color: "#eab308" }]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Contraataque sobre e4",
        comment: "Las negras continúan su desarrollo armónico atacando el peón indefenso de e4 y preparando el enroque corto.",
        highlightSquares: ["e4"],
        arrows: [{ from: "f6", to: "e4", color: "#ef4444" }]
      },
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Golpe en el centro",
        comment: "¡Las blancas ejecutan su plan! Rompen el centro atacando al alfil negro de c5 y buscando el dominio absoluto de las casillas centrales.",
        highlightSquares: ["d4", "c5"],
        arrows: [{ from: "d4", to: "c5", color: "#ef4444" }]
      },
      {
        san: "exd4",
        from: "e5",
        to: "d4",
        name: "Captura en el centro",
        comment: "Las negras no pueden sostener la tensión y capturan el peón antes de que el alfil sea tomado.",
        highlightSquares: ["d4"]
      },
      {
        san: "cxd4",
        from: "c3",
        to: "d4",
        name: "Recaptura y consolidación central",
        comment: "Las blancas recuperan el peón logrando el ideal clásico: un dúo de peones centrales en e4 y d4 controlando c5, d5, e5 y f5.",
        highlightSquares: ["e4", "d4"]
      },
      {
        san: "Bb4+",
        from: "c5",
        to: "b4",
        name: "Jaque intermedio obligatorio",
        comment: "¡Jugada crítica! Las negras dan jaque para no perder un tiempo y buscar la simplificación antes de que el centro blanco avance.",
        highlightSquares: ["e1", "b4"],
        arrows: [{ from: "c5", to: "b4", color: "#f97316" }]
      },
      {
        san: "Bd2",
        from: "c1",
        to: "d2",
        name: "7. Ad2 - Cubriendo el jaque sólidamente",
        comment: "¡Línea principal clásica! Las blancas interponen su alfil en d2 para neutralizar el jaque y proponer el cambio. (Nota: 7.Cc3 tapando con el caballo también es teórica y plantea el agresivo Ataque Möller/Greco).",
        acceptedAlternatives: [
          {
            san: "Nc3",
            from: "b1",
            to: "c3",
            name: "7. Cc3 - El Ataque Möller / Gambito Greco",
            comment: "¡Excelente variante teórica! Tapar con el caballo en c3 plantea el audaz Ataque Möller: entrega temporalmente el peón de e4 a cambio de un feroz ataque tras 7...Cxe4 8.O-O Axc3 9.d5!."
          },
          {
            san: "Nbd2",
            from: "b1",
            to: "d2",
            name: "7. Cbd2 - Bloqueo alternativo de caballo",
            comment: "Una continuación sólida y segura que cubre el jaque con el caballo de dama manteniendo ambos caballos en el tablero."
          }
        ],
        highlightSquares: ["d2", "b4"],
        arrows: [{ from: "c1", to: "d2", color: "#22c55e" }]
      },
      {
        san: "Bxd2+",
        from: "b4",
        to: "d2",
        name: "Cambio de alfiles",
        comment: "Las negras cambian su alfil activo antes de que sea expulsado.",
        highlightSquares: ["d2"]
      },
      {
        san: "Nbxd2",
        from: "b1",
        to: "d2",
        name: "Recaptura con el Caballo de Dama",
        comment: "El caballo de b1 retoma en d2 completando el desarrollo y protegiendo sólidamente el peón de e4.",
        highlightSquares: ["d2", "e4"],
        arrows: [{ from: "b1", to: "d2", color: "#22c55e" }]
      },
      {
        san: "d5",
        from: "d7",
        to: "d5",
        name: "Contragolpe central negro",
        comment: "¡La jugada temática de las negras! Luchan por el centro antes de que las blancas afiancen su dúo central.",
        highlightSquares: ["d5", "e4"],
        arrows: [{ from: "d7", to: "d5", color: "#38bdf8" }]
      }
    ],
    traps: [
      {
        title: "La Trampa de Légal (Mate en 8 jugadas)",
        desc: "Si las negras clavan el caballo con ...Ag4 y se descuidan, las blancas sacrifican la dama con Cxe5!, permitiendo Axd1?? y rematando con Axf7+ Re7 y Cd5#.",
        moves: "1.e4 e5 2.Cf3 d6 3.Ac4 Ag4 4.Cc3 h6 5.Cxe5! Axd1 6.Axf7+ Re7 7.Cd5#"
      }
    ]
  },

  {
    id: "italiana-dos-caballos-fegatello",
    category: "Abiertas (1.e4 e5)",
    name: "Italiana: Dos Caballos (Ataque Fegatello) (blancas)",
    eco: "C57",
    side: "w",
    difficulty: "Intermedio",
    style: "Táctico / Ataque Agresivo",
    ratingRange: "800 - 2000",
    summary: "En la Defensa de los Dos Caballos, las negras ignoran la amenaza sobre f7 y desarrollan su caballo a f6. Las blancas responden con el ultra-agresivo Ataque Fegatello (Cg5), forzando una crisis táctica temprana.",
    plansWhite: [
      "Atacar el punto débil f7 combinando el Alfil de c4 y el Caballo de g5.",
      "Sacrificar el caballo en f7 (Cxf7) si las negras recapturan erróneamente en d5 con el caballo.",
      "Lanzar un ataque devastador sobre el rey negro expuesto en el centro."
    ],
    plansBlack: [
      "Bloquear la diagonal del alfil con ...d5.",
      "NO recapturar en d5 con el caballo (lo cual permite el Fegatello), sino jugar ...Ca5 (Variante Polerio).",
      "Buscar contrajuego activo en el flanco de dama y aprovechar el retraso en el desarrollo blanco."
    ],
    keySquares: ["f7", "g5", "d5", "c4"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Apertura clásica.", highlightSquares: ["e4"] },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta de Peón de Rey", comment: "Control central negro.", highlightSquares: ["e5"] },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo del Caballo", comment: "Ataca e5.", highlightSquares: ["e5"] },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa con Caballo", comment: "Defiende e5.", highlightSquares: ["e5"] },
      { san: "Bc4", from: "f1", to: "c4", name: "El Alfil Italiano", comment: "Apunta a f7.", highlightSquares: ["f7", "c4"] },
      { san: "Nf6", from: "g8", to: "f6", name: "Defensa de los Dos Caballos", comment: "En lugar de ...Ac5, las negras contraatacan e4, permitiendo Cg5.", highlightSquares: ["e4"] },
      { san: "Ng5", from: "f3", to: "g5", name: "Ataque Fegatello", comment: "¡Las blancas se lanzan al cuello! Amenazan de inmediato Cxf7 o Axf7+, ganando material.", highlightSquares: ["f7"] },
      { san: "d5", from: "d7", to: "d5", name: "Bloqueo central", comment: "La única defensa válida para las negras: interceptar la diagonal del alfil.", highlightSquares: ["d5", "c4"] },
      { san: "exd5", from: "e4", to: "d5", name: "Captura blanca", comment: "Las blancas toman el peón, renovando la presión.", highlightSquares: ["d5"] },
      { san: "Nxd5", from: "f6", to: "d5", name: "El error fatal (Recaptura)", comment: "¡Un error natural pero letal! Las negras debieron jugar ...Ca5 para atacar al alfil. Ahora las blancas pueden ejecutar el Fegatello.", highlightSquares: ["d5"] },
      { san: "Nxf7", from: "g5", to: "f7", name: "¡Sacrificio Fegatello!", comment: "¡Boom! Las blancas sacrifican el caballo para extraer al rey negro al centro del tablero y hacerle un ataque doble a Dama y Torre.", highlightSquares: ["d8", "h8"] },
      { san: "Kxf7", from: "e8", to: "f7", name: "El Rey sale de paseo", comment: "Forzado, si no se pierde calidad o la dama.", highlightSquares: ["f7"] },
      { san: "Qf3+", from: "d1", to: "f3", name: "Doble ataque de Dama", comment: "Jaque al rey y ataque simultáneo al caballo de d5 que está clavado.", highlightSquares: ["f7", "d5"] },
      { san: "Ke6", from: "f7", to: "e6", name: "Defensa desesperada", comment: "El rey negro debe avanzar heroicamente al centro para defender su caballo en d5. La posición es muy peligrosa para las negras.", highlightSquares: ["e6", "d5"] },
      { san: "Nc3", from: "b1", to: "c3", name: "Aumentando la presión", comment: "Las blancas traen otra pieza para atacar al caballo clavado en d5. Las negras están bajo una presión inmensa.", highlightSquares: ["d5"] }
    ],
    traps: [
      {
        title: "Evitar el Fegatello: Variante Polerio",
        desc: "Tras 8.exd5, las negras NUNCA deben recapturar con 8...Cxd5. Lo correcto es 8...Ca5! sacrificando un peón a cambio de gran actividad (9.Ab5+ c6 10.dxc6 bxc6).",
        moves: "1.e4 e5 2.Cf3 Cc6 3.Ac4 Cf6 4.Cg5 d5 5.exd5 Ca5!"
      }
    ]
  },

  {
    id: "apertura-espanola-ruy-lopez",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Española (Ruy López) (blancas)",
    eco: "C65",
    side: "w",
    difficulty: "Intermedio - Avanzado",
    style: "Posicional Profundo",
    ratingRange: "1000 - 2800",
    summary: "Conocida como la 'Reina de las Aperturas'. Jugada en todos los campeonatos del mundo durante más de un siglo. Las blancas no atacan directamente f7, sino que presionan el caballo en c6 que defiende el peón central e5.",
    plansWhite: [
      "Presión indirecta sobre el peón central negro en e5.",
      "Retirar el alfil a b3 tras ...a6 y ...b5 para mantener la presión sobre la diagonal a2-g1.",
      "La clásica maniobra de caballo: Cb1-d2-f1-g3 o e3 para apuntar al flanco de rey negro.",
      "Construir el centro con c3 y d4."
    ],
    plansBlack: [
      "Expulsar al alfil con la jugada de Morphy (...a6) y expandirse con ...b5.",
      "Consolidar el peón central con ...d6 o jugar activamente con la Defensa Abierta.",
      "Fianchettar el alfil de dama en b7 o situarlo en e7 para un sólido enroque."
    ],
    keySquares: ["c6", "e5", "d4", "f5"],
    moves: [
      {
        san: "e4",
        from: "e2",
        to: "e4",
        name: "Peón de Rey",
        comment: "Apertura abierta de máxima ambición por el control central.",
        highlightSquares: ["e4", "d5"]
      },
      {
        san: "e5",
        from: "e7",
        to: "e5",
        name: "Respuesta clásica",
        comment: "Respuesta de máxima solidez y lucha por el centro.",
        highlightSquares: ["e5", "d4"]
      },
      {
        san: "Nf3",
        from: "g1",
        to: "f3",
        name: "Ataque a e5",
        comment: "Desarrollo del caballo presionando el peón central.",
        highlightSquares: ["e5"]
      },
      {
        san: "Nc6",
        from: "b8",
        to: "c6",
        name: "Defensa de e5",
        comment: "El caballo defiende el punto clave e5.",
        highlightSquares: ["e5"]
      },
      {
        san: "Bb5",
        from: "f1",
        to: "b5",
        name: "La Ruy López (Alfil Español)",
        comment: "¡La jugada maestra! Presiona al defensor de e5. No amenaza ganar el peón de inmediato, pero ejerce una presión duradera a largo plazo.",
        highlightSquares: ["c6", "e5"],
        arrows: [{ from: "b5", to: "c6", color: "#f97316" }]
      },
      {
        san: "a6",
        from: "a7",
        to: "a6",
        name: "Defensa Morphy",
        comment: "La respuesta principal y más jugada. Pregunta inmediatamente las intenciones del alfil blanco.",
        highlightSquares: ["b5"],
        arrows: [{ from: "a6", to: "b5", color: "#38bdf8" }]
      },
      {
        san: "Ba4",
        from: "b5",
        to: "a4",
        name: "Retirada preservando la tensión",
        comment: "Las blancas prefieren no cambiar en c6 (que sería la Variante del Cambio) y guardan su valioso alfil de casillas claras.",
        highlightSquares: ["a4"]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Desarrollo y presión sobre e4",
        comment: "Las negras desarrollan su caballo atacando e4 y preparando el enroque corto.",
        highlightSquares: ["e4"],
        arrows: [{ from: "f6", to: "e4", color: "#ef4444" }]
      },
      {
        san: "O-O",
        from: "e1",
        to: "g1",
        name: "Enroque corto blanco",
        comment: "Prioridad número uno: la seguridad del rey. Si las negras toman 5...Cxe4, las blancas recuperan el material con 6.d4 o 6.Te1 con excelente juego.",
        highlightSquares: ["g1", "f1"]
      },
      {
        san: "Be7",
        from: "f8",
        to: "e7",
        name: "Variante Cerrada",
        comment: "Desarrollo modesto pero muy flexible. Rompe la clavada potencial en la columna e y prepara el enroque negro.",
        highlightSquares: ["e7"]
      },
      {
        san: "Re1",
        from: "f1",
        to: "e1",
        name: "Protección de e4 y presión en la columna e",
        comment: "La torre defiende sólidamente e4 y ahora sí se renueva la amenaza real de tomar Axc6 seguido de Cxe5.",
        highlightSquares: ["e4", "e5"],
        arrows: [{ from: "e1", to: "e4", color: "#22c55e" }]
      },
      {
        san: "b5",
        from: "b7",
        to: "b5",
        name: "Expansión en el flanco de dama",
        comment: "Elimina definitivamente la amenaza sobre el caballo c6 y gana espacio en el flanco de dama.",
        highlightSquares: ["a4"],
        arrows: [{ from: "b5", to: "a4", color: "#38bdf8" }]
      },
      {
        san: "Bb3",
        from: "a4",
        to: "b3",
        name: "Reubicación en la gran diagonal",
        comment: "El alfil se ubica en su mejor casilla, presionando la diagonal a2-g8 hacia el futuro rey negro enrocado.",
        highlightSquares: ["b3", "f7"]
      }
    ],
    traps: [
      {
        title: "La Trampa del Arca de Noé",
        desc: "Si las blancas descuidan la seguridad del alfil en b3, las negras juegan ...d6, ...Ca5, ...c5, ...c4 atrapando por completo el alfil sin escape.",
        moves: "1.e4 e5 2.Cf3 Cc6 3.Ab5 a6 4.Aa4 d6 5.d4 b5 6.Ab3 Cxd4 7.Cxd4 exd4 8.Dxd4? c5 9.Dd5 Ae6 10.Dc6+ Ad7 11.Dd5 c4! (Alfil atrapado)"
      }
    ]
  },

  {
    id: "defensa-siciliana-najdorf",
    category: "Semi-abiertas (1.e4 c5)",
    name: "Defensa Siciliana: Variante Najdorf (negras)",
    eco: "B90",
    side: "b",
    difficulty: "Avanzado",
    style: "Agresivo / Contragolpe Asimétrico",
    ratingRange: "1200 - 2850",
    summary: "El arma predilecta de leyendas como Bobby Fischer y Garry Kasparov. Las negras responden 1...c5 para evitar la simetría y luchar por la iniciativa creando un fuerte desequilibrio dinámico.",
    plansWhite: [
      "Enrocar largo y lanzar un asalto con peones en el flanco de rey (g4-h4).",
      "Controlar la casilla d5, que a menudo queda debilitada si las negras juegan ...e5.",
      "Ataques de piezas con Ae3, f3, Dd2 (Ataque Inglés)."
    ],
    plansBlack: [
      "Aprovechar la columna semiabierta 'c' para la torre negra.",
      "Controlar las casillas centrales e5 y d5.",
      "Lanzar un contraataque fulminante en el flanco de dama con ...b5, ...b4 y ...Ab7.",
      "La sutil jugada ...a6 controla b5 impidiendo saltos de caballos o alfiles blancos."
    ],
    keySquares: ["c5", "d5", "e5", "c2"],
    moves: [
      {
        san: "e4",
        from: "e2",
        to: "e4",
        name: "Apertura de Peón de Rey",
        comment: "Las blancas reclaman el centro.",
        highlightSquares: ["e4"]
      },
      {
        san: "c5",
        from: "c7",
        to: "c5",
        name: "La Defensa Siciliana",
        comment: "¡Asimetría pura! Las negras luchan por la casilla d4 desde el flanco sin permitir a las blancas un centro fácil.",
        highlightSquares: ["c5", "d4"],
        arrows: [{ from: "c5", to: "d4", color: "#f97316" }]
      },
      {
        san: "Nf3",
        from: "g1",
        to: "f3",
        name: "Preparación de la Siciliana Abierta",
        comment: "El caballo prepara la ruptura d2-d4 para abrir el juego.",
        highlightSquares: ["d4"]
      },
      {
        san: "d6",
        from: "d7",
        to: "d6",
        name: "Control de e5 y preparación de desarrollo",
        comment: "Controla la casilla e5 para que el caballo blanco no pueda avanzar y prepara la salida del caballo negro a f6.",
        highlightSquares: ["e5"]
      },
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Ruptura central blanca",
        comment: "Las blancas abren líneas para sus piezas menores a cambio de ceder un peón central por uno lateral.",
        highlightSquares: ["d4", "c5"]
      },
      {
        san: "cxd4",
        from: "c5",
        to: "d4",
        name: "Cambio favorable de peones",
        comment: "Las negras obtienen mayoría de peones en el centro (2 peones centrales d y e contra 1 peón blanco en e4) y la columna c semiabierta.",
        highlightSquares: ["c1", "c8"]
      },
      {
        san: "Nxd4",
        from: "f3",
        to: "d4",
        name: "Recaptura central",
        comment: "El caballo blanco se ubica de forma dominante en el centro del tablero.",
        highlightSquares: ["d4"]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Presión sobre e4",
        comment: "Desarrollo activo que fuerza a las blancas a defender su peón e4.",
        highlightSquares: ["e4"],
        arrows: [{ from: "f6", to: "e4", color: "#ef4444" }]
      },
      {
        san: "Nc3",
        from: "b1",
        to: "c3",
        name: "Defensa de e4",
        comment: "Desarrollo natural que protege el peón.",
        highlightSquares: ["e4"]
      },
      {
        san: "a6",
        from: "a7",
        to: "a6",
        name: "¡La jugada Najdorf!",
        comment: "Una de las jugadas más profundas del ajedrez. Controla la casilla b5, impidiendo Cb5 o Ab5+, y prepara la futura expansión ...b5 de las negras.",
        highlightSquares: ["b5"],
        arrows: [{ from: "a6", to: "b5", color: "#22c55e" }]
      }
    ],
    traps: [
      {
        title: "Celada de la Dama Atrapada / Ataque Falso",
        desc: "En la Siciliana, si las blancas descuidan la diagonal c3-a5, las negras suelen golpear con ...Da5+ ganando piezas desprotegidas en e4 o c3.",
        moves: "Común en variantes tempranas con Da5+ recuperando peones con ventaja."
      }
    ]
  },

  {
    id: "defensa-francesa-avance",
    category: "Semi-abiertas (1.e4 e6)",
    name: "Defensa Francesa: Variante del Avance (negras)",
    eco: "C02",
    side: "b",
    difficulty: "Intermedio",
    style: "Estratégico / Cadena de Peones",
    ratingRange: "900 - 2400",
    summary: "Una defensa sólida como una roca. Las negras permiten que las blancas formen una cadena de peones en e5 y d4, para luego atacar ferozmente la base de la cadena en d4 con ...c5, ...Cc6 y ...Db6.",
    plansWhite: [
      "Mantener la punta de la cadena en e5 para limitar el espacio negro.",
      "Sostener la base en d4 a toda costa con c3, Cf3 y Ae3.",
      "Atacar el flanco de rey negro aprovechando la ventaja de espacio."
    ],
    plansBlack: [
      "Bombardear el peón d4 con ...c5, ...Cc6, ...Db6 y ...Cge7-f5.",
      "Romper la punta con ...f6 en el momento oportuno.",
      "Resolver el problema histórico del 'alfil malo' de casillas de dama (c8)."
    ],
    keySquares: ["d4", "e5", "c5", "f6"],
    moves: [
      {
        san: "e4",
        from: "e2",
        to: "e4",
        name: "Peón de Rey",
        comment: "Ocupación central clásica.",
        highlightSquares: ["e4"]
      },
      {
        san: "e6",
        from: "e7",
        to: "e6",
        name: "La Francesa",
        comment: "Prepara la inmediata contestación central ...d5 con el respaldo seguro del peón e6.",
        highlightSquares: ["d5"],
        arrows: [{ from: "e6", to: "d5", color: "#38bdf8" }]
      },
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Las blancas reclaman el centro",
        comment: "Establecen el dúo de peones soñado e4-d4.",
        highlightSquares: ["d4", "e4"]
      },
      {
        san: "d5",
        from: "d7",
        to: "d5",
        name: "Contraataque al peón blanco",
        comment: "Cuestiona de inmediato el peón de e4.",
        highlightSquares: ["e4"],
        arrows: [{ from: "d5", to: "e4", color: "#ef4444" }]
      },
      {
        san: "e5",
        from: "e4",
        to: "e5",
        name: "La Variante del Avance",
        comment: "Gana espacio en el flanco de rey y despoja al caballo negro de su casilla natural f6. La posición se cierra.",
        highlightSquares: ["e5", "f6"]
      },
      {
        san: "c5",
        from: "c7",
        to: "c5",
        name: "Golpe a la base",
        comment: "¡La regla dorada contra las cadenas de peones! Las negras atacan inmediatamente la base blanca en d4.",
        highlightSquares: ["d4"],
        arrows: [{ from: "c5", to: "d4", color: "#ef4444" }]
      },
      {
        san: "c3",
        from: "c2",
        to: "c3",
        name: "Apoyo a la base",
        comment: "Las blancas refuerzan d4 con otro peón para mantener su cadena intacta si las negras capturan.",
        highlightSquares: ["d4"]
      },
      {
        san: "Nc6",
        from: "b8",
        to: "c6",
        name: "Segundo atacante sobre d4",
        comment: "El caballo negro aumenta la presión sobre el peón d4.",
        highlightSquares: ["d4"],
        arrows: [{ from: "c6", to: "d4", color: "#ef4444" }]
      },
      {
        san: "Nf3",
        from: "g1",
        to: "f3",
        name: "Segundo defensor de d4",
        comment: "Desarrollo armónico defendiendo el punto neurálgico.",
        highlightSquares: ["d4"]
      },
      {
        san: "Qb6",
        from: "d8",
        to: "b6",
        name: "Tercer atacante y presión sobre b2",
        comment: "¡Jugada teórica estelar! La dama se suma al ataque sobre d4 y amenaza de paso el peón débil de b2 si el alfil blanco se mueve.",
        highlightSquares: ["d4", "b2"],
        arrows: [{ from: "b6", to: "d4", color: "#ef4444" }, { from: "b6", to: "b2", color: "#f59e0b" }]
      }
    ],
    traps: [
      {
        title: "La Celada de Milner-Barry",
        desc: "Las blancas entregan el peón d4 con Ad3! cxd4 cxd4 Cxd4?? Cxd4 Dxd4?? Ab5+! ganando la dama negra por el alfil.",
        moves: "1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Cc6 5.Cf3 Db6 6.Ad3 cxd4 7.cxd4 Ad7 8.O-O Cxd4 9.Cxd4 Dxd4 10.Cc3 Dxe5 11.Te1 Db8 12.Cxd5 con ataque feroz."
      }
    ]
  },

  {
    id: "gambito-de-dama-declinado",
    category: "Cerradas (1.d4 d5)",
    name: "Gambito de Dama: Variante Clásica (blancas)",
    eco: "D35",
    side: "w",
    difficulty: "Intermedio",
    style: "Posicional Clásico",
    ratingRange: "900 - 2700",
    summary: "El cimiento de la teoría de aperturas cerradas. Las blancas ofrecen el peón 'c' para desviar el peón negro central de d5 y conseguir la ocupación total del centro.",
    plansWhite: [
      "Ataque de minorías en el flanco de dama (a3, b4, b5) para crear peones débiles en las negras.",
      "Controlar la columna semiabierta 'c' con la torre.",
      "Clavar el caballo negro en f6 con Ag5.",
      "Instalar un caballo fuerte en e5."
    ],
    plansBlack: [
      "Mantener el control del centro con ...e6 y ...c6.",
      "Aliviar la presión cambiando piezas menores (Variante Capablanca con ...Cd5).",
      "Lograr la ruptura liberadora ...c5 o ...e5."
    ],
    keySquares: ["d4", "c4", "e4", "c6"],
    moves: [
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Peón de Dama",
        comment: "Ocupa el centro y cuenta con la protección natural de la dama blanca.",
        highlightSquares: ["d4", "e5"]
      },
      {
        san: "d5",
        from: "d7",
        to: "d5",
        name: "Respuesta de Peón de Dama",
        comment: "Respuesta simétrica y sólida que lucha por el control central.",
        highlightSquares: ["d5", "e4"]
      },
      {
        san: "c4",
        from: "c2",
        to: "c4",
        name: "¡El Gambito de Dama!",
        comment: "No es un verdadero gambito porque si las negras toman (...dxc4), las blancas recuperan el peón fácilmente con e3 o Da4+.",
        highlightSquares: ["d5", "c4"],
        arrows: [{ from: "c4", to: "d5", color: "#f97316" }]
      },
      {
        san: "e6",
        from: "e7",
        to: "e6",
        name: "Gambito Declinado",
        comment: "Las negras rehúsan el peón para sostener firmemente su punto de apoyo central d5.",
        highlightSquares: ["d5"]
      },
      {
        san: "Nc3",
        from: "b1",
        to: "c3",
        name: "Presión sobre d5",
        comment: "Desarrollo del caballo que aumenta la presión sobre d5 y prepara el avance e4.",
        highlightSquares: ["d5", "e4"]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Defensa de d5",
        comment: "Desarrollo de caballo defendiendo d5 y preparando el enroque corto.",
        highlightSquares: ["d5"]
      },
      {
        san: "Bg5",
        from: "c1",
        to: "g5",
        name: "Clavada activa",
        comment: "Clava al defensor del peón central d5 contra la dama negra de d8.",
        highlightSquares: ["f6", "d8"],
        arrows: [{ from: "g5", to: "d8", color: "#ef4444" }]
      },
      {
        san: "Be7",
        from: "f8",
        to: "e7",
        name: "Desclavada y desarrollo",
        comment: "Rompe la clavada, protege al rey y deja listo el enroque para la siguiente jugada.",
        highlightSquares: ["e7"]
      },
      {
        san: "e3",
        from: "e1",
        to: "e3",
        name: "Consolidación y apertura para el alfil f1",
        comment: "Refuerza d4 y prepara la salida del alfil para retomar en c4 si las negras capturan.",
        highlightSquares: ["d4"]
      },
      {
        san: "O-O",
        from: "e8",
        to: "g8",
        name: "Enroque negro",
        comment: "El rey negro queda completamente a salvo en el flanco de rey.",
        highlightSquares: ["g8"]
      }
    ],
    traps: [
      {
        title: "La Celada del Elefante",
        desc: "Si las blancas intentan ganar un peón con 6.cxd5 exd5 7.Cxd5? Cxd5! 8.Axd8 Ab4+! 9.Dd2 Axd2+ 10.Rxd2 Rxd8 y las negras quedan con pieza limpia de ventaja.",
        moves: "1.d4 d5 2.c4 e6 3.Cc3 Cf6 4.Ag5 Cbd7 5.cxd5 exd5 6.Cxd5? Cxd5! 7.Axd8 Ab4+ 8.Dd2 Axd2+ 9.Rxd2 Rxd8 (-+ ventaja decisiva negra)"
      }
    ]
  },

  {
    id: "sistema-londres",
    category: "Cerradas (1.d4 d5)",
    name: "Sistema Londres (blancas)",
    eco: "D02",
    side: "w",
    difficulty: "Principiante - Avanzado",
    style: "Sólido / Esquema Universal",
    ratingRange: "700 - 2750",
    summary: "El sistema moderno más popular del ajedrez. Muy fácil de aprender porque las blancas juegan prácticamente el mismo esquema piramidal contra cualquier respuesta negra, asegurando una posición sólida sin memorizar variantes forzadas.",
    plansWhite: [
      "Desarrollar el alfil a f4 ANTES de cerrar la cadena con e3 (la gran ventaja sobre la Francesa o Eslava).",
      "Construir la pirámide de peones: c3, d4, e3.",
      "Instalar un caballo dominante en e5 con apoyo de f4 si es necesario.",
      "Maniobra de alfil Af4-g3 para resguardarlo ante ataques con ...Ch5 o ...Ad6."
    ],
    plansBlack: [
      "Contestar rápidamente con ...c5 para presionar la base en d4.",
      "Jugar ...Db6 atacando el peón desprotegido de b2 (tras la salida del alfil a f4).",
      "Cambiar el fuerte alfil de f4 con ...Ad6 o perseguirlo con ...Ch5."
    ],
    keySquares: ["f4", "e5", "d4", "c3", "b2"],
    moves: [
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Peón de Dama",
        comment: "Ocupa el centro con protección sólida.",
        highlightSquares: ["d4"]
      },
      {
        san: "d5",
        from: "d7",
        to: "d5",
        name: "Respuesta central",
        comment: "Respuesta clásica buscando control de casillas centrales.",
        highlightSquares: ["d5"]
      },
      {
        san: "Bf4",
        from: "c1",
        to: "f4",
        name: "El Alfil de Londres",
        comment: "¡La marca registrada del Londres! El alfil sale fuera de la cadena de peones antes de que jueguen e3.",
        highlightSquares: ["f4"],
        arrows: [{ from: "c1", to: "f4", color: "#22c55e" }]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Desarrollo natural",
        comment: "Controla e4 y prepara el desarrollo del flanco de rey.",
        highlightSquares: ["e4"]
      },
      {
        san: "e3",
        from: "e2",
        to: "e3",
        name: "El cerrojo central",
        comment: "Sostiene d4 y abre la diagonal para el alfil de f1.",
        highlightSquares: ["d4"]
      },
      {
        san: "c5",
        from: "c7",
        to: "c5",
        name: "La reacción correcta contra el Londres",
        comment: "Las negras atacan de inmediato el centro blanco antes de que esté blindado.",
        highlightSquares: ["d4"],
        arrows: [{ from: "c5", to: "d4", color: "#ef4444" }]
      },
      {
        san: "c3",
        from: "c2",
        to: "c3",
        name: "Completando la pirámide",
        comment: "La clásica estructura de peones c3-d4-e3: extremadamente sólida contra cualquier ataque frontal.",
        highlightSquares: ["c3", "d4", "e3"]
      },
      {
        san: "Nc6",
        from: "b8",
        to: "c6",
        name: "Presión creciente",
        comment: "Desarrollo del caballo presionando d4 y e5.",
        highlightSquares: ["d4", "e5"]
      },
      {
        san: "Nd2",
        from: "b1",
        to: "d2",
        name: "Flexibilidad táctica",
        comment: "El caballo va a d2 en lugar de c3 para no bloquear al peón c3 y poder apoyar un salto a e5 o f3.",
        highlightSquares: ["e4", "e5"]
      },
      {
        san: "e6",
        from: "e7",
        to: "e6",
        name: "Sostén central y salida de alfil",
        comment: "Las negras preparan ...Ad6 para cuestionar el alfil de Londres.",
        highlightSquares: ["d6"]
      }
    ],
    traps: [
      {
        title: "Ataque griego con Ce5 y Dh5",
        desc: "Si las negras enrocan y cambian descuidadamente en f4 permitiendo exf4, las blancas lanzan un ataque directo al mate con Ad3, Cgf3, Ce5 y Dh5.",
        moves: "Esquema típico de mate en h7 cuando las negras descuidan la defensa de su flanco de rey."
      }
    ]
  },

  {
    id: "defensa-caro-kann-clasica",
    category: "Semi-abiertas (1.e4 c6)",
    name: "Defensa Caro-Kann: Variante Clásica (negras)",
    eco: "B18",
    side: "b",
    difficulty: "Principiante - Avanzado",
    style: "Ultra Sólido / Posicional",
    ratingRange: "800 - 2800",
    summary: "El escudo favorito de campeones mundiales como Anatoly Karpov. Similar en objetivos a la Defensa Francesa pero con una ventaja crucial: el peón se coloca en c6 en lugar de e6, lo que permite al alfil de casillas claras salir activamente a f5.",
    plansWhite: [
      "Aprovechar la ventaja de espacio con Cc3 y Cxe4.",
      "Perseguir el alfil negro de f5 con Cg3, h4 y h5 para encerrarlo o debilitar el enroque negro.",
      "Mantener la iniciativa y buscar un ataque en el flanco de rey."
    ],
    plansBlack: [
      "Desarrollar el alfil a f5 antes de cerrar el centro con ...e6.",
      "Lograr una estructura de peones inquebrantable sin debilidades.",
      "Llegar a un final superior donde la estructura negra suele ser más compacta."
    ],
    keySquares: ["d5", "e4", "f5", "g6"],
    moves: [
      {
        san: "e4",
        from: "e2",
        to: "e4",
        name: "Peón de Rey",
        comment: "Apertura abierta.",
        highlightSquares: ["e4"]
      },
      {
        san: "c6",
        from: "c7",
        to: "c6",
        name: "La Caro-Kann",
        comment: "Prepara la ruptura central ...d5 sin encerrar la diagonal c8-h3 del alfil de casillas claras.",
        highlightSquares: ["d5"],
        arrows: [{ from: "c6", to: "d5", color: "#38bdf8" }]
      },
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Dominio central blanco",
        comment: "Las blancas ocupan el centro libremente.",
        highlightSquares: ["d4", "e4"]
      },
      {
        san: "d5",
        from: "d7",
        to: "d5",
        name: "Golpe al peón de e4",
        comment: "Las negras desafían inmediatamente el peón de rey blanco.",
        highlightSquares: ["e4"],
        arrows: [{ from: "d5", to: "e4", color: "#ef4444" }]
      },
      {
        san: "Nc3",
        from: "b1",
        to: "c3",
        name: "Defensa con pieza",
        comment: "La línea principal clásica. Mantiene la tensión central.",
        highlightSquares: ["e4"]
      },
      {
        san: "dxe4",
        from: "d5",
        to: "e4",
        name: "Apertura de la posición",
        comment: "Las negras capturan para activar sus piezas menores.",
        highlightSquares: ["e4"]
      },
      {
        san: "Nxe4",
        from: "c3",
        to: "e4",
        name: "Recaptura central",
        comment: "El caballo blanco se coloca en el centro.",
        highlightSquares: ["e4"]
      },
      {
        san: "Bf5",
        from: "c8",
        to: "f5",
        name: "¡La clave de la Caro-Kann!",
        comment: "¡El alfil sale triunfante antes de cerrar la cadena con ...e6! Ataca al caballo blanco en e4.",
        highlightSquares: ["f5", "e4"],
        arrows: [{ from: "f5", to: "e4", color: "#22c55e" }]
      },
      {
        san: "Ng3",
        from: "e4",
        to: "g3",
        name: "Retirada con ganancia de tiempo",
        comment: "El caballo se retira atacando al alfil negro.",
        highlightSquares: ["f5"],
        arrows: [{ from: "g3", to: "f5", color: "#ef4444" }]
      },
      {
        san: "Bg6",
        from: "f5",
        to: "g6",
        name: "Retirada segura",
        comment: "El alfil se resguarda en g6 dominando la diagonal h7-b1.",
        highlightSquares: ["g6"]
      }
    ],
    traps: [
      {
        title: "La Trampa del Peón Fantasma en e6",
        desc: "Si las negras juegan pasivamente ...Cd7 sin cuidar la seguridad de su rey, las blancas pueden jugar De2 seguido de Cd6# dando mate asfixiado.",
        moves: "1.e4 c6 2.d4 d5 3.Cc3 dxe4 4.Cxe4 Cd7 5.De2 Cgf6?? 6.Cd6# (Mate del Pastor asfixiado)"
      }
    ]
  },

  {
    id: "defensa-india-de-rey",
    category: "Indias (1.d4 Cf6)",
    name: "Defensa India de Rey: Variante Mar del Plata (negras)",
    eco: "E97",
    side: "b",
    difficulty: "Avanzado",
    style: "Hiperagresivo / Avalancha Táctica",
    ratingRange: "1300 - 2850",
    summary: "La defensa más emocionante y apasionante contra 1.d4. Las negras ceden voluntariamente el centro al principio, fianchettan su alfil en g7 y luego lanzan un ataque kamikaze contra el rey blanco con ...f5 y ...g5.",
    plansWhite: [
      "Avanzar d5 para cerrar el centro.",
      "Lanzar una avalancha de peones en el flanco de dama con c5 y b4 para coronar o crear debilidades.",
      "Abrir la columna c para sus torres."
    ],
    plansBlack: [
      "Cerrar el centro y lanzar TODAS las piezas contra el rey blanco.",
      "Romper con ...e5 seguido de ...f5, ...f4 y ...g5.",
      "Llevar caballos y dama al ataque para buscar el jaque mate directo."
    ],
    keySquares: ["g7", "e5", "f5", "d5", "c5"],
    moves: [
      {
        san: "d4",
        from: "d2",
        to: "d4",
        name: "Peón de Dama",
        comment: "Control de d4 y e5.",
        highlightSquares: ["d4"]
      },
      {
        san: "Nf6",
        from: "g8",
        to: "f6",
        name: "Defensa India",
        comment: "Control hipermoderno del centro impidiendo el avance inmediato 2.e4.",
        highlightSquares: ["e4"]
      },
      {
        san: "c4",
        from: "c2",
        to: "c4",
        name: "Ganancia de espacio",
        comment: "Prepara Cc3 sin bloquear el peón de dama.",
        highlightSquares: ["c4"]
      },
      {
        san: "g6",
        from: "g7",
        to: "g6",
        name: "Preparando el Fianchetto",
        comment: "Prepara la salida del alfil a la gran diagonal h8-a1.",
        highlightSquares: ["g7"]
      },
      {
        san: "Nc3",
        from: "b1",
        to: "c3",
        name: "Apoyo a e4",
        comment: "Las blancas reclaman el centro completo.",
        highlightSquares: ["e4"]
      },
      {
        san: "Bg7",
        from: "f8",
        to: "g7",
        name: "El Alfil Dragón de Rey",
        comment: "El corazón de la defensa: un alfil temible que domina toda la diagonal.",
        highlightSquares: ["g7", "a1"],
        arrows: [{ from: "g7", to: "a1", color: "#f97316" }]
      },
      {
        san: "e4",
        from: "e1",
        to: "e4",
        name: "Centro ideal blanco",
        comment: "Las blancas consiguen su objetivo inicial: peones en c4, d4 y e4.",
        highlightSquares: ["c4", "d4", "e4"]
      },
      {
        san: "d6",
        from: "d7",
        to: "d6",
        name: "Freno y preparación",
        comment: "Frena el avance e5 de las blancas y prepara la ruptura negra ...e5.",
        highlightSquares: ["e5"]
      },
      {
        san: "Nf3",
        from: "g1",
        to: "f3",
        name: "Desarrollo del caballo de rey",
        comment: "Control de casillas centrales y preparación del enroque.",
        highlightSquares: ["e5"]
      },
      {
        san: "O-O",
        from: "e8",
        to: "g8",
        name: "Enroque negro",
        comment: "El rey negro queda asegurado tras su muro de peones y su fiel alfil.",
        highlightSquares: ["g8"]
      }
    ],
    traps: [
      {
        title: "El Ataque de Cuatro Peones y la Ruptura Central",
        desc: "Si las blancas intentan ahogar a las negras con peones (f4, e4, d4, c4), las negras contragolpean con ...c5! dinamitando el centro inflado blanco.",
        moves: "1.d4 Cf6 2.c4 g6 3.Cc3 Ag7 4.e4 d6 5.f4 O-O 6.Cf3 c5! 7.d5 e6 con excelente juego negro."
      }
    ]
  }

  ,
  {
    id: "defensa-siciliana-dragon",
    category: "Semi-abiertas (1.e4 c5)",
    name: "Defensa Siciliana: Variante Dragón (negras)",
    eco: "B70",
    side: "b",
    difficulty: "Avanzado",
    style: "Táctico / Ataque en Flancos Opuestos",
    ratingRange: "1400 - 2800",
    summary: "Una de las variantes más agudas del ajedrez. Las negras fianchettan su alfil en g7 (cuya estructura de peones recuerda a la constelación del Dragón) para controlar la gran diagonal y contraatacar en el flanco de dama.",
    plansWhite: [
      "El Ataque Yugoslavo: f3, Ae3, Dd2, O-O-O.",
      "Lanzar una tormenta de peones con h4 y h5 para abrir la columna 'h'.",
      "Cambiar el fuerte alfil de g7 con Ah6."
    ],
    plansBlack: [
      "Aprovechar la columna semiabierta 'c' para atacar el rey blanco enrocado largo.",
      "Fuerte presión en la diagonal h8-a1 con el alfil Dragón.",
      "Sacrificio de calidad temático ...Txc3 para destruir el enroque blanco."
    ],
    keySquares: ["g7", "c5", "d4", "c3"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupa el centro." },
      { san: "c5", from: "c7", to: "c5", name: "La Siciliana", comment: "Lucha asimétrica por d4." },
      { san: "Nf3", from: "g1", to: "f3", name: "Preparación", comment: "Prepara d4." },
      { san: "d6", from: "d7", to: "d6", name: "Control central", comment: "Controla e5 y prepara el desarrollo." },
      { san: "d4", from: "d2", to: "d4", name: "Ruptura blanca", comment: "Las blancas abren el centro." },
      { san: "cxd4", from: "c5", to: "d4", name: "Cambio de peones", comment: "Las negras abren la columna c." },
      { san: "Nxd4", from: "f3", to: "d4", name: "Caballo centralizado", comment: "Dominio central blanco." },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo", comment: "Ataca e4." },
      { san: "Nc3", from: "b1", to: "c3", name: "Defensa de e4", comment: "Sostiene el peón central." },
      { san: "g6", from: "g7", to: "g6", name: "El Dragón", comment: "¡La jugada que define la variante! Prepara el fianchetto en g7 para que el alfil domine la gran diagonal.", highlightSquares: ["g7"], arrows: [{from:"f8", to:"g7", color:"#38bdf8"}] }
    ],
    traps: []
  },
  {
    id: "defensa-francesa-winawer",
    category: "Semi-abiertas (1.e4 e6)",
    name: "Defensa Francesa: Variante Winawer (negras)",
    eco: "C15",
    side: "b",
    difficulty: "Avanzado",
    style: "Complejo / Bloqueado",
    ratingRange: "1500 - 2800",
    summary: "Las negras clavan el caballo blanco en c3 con ...Ab4, dispuestas a entregar su pareja de alfiles a cambio de dañar la estructura de peones blancos en el flanco de dama (peones doblados en c).",
    plansWhite: [
      "Aprovechar la pareja de alfiles y el espacio en el flanco de rey con Dg4.",
      "Explotar las debilidades negras en las casillas oscuras."
    ],
    plansBlack: [
      "Atacar los peones doblados blancos en la columna c.",
      "Cerrar la posición para minimizar el impacto de la pareja de alfiles blancos.",
      "Contragolpear en el centro con ...c5."
    ],
    keySquares: ["b4", "c3", "g7", "c5"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupa el centro." },
      { san: "e6", from: "e7", to: "e6", name: "La Francesa", comment: "Prepara d5." },
      { san: "d4", from: "d2", to: "d4", name: "Centro ideal", comment: "Las blancas dominan e4 y d4." },
      { san: "d5", from: "d7", to: "d5", name: "Golpe al centro", comment: "Ataca e4 directamente." },
      { san: "Nc3", from: "b1", to: "c3", name: "Defensa natural", comment: "Defiende e4 y mantiene la tensión." },
      { san: "Bb4", from: "f8", to: "b4", name: "La Winawer", comment: "Clava el caballo y amenaza indirectamente a e4. Se prepara para destruir la estructura blanca en c3.", highlightSquares: ["b4", "c3"], arrows: [{from:"b4", to:"c3", color:"#ef4444"}] }
    ],
    traps: []
  },
  {
    id: "apertura-escocesa",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Escocesa (blancas)",
    eco: "C45",
    side: "w",
    difficulty: "Intermedio",
    style: "Juego Abierto / Combate Central",
    ratingRange: "1000 - 2700",
    summary: "Las blancas rompen el centro inmediatamente con d4 en la jugada 3, buscando abrir líneas para un juego táctico y evitar las complejas maniobras de la Apertura Española.",
    plansWhite: [
      "Ganar espacio en el centro y presionar rápido con Ac4 o Cxc6.",
      "Evitar estructuras estáticas y buscar posiciones abiertas."
    ],
    plansBlack: [
      "Atacar e4 y presionar el caballo en d4 con ...Ac5 o ...Cf6.",
      "Preparar la reacción d5 para igualar en el centro."
    ],
    keySquares: ["d4", "e4", "e5", "c6"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupa el centro." },
      { san: "e5", from: "e7", to: "e5", name: "Defensa Clásica", comment: "Controla d4." },
      { san: "Nf3", from: "g1", to: "f3", name: "Ataque a e5", comment: "Desarrollo con ganancia de tiempo." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa de e5", comment: "Desarrolla y defiende." },
      { san: "d4", from: "d2", to: "d4", name: "La Escocesa", comment: "¡Ruptura inmediata! Las blancas exigen una resolución inmediata de la tensión central.", highlightSquares: ["d4", "e5"], arrows: [{from:"d4", to:"e5", color:"#ef4444"}] },
      { san: "exd4", from: "e5", to: "d4", name: "Captura obligada", comment: "Mantener el peón es imposible." },
      { san: "Nxd4", from: "f3", to: "d4", name: "Recuperación central", comment: "El caballo domina el centro, listo para el combate." }
    ],
    traps: []
  },
  {
    id: "gambito-de-rey-aceptado",
    category: "Abiertas (1.e4 e5)",
    name: "Gambito de Rey Aceptado (blancas)",
    eco: "C33",
    side: "w",
    difficulty: "Avanzado",
    style: "Ultra Agresivo / Táctico",
    ratingRange: "1000 - 2400",
    summary: "La apertura de los románticos del siglo XIX. Las blancas sacrifican un peón de flanco para desviar el peón central negro y conseguir un masivo centro de peones y ataques fulminantes por la columna f semiabierta.",
    plansWhite: [
      "Sacrificar material por desarrollo rápido y ataque al rey.",
      "Dominar el centro con d4.",
      "Abrir la columna 'f' para la torre tras el enroque."
    ],
    plansBlack: [
      "Devolver el peón en el momento justo (ej. ...d5) para igualar el desarrollo.",
      "Aprovechar la diagonal débil g1-a7 del rey blanco.",
      "Sostener el peón extra con ...g5 si se busca la máxima complicación."
    ],
    keySquares: ["f4", "e5", "d4", "f7"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Dominio central." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta central", comment: "Disputa d4 y f4." },
      { san: "f4", from: "f2", to: "f4", name: "El Gambito de Rey", comment: "Las blancas ofrecen un peón para desviar al defensor del centro y abrir la columna f.", highlightSquares: ["f4", "e5"], arrows: [{from:"f4", to:"e5", color:"#ef4444"}] },
      { san: "exf4", from: "e5", to: "f4", name: "Gambito Aceptado", comment: "Las negras aceptan el desafío. ¡Empieza la fiesta táctica!" },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo y Prevención", comment: "Desarrolla una pieza y previene el molesto ...Dh4+ de las negras." }
    ],
    traps: []
  },
  {
    id: "ataque-fegatello",
    category: "Abiertas (1.e4 e5)",
    name: "Ataque Fegatello (Fried Liver Attack) (blancas)",
    eco: "C57",
    side: "w",
    difficulty: "Intermedio",
    style: "Sacrificio Violento / Ataque al Rey",
    ratingRange: "800 - 2000",
    summary: "Una de las líneas más espectaculares de la Defensa de los Dos Caballos. Las blancas sacrifican un caballo en f7 para arrastrar al rey negro al centro del tablero y someterlo a un ataque demoledor.",
    plansWhite: [
      "Sacrificar en f7 (Cxf7) para exponer al rey negro.",
      "Dar jaque rápido con Df3+ forzando al rey negro a defender d5.",
      "Aumentar la presión sobre la pieza clavada en d5 con Cc3."
    ],
    plansBlack: [
      "Llevar el rey a e6 para defender el caballo en d5.",
      "Tratar de devolver material para salvar al rey y terminar el desarrollo."
    ],
    keySquares: ["f7", "d5", "e6", "f3"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupación central." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta Clásica", comment: "Control central." },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo y Ataque", comment: "Ataca e5." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa", comment: "Defiende e5." },
      { san: "Bc4", from: "f1", to: "c4", name: "Apertura Italiana", comment: "Apunta a la débil f7." },
      { san: "Nf6", from: "g8", to: "f6", name: "Defensa de los Dos Caballos", comment: "Contraataca en e4 en lugar de Ac5." },
      { san: "Ng5", from: "f3", to: "g5", name: "Ataque a f7", comment: "¡Agresividad temprana! Amenaza Cxf7 o Axf7+ apoyado por el alfil y el caballo.", highlightSquares: ["f7"], arrows: [{from:"g5", to:"f7", color:"#ef4444"}] },
      { san: "d5", from: "d7", to: "d5", name: "Bloqueo obligatorio", comment: "La única forma de detener la amenaza sobre f7." },
      { san: "exd5", from: "e4", to: "d5", name: "Captura", comment: "Abre la columna e." },
      { san: "Nxd5", from: "f6", to: "d5", name: "El error fatal", comment: "Las negras recapturan de inmediato, permitiendo el sacrificio. (Lo correcto es ...Ca5 o ...b5).", highlightSquares: ["d5", "g5"] },
      { san: "Nxf7", from: "g5", to: "f7", name: "¡El Ataque Fegatello!", comment: "¡Un sacrificio espectacular! Ataca la Dama y la Torre simultáneamente.", arrows: [{from:"f7", to:"d8", color:"#f97316"}, {from:"f7", to:"h8", color:"#f97316"}] },
      { san: "Kxf7", from: "e8", to: "f7", name: "Rey forzado", comment: "El rey debe salir a defenderse." },
      { san: "Qf3+", from: "d1", to: "f3", name: "Ataque doble", comment: "Jaque al rey y ataca al caballo clavado en d5." },
      { san: "Ke6", from: "f7", to: "e6", name: "El Rey al centro", comment: "La única manera de defender d5. ¡El rey negro queda expuesto en el medio del tablero!" }
    ],
    traps: []
  },
  {
    id: "defensa-nimzoindia",
    category: "Cerradas (1.d4 Nf6)",
    name: "Defensa Nimzoindia (negras)",
    eco: "E20",
    side: "b",
    difficulty: "Avanzado",
    style: "Hipermoderno / Estratégico",
    ratingRange: "1600 - 2850",
    summary: "Una de las defensas más respetadas contra 1.d4. Las negras permiten a las blancas controlar el centro con peones temporalmente, pero desarrollan su alfil a b4 para clavar el caballo de c3 y controlar la vital casilla e4.",
    plansWhite: [
      "Conseguir la pareja de alfiles tras Axc3+.",
      "Dominar el centro con e4 si se permite.",
      "Atacar en el flanco de rey con una fuerte presencia central."
    ],
    plansBlack: [
      "Dañar la estructura de peones blanca con ...Axc3+ creando peones doblados.",
      "Bloquear las casillas de color de su propio alfil (casillas oscuras).",
      "Maniobrar ágilmente con los caballos aprovechando las debilidades blancas."
    ],
    keySquares: ["e4", "c3", "d5", "c5"],
    moves: [
      { san: "d4", from: "d2", to: "d4", name: "Peón de Dama", comment: "Control central." },
      { san: "Nf6", from: "g8", to: "f6", name: "Defensa India", comment: "Previene e4." },
      { san: "c4", from: "c2", to: "c4", name: "Expansión blanca", comment: "Control de d5 y espacio en el flanco de dama." },
      { san: "e6", from: "e7", to: "e6", name: "Soporte y preparación", comment: "Prepara d5 o b4." },
      { san: "Nc3", from: "b1", to: "c3", name: "Control central", comment: "Prepara e4." },
      { san: "Bb4", from: "f8", to: "b4", name: "La Nimzoindia", comment: "Clava el caballo y controla la casilla e4 de forma indirecta y muy eficaz.", highlightSquares: ["b4", "c3", "e4"], arrows: [{from:"b4", to:"c3", color:"#ef4444"}] }
    ],
    traps: []
  },
  {
    id: "apertura-inglesa",
    category: "Flanco (1.c4)",
    name: "Apertura Inglesa (blancas)",
    eco: "A10",
    side: "w",
    difficulty: "Avanzado",
    style: "Posicional / Flexibilidad",
    ratingRange: "1400 - 2800",
    summary: "Una apertura de flanco muy sólida y flexible. Las blancas controlan la casilla d5 desde un costado con 1.c4, evitando las líneas teóricas forzadas de 1.e4 o 1.d4 y trasladando la lucha al medio juego.",
    plansWhite: [
      "Controlar la casilla d5.",
      "Fianchettar el alfil de rey en g2 (g3, Ag2) para presionar la gran diagonal.",
      "Atacar en el flanco de dama con a3, b4, Tb1 (Ataque de minorías)."
    ],
    plansBlack: [
      "Ocupar el centro con ...e5 (Inglesa Simétrica) o ...c5.",
      "Construir un esquema similar a la Defensa India de Rey o Grunfeld."
    ],
    keySquares: ["d5", "c4", "g2", "b4"],
    moves: [
      { san: "c4", from: "c2", to: "c4", name: "Apertura Inglesa", comment: "Controla el centro (d5) desde el flanco.", highlightSquares: ["d5"], arrows: [{from:"c4", to:"d5", color:"#38bdf8"}] },
      { san: "e5", from: "e7", to: "e5", name: "Siciliana Invertida", comment: "Las negras reclaman el centro. La posición se parece a una Siciliana con colores invertidos." },
      { san: "Nc3", from: "b1", to: "c3", name: "Desarrollo y Control", comment: "Aumenta la presión sobre d5." },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo", comment: "Prepara d5." },
      { san: "g3", from: "g2", to: "g3", name: "Preparando el Fianchetto", comment: "El alfil en g2 será una pieza poderosísima." }
    ],
    traps: []
  }

  ,
  {
    id: "italiana-pianissimo",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Italiana: Giuoco Pianissimo (blancas)",
    eco: "C50",
    side: "w",
    difficulty: "Principiante",
    style: "Lento / Maniobras",
    ratingRange: "800 - 2800",
    summary: "El 'Juego lentísimo'. En lugar de romper el centro rápidamente con d4, las blancas juegan d3, construyendo un centro sólido y preparando maniobras largas. Es muy popular hoy en día incluso en la superélite.",
    plansWhite: [
      "Maniobrar el caballo de b1 hacia g3 (Cb1-d2-f1-g3).",
      "Controlar el centro sin apresurarse a abrirlo.",
      "Presionar lentamente el flanco de rey negro."
    ],
    plansBlack: [
      "Jugar ...d6 y mantener la solidez.",
      "Maniobrar el caballo a g6.",
      "Buscar la ruptura ...d5 en el momento oportuno."
    ],
    keySquares: ["c4", "c5", "d3", "d6"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupa el centro." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta central", comment: "Controla d4." },
      { san: "Nf3", from: "g1", to: "f3", name: "Caballo a f3", comment: "Desarrollo y ataque a e5." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa natural", comment: "Defiende e5." },
      { san: "Bc4", from: "f1", to: "c4", name: "Alfil Italiano", comment: "Apunta a f7.", highlightSquares: ["f7"], arrows: [{from:"c4", to:"f7", color:"#f97316"}] },
      { san: "Bc5", from: "f8", to: "c5", name: "Giuoco Piano", comment: "El alfil negro hace lo mismo apuntando a f2." },
      { san: "d3", from: "d2", to: "d3", name: "El Pianissimo", comment: "¡La jugada clave! En lugar de c3 y d4, las blancas sostienen e4 sólidamente. El juego será de maniobras posicionales profundas.", highlightSquares: ["d3", "e4"] },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo", comment: "Las negras se desarrollan preparándose para enrocar." },
      { san: "c3", from: "c2", to: "c3", name: "Control de d4", comment: "Abre una ruta de escape para el alfil en c2 y controla d4 y b4." },
      { san: "d6", from: "d7", to: "d6", name: "Solidez negra", comment: "Sostiene el centro negro de forma idéntica a las blancas." },
      { san: "O-O", from: "e1", to: "g1", name: "Enroque corto", comment: "El rey blanco queda seguro antes de iniciar el plan de maniobras Cb1-d2-f1-g3." }
    ],
    traps: []
  },
  {
    id: "italiana-evans",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Italiana: Gambito Evans (blancas)",
    eco: "C51",
    side: "w",
    difficulty: "Intermedio",
    style: "Sacrificio / Ataque rápido",
    ratingRange: "1000 - 2400",
    summary: "¡El ajedrez romántico! Las blancas sacrifican su peón 'b' para desviar al alfil negro y ganar tiempos vitales construyendo el centro con c3 y d4 a toda velocidad.",
    plansWhite: [
      "Sacrificar b4 para ganar tiempos con c3 y d4.",
      "Obtener un centro de peones dominante.",
      "Ataque rápido sobre el rey negro antes de que logre desarrollarse."
    ],
    plansBlack: [
      "Aceptar el gambito y devolver el peón más tarde para igualar.",
      "Jugar ...Aa5 para clavar o presionar el peón de c3.",
      "Desarrollar rápido y enrocar para sobrevivir al ataque inicial."
    ],
    keySquares: ["b4", "c3", "d4", "f7"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Centro clásico." },
      { san: "e5", from: "e7", to: "e5", name: "Centro clásico", comment: "Respuesta simétrica." },
      { san: "Nf3", from: "g1", to: "f3", name: "Caballo f3", comment: "Ataca e5." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defiende e5", comment: "Sostiene la tensión." },
      { san: "Bc4", from: "f1", to: "c4", name: "Italiana", comment: "Apunta al punto débil f7." },
      { san: "Bc5", from: "f8", to: "c5", name: "Giuoco Piano", comment: "Controla el centro." },
      { san: "b4", from: "b2", to: "b4", name: "¡El Gambito Evans!", comment: "Ofrece un peón para desviar al alfil y ganar un tiempo para jugar c3 y d4 inmediatamente.", highlightSquares: ["b4"], arrows: [{from:"b2", to:"b4", color:"#ef4444"}] },
      { san: "Bxb4", from: "c5", to: "b4", name: "Gambito Aceptado", comment: "Rechazarlo también es posible (...Ab6), pero aceptarlo es lo principal." },
      { san: "c3", from: "c2", to: "c3", name: "Ganando el tiempo", comment: "Las blancas atacan al alfil y preparan el golpe central d4.", highlightSquares: ["c3"], arrows: [{from:"c3", to:"b4", color:"#38bdf8"}] },
      { san: "Ba5", from: "b4", to: "a5", name: "Retirada de alfil", comment: "La mejor retirada, manteniendo presión sobre c3 para dificultar d4." },
      { san: "d4", from: "d2", to: "d4", name: "Golpe al centro", comment: "El objetivo del sacrificio. ¡Las blancas dominan el centro a cambio del peón lateral!" }
    ],
    traps: [
      {
        title: "El mate de Lasker",
        desc: "En varias líneas del Evans, si las negras se defienden pasivamente, las blancas pueden armar baterías mortales con Db3 apuntando a f7 junto con el alfil de c4.",
        moves: "Las blancas pueden combinar Db3 y Ac4."
      }
    ]
  },
  {
    id: "italiana-dos-caballos-polerio",
    category: "Abiertas (1.e4 e5)",
    name: "Defensa de los Dos Caballos: Variante Polerio (negras)",
    eco: "C59",
    side: "b",
    difficulty: "Avanzado",
    style: "Sacrificio Negro / Iniciativa",
    ratingRange: "1400 - 2600",
    summary: "La refutación moderna contra el Ataque Fegatello (Ng5). En lugar de defender el peón y permitir Cxf7, las negras sacrifican el peón con ...Ca5 para destruir el alfil de c4 y lograr una enorme iniciativa a cambio del peón.",
    plansWhite: [
      "Conservar el peón de ventaja en d5.",
      "Aguantar la tremenda compensación y actividad negra.",
      "Desarrollar el flanco de dama que suele quedar atascado."
    ],
    plansBlack: [
      "Aprovechar la ventaja de espacio y desarrollo.",
      "Presionar constantemente con ...h6, ...e4, etc.",
      "No dejar respirar al rival, priorizando la actividad sobre el material."
    ],
    keySquares: ["a5", "c4", "g5", "d5"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupa el centro." },
      { san: "e5", from: "e7", to: "e5", name: "Centro clásico", comment: "Respuesta central." },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo", comment: "Ataca e5." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defiende e5", comment: "Desarrollo natural." },
      { san: "Bc4", from: "f1", to: "c4", name: "Apertura Italiana", comment: "Alfil a la diagonal clave." },
      { san: "Nf6", from: "g8", to: "f6", name: "Defensa de los Dos Caballos", comment: "Contraataca en lugar de jugar ...Ac5." },
      { san: "Ng5", from: "f3", to: "g5", name: "Ataque a f7", comment: "Fuerza una respuesta crítica." },
      { san: "d5", from: "d7", to: "d5", name: "Bloqueo central", comment: "Única forma de detener la masacre en f7." },
      { san: "exd5", from: "e4", to: "d5", name: "Captura", comment: "Las blancas toman, amenazando ganar material." },
      { san: "Na5", from: "c6", to: "a5", name: "Variante Polerio", comment: "¡La jugada magistral! En vez de retomar en d5 y permitir el ataque Fegatello (Cxd5), las negras atacan el valioso alfil blanco sacrificando el peón.", highlightSquares: ["a5", "c4"], arrows: [{from:"a5", to:"c4", color:"#22c55e"}] },
      { san: "Bb5+", from: "c4", to: "b5", name: "Jaque intermedio", comment: "Las blancas intentan crear problemas antes de retirar el alfil." },
      { san: "c6", from: "c7", to: "c6", name: "Bloqueo", comment: "Fuerza a las blancas a decidir." },
      { san: "dxc6", from: "d5", to: "c6", name: "Peón por peón", comment: "Las blancas se comen otro peón." },
      { san: "bxc6", from: "b7", to: "c6", name: "Retoma", comment: "Las negras abren líneas. A cambio del peón menos, tienen un desarrollo excelente y una gran iniciativa central." },
      { san: "Be2", from: "b5", to: "e2", name: "Retirada", comment: "El alfil se retira. Las negras jugarán ...h6 forzando al caballo a volver pasivamente a f3." }
    ],
    traps: []
  }

  ,
  {
    id: "espanola-cerrada",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Española: Variante Cerrada (blancas)",
    eco: "C92",
    side: "w",
    difficulty: "Experto",
    style: "Posicional / Maniobras",
    ratingRange: "1600 - 2850",
    summary: "La joya de la corona del ajedrez. La Apertura Española (Ruy López) presiona e5 indirectamente atacando a su defensor en c6. En la Variante Cerrada, se produce una profunda lucha estratégica con centros bloqueados y largas maniobras.",
    plansWhite: [
      "Preservar el valioso alfil de casillas claras retirándolo a c2.",
      "Construir un fuerte centro con c3 y d4.",
      "Maniobrar el caballo de b1 por d2-f1 hacia g3 o e3."
    ],
    plansBlack: [
      "Sostener la presión central (el 'Punto Fuerte' e5).",
      "Expulsar al alfil blanco con ...a6 y ...b5.",
      "Contraatacar en el flanco de dama con ...c5 o prepararse para aguantar en el flanco de rey."
    ],
    keySquares: ["b5", "c6", "e5", "d4", "c3"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Ocupación clásica del centro." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta simétrica", comment: "Control central." },
      { san: "Nf3", from: "g1", to: "f3", name: "Caballo f3", comment: "Desarrollo y presión." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defiende e5", comment: "Sostiene el peón." },
      { san: "Bb5", from: "f1", to: "b5", name: "La Apertura Española (Ruy López)", comment: "¡La jugada que define la apertura! Ataca al defensor del peón de e5.", highlightSquares: ["b5", "c6"], arrows: [{from:"b5", to:"c6", color:"#f97316"}] },
      { san: "a6", from: "a7", to: "a6", name: "Defensa Morphy", comment: "La respuesta más popular. Interroga al alfil de inmediato." },
      { san: "Ba4", from: "b5", to: "a4", name: "Retirada", comment: "Mantiene la presión sobre la diagonal a4-e8." },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo", comment: "Ataca el peón blanco de e4." },
      { san: "O-O", from: "e1", to: "g1", name: "Enroque", comment: "Las blancas ignoran temporalmente el ataque en e4, priorizando la seguridad." },
      { san: "Be7", from: "f8", to: "e7", name: "Variante Cerrada", comment: "Las negras también se preparan para enrocar. (Tomar en e4 sería la Variante Abierta)." },
      { san: "Re1", from: "f1", to: "e1", name: "Defiende e4", comment: "Ahora sí, las blancas defienden el peón y amenazan Axc6 ganando e5." },
      { san: "b5", from: "b7", to: "b5", name: "Rompe la clavada", comment: "Fuerza al alfil a retroceder." },
      { san: "Bb3", from: "a4", to: "b3", name: "El alfil español", comment: "Se ubica en su diagonal ideal a2-g8 apuntando a f7.", arrows: [{from:"b3", to:"f7", color:"#38bdf8"}] },
      { san: "d6", from: "d7", to: "d6", name: "Solidez", comment: "Defiende e5 y prepara ...Ca5." },
      { san: "c3", from: "c2", to: "c3", name: "Preparando d4", comment: "Soporta el centro y abre una casilla de escape en c2 para el alfil." },
      { san: "O-O", from: "e8", to: "g8", name: "Enroque negro", comment: "La posición básica de la Española Cerrada. ¡Aquí comienza una partida de ajedrez muy profunda!" },
      { san: "h3", from: "h2", to: "h3", name: "Profilaxis", comment: "Evita ...Ag4 clavando el caballo, un tema muy molesto." }
    ],
    traps: []
  },
  {
    id: "espanola-berlinesa",
    category: "Abiertas (1.e4 e5)",
    name: "Defensa Berlinesa (negras)",
    eco: "C65",
    side: "b",
    difficulty: "Experto",
    style: "Defensivo / Finales",
    ratingRange: "1800 - 2850",
    summary: "El temido 'Muro de Berlín'. En lugar de ...a6, las negras juegan ...Cf6 en la jugada 3, permitiendo una simplificación temprana que conduce a un final sin damas legendario por su solidez. Popularizada por Kramnik al derrotar a Kasparov en el año 2000.",
    plansWhite: [
      "Aprovechar la mayoría de peones en el flanco de rey en el final.",
      "Tratar de crear debilidades en la sólida estructura negra.",
      "Explotar el hecho de que el rey negro no puede enrocar."
    ],
    plansBlack: [
      "Defender pasiva pero sólidamente con la pareja de alfiles.",
      "Neutralizar la mayoría blanca en el flanco de rey.",
      "Usar el rey centralizado activamente en el final."
    ],
    keySquares: ["e4", "e5", "d4", "d6"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Control central." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta central", comment: "Ocupa el centro." },
      { san: "Nf3", from: "g1", to: "f3", name: "Ataque a e5", comment: "Desarrollo y presión." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa", comment: "Protege e5." },
      { san: "Bb5", from: "f1", to: "b5", name: "La Española", comment: "Ataca al defensor c6." },
      { san: "Nf6", from: "g8", to: "f6", name: "La Berlinesa", comment: "Ataca e4 inmediatamente en lugar de interrogar al alfil con ...a6.", highlightSquares: ["f6", "e4"] },
      { san: "O-O", from: "e1", to: "g1", name: "Sacrificio temporal", comment: "Las blancas enrocan, ofreciendo e4 pero preparando d4 o Te1." },
      { san: "Nxe4", from: "f6", to: "e4", name: "Peón capturado", comment: "Las negras aceptan el desafío." },
      { san: "d4", from: "d2", to: "d4", name: "Abre el centro", comment: "Para explotar el rey negro en el centro." },
      { san: "Nd6", from: "e4", to: "d6", name: "Retirada", comment: "Ataca el alfil en b5." },
      { san: "Bxc6", from: "b5", to: "c6", name: "Cambio", comment: "Daña la estructura negra." },
      { san: "dxc6", from: "d7", to: "c6", name: "Recaptura", comment: "Abre líneas para los alfiles negros." },
      { san: "dxe5", from: "d4", to: "e5", name: "Recupera el peón", comment: "Ataca el caballo." },
      { san: "Nf5", from: "d6", to: "f5", name: "Caballo centralizado", comment: "Buena casilla para el caballo." },
      { san: "Qxd8+", from: "d1", to: "d8", name: "Cambio de Damas", comment: "Transición directa al 'Final de Berlín'.", highlightSquares: ["d8"] },
      { san: "Kxd8", from: "e8", to: "d8", name: "El Muro", comment: "Las negras pierden el enroque, pero su posición (con pareja de alfiles y sin debilidades graves) es inexpugnable." }
    ],
    traps: []
  },
  {
    id: "espanola-ataque-marshall",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Española: Ataque Marshall (blancas)",
    eco: "C89",
    side: "b",
    difficulty: "Experto",
    style: "Sacrificio de Peón / Ataque Devastador",
    ratingRange: "1800 - 2850",
    summary: "Frank Marshall lo mantuvo en secreto durante años para usarlo contra Capablanca. Las negras sacrifican un peón en d5 para abrir líneas, obteniendo un desarrollo tremendo y un ataque letal sobre el enroque blanco.",
    plansWhite: [
      "Sobrevivir a la furiosa avalancha inicial de las piezas negras.",
      "Conservar el peón de ventaja para el final.",
      "Defender el flanco de rey desesperadamente con g3 o h3."
    ],
    plansBlack: [
      "Montar un ataque rápido con ...Ad6, ...Dh4 y pasar torres al flanco de rey.",
      "Evitar los cambios de piezas para mantener el potencial de ataque.",
      "Aprovechar la ausencia de las piezas blancas en el flanco de dama."
    ],
    keySquares: ["d5", "h2", "h3", "d6"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Inicia el juego." },
      { san: "e5", from: "e7", to: "e5", name: "Centro clásico", comment: "Respuesta principal." },
      { san: "Nf3", from: "g1", to: "f3", name: "Caballo f3", comment: "Desarrollo." },
      { san: "Nc6", from: "b8", to: "c6", name: "Caballo c6", comment: "Defiende e5." },
      { san: "Bb5", from: "f1", to: "b5", name: "La Española", comment: "Ataca c6." },
      { san: "a6", from: "a7", to: "a6", name: "Defensa Morphy", comment: "Pregunta al alfil." },
      { san: "Ba4", from: "b5", to: "a4", name: "Retirada", comment: "Conserva la clavada." },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo", comment: "Ataca e4." },
      { san: "O-O", from: "e1", to: "g1", name: "Enroque", comment: "Seguridad primero." },
      { san: "Be7", from: "f8", to: "e7", name: "Preparando el enroque", comment: "Sólido." },
      { san: "Re1", from: "f1", to: "e1", name: "Torre al centro", comment: "Defiende e4 amenazando Axc6." },
      { san: "b5", from: "b7", to: "b5", name: "Ruptura de clavada", comment: "Libera al caballo." },
      { san: "Bb3", from: "a4", to: "b3", name: "Alfil a su diagonal", comment: "Apunta a f7." },
      { san: "O-O", from: "e8", to: "g8", name: "Enroque negro", comment: "Rey a salvo." },
      { san: "c3", from: "c2", to: "c3", name: "Preparando d4", comment: "La jugada normal de la cerrada." },
      { san: "d5", from: "d7", to: "d5", name: "¡El Ataque Marshall!", comment: "¡Bomba en el tablero! Las negras ignoran ...d6 y rompen en el centro sacrificando un peón.", highlightSquares: ["d5"], arrows: [{from:"d7", to:"d5", color:"#ef4444"}] },
      { san: "exd5", from: "e4", to: "d5", name: "Aceptando el reto", comment: "Las blancas deben aceptar el desafío." },
      { san: "Nxd5", from: "f6", to: "d5", name: "Caballo central", comment: "Recupera temporalmente." },
      { san: "Nxe5", from: "f3", to: "e5", name: "Gana el peón", comment: "El sacrificio se materializa." },
      { san: "Nxe5", from: "c6", to: "e5", name: "Cambio en e5", comment: "Forzado." },
      { san: "Rxe5", from: "e1", to: "e5", name: "Peón extra blanco", comment: "Las blancas tienen un peón de ventaja, pero..." },
      { san: "c6", from: "c7", to: "c6", name: "Solidez y preparación", comment: "Defiende el caballo y prepara ...Ad6 y ...Dh4." }
    ],
    traps: []
  },
  {
    id: "espanola-variante-cambio",
    category: "Abiertas (1.e4 e5)",
    name: "Apertura Española: Variante del Cambio (blancas)",
    eco: "C68",
    side: "w",
    difficulty: "Avanzado",
    style: "Posicional / Finales",
    ratingRange: "1400 - 2800",
    summary: "Bobby Fischer fue un maestro de esta variante. Las blancas entregan su alfil de inmediato por el caballo de c6, creando peones doblados para las negras y una estructura de peones ganadora en el flanco de rey para el final de la partida.",
    plansWhite: [
      "Forzar cambios de piezas y llevar la partida a un final.",
      "Aprovechar la mayoría de 4 contra 3 peones en el flanco de rey para crear un peón pasado.",
      "Jugar de manera muy sólida, sin riesgos tácticos innecesarios."
    ],
    plansBlack: [
      "Usar la pareja de alfiles para compensar la mala estructura de peones.",
      "Mantener piezas en el tablero, especialmente las Damas.",
      "Abrir la posición para que los alfiles dominen el tablero."
    ],
    keySquares: ["c6", "e5", "d4", "f4"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Peón de Rey", comment: "Control central." },
      { san: "e5", from: "e7", to: "e5", name: "Respuesta central", comment: "Ocupa d4 y f4." },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo", comment: "Presiona e5." },
      { san: "Nc6", from: "b8", to: "c6", name: "Defensa", comment: "Desarrollo natural." },
      { san: "Bb5", from: "f1", to: "b5", name: "La Española", comment: "La jugada clásica de la Ruy López." },
      { san: "a6", from: "a7", to: "a6", name: "Defensa Morphy", comment: "Cuestiona al alfil." },
      { san: "Bxc6", from: "b5", to: "c6", name: "Variante del Cambio", comment: "En vez de retirarse a a4, las blancas toman inmediatamente en c6, dañando la estructura negra.", highlightSquares: ["c6"] },
      { san: "dxc6", from: "d7", to: "c6", name: "Retoma hacia el centro", comment: "Abre la diagonal para su alfil de c8 y la columna d para la dama." },
      { san: "O-O", from: "e1", to: "g1", name: "Enroque", comment: "La línea principal. (Tomar en e5 directamente con Nxe5 se castiga con Qd4 recuperando el peón)." }
    ],
    traps: [
      {
        title: "El error de tomar el peón rápido",
        desc: "Si las blancas intentan 5. Cxe5 de inmediato tras dxc6, las negras juegan ...Dd4, con ataque doble al peón de e4 y al caballo de e5. Las negras recuperan el peón con mejor posición y la pareja de alfiles.",
        moves: "5.Cxe5?! Dd4! 6.Cf3 Dxe4+ 7.De2 Dxe2+ 8.Rxe2."
      }
    ]
  },
  {
    id: "destruye-doble-fianchetto",
    category: "Especiales",
    name: "Destruye el Doble Fianchetto (blancas)",
    eco: "B00",
    side: "w",
    difficulty: "Intermedio",
    style: "Ataque agresivo",
    ratingRange: "800 - 2200",
    summary: "Plan letal para castigar la defensa pasiva del Doble Fianchetto. Construye una ventaja de espacio brutal, centraliza las piezas, cambia el defensor principal y lanza una tormenta de peones sobre el rey enemigo.",
    plansWhite: [
      "Batería Qd2 para conectar torres y preparar el cambio en h6.",
      "Enroque Largo (O-O-O) para centralizar la torre en d1 y proteger al rey.",
      "Cambiar el mejor defensor negro con Bh6 tras el enroque corto rival.",
      "Tormenta de peones con h4-h5 o avance de ruptura en e5."
    ],
    plansBlack: [
      "Intentar desarrollar los caballos tarde y luchar por el centro.",
      "Buscar contrajuego con c5 o defender el flanco de rey expuesto."
    ],
    keySquares: ["h6", "d4", "e4", "h5", "e5"],
    moves: [
      { san: "e4", from: "e2", to: "e4", name: "Centro blanco", comment: "Las blancas ocupan el centro.", highlightSquares: ["e4", "d4"] },
      { san: "b6", from: "b7", to: "b6", name: "Preparación Fianchetto", comment: "Las negras inician su esquema pasivo." },
      { san: "d4", from: "d2", to: "d4", name: "Centro blanco completo", comment: "Ocupando ambas casillas centrales." },
      { san: "Bb7", from: "c8", to: "b7", name: "Primer Fianchetto", comment: "El alfil negro apunta al centro desde lejos.", arrows: [{ from: "b7", to: "e4", color: "#f97316" }] },
      { san: "Nc3", from: "b1", to: "c3", name: "Desarrollo y defensa", comment: "Sostiene el peón de e4." },
      { san: "g6", from: "g7", to: "g6", name: "Preparación del segundo Fianchetto", comment: "Las negras ignoran el centro por completo." },
      { san: "Nf3", from: "g1", to: "f3", name: "Desarrollo clásico", comment: "Las blancas desarrollan armónicamente." },
      { san: "Bg7", from: "f8", to: "g7", name: "El Doble Fianchetto", comment: "Las negras completan su esquema pasivo, cediendo todo el centro a cambio de presión a distancia." },
      { san: "Bg5", from: "c1", to: "g5", name: "Alfil activo", comment: "Desarrollo del alfil de casillas oscuras, preparándose para la batería." },
      { san: "d6", from: "d7", to: "d6", name: "Solidez negra", comment: "Un movimiento típico para preparar el desarrollo de caballos sin estorbar a los alfiles." },
      { san: "Qd2", from: "d1", to: "d2", name: "La Batería (Paso 1)", comment: "¡Plan de Ataque! Conecta la dama y prepara el cambio del alfil defensor negro más adelante." },
      { san: "Nf6", from: "g8", to: "f6", name: "Desarrollo de caballo", comment: "Las negras finalmente intentan disputar algo del centro." },
      { san: "O-O-O", from: "e1", to: "c1", name: "Enroque Largo (Paso 2)", comment: "Rey a salvo y la torre centralizada en d1. Todas las piezas pesadas apuntan al centro." },
      { san: "O-O", from: "e8", to: "g8", name: "Enroque corto negro", comment: "Las negras resguardan su rey, pero definen su posición, ¡ahora es el momento de atacar!" },
      { san: "Bh6", from: "g5", to: "h6", name: "Intercambia el Defensor (Paso 3)", comment: "Obliga a cambiar el vital alfil de g7. Sin él, el flanco de rey negro será vulnerable.", arrows: [{ from: "g5", to: "h6", color: "#ef4444" }] },
      { san: "c5", from: "c7", to: "c5", name: "Intento de contrajuego", comment: "Las negras intentan romper el centro con c5 o d5 tarde en el juego." },
      { san: "h4", from: "h2", to: "h4", name: "La Tormenta de Peones (Paso 4)", comment: "¡Al cuello! Inicia el asalto directo para abrir la columna h contra el rey negro." },
      { san: "cxd4", from: "c5", to: "d4", name: "Captura", comment: "Tratando de abrir líneas." },
      { san: "Nxd4", from: "f3", to: "d4", name: "Centralización", comment: "El caballo blanco domina el centro." },
      { san: "Nc6", from: "b8", to: "c6", name: "Desarrollo", comment: "Desarrollando la última pieza menor." },
      { san: "h5", from: "h4", to: "h5", name: "Destrucción", comment: "Abre la columna h de forma imparable. Las blancas tienen un ataque demoledor." }
    ],
    traps: [
      {
        title: "Castigar el centro rápido con e5",
        desc: "Si las negras intentan desarrollar su caballo a f6 en la jugada 5 o 6 sin jugar d6, puedes responder empujando tu peón a e5, pateando al caballo y ganando aún más espacio.",
        moves: "1.e4 b6 2.d4 Bb7 3.Nc3 g6 4.Nf3 Bg7 5.Bg5 Nf6?! 6.e5! Nh5"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OPENINGS_DATA };
}
