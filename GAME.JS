(function (app) {

  const W = 480;
  const H = 320;

  let selection = 0;

  // 0 = KOPF / HEADS
  // 1 = ZAHL / TAILS
  // 2 = ZURUECK / BACK

  let gameState = 'menu';

  let flipFrame = 0;

  let result = 0;

  let win = false;

  let games = 0;

  let wins = 0;

  let losses = 0;

  let draws = 0;

  let BottlecapGraphics = null;


  // ============================================================
  // STATISTIK
  // ============================================================

  if (!app.stats) {

    app.stats = {

      heads: 0,

      tails: 0,

      currentWinStreak: 0,

      bestWinStreak: 0,

      currentLossStreak: 0,

      bestLossStreak: 0

    };

  }


  // ============================================================
  // BOTTLECAP GRAPHICS
  // ============================================================

  try {

    BottlecapGraphics = eval(
      fs.readFileSync(
        'HOLO/RCBCF/BOTTLECAPGRAPHICS.JS'
      )
    )(app);

  } catch (e) {

    BottlecapGraphics = null;

    try {

      console.log(
        'BOTTLECAPGRAPHICS.JS ERROR: ' +
        e.message
      );

    } catch (logError) {}

  }


  // ============================================================
  // SCHRIFT
  // ============================================================

  function fontSmall() {

    h.setFont(
      'Monofonto16'
    );

  }


  function fontLarge() {

    h.setFont(
      'Monofonto23'
    );

  }


  // ============================================================
  // TEXT
  // ============================================================

  function centerText(
    textValue,
    x,
    y
  ) {

    h.setFontAlign(
      0,
      0
    );

    h.drawString(
      textValue,
      x,
      y
    );

  }


  function leftText(
    textValue,
    x,
    y
  ) {

    h.setFontAlign(
      -1,
      0
    );

    h.drawString(
      textValue,
      x,
      y
    );

  }


  function rightText(
    textValue,
    x,
    y
  ) {

    h.setFontAlign(
      1,
      0
    );

    h.drawString(
      textValue,
      x,
      y
    );

  }


  // ============================================================
  // LINIE
  // ============================================================

  function line(
    x1,
    y1,
    x2,
    y2
  ) {

    h.drawLine(
      x1,
      y1,
      x2,
      y2
    );

  }


  // ============================================================
  // HEADER
  // ============================================================

  function drawHeader() {

    fontLarge();

    centerText(
      app.text('title'),
      240,
      25
    );

    line(
      25,
      43,
      455,
      43
    );

  }


  // ============================================================
  // AUSWAHL
  // ============================================================

  function drawSelection() {

    fontLarge();


    // ----------------------------------------------------------
    // KOPF / HEADS
    // ----------------------------------------------------------

    centerText(
      selection === 0
        ? '> ' + app.text('heads') + ' <'
        : '  ' + app.text('heads') + '  ',
      95,
      82
    );


    // ----------------------------------------------------------
    // ZAHL / TAILS
    // ----------------------------------------------------------

    centerText(
      selection === 1
        ? '> ' + app.text('tails') + ' <'
        : '  ' + app.text('tails') + '  ',
      95,
      116
    );


    // ----------------------------------------------------------
    // ZURUECK / BACK
    // ----------------------------------------------------------

    fontSmall();

    centerText(
      selection === 2
        ? '> ' + app.text('back') + ' <'
        : '  ' + app.text('back') + '  ',
      95,
      150
    );


    line(
      30,
      174,
      160,
      174
    );


    // ----------------------------------------------------------
    // BEDIENUNG
    // ----------------------------------------------------------

    leftText(
      app.text('rotateSelect'),
      30,
      205
    );

    leftText(
      app.text('pressFlip'),
      30,
      230
    );

  }


  // ============================================================
  // STATISTIK
  // ============================================================

  function drawStatistics() {

    line(
      350,
      58,
      350,
      265
    );


    fontLarge();

    leftText(
      app.text('statistics'),
      360,
      73
    );


    fontSmall();


    // ----------------------------------------------------------
    // SPIELE / GAMES
    // ----------------------------------------------------------

    leftText(
      app.text('games'),
      360,
      105
    );

    rightText(
      String(games),
      455,
      105
    );


    // ----------------------------------------------------------
    // GEWONNEN / WINS
    // ----------------------------------------------------------

    leftText(
      app.text('wins'),
      360,
      133
    );

    rightText(
      String(wins),
      455,
      133
    );


    // ----------------------------------------------------------
    // VERLOREN / LOSSES
    // ----------------------------------------------------------

    leftText(
      app.text('losses'),
      360,
      161
    );

    rightText(
      String(losses),
      455,
      161
    );


    // ----------------------------------------------------------
    // UNENTSCHIEDEN / DRAWS
    // ----------------------------------------------------------

    leftText(
      app.text('draws'),
      360,
      189
    );

    rightText(
      String(draws),
      455,
      189
    );


    line(
      360,
      207,
      455,
      207
    );


    // ----------------------------------------------------------
    // GEWINNQUOTE / WIN RATE
    // ----------------------------------------------------------

    leftText(
      app.text('winRate'),
      360,
      230
    );


    let quote = 0;


    if (
      games > 0
    ) {

      quote = Math.round(
        (wins / games) * 100
      );

    }


    rightText(
      quote + '%',
      455,
      250
    );

  }


  // ============================================================
  // KRONKORKEN
  // ============================================================

  function drawBottlecap(frame) {

    if (
      BottlecapGraphics &&
      BottlecapGraphics.drawFrame
    ) {

      BottlecapGraphics.drawFrame(
        frame
      );

      return;

    }


    fontSmall();

    centerText(
      app.text('graphicsError'),
      240,
      150
    );

  }


  // ============================================================
  // FUSSZEILE
  // ============================================================

  function drawFooter() {

    line(
      25,
      278,
      455,
      278
    );


    fontSmall();


    centerText(
      app.text('rotateSelect'),
      150,
      296
    );


    centerText(
      app.text('pressFlip'),
      350,
      296
    );

  }


  // ============================================================
  // ERGEBNIS-FUSSZEILE
  // ============================================================

  function drawResultFooter() {

    line(
      25,
      278,
      455,
      278
    );


    fontSmall();


    centerText(
      app.text('again'),
      150,
      296
    );


    centerText(
      app.text('backToMenu'),
      365,
      296
    );

  }


  // ============================================================
  // MENUE
  // ============================================================

  function drawMenu() {

    drawHeader();

    drawSelection();

    drawBottlecap(
      0
    );

    drawStatistics();

    drawFooter();

  }


  // ============================================================
  // FLIP
  // ============================================================

  function drawFlip() {

    drawHeader();


    drawBottlecap(
      flipFrame
    );


    fontLarge();

    centerText(
      app.text('flip'),
      95,
      82
    );


    fontSmall();

    centerText(
      app.text('pleaseWait'),
      95,
      116
    );


    drawStatistics();

    drawFooter();

  }


  // ============================================================
  // ERGEBNIS
  // ============================================================

  function drawResult() {

    drawHeader();


    drawBottlecap(
      result === 0
        ? 8
        : 3
    );


    fontLarge();


    centerText(
      result === 0
        ? app.text('heads')
        : app.text('tails'),
      95,
      82
    );


    fontSmall();


    centerText(
      win
        ? app.text('win')
        : app.text('lose'),
      95,
      116
    );


    drawStatistics();

    drawResultFooter();

  }


  // ============================================================
  // SCREEN
  // ============================================================

  function drawScreen() {

    h.reset().clear();


    if (
      gameState === 'menu'
    ) {

      drawMenu();

    }


    else if (
      gameState === 'flip'
    ) {

      drawFlip();

    }


    else if (
      gameState === 'result'
    ) {

      drawResult();

    }

  }


  // ============================================================
  // FLIP STARTEN
  // ============================================================

  function startFlip() {

    gameState = 'flip';

    flipFrame = 0;


    drawScreen();


    let frameTimer = null;


    frameTimer = setInterval(
      function () {

        flipFrame++;


        if (
          flipFrame >= 9
        ) {

          clearInterval(
            frameTimer
          );


          // ==================================================
          // ERGEBNIS ERMITTELN
          // ==================================================

          result =
            Math.floor(
              Math.random() * 2
            );


          games++;


          // ==================================================
          // KOPF / ZAHL STATISTIK
          // ==================================================

          if (
            result === 0
          ) {

            app.stats.heads++;

          }

          else {

            app.stats.tails++;

          }


          // ==================================================
          // GEWINN / VERLUST
          // ==================================================

          if (
            result === selection
          ) {

            win = true;

            wins++;


            // ----------------------------------------------
            // GEWINNSERIE
            // ----------------------------------------------

            app.stats.currentWinStreak++;

            app.stats.currentLossStreak = 0;


            if (
              app.stats.currentWinStreak >
              app.stats.bestWinStreak
            ) {

              app.stats.bestWinStreak =
                app.stats.currentWinStreak;

            }

          }


          else {

            win = false;

            losses++;


            // ----------------------------------------------
            // VERLUSTSERIE
            // ----------------------------------------------

            app.stats.currentLossStreak++;

            app.stats.currentWinStreak = 0;


            if (
              app.stats.currentLossStreak >
              app.stats.bestLossStreak
            ) {

              app.stats.bestLossStreak =
                app.stats.currentLossStreak;

            }

          }


          // ==================================================
          // ERGEBNIS ANZEIGEN
          // ==================================================

          gameState = 'result';

          drawScreen();

          return;

        }


        drawScreen();

      },
      140
    );

  }


  // ============================================================
  // ZURUECK INNERHALB C-FLIP
  // ============================================================

  function backToMenu() {

    gameState = 'menu';

    flipFrame = 0;

    selection = 0;


    drawScreen();

  }


  // ============================================================
  // KNOB 1
  // ============================================================

  function onKnob1(dir) {


    // ==========================================================
    // C-FLIP MENUE
    // ==========================================================

    if (
      gameState === 'menu'
    ) {


      // --------------------------------------------------------
      // NACH UNTEN
      // --------------------------------------------------------

      if (
        dir === 1
      ) {

        selection++;


        if (
          selection > 2
        ) {

          selection = 0;

        }


        drawScreen();

        return;

      }


      // --------------------------------------------------------
      // NACH OBEN
      // --------------------------------------------------------

      if (
        dir === -1
      ) {

        selection--;


        if (
          selection < 0
        ) {

          selection = 2;

        }


        drawScreen();

        return;

      }


      // --------------------------------------------------------
      // KNOB DRUECKEN
      // --------------------------------------------------------

      if (
        dir === 0
      ) {


        // ======================================================
        // ZURUECK ZUM HAUPTMENUE
        // ======================================================

        if (
          selection === 2
        ) {

          app.go(
            app.scenes.MENU
          );

          return;

        }


        // ======================================================
        // KOPF / ZAHL
        // ======================================================

        startFlip();

        return;

      }

    }


    // ==========================================================
    // ERGEBNIS
    // ==========================================================

    if (
      gameState === 'result'
    ) {

      if (
        dir === 0
      ) {

        backToMenu();

        return;

      }

    }

  }


  // ============================================================
  // KNOB
  // ============================================================

  Pip.on(
    'knob1',
    onKnob1
  );


  // ============================================================
  // INITIAL DISPLAY
  // ============================================================

  drawScreen();


  // ============================================================
  // CLEANUP
  // ============================================================

  return {

    id: 'RCBCF',

    notDefault: true,

    fullscreen: true,


    remove: function () {

      try {

        Pip.removeListener(
          'knob1',
          onKnob1
        );

      } catch (e) {}

    }

  };

});