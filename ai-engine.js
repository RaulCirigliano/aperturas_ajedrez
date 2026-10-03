/**
 * Motor de IA de ajedrez (búsqueda alfa-beta) para jugar partidas completas y analizar jugadas.
 *
 * - Tablero 0x88 con make/unmake incremental y hash Zobrist
 * - Búsqueda iterativa en profundidad + alfa-beta + quiescencia
 * - Tabla de transposición, movimiento nulo, LMR, killers e historial
 * - Evaluación: material + tablas de casillas (medio juego / final), pareja de alfiles,
 *   peones pasados y "mop-up" para saber dar mate en finales ganados
 * - Niveles de dificultad mediante profundidad, tiempo y ruido aleatorio
 *
 * Se ejecuta dentro de un Web Worker (creado desde un Blob, funciona también con file://).
 */

function createChessAI() {
  const P = 1, N = 2, B = 3, R = 4, Q = 5, K = 6;
  const WHITE = 0, BLACK = 8;
  const INF = 1000000, MATE = 30000;
  const VAL = [0, 100, 320, 330, 500, 900, 0];
  const PHASE_W = [0, 0, 1, 1, 2, 4, 0];

  const PST = [
    null,
    [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
    [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
    [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
    [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
    [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20]
  ];
  const KING_EG = [-50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50];
  const PASSED = [0, 90, 60, 40, 25, 15, 10, 0]; // index = distance (in ranks) to promotion

  const KNIGHT_D = [-33, -31, -18, -14, 14, 18, 31, 33];
  const BISHOP_D = [-17, -15, 15, 17];
  const ROOK_D = [-16, -1, 1, 16];
  const KING_D = [-17, -16, -15, -1, 1, 15, 16, 17];

  // ---- State ----
  const board = new Int8Array(128);
  let side = WHITE, castle = 0, ep = -1, half = 0, hash = 0;
  const kingSq = [0, 0];

  const CASTLE_MASK = new Int8Array(128).fill(15);
  CASTLE_MASK[0x70] = 13; CASTLE_MASK[0x77] = 14; CASTLE_MASK[0x74] = 12;
  CASTLE_MASK[0x00] = 7; CASTLE_MASK[0x07] = 11; CASTLE_MASK[0x04] = 3;

  // ---- Zobrist ----
  let seed = 1234567;
  const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return seed | 0; };
  const Z_PIECE = new Int32Array(16 * 128).map(() => rnd());
  const Z_CASTLE = new Int32Array(16).map(() => rnd());
  const Z_EP = new Int32Array(128).map(() => rnd());
  const Z_SIDE = rnd();

  // ---- Undo stack ----
  const MAXS = 2048;
  const uMove = new Int32Array(MAXS), uCap = new Int8Array(MAXS), uCastle = new Int8Array(MAXS);
  const uEp = new Int16Array(MAXS), uHalf = new Int16Array(MAXS), uHash = new Int32Array(MAXS);
  let sp = 0;
  const hashHist = new Int32Array(MAXS);
  let hhLen = 0;

  // ---- Transposition table ----
  const TT_SIZE = 1 << 19, TT_MASK = TT_SIZE - 1;
  const ttKey = new Int32Array(TT_SIZE), ttMove = new Int32Array(TT_SIZE), ttScore = new Int32Array(TT_SIZE);
  const ttDepth = new Int8Array(TT_SIZE), ttFlag = new Int8Array(TT_SIZE);
  const EXACT = 1, LOWER = 2, UPPER = 3;

  // ---- Move helpers ----
  // move = from | to<<7 | promo<<14 | flags<<17 ; flags: 1 en passant, 2 castle, 4 double push
  const mFrom = m => m & 127, mTo = m => (m >> 7) & 127, mPromo = m => (m >> 14) & 7, mFlag = m => (m >> 17) & 7;
  const enc = (f, t, pr, fl) => f | (t << 7) | (pr << 14) | (fl << 17);

  const MAXPLY = 128;
  const moveLists = [], scoreLists = [];
  for (let i = 0; i < MAXPLY + 8; i++) { moveLists.push(new Int32Array(256)); scoreLists.push(new Int32Array(256)); }
  const killers = [new Int32Array(MAXPLY + 8), new Int32Array(MAXPLY + 8)];
  const historyH = new Int32Array(16 * 128);

  function sqName(s) { return 'abcdefgh'[s & 7] + (8 - (s >> 4)); }
  function nameSq(n) { return (8 - parseInt(n[1], 10)) * 16 + (n.charCodeAt(0) - 97); }

  function computeHash() {
    let h = 0;
    for (let s = 0; s < 128; s++) if (!(s & 0x88) && board[s]) h ^= Z_PIECE[board[s] * 128 + s];
    h ^= Z_CASTLE[castle];
    if (ep >= 0) h ^= Z_EP[ep];
    if (side === BLACK) h ^= Z_SIDE;
    return h;
  }

  function loadFen(fen) {
    board.fill(0);
    const parts = fen.trim().split(/\s+/);
    const rows = parts[0].split('/');
    const map = { p: P, n: N, b: B, r: R, q: Q, k: K };
    for (let r = 0; r < 8; r++) {
      let f = 0;
      for (const ch of rows[r]) {
        if (ch >= '1' && ch <= '8') { f += +ch; continue; }
        const lower = ch.toLowerCase();
        const color = ch === lower ? BLACK : WHITE;
        const s = r * 16 + f;
        board[s] = map[lower] | color;
        if (map[lower] === K) kingSq[color >> 3] = s;
        f++;
      }
    }
    side = parts[1] === 'b' ? BLACK : WHITE;
    castle = 0;
    const c = parts[2] || '-';
    if (c.includes('K')) castle |= 1;
    if (c.includes('Q')) castle |= 2;
    if (c.includes('k')) castle |= 4;
    if (c.includes('q')) castle |= 8;
    ep = parts[3] && parts[3] !== '-' ? nameSq(parts[3]) : -1;
    half = parts[4] ? parseInt(parts[4], 10) : 0;
    hash = computeHash();
    sp = 0;
    hhLen = 0;
    hashHist[hhLen++] = hash;
  }

  function attacked(s, by) {
    // pawns
    if (by === WHITE) {
      let t = s + 15; if (!(t & 0x88) && board[t] === (WHITE | P)) return true;
      t = s + 17; if (!(t & 0x88) && board[t] === (WHITE | P)) return true;
    } else {
      let t = s - 15; if (!(t & 0x88) && board[t] === (BLACK | P)) return true;
      t = s - 17; if (!(t & 0x88) && board[t] === (BLACK | P)) return true;
    }
    for (let i = 0; i < 8; i++) {
      const t = s + KNIGHT_D[i];
      if (!(t & 0x88) && board[t] === (by | N)) return true;
    }
    for (let i = 0; i < 8; i++) {
      const t = s + KING_D[i];
      if (!(t & 0x88) && board[t] === (by | K)) return true;
    }
    for (let i = 0; i < 4; i++) {
      const d = BISHOP_D[i];
      let t = s + d;
      while (!(t & 0x88)) {
        const pc = board[t];
        if (pc) { if (pc === (by | B) || pc === (by | Q)) return true; break; }
        t += d;
      }
    }
    for (let i = 0; i < 4; i++) {
      const d = ROOK_D[i];
      let t = s + d;
      while (!(t & 0x88)) {
        const pc = board[t];
        if (pc) { if (pc === (by | R) || pc === (by | Q)) return true; break; }
        t += d;
      }
    }
    return false;
  }

  const inCheck = () => attacked(kingSq[side >> 3], side ^ 8);

  // Generates pseudo-legal moves. capturesOnly also includes promotions.
  function generate(list, capturesOnly) {
    let n = 0;
    const us = side, them = side ^ 8;
    for (let s = 0; s < 128; s++) {
      if (s & 0x88) { s += 7; continue; }
      const pc = board[s];
      if (!pc || (pc & 8) !== us) continue;
      const type = pc & 7;
      if (type === P) {
        const dir = us === WHITE ? -16 : 16;
        const startRank = us === WHITE ? 6 : 1;
        const promoRank = us === WHITE ? 0 : 7;
        const t = s + dir;
        if (!(t & 0x88) && !board[t]) {
          if ((t >> 4) === promoRank) {
            list[n++] = enc(s, t, Q, 0);
            if (!capturesOnly) { list[n++] = enc(s, t, N, 0); list[n++] = enc(s, t, R, 0); list[n++] = enc(s, t, B, 0); }
          } else if (!capturesOnly) {
            list[n++] = enc(s, t, 0, 0);
            const t2 = t + dir;
            if ((s >> 4) === startRank && !board[t2]) list[n++] = enc(s, t2, 0, 4);
          }
        }
        for (const cd of [dir - 1, dir + 1]) {
          const c = s + cd;
          if (c & 0x88) continue;
          if (board[c] && (board[c] & 8) === them) {
            if ((c >> 4) === promoRank) {
              list[n++] = enc(s, c, Q, 0);
              if (!capturesOnly) { list[n++] = enc(s, c, N, 0); list[n++] = enc(s, c, R, 0); list[n++] = enc(s, c, B, 0); }
            } else list[n++] = enc(s, c, 0, 0);
          } else if (c === ep) {
            list[n++] = enc(s, c, 0, 1);
          }
        }
      } else if (type === N || type === K) {
        const D = type === N ? KNIGHT_D : KING_D;
        for (let i = 0; i < 8; i++) {
          const t = s + D[i];
          if (t & 0x88) continue;
          const tp = board[t];
          if (!tp) { if (!capturesOnly) list[n++] = enc(s, t, 0, 0); }
          else if ((tp & 8) === them) list[n++] = enc(s, t, 0, 0);
        }
        if (type === K && !capturesOnly) {
          if (us === WHITE && s === 0x74) {
            if ((castle & 1) && !board[0x75] && !board[0x76] && board[0x77] === (WHITE | R) &&
              !attacked(0x74, BLACK) && !attacked(0x75, BLACK) && !attacked(0x76, BLACK)) list[n++] = enc(s, 0x76, 0, 2);
            if ((castle & 2) && !board[0x73] && !board[0x72] && !board[0x71] && board[0x70] === (WHITE | R) &&
              !attacked(0x74, BLACK) && !attacked(0x73, BLACK) && !attacked(0x72, BLACK)) list[n++] = enc(s, 0x72, 0, 2);
          } else if (us === BLACK && s === 0x04) {
            if ((castle & 4) && !board[0x05] && !board[0x06] && board[0x07] === (BLACK | R) &&
              !attacked(0x04, WHITE) && !attacked(0x05, WHITE) && !attacked(0x06, WHITE)) list[n++] = enc(s, 0x06, 0, 2);
            if ((castle & 8) && !board[0x03] && !board[0x02] && !board[0x01] && board[0x00] === (BLACK | R) &&
              !attacked(0x04, WHITE) && !attacked(0x03, WHITE) && !attacked(0x02, WHITE)) list[n++] = enc(s, 0x02, 0, 2);
          }
        }
      } else {
        const D = type === B ? BISHOP_D : type === R ? ROOK_D : KING_D;
        for (let i = 0; i < D.length; i++) {
          const d = D[i];
          let t = s + d;
          while (!(t & 0x88)) {
            const tp = board[t];
            if (!tp) { if (!capturesOnly) list[n++] = enc(s, t, 0, 0); }
            else { if ((tp & 8) === them) list[n++] = enc(s, t, 0, 0); break; }
            t += d;
          }
        }
      }
    }
    return n;
  }

  // Returns false if the move leaves own king in check (move is still applied; caller must unmake)
  function make(m) {
    const from = mFrom(m), to = mTo(m), promo = mPromo(m), flag = mFlag(m);
    const piece = board[from];
    let captured = board[to];
    uMove[sp] = m; uCastle[sp] = castle; uEp[sp] = ep; uHalf[sp] = half; uHash[sp] = hash;

    let h = hash ^ Z_PIECE[piece * 128 + from];
    if (flag & 1) {
      const capSq = side === WHITE ? to + 16 : to - 16;
      captured = board[capSq];
      board[capSq] = 0;
      h ^= Z_PIECE[captured * 128 + capSq];
    } else if (captured) {
      h ^= Z_PIECE[captured * 128 + to];
    }
    uCap[sp] = captured;
    sp++;

    const placed = promo ? (promo | side) : piece;
    board[to] = placed;
    board[from] = 0;
    h ^= Z_PIECE[placed * 128 + to];

    if (flag & 2) {
      let rf, rt;
      if (to === 0x76) { rf = 0x77; rt = 0x75; } else if (to === 0x72) { rf = 0x70; rt = 0x73; }
      else if (to === 0x06) { rf = 0x07; rt = 0x05; } else { rf = 0x00; rt = 0x03; }
      const rook = board[rf];
      board[rt] = rook; board[rf] = 0;
      h ^= Z_PIECE[rook * 128 + rf] ^ Z_PIECE[rook * 128 + rt];
    }
    if ((piece & 7) === K) kingSq[side >> 3] = to;

    h ^= Z_CASTLE[castle];
    castle &= CASTLE_MASK[from] & CASTLE_MASK[to];
    h ^= Z_CASTLE[castle];
    if (ep >= 0) h ^= Z_EP[ep];
    ep = (flag & 4) ? (from + to) >> 1 : -1;
    if (ep >= 0) h ^= Z_EP[ep];
    half = ((piece & 7) === P || captured) ? 0 : half + 1;
    side ^= 8;
    h ^= Z_SIDE;
    hash = h;
    hashHist[hhLen++] = hash;
    return !attacked(kingSq[(side ^ 8) >> 3], side);
  }

  function unmake() {
    sp--; hhLen--;
    const m = uMove[sp];
    const from = mFrom(m), to = mTo(m), promo = mPromo(m), flag = mFlag(m);
    side ^= 8;
    const moved = board[to];
    board[from] = promo ? (P | side) : moved;
    if (flag & 1) {
      board[to] = 0;
      board[side === WHITE ? to + 16 : to - 16] = uCap[sp];
    } else {
      board[to] = uCap[sp];
    }
    if (flag & 2) {
      let rf, rt;
      if (to === 0x76) { rf = 0x77; rt = 0x75; } else if (to === 0x72) { rf = 0x70; rt = 0x73; }
      else if (to === 0x06) { rf = 0x07; rt = 0x05; } else { rf = 0x00; rt = 0x03; }
      board[rf] = board[rt]; board[rt] = 0;
    }
    if ((board[from] & 7) === K) kingSq[side >> 3] = from;
    castle = uCastle[sp]; ep = uEp[sp]; half = uHalf[sp]; hash = uHash[sp];
  }

  function makeNull() {
    uMove[sp] = 0; uCastle[sp] = castle; uEp[sp] = ep; uHalf[sp] = half; uHash[sp] = hash; uCap[sp] = 0;
    sp++;
    if (ep >= 0) hash ^= Z_EP[ep];
    ep = -1;
    side ^= 8;
    hash ^= Z_SIDE;
    hashHist[hhLen++] = hash;
  }
  function unmakeNull() {
    sp--; hhLen--;
    side ^= 8;
    castle = uCastle[sp]; ep = uEp[sp]; half = uHalf[sp]; hash = uHash[sp];
  }

  function isRepetition() {
    const limit = Math.max(0, hhLen - 1 - half);
    for (let i = hhLen - 3; i >= limit; i -= 2) if (hashHist[i] === hash) return true;
    return false;
  }

  // ---- Evaluation (from side-to-move perspective) ----
  function evaluate() {
    let mg = 0, phase = 0;
    const mat = [0, 0], bishops = [0, 0], nonPawn = [0, 0];
    const pawnFiles = [new Int8Array(8), new Int8Array(8)];
    let kingMg = [0, 0], kingEg = [0, 0];

    for (let s = 0; s < 128; s++) {
      if (s & 0x88) { s += 7; continue; }
      const pc = board[s];
      if (!pc) continue;
      const type = pc & 7, c = pc >> 3;
      const r = s >> 4, f = s & 7;
      const idx = c === 0 ? r * 8 + f : (7 - r) * 8 + f;
      phase += PHASE_W[type];
      if (type === K) { kingMg[c] = PST[K][idx]; kingEg[c] = KING_EG[idx]; continue; }
      const v = VAL[type] + PST[type][idx];
      mat[c] += VAL[type];
      if (type !== P) nonPawn[c] += VAL[type];
      if (type === B) bishops[c]++;
      if (type === P) pawnFiles[c][f]++;
      mg += c === 0 ? v : -v;
    }
    if (phase > 24) phase = 24;

    // King safety tables tapered by game phase
    mg += ((kingMg[0] - kingMg[1]) * phase + (kingEg[0] - kingEg[1]) * (24 - phase)) / 24;

    if (bishops[0] >= 2) mg += 30;
    if (bishops[1] >= 2) mg -= 30;

    // Pawn structure: doubled / isolated / passed
    for (let s = 0; s < 128; s++) {
      if (s & 0x88) { s += 7; continue; }
      const pc = board[s];
      if ((pc & 7) !== P) continue;
      const c = pc >> 3, f = s & 7, r = s >> 4;
      const sign = c === 0 ? 1 : -1;
      const own = pawnFiles[c];
      if (own[f] > 1) mg -= 10 * sign;
      if ((f === 0 || !own[f - 1]) && (f === 7 || !own[f + 1])) mg -= 12 * sign;
      // passed?
      let passed = true;
      const dir = c === 0 ? -16 : 16;
      for (let ff = Math.max(0, f - 1); ff <= Math.min(7, f + 1) && passed; ff++) {
        let t = (r * 16 + ff) + dir;
        while (!(t & 0x88)) {
          if (board[t] === ((c ^ 1) * 8 | P)) { passed = false; break; }
          t += dir;
        }
      }
      if (passed) {
        const dist = c === 0 ? r : 7 - r;
        mg += sign * PASSED[dist] * (1 + (24 - phase) / 24);
      }
    }

    // Mop-up: help the winning side drive the enemy king to the edge and deliver mate
    const diff = mat[0] - mat[1];
    if (phase <= 8 && Math.abs(diff) >= 300) {
      const strong = diff > 0 ? 0 : 1, weak = 1 - strong;
      const wk = kingSq[weak], sk = kingSq[strong];
      const wr = wk >> 4, wf = wk & 7, sr = sk >> 4, sf = sk & 7;
      const centerDist = Math.max(3 - wr, wr - 4) + Math.max(3 - wf, wf - 4);
      const kingDist = Math.abs(wr - sr) + Math.abs(wf - sf);
      const bonus = centerDist * 12 + (14 - kingDist) * 5;
      mg += strong === 0 ? bonus : -bonus;
    }

    return side === WHITE ? mg | 0 : -mg | 0;
  }

  // ---- Search ----
  let nodes = 0, stopTime = 0, stopped = false, rootBest = 0;

  function scoreMoves(list, scores, n, ttm, ply) {
    for (let i = 0; i < n; i++) {
      const m = list[i];
      if (m === ttm) { scores[i] = 2000000; continue; }
      const to = mTo(m), victim = board[to] & 7, attacker = board[mFrom(m)] & 7;
      if (victim || (mFlag(m) & 1)) scores[i] = 1000000 + (victim ? VAL[victim] : 100) * 10 - VAL[attacker] / 10;
      else if (mPromo(m)) scores[i] = 900000 + VAL[mPromo(m)];
      else if (m === killers[0][ply]) scores[i] = 800000;
      else if (m === killers[1][ply]) scores[i] = 790000;
      else scores[i] = historyH[board[mFrom(m)] * 128 + to];
    }
  }

  function pick(list, scores, n, i) {
    let best = i;
    for (let j = i + 1; j < n; j++) if (scores[j] > scores[best]) best = j;
    if (best !== i) {
      const tm = list[i]; list[i] = list[best]; list[best] = tm;
      const ts = scores[i]; scores[i] = scores[best]; scores[best] = ts;
    }
    return list[i];
  }

  function checkTime() {
    if ((nodes & 2047) === 0 && Date.now() > stopTime) stopped = true;
  }

  function quiesce(alpha, beta, ply) {
    nodes++; checkTime();
    if (stopped) return 0;
    const stand = evaluate();
    if (ply >= MAXPLY) return stand;
    if (stand >= beta) return beta;
    if (stand > alpha) alpha = stand;
    const list = moveLists[ply], scores = scoreLists[ply];
    const n = generate(list, true);
    scoreMoves(list, scores, n, 0, ply);
    for (let i = 0; i < n; i++) {
      const m = pick(list, scores, n, i);
      if (!make(m)) { unmake(); continue; }
      const sc = -quiesce(-beta, -alpha, ply + 1);
      unmake();
      if (stopped) return 0;
      if (sc >= beta) return beta;
      if (sc > alpha) alpha = sc;
    }
    return alpha;
  }

  function hasNonPawn() {
    for (let s = 0; s < 128; s++) {
      if (s & 0x88) { s += 7; continue; }
      const pc = board[s];
      if (pc && (pc & 8) === side && (pc & 7) !== P && (pc & 7) !== K) return true;
    }
    return false;
  }

  function search(depth, alpha, beta, ply, nullOk) {
    if (ply > 0 && (half >= 100 || isRepetition())) return 0;
    const check = inCheck();
    if (check) depth++;
    if (depth <= 0) return quiesce(alpha, beta, ply);
    nodes++; checkTime();
    if (stopped) return 0;
    if (ply >= MAXPLY) return evaluate();

    const ti = hash & TT_MASK;
    let ttm = 0;
    if (ttKey[ti] === hash) {
      ttm = ttMove[ti];
      if (ply > 0 && ttDepth[ti] >= depth) {
        const s = ttScore[ti], fl = ttFlag[ti];
        if (fl === EXACT) return s;
        if (fl === LOWER && s >= beta) return s;
        if (fl === UPPER && s <= alpha) return s;
      }
    }

    // Null-move pruning
    if (nullOk && !check && depth >= 3 && ply > 0 && beta < MATE - 200 && hasNonPawn()) {
      makeNull();
      const sc = -search(depth - 3, -beta, -beta + 1, ply + 1, false);
      unmakeNull();
      if (stopped) return 0;
      if (sc >= beta) return beta;
    }

    const list = moveLists[ply], scores = scoreLists[ply];
    const n = generate(list, false);
    scoreMoves(list, scores, n, ttm, ply);

    let legal = 0, best = -INF, bestMove = 0;
    const origAlpha = alpha;
    for (let i = 0; i < n; i++) {
      const m = pick(list, scores, n, i);
      const isQuiet = !board[mTo(m)] && !(mFlag(m) & 1) && !mPromo(m);
      if (!make(m)) { unmake(); continue; }
      legal++;
      let sc;
      if (legal === 1) {
        sc = -search(depth - 1, -beta, -alpha, ply + 1, true);
      } else {
        // Late move reductions for quiet moves
        let red = 0;
        if (depth >= 3 && legal > 4 && isQuiet && !check) red = legal > 10 ? 2 : 1;
        sc = -search(depth - 1 - red, -alpha - 1, -alpha, ply + 1, true);
        if (!stopped && sc > alpha && (red > 0 || sc < beta)) sc = -search(depth - 1, -beta, -alpha, ply + 1, true);
      }
      unmake();
      if (stopped) return 0;
      if (sc > best) {
        best = sc; bestMove = m;
        if (sc > alpha) {
          alpha = sc;
          if (ply === 0) rootBest = m;
          if (sc >= beta) {
            if (isQuiet) {
              if (killers[0][ply] !== m) { killers[1][ply] = killers[0][ply]; killers[0][ply] = m; }
              historyH[board[mFrom(m)] * 128 + mTo(m)] += depth * depth;
            }
            break;
          }
        }
      }
    }
    if (legal === 0) return check ? -MATE + ply : 0;

    ttKey[ti] = hash; ttMove[ti] = bestMove; ttScore[ti] = best; ttDepth[ti] = depth;
    ttFlag[ti] = best <= origAlpha ? UPPER : best >= beta ? LOWER : EXACT;
    return best;
  }

  function legalMoves() {
    const list = new Int32Array(256);
    const n = generate(list, false);
    const out = [];
    for (let i = 0; i < n; i++) {
      if (make(list[i])) out.push(list[i]);
      unmake();
    }
    return out;
  }

  function moveToUci(m) {
    const pr = mPromo(m);
    return sqName(mFrom(m)) + sqName(mTo(m)) + (pr ? ' pnbrqk'[pr] : '');
  }

  function uciToMove(u) {
    const from = nameSq(u.slice(0, 2)), to = nameSq(u.slice(2, 4));
    const pr = u.length > 4 ? ' pnbrqk'.indexOf(u[4].toLowerCase()) : 0;
    for (const m of legalMoves()) {
      if (mFrom(m) === from && mTo(m) === to && (mPromo(m) === pr || (!pr && mPromo(m) === Q))) return m;
    }
    return 0;
  }

  function extractPv(first, maxLen) {
    const pv = [];
    let made = 0;
    let m = first;
    while (m && pv.length < maxLen) {
      if (!legalMoves().includes(m)) break;
      pv.push(moveToUci(m));
      make(m); made++;
      const ti = hash & TT_MASK;
      m = ttKey[ti] === hash ? ttMove[ti] : 0;
    }
    while (made--) unmake();
    return pv;
  }

  /**
   * opts: { fen, moves:[uci], depth, timeMs, noise }
   * returns { bestmove, score (cp, white POV), mate (moves, white POV sign), depth, pv, nodes }
   */
  function think(opts) {
    loadFen(opts.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    for (const u of (opts.moves || [])) {
      const m = uciToMove(u);
      if (!m) break;
      make(m);
      // Keep make() history but reset the undo stack base so search starts clean
    }
    // Rebase undo stack (history moves are never undone during search)
    const baseSp = sp;

    const maxDepth = opts.depth || 4;
    const timeMs = opts.timeMs || 1000;
    const noise = opts.noise || 0;
    nodes = 0; stopped = false;
    stopTime = Date.now() + timeMs;
    killers[0].fill(0); killers[1].fill(0);
    historyH.fill(0);

    const roots = legalMoves();
    if (roots.length === 0) {
      return { bestmove: null, score: inCheck() ? (side === WHITE ? -MATE : MATE) : 0, mate: inCheck() ? 0 : null, depth: 0, pv: [], nodes: 0 };
    }

    let bestMove = roots[0], bestScore = 0, doneDepth = 0;

    if (noise > 0) {
      // Weaker play: score every root move with a full window, then add random noise.
      const scoreRoots = (d) => {
        const out = [];
        for (const m of roots) {
          make(m);
          const sc = -search(d - 1, -INF, INF, 1, true);
          unmake();
          if (stopped) return null;
          out.push(sc);
        }
        return out;
      };
      stopTime = Date.now() + 60000; // depth-1 pass always completes
      let scores = scoreRoots(1);
      doneDepth = 1;
      if (maxDepth > 1) {
        stopped = false;
        stopTime = Date.now() + timeMs * 2;
        const deeper = scoreRoots(maxDepth);
        if (deeper) { scores = deeper; doneDepth = maxDepth; }
      }
      let bestNoisy = -INF;
      roots.forEach((m, i) => {
        const noisy = scores[i] + (Math.random() * 2 - 1) * noise;
        if (noisy > bestNoisy) { bestNoisy = noisy; bestMove = m; bestScore = scores[i]; }
      });
    } else {
      for (let d = 1; d <= maxDepth; d++) {
        rootBest = 0;
        const sc = search(d, -INF, INF, 0, false);
        if (stopped) break;
        if (rootBest) bestMove = rootBest;
        bestScore = sc;
        doneDepth = d;
        if (Math.abs(sc) > MATE - 100) break; // forced mate found
        if (Date.now() > stopTime - timeMs * 0.45 && d >= 2) break; // not enough time for next ply
      }
    }
    sp = baseSp;

    const whitePov = side === WHITE ? bestScore : -bestScore;
    let mate = null;
    if (Math.abs(bestScore) > MATE - 200) {
      const plies = MATE - Math.abs(bestScore);
      const moves = Math.ceil(plies / 2);
      mate = whitePov > 0 ? moves : -moves;
    }
    return {
      bestmove: moveToUci(bestMove),
      score: whitePov,
      mate,
      depth: doneDepth,
      pv: extractPv(bestMove, 8),
      nodes
    };
  }

  return { think };
}

/**
 * Cliente asíncrono: ejecuta la IA en un Web Worker y devuelve Promesas.
 */
class ChessAIClient {
  constructor() {
    this.pending = new Map();
    this.nextId = 1;
    this.generation = 0;
    this.worker = null;
    this.fallback = null;
    this.startWorker();
  }

  startWorker() {
    try {
      const src = `const AI = (${createChessAI.toString()})();
        self.onmessage = function (e) {
          let res;
          try { res = AI.think(e.data); } catch (err) { res = { error: String(err) }; }
          res.id = e.data.id;
          self.postMessage(res);
        };`;
      const url = URL.createObjectURL(new Blob([src], { type: 'application/javascript' }));
      this.worker = new Worker(url);
      this.worker.onmessage = (e) => {
        const p = this.pending.get(e.data.id);
        if (!p) return;
        this.pending.delete(e.data.id);
        if (p.generation !== this.generation) p.reject({ cancelled: true });
        else p.resolve(e.data);
      };
      this.worker.onerror = () => { this.useFallback(); };
    } catch (e) {
      this.useFallback();
    }
  }

  useFallback() {
    if (this.worker) { try { this.worker.terminate(); } catch (e) { /* ignore */ } }
    this.worker = null;
    this.fallback = createChessAI();
    // Re-run any requests that were waiting on the failed worker
    const waiting = [...this.pending.values()];
    this.pending.clear();
    waiting.forEach(p => {
      setTimeout(() => {
        if (p.generation !== this.generation) { p.reject({ cancelled: true }); return; }
        p.resolve(this.fallback.think(p.opts));
      }, 20);
    });
  }

  /** Cancels every pending request (e.g. new game / takeback). */
  cancelAll() {
    this.generation++;
    if (this.worker && this.pending.size > 0) {
      this.worker.terminate();
      for (const p of this.pending.values()) p.reject({ cancelled: true });
      this.pending.clear();
      this.startWorker();
    }
  }

  think(opts) {
    const id = this.nextId++;
    const generation = this.generation;
    if (!this.worker) {
      if (!this.fallback) this.fallback = createChessAI();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (generation !== this.generation) { reject({ cancelled: true }); return; }
          const res = this.fallback.think(opts);
          if (generation !== this.generation) reject({ cancelled: true });
          else resolve(res);
        }, 20);
      });
    }
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, generation });
      this.worker.postMessage(Object.assign({ id }, opts));
    });
  }
}

const AI_LEVELS = [
  { id: 1, name: 'Principiante', elo: '~600', depth: 1, timeMs: 300, noise: 260 },
  { id: 2, name: 'Novato', elo: '~900', depth: 2, timeMs: 400, noise: 130 },
  { id: 3, name: 'Aficionado', elo: '~1200', depth: 3, timeMs: 600, noise: 55 },
  { id: 4, name: 'Club', elo: '~1500', depth: 4, timeMs: 900, noise: 18 },
  { id: 5, name: 'Avanzado', elo: '~1800', depth: 6, timeMs: 1500, noise: 0 },
  { id: 6, name: 'Experto', elo: '~2000+', depth: 12, timeMs: 3000, noise: 0 }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createChessAI, ChessAIClient, AI_LEVELS };
}
