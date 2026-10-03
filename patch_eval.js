const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Insert evalClient
code = code.replace(
  "aiClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,",
  "aiClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,\n    evalClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,"
);

// Insert DOM elements and updateEvalBar function before function loadOpening
const evalFunc = `
  const evalBarFill = document.getElementById('eval-bar-fill');
  const evalBarText = document.getElementById('eval-bar-text');

  function updateEvalBar() {
    if (!state.evalClient) return;
    const fen = state.engine.getFen();
    if (state.engine.isGameOver()) {
       if (state.engine.isCheckmate()) {
          const isWhiteTurn = state.engine.turn === 'w';
          const mateScore = isWhiteTurn ? -1 : 1;
          renderEvalScore({ mate: mateScore });
       } else {
          renderEvalScore({ score: 0 });
       }
       return;
    }
    
    state.evalClient.cancelAll();
    state.evalClient.think({ fen, depth: 5, timeMs: 150 }).then(res => {
      renderEvalScore(res);
    }).catch(() => {});
  }
  
  function renderEvalScore(res) {
      let scoreStr = "0.0";
      let percentage = 50;
      
      if (res.mate) {
        scoreStr = res.mate > 0 ? "+M" + res.mate : "-M" + Math.abs(res.mate);
        percentage = res.mate > 0 ? 100 : 0;
      } else if (res.score !== undefined) {
        const cp = res.score / 100;
        scoreStr = (cp > 0 ? "+" : "") + cp.toFixed(1);
        const winPct = 2 / (1 + Math.exp(-cp / 1.5)) - 1;
        percentage = 50 + winPct * 50;
      }
      
      if (state.boardUI.orientation === 'b') {
        percentage = 100 - percentage;
        evalBarFill.style.backgroundColor = '#1e293b';
        evalBarFill.parentElement.style.backgroundColor = '#f8fafc';
      } else {
        evalBarFill.style.backgroundColor = '#f8fafc';
        evalBarFill.parentElement.style.backgroundColor = '#1e293b';
      }
      
      evalBarFill.style.height = percentage + '%';
      evalBarText.textContent = scoreStr;
  }

  function loadOpening`;

code = code.replace("  function loadOpening", evalFunc);

// Inject updateEvalBar() at key points
code = code.replace(/setStudyStep\(step\) \{[\s\S]*?state\.boardUI\.render\(\);/g, match => match + "\n    updateEvalBar();");
code = code.replace(/btnUndo\.addEventListener\('click', \(\) => \{[\s\S]*?state\.boardUI\.render\(\);\n    \}/g, match => match + "\n    updateEvalBar();");
code = code.replace(/btnRestart\.addEventListener\('click', \(\) => \{[\s\S]*?state\.boardUI\.render\(\);\n      checkAIMove\(\);\n    \}/g, match => match + "\n      updateEvalBar();");

// also inside checkAIMove .then()
code = code.replace(/state\.boardUI\.render\(\);\n            checkGameOver\(\);\n          \}/g, "state.boardUI.render();\n            updateEvalBar();\n            checkGameOver();\n          }");

// also inside handleUserBoardMove
code = code.replace(/state\.boardUI\.render\(\);\n    return true;/g, "state.boardUI.render();\n    updateEvalBar();\n    return true;");

fs.writeFileSync('app.js', code);
