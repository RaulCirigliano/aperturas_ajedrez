import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
  "aiClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,",
  "aiClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,\n    evalClient: typeof ChessAIClient !== 'undefined' ? new ChessAIClient() : null,"
)

eval_func = """
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
      if (!evalBarFill) return;
      let scoreStr = "0.0";
      let percentage = 50;
      
      if (res.mate) {
        scoreStr = res.mate > 0 ? "+M" + res.mate : "-M" + abs(res.mate);
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
        evalBarText.style.color = '#1e293b';
      } else {
        evalBarFill.style.backgroundColor = '#f8fafc';
        evalBarFill.parentElement.style.backgroundColor = '#1e293b';
        evalBarText.style.color = '#f8fafc';
      }
      
      evalBarFill.style.height = percentage + '%';
      evalBarText.textContent = scoreStr;
  }

  function loadOpening"""

code = code.replace("  function loadOpening", eval_func)

code = re.sub(r'(setStudyStep\(step\) \{[\s\S]*?state\.boardUI\.render\(\);)', r'\1\n    updateEvalBar();', code)
code = re.sub(r"(btnUndo\.addEventListener\('click', \(\) => \{[\s\S]*?state\.boardUI\.render\(\);\n    \})", r'\1\n    updateEvalBar();', code)
code = re.sub(r"(btnRestart\.addEventListener\('click', \(\) => \{[\s\S]*?state\.boardUI\.render\(\);\n      checkAIMove\(\);\n    \})", r'\1\n      updateEvalBar();', code)
code = code.replace("state.boardUI.render();\n            checkGameOver();", "state.boardUI.render();\n            updateEvalBar();\n            checkGameOver();")
code = code.replace("state.boardUI.render();\n    return true;", "state.boardUI.render();\n    updateEvalBar();\n    return true;")
code = code.replace("state.boardUI.flip();\n    updatePlayerLabels();\n    checkAIMove();", "state.boardUI.flip();\n    updatePlayerLabels();\n    updateEvalBar();\n    checkAIMove();")


with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

