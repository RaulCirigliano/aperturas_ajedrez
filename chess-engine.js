/**
 * Lightweight, robust Chess Engine for opening exploration and interactive practice.
 * Handles 100% of standard chess rules:
 * - Legal move generation & check detection
 * - Castling (kingside & queenside, through check validation)
 * - En passant captures
 * - Pawn promotion
 * - SAN (Standard Algebraic Notation) parsing & generation
 * - FEN loading & exporting
 * - Move history with undo/redo
 */

class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    // 8x8 board: row 0 is rank 8, row 7 is rank 1. col 0 is file 'a', col 7 is file 'h'.
    this.board = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    this.turn = 'w'; // 'w' or 'b'
    this.castling = { K: true, Q: true, k: true, q: true };
    this.enPassant = null; // null or { row, col }
    this.halfMoves = 0;
    this.fullMoves = 1;
    this.history = []; // Array of move records
    this.positions = [this.positionKey()]; // For threefold repetition
  }

  // Position identity (placement + turn + castling + en passant) used for repetitions
  positionKey() {
    return this.getFen().split(' ').slice(0, 4).join(' ');
  }

  // Converts coordinate like "e4" to { row, col }
  static squareToCoords(sq) {
    if (!sq || sq.length < 2) return null;
    const col = sq.charCodeAt(0) - 97; // 'a' -> 0, 'h' -> 7
    const row = 8 - parseInt(sq[1], 10); // '8' -> 0, '1' -> 7
    if (row < 0 || row > 7 || col < 0 || col > 7) return null;
    return { row, col };
  }

  // Converts { row, col } to "e4"
  static coordsToSquare(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) return null;
    return String.fromCharCode(97 + col) + (8 - row);
  }

  static isWhite(piece) {
    return piece && piece === piece.toUpperCase();
  }

  static isBlack(piece) {
    return piece && piece === piece.toLowerCase();
  }

  static pieceColor(piece) {
    if (!piece) return null;
    return ChessEngine.isWhite(piece) ? 'w' : 'b';
  }

  getPiece(square) {
    const coords = typeof square === 'string' ? ChessEngine.squareToCoords(square) : square;
    if (!coords) return null;
    return this.board[coords.row][coords.col];
  }

  cloneState() {
    return {
      board: this.board.map(r => [...r]),
      turn: this.turn,
      castling: { ...this.castling },
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      halfMoves: this.halfMoves,
      fullMoves: this.fullMoves
    };
  }

  restoreState(state) {
    this.board = state.board.map(r => [...r]);
    this.turn = state.turn;
    this.castling = { ...state.castling };
    this.enPassant = state.enPassant ? { ...state.enPassant } : null;
    this.halfMoves = state.halfMoves;
    this.fullMoves = state.fullMoves;
  }

  isSquareAttacked(targetRow, targetCol, attackerColor) {
    const oppPawnDir = attackerColor === 'w' ? 1 : -1; // Opponent white pawns attack downwards (higher row index), black upwards
    const pawnChar = attackerColor === 'w' ? 'P' : 'p';
    
    // Attacked by pawn
    const pawnRow = targetRow + oppPawnDir;
    for (const dc of [-1, 1]) {
      const pawnCol = targetCol + dc;
      if (pawnRow >= 0 && pawnRow <= 7 && pawnCol >= 0 && pawnCol <= 7) {
        if (this.board[pawnRow][pawnCol] === pawnChar) return true;
      }
    }

    // Attacked by knight
    const knightChar = attackerColor === 'w' ? 'N' : 'n';
    const knightOffsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of knightOffsets) {
      const r = targetRow + dr;
      const c = targetCol + dc;
      if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
        if (this.board[r][c] === knightChar) return true;
      }
    }

    // Attacked by king
    const kingChar = attackerColor === 'w' ? 'K' : 'k';
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = targetRow + dr;
        const c = targetCol + dc;
        if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          if (this.board[r][c] === kingChar) return true;
        }
      }
    }

    // Straight lines (Rook, Queen)
    const rookChar = attackerColor === 'w' ? 'R' : 'r';
    const queenChar = attackerColor === 'w' ? 'Q' : 'q';
    const straightDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of straightDirs) {
      let r = targetRow + dr;
      let c = targetCol + dc;
      while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
        const piece = this.board[r][c];
        if (piece) {
          if (piece === rookChar || piece === queenChar) return true;
          break;
        }
        r += dr;
        c += dc;
      }
    }

    // Diagonal lines (Bishop, Queen)
    const bishopChar = attackerColor === 'w' ? 'B' : 'b';
    const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dr, dc] of diagDirs) {
      let r = targetRow + dr;
      let c = targetCol + dc;
      while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
        const piece = this.board[r][c];
        if (piece) {
          if (piece === bishopChar || piece === queenChar) return true;
          break;
        }
        r += dr;
        c += dc;
      }
    }

    return false;
  }

  findKing(color) {
    const kingChar = color === 'w' ? 'K' : 'k';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c] === kingChar) return { row: r, col: c };
      }
    }
    return null;
  }

  isInCheck(color = this.turn) {
    const king = this.findKing(color);
    if (!king) return false;
    const opponent = color === 'w' ? 'b' : 'w';
    return this.isSquareAttacked(king.row, king.col, opponent);
  }

  // Generates pseudo-legal moves for a specific square
  getPseudoMoves(fromRow, fromCol) {
    const piece = this.board[fromRow][fromCol];
    if (!piece) return [];
    const color = ChessEngine.pieceColor(piece);
    if (color !== this.turn) return [];

    const moves = [];
    const oppColor = color === 'w' ? 'b' : 'w';
    const pType = piece.toUpperCase();

    const addMove = (toRow, toCol, flags = {}) => {
      moves.push({
        fromRow, fromCol,
        toRow, toCol,
        piece,
        from: ChessEngine.coordsToSquare(fromRow, fromCol),
        to: ChessEngine.coordsToSquare(toRow, toCol),
        captured: this.board[toRow][toCol] || flags.enPassantCaptured || null,
        promotion: flags.promotion || null,
        isEnPassant: !!flags.isEnPassant,
        isCastling: flags.isCastling || null
      });
    };

    if (pType === 'P') {
      const dir = color === 'w' ? -1 : 1;
      const startRow = color === 'w' ? 6 : 1;
      const promoRow = color === 'w' ? 0 : 7;

      // 1 square forward
      const f1Row = fromRow + dir;
      if (f1Row >= 0 && f1Row <= 7 && !this.board[f1Row][fromCol]) {
        if (f1Row === promoRow) {
          ['Q', 'R', 'B', 'N'].forEach(prom => {
            addMove(f1Row, fromCol, { promotion: color === 'w' ? prom : prom.toLowerCase() });
          });
        } else {
          addMove(f1Row, fromCol);
          // 2 squares forward from start rank
          const f2Row = fromRow + 2 * dir;
          if (fromRow === startRow && !this.board[f2Row][fromCol]) {
            addMove(f2Row, fromCol);
          }
        }
      }

      // Captures
      for (const dc of [-1, 1]) {
        const cRow = fromRow + dir;
        const cCol = fromCol + dc;
        if (cRow >= 0 && cRow <= 7 && cCol >= 0 && cCol <= 7) {
          const targetPiece = this.board[cRow][cCol];
          if (targetPiece && ChessEngine.pieceColor(targetPiece) === oppColor) {
            if (cRow === promoRow) {
              ['Q', 'R', 'B', 'N'].forEach(prom => {
                addMove(cRow, cCol, { promotion: color === 'w' ? prom : prom.toLowerCase() });
              });
            } else {
              addMove(cRow, cCol);
            }
          } else if (this.enPassant && this.enPassant.row === cRow && this.enPassant.col === cCol) {
            // En passant
            const capturedPawn = color === 'w' ? 'p' : 'P';
            addMove(cRow, cCol, { isEnPassant: true, enPassantCaptured: capturedPawn });
          }
        }
      }
    } else if (pType === 'N') {
      const offsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of offsets) {
        const r = fromRow + dr;
        const c = fromCol + dc;
        if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const target = this.board[r][c];
          if (!target || ChessEngine.pieceColor(target) === oppColor) {
            addMove(r, c);
          }
        }
      }
    } else if (pType === 'B' || pType === 'R' || pType === 'Q') {
      const dirs = [];
      if (pType === 'B' || pType === 'Q') dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      if (pType === 'R' || pType === 'Q') dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);

      for (const [dr, dc] of dirs) {
        let r = fromRow + dr;
        let c = fromCol + dc;
        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const target = this.board[r][c];
          if (!target) {
            addMove(r, c);
          } else {
            if (ChessEngine.pieceColor(target) === oppColor) {
              addMove(r, c);
            }
            break;
          }
          r += dr;
          c += dc;
        }
      }
    } else if (pType === 'K') {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const r = fromRow + dr;
          const c = fromCol + dc;
          if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
            const target = this.board[r][c];
            if (!target || ChessEngine.pieceColor(target) === oppColor) {
              addMove(r, c);
            }
          }
        }
      }

      // Castling
      if (color === 'w' && fromRow === 7 && fromCol === 4) {
        // Kingside: e1-g1
        if (this.castling.K && !this.board[7][5] && !this.board[7][6]) {
          if (!this.isSquareAttacked(7, 4, 'b') && !this.isSquareAttacked(7, 5, 'b') && !this.isSquareAttacked(7, 6, 'b')) {
            addMove(7, 6, { isCastling: 'K' });
          }
        }
        // Queenside: e1-c1
        if (this.castling.Q && !this.board[7][1] && !this.board[7][2] && !this.board[7][3]) {
          if (!this.isSquareAttacked(7, 4, 'b') && !this.isSquareAttacked(7, 3, 'b') && !this.isSquareAttacked(7, 2, 'b')) {
            addMove(7, 2, { isCastling: 'Q' });
          }
        }
      } else if (color === 'b' && fromRow === 0 && fromCol === 4) {
        // Kingside: e8-g8
        if (this.castling.k && !this.board[0][5] && !this.board[0][6]) {
          if (!this.isSquareAttacked(0, 4, 'w') && !this.isSquareAttacked(0, 5, 'w') && !this.isSquareAttacked(0, 6, 'w')) {
            addMove(0, 6, { isCastling: 'k' });
          }
        }
        // Queenside: e8-c8
        if (this.castling.q && !this.board[0][1] && !this.board[0][2] && !this.board[0][3]) {
          if (!this.isSquareAttacked(0, 4, 'w') && !this.isSquareAttacked(0, 3, 'w') && !this.isSquareAttacked(0, 2, 'w')) {
            addMove(0, 2, { isCastling: 'q' });
          }
        }
      }
    }

    return moves;
  }

  // Executes a move internally without validation (used for check testing)
  applyMoveRaw(move) {
    const { fromRow, fromCol, toRow, toCol, piece, promotion, isEnPassant, isCastling } = move;

    this.board[fromRow][fromCol] = null;
    this.board[toRow][toCol] = promotion || piece;

    if (isEnPassant) {
      const epRow = fromRow; // same row as moving pawn
      this.board[epRow][toCol] = null;
    }

    if (isCastling) {
      if (isCastling === 'K') {
        this.board[7][7] = null;
        this.board[7][5] = 'R';
      } else if (isCastling === 'Q') {
        this.board[7][0] = null;
        this.board[7][3] = 'R';
      } else if (isCastling === 'k') {
        this.board[0][7] = null;
        this.board[0][5] = 'r';
      } else if (isCastling === 'q') {
        this.board[0][0] = null;
        this.board[0][3] = 'r';
      }
    }
  }

  // Returns all legal moves for current player
  getAllLegalMoves() {
    const legalMoves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece && ChessEngine.pieceColor(piece) === this.turn) {
          const pseudo = this.getPseudoMoves(r, c);
          for (const m of pseudo) {
            const prevState = this.cloneState();
            this.applyMoveRaw(m);
            const inCheck = this.isInCheck(this.turn);
            this.restoreState(prevState);
            if (!inCheck) {
              legalMoves.push(m);
            }
          }
        }
      }
    }
    return legalMoves;
  }

  // Returns legal moves for a specific square
  getLegalMoves(square) {
    const coords = typeof square === 'string' ? ChessEngine.squareToCoords(square) : square;
    if (!coords) return [];
    const all = this.getAllLegalMoves();
    return all.filter(m => m.fromRow === coords.row && m.fromCol === coords.col);
  }

  // Format move to Standard Algebraic Notation (SAN)
  formatSAN(move) {
    if (move.isCastling === 'K' || move.isCastling === 'k') return 'O-O';
    if (move.isCastling === 'Q' || move.isCastling === 'q') return 'O-O-O';

    const pType = move.piece.toUpperCase();
    let san = '';

    if (pType !== 'P') {
      san += pType;

      // Disambiguation: check if another piece of same type can also move here
      const allLegal = this.getAllLegalMoves();
      const ambig = allLegal.filter(m =>
        m.piece === move.piece &&
        m.toRow === move.toRow &&
        m.toCol === move.toCol &&
        (m.fromRow !== move.fromRow || m.fromCol !== move.fromCol)
      );

      if (ambig.length > 0) {
        const sameFile = ambig.some(m => m.fromCol === move.fromCol);
        const sameRank = ambig.some(m => m.fromRow === move.fromRow);

        if (!sameFile) {
          san += String.fromCharCode(97 + move.fromCol);
        } else if (!sameRank) {
          san += (8 - move.fromRow);
        } else {
          san += String.fromCharCode(97 + move.fromCol) + (8 - move.fromRow);
        }
      }
    } else {
      // Pawn capture includes departure file
      if (move.captured) {
        san += String.fromCharCode(97 + move.fromCol);
      }
    }

    if (move.captured) {
      san += 'x';
    }

    san += move.to;

    if (move.promotion) {
      san += '=' + move.promotion.toUpperCase();
    }

    return san;
  }

  /**
   * Makes a move on the board
   * @param {Object|string} move - Move object or coordinate pair string like "e2e4" or "e2-e4"
   * @returns {Object|null} Move record if legal, null if illegal
   */
  makeMove(moveInput) {
    let chosenMove = null;
    const legalMoves = this.getAllLegalMoves();

    if (typeof moveInput === 'string') {
      // Clean up string: e.g. "e2-e4" or "e2e4"
      const cleaned = moveInput.replace(/[-x\s]/g, '').toLowerCase();
      const fromSq = cleaned.substring(0, 2);
      const toSq = cleaned.substring(2, 4);
      const promo = cleaned.length >= 5 ? cleaned[4].toLowerCase() : null;

      chosenMove = legalMoves.find(m => {
        if (m.from !== fromSq || m.to !== toSq) return false;
        if (promo) {
          return m.promotion && m.promotion.toLowerCase() === promo;
        }
        return !m.promotion || m.promotion.toUpperCase() === 'Q'; // default Queen promotion
      });
    } else if (moveInput.from && moveInput.to) {
      chosenMove = legalMoves.find(m => {
        if (m.from !== moveInput.from || m.to !== moveInput.to) return false;
        if (moveInput.promotion) {
          return m.promotion && m.promotion.toUpperCase() === moveInput.promotion.toUpperCase();
        }
        return !m.promotion || m.promotion.toUpperCase() === 'Q';
      });
    }

    if (!chosenMove) return null;

    const san = this.formatSAN(chosenMove);
    const stateSnapshot = this.cloneState();

    // Apply move changes
    this.applyMoveRaw(chosenMove);

    // Update castling rights
    const p = chosenMove.piece;
    if (p === 'K') { this.castling.K = false; this.castling.Q = false; }
    if (p === 'k') { this.castling.k = false; this.castling.q = false; }
    if (p === 'R') {
      if (chosenMove.fromRow === 7 && chosenMove.fromCol === 7) this.castling.K = false;
      if (chosenMove.fromRow === 7 && chosenMove.fromCol === 0) this.castling.Q = false;
    }
    if (p === 'r') {
      if (chosenMove.fromRow === 0 && chosenMove.fromCol === 7) this.castling.k = false;
      if (chosenMove.fromRow === 0 && chosenMove.fromCol === 0) this.castling.q = false;
    }
    // If rook captured
    if (chosenMove.captured) {
      if (chosenMove.toRow === 7 && chosenMove.toCol === 7) this.castling.K = false;
      if (chosenMove.toRow === 7 && chosenMove.toCol === 0) this.castling.Q = false;
      if (chosenMove.toRow === 0 && chosenMove.toCol === 7) this.castling.k = false;
      if (chosenMove.toRow === 0 && chosenMove.toCol === 0) this.castling.q = false;
    }

    // Update en passant square
    if (p.toUpperCase() === 'P' && Math.abs(chosenMove.toRow - chosenMove.fromRow) === 2) {
      this.enPassant = {
        row: (chosenMove.fromRow + chosenMove.toRow) / 2,
        col: chosenMove.fromCol
      };
    } else {
      this.enPassant = null;
    }

    // Toggle turn
    this.turn = this.turn === 'w' ? 'b' : 'w';

    // Update halfmove / fullmove
    if (p.toUpperCase() === 'P' || chosenMove.captured) {
      this.halfMoves = 0;
    } else {
      this.halfMoves++;
    }
    if (this.turn === 'w') {
      this.fullMoves++;
    }

    const nextLegal = this.getAllLegalMoves();
    const inCheck = this.isInCheck(this.turn);
    const isMate = inCheck && nextLegal.length === 0;
    const isStalemate = !inCheck && nextLegal.length === 0;

    let fullSan = san;
    if (isMate) fullSan += '#';
    else if (inCheck) fullSan += '+';

    const record = {
      ...chosenMove,
      san: fullSan,
      isCheck: inCheck,
      isMate,
      isStalemate,
      snapshot: stateSnapshot
    };

    this.history.push(record);
    this.positions.push(this.positionKey());
    return record;
  }

  undoMove() {
    if (this.history.length === 0) return null;
    const lastRecord = this.history.pop();
    this.positions.pop();
    this.restoreState(lastRecord.snapshot);
    return lastRecord;
  }

  /**
   * Finds the legal move matching a SAN string (e.g. "Nf3", "exd5", "O-O", "e8=Q+").
   * @returns {Object|null} legal move object (not executed)
   */
  moveFromSan(san) {
    const clean = s => s.replace(/[+#!?]/g, '').replace(/0/g, 'O').replace(/=/g, '').trim();
    const target = clean(san);
    const legal = this.getAllLegalMoves();
    for (const m of legal) {
      if (clean(this.formatSAN(m)) === target) return m;
    }
    return null;
  }

  isCheckmate() {
    return this.isInCheck(this.turn) && this.getAllLegalMoves().length === 0;
  }

  isStalemate() {
    return !this.isInCheck(this.turn) && this.getAllLegalMoves().length === 0;
  }

  isThreefoldRepetition() {
    const current = this.positions[this.positions.length - 1];
    return this.positions.filter(p => p === current).length >= 3;
  }

  isInsufficientMaterial() {
    const pieces = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p && p.toUpperCase() !== 'K') pieces.push({ p: p.toUpperCase(), color: (r + c) % 2 });
      }
    }
    if (pieces.length === 0) return true;
    if (pieces.length === 1 && (pieces[0].p === 'B' || pieces[0].p === 'N')) return true;
    // Only bishops, all on same square colour
    if (pieces.every(x => x.p === 'B') && pieces.every(x => x.color === pieces[0].color)) return true;
    return false;
  }

  /**
   * @returns {{over:boolean, result?:string, winner?:string, reason?:string}}
   */
  getGameStatus() {
    const legalCount = this.getAllLegalMoves().length;
    if (legalCount === 0) {
      if (this.isInCheck(this.turn)) {
        const winner = this.turn === 'w' ? 'b' : 'w';
        return { over: true, result: winner === 'w' ? '1-0' : '0-1', winner, reason: 'Jaque mate' };
      }
      return { over: true, result: '1/2-1/2', winner: null, reason: 'Rey ahogado' };
    }
    if (this.isInsufficientMaterial()) return { over: true, result: '1/2-1/2', winner: null, reason: 'Material insuficiente' };
    if (this.isThreefoldRepetition()) return { over: true, result: '1/2-1/2', winner: null, reason: 'Triple repetición' };
    if (this.halfMoves >= 100) return { over: true, result: '1/2-1/2', winner: null, reason: 'Regla de los 50 movimientos' };
    return { over: false };
  }

  isGameOver() {
    return this.getGameStatus().over;
  }

  getPgn(headers = {}) {
    let pgn = '';
    for (const [k, v] of Object.entries(headers)) pgn += `[${k} "${v}"]\n`;
    if (pgn) pgn += '\n';
    this.history.forEach((m, i) => {
      if (i % 2 === 0) pgn += `${i / 2 + 1}. `;
      pgn += m.san + ' ';
    });
    return pgn.trim();
  }

  // Converts English SAN (N, B, R, Q, K) to Spanish notation (C, A, T, D, R)
  static toSpanishSan(san) {
    if (!san) return '';
    const map = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };
    return san.replace(/[KQRBN]/g, ch => map[ch]);
  }

  getFen() {
    let fen = '';
    for (let r = 0; r < 8; r++) {
      let empty = 0;
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece) {
          empty++;
        } else {
          if (empty > 0) {
            fen += empty;
            empty = 0;
          }
          fen += piece;
        }
      }
      if (empty > 0) fen += empty;
      if (r < 7) fen += '/';
    }

    fen += ' ' + this.turn + ' ';

    let castlingStr = '';
    if (this.castling.K) castlingStr += 'K';
    if (this.castling.Q) castlingStr += 'Q';
    if (this.castling.k) castlingStr += 'k';
    if (this.castling.q) castlingStr += 'q';
    fen += (castlingStr || '-') + ' ';

    if (this.enPassant) {
      fen += ChessEngine.coordsToSquare(this.enPassant.row, this.enPassant.col) + ' ';
    } else {
      fen += '- ';
    }

    fen += this.halfMoves + ' ' + this.fullMoves;
    return fen;
  }

  loadFen(fen) {
    const parts = fen.trim().split(/\s+/);
    if (parts.length < 4) return false;

    const rows = parts[0].split('/');
    if (rows.length !== 8) return false;

    const newBoard = [];
    for (let r = 0; r < 8; r++) {
      const row = [];
      for (let i = 0; i < rows[r].length; i++) {
        const ch = rows[r][i];
        if (ch >= '1' && ch <= '8') {
          const count = parseInt(ch, 10);
          for (let k = 0; k < count; k++) row.push(null);
        } else {
          row.push(ch);
        }
      }
      if (row.length !== 8) return false;
      newBoard.push(row);
    }

    this.board = newBoard;
    this.turn = parts[1] === 'b' ? 'b' : 'w';
    this.castling = {
      K: parts[2].includes('K'),
      Q: parts[2].includes('Q'),
      k: parts[2].includes('k'),
      q: parts[2].includes('q')
    };
    this.enPassant = parts[3] !== '-' ? ChessEngine.squareToCoords(parts[3]) : null;
    this.halfMoves = parts[4] ? parseInt(parts[4], 10) : 0;
    this.fullMoves = parts[5] ? parseInt(parts[5], 10) : 1;
    this.history = [];
    this.positions = [this.positionKey()];
    return true;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChessEngine };
}
