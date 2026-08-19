(function (app) {

  /*
   * ============================================================
   * ROBCO BOTTLE CAP-FLIP
   * STATISTIC.JS
   * ============================================================
   *
   * Statistik:
   *
   * KOPF / ZAHL
   *
   * AKT. GEWINNSERIE
   * BESTE GEWINNSERIE
   *
   * AKT. VERLUSTSERIE
   * BESTE VERLUSTSERIE
   *
   * Die eigentlichen Werte werden von GAME.JS
   * in app.stats aktualisiert.
   *
   * Dauerhafte Speicherung:
   *
   * HOLO/RCBCF/RCBCFSave.JSON
   *
   * ============================================================
   */


  /*
   * ------------------------------------------------------------
   * SPEICHERDATEI
   * ------------------------------------------------------------
   */

  const STATS_FILE =
    'HOLO/RCBCF/RCBCFSave.JSON';


  /*
   * ------------------------------------------------------------
   * AUSWAHL
   * ------------------------------------------------------------
   *
   * Normales Menü:
   *
   * 0 = ZURÜCK
   * 1 = STATISTIK ZURÜCKSETZEN
   *
   * Reset-Bestätigung:
   *
   * 0 = JA
   * 1 = NEIN
   *
   * ------------------------------------------------------------
   */

  let selected = 0;

  let resetConfirm = false;


  /*
   * ------------------------------------------------------------
   * MENÜEINTRÄGE
   * ------------------------------------------------------------
   */

  const menuItems = [
    'back',
    'resetStats'
  ];


  /*
   * ------------------------------------------------------------
   * STANDARDWERTE
   * ------------------------------------------------------------
   */

  function createDefaultStats() {

    return {

      heads: 0,
      tails: 0,

      currentWinStreak: 0,
      bestWinStreak: 0,

      currentLossStreak: 0,
      bestLossStreak: 0

    };

  }


  /*
   * ------------------------------------------------------------
   * STATISTIK LADEN
   * ------------------------------------------------------------
   *
   * Wenn GAME.JS bereits app.stats besitzt,
   * werden diese Werte NICHT überschrieben.
   *
   * ------------------------------------------------------------
   */

  function loadStats() {

    /*
     * GAME.JS hat bereits einen Statistik-Speicher.
     *
     * NICHT überschreiben!
     */

    if (app.stats) {

      return true;

    }


    /*
     * Noch kein app.stats vorhanden.
     *
     * Gespeicherte Statistik laden.
     */

    try {

      const fs =
        require('fs');


      const data =
        fs.readFileSync(
          STATS_FILE
        );


      const loaded =
        JSON.parse(
          data
        );


      app.stats = {

        heads:
          typeof loaded.heads === 'number'
            ? loaded.heads
            : 0,


        tails:
          typeof loaded.tails === 'number'
            ? loaded.tails
            : 0,


        currentWinStreak:
          typeof loaded.currentWinStreak === 'number'
            ? loaded.currentWinStreak
            : 0,


        bestWinStreak:
          typeof loaded.bestWinStreak === 'number'
            ? loaded.bestWinStreak
            : 0,


        currentLossStreak:
          typeof loaded.currentLossStreak === 'number'
            ? loaded.currentLossStreak
            : 0,


        bestLossStreak:
          typeof loaded.bestLossStreak === 'number'
            ? loaded.bestLossStreak
            : 0

      };


      return true;

    } catch (e) {

      try {

        Pip.log(
          'C-Flip stats load failed: ' + e,
          'RCBCF'
        );

      } catch (logError) {}


      app.stats =
        createDefaultStats();


      return false;

    }

  }


  /*
   * ------------------------------------------------------------
   * STATISTIK SPEICHERN
   * ------------------------------------------------------------
   */

  function saveStats() {

    try {

      const fs =
        require('fs');


      if (!app.stats) {

        app.stats =
          createDefaultStats();

      }


      const data = {

        heads:
          typeof app.stats.heads === 'number'
            ? app.stats.heads
            : 0,


        tails:
          typeof app.stats.tails === 'number'
            ? app.stats.tails
            : 0,


        currentWinStreak:
          typeof app.stats.currentWinStreak === 'number'
            ? app.stats.currentWinStreak
            : 0,


        bestWinStreak:
          typeof app.stats.bestWinStreak === 'number'
            ? app.stats.bestWinStreak
            : 0,


        currentLossStreak:
          typeof app.stats.currentLossStreak === 'number'
            ? app.stats.currentLossStreak
            : 0,


        bestLossStreak:
          typeof app.stats.bestLossStreak === 'number'
            ? app.stats.bestLossStreak
            : 0

      };


      const json =
        JSON.stringify(
          data
        );


      fs.writeFileSync(
        STATS_FILE,
        json
      );


      return true;

    } catch (e) {

      try {

        Pip.log(
          'C-Flip stats save failed: ' + e,
          'RCBCF'
        );

      } catch (logError) {}


      return false;

    }

  }


  /*
   * ------------------------------------------------------------
   * STATISTIK INITIALISIEREN
   * ------------------------------------------------------------
   */

  loadStats();


  /*
   * ------------------------------------------------------------
   * HILFSFUNKTION
   * ------------------------------------------------------------
   */

  function value(v) {

    if (
      typeof v === 'number'
    ) {

      return v;

    }

    return 0;

  }


  /*
   * ============================================================
   * SPRACHE
   * ============================================================
   *
   * WICHTIG:
   *
   * Die Übersetzungen werden zuerst aus DE.JS / EN.JS
   * geladen.
   *
   * Falls ein Key dort fehlt, wird anhand der aktuell
   * eingestellten Sprache ein sicherer Fallback verwendet.
   *
   * Dadurch kann kein englischer Key versehentlich
   * auf dem deutschen Bildschirm erscheinen.
   *
   * ============================================================
   */

  function text(key, german, english) {

    /*
     * Sprache aus dem zentralen Loader holen.
     */

    let language = 'DE';


    try {

      if (
        app.getLanguage &&
        app.getLanguage() === 'EN'
      ) {

        language = 'EN';

      }

    } catch (e) {}


    /*
     * Übersetzung aus DE.JS / EN.JS versuchen.
     */

    try {

      const translated =
        app.text(key);


      /*
       * Wenn app.text() tatsächlich eine Übersetzung
       * geliefert hat, diese verwenden.
       *
       * Wenn lediglich der Key zurückkommt,
       * verwenden wir unseren Sprach-Fallback.
       */

      if (
        translated &&
        translated !== key
      ) {

        return translated;

      }

    } catch (e) {}


    /*
     * Sicherer Fallback.
     */

    if (
      language === 'EN'
    ) {

      return english;

    }


    return german;

  }


  /*
   * ------------------------------------------------------------
   * SPRACHTEXTE
   * ------------------------------------------------------------
   */

  function txtBack() {

    return text(
      'back',
      'ZURUECK',
      'BACK'
    );

  }


  function txtResetStats() {

    return text(
      'resetStats',
      'STATISTIK ZURUECKSETZEN',
      'RESET STATISTICS'
    );

  }


  function txtStatsTitle() {

    return text(
      'statsTitle',
      'STATISTIK',
      'STATISTICS'
    );

  }


  function txtFront() {

    return text(
      'front',
      'KOPF',
      'HEADS'
    );

  }


  function txtBackSide() {

    return text(
      'backSide',
      'ZAHL',
      'TAILS'
    );

  }


  function txtCurrentWinStreak() {

    return text(
      'currentWinStreak',
      'AKT. GEWINNSERIE',
      'CURRENT WIN STREAK'
    );

  }


  function txtBestWinStreak() {

    return text(
      'bestWinStreak',
      'BESTE GEWINNSERIE',
      'BEST WIN STREAK'
    );

  }


  function txtCurrentLossStreak() {

    return text(
      'currentLossStreak',
      'AKT. VERLUSTSERIE',
      'CURRENT LOSS STREAK'
    );

  }


  function txtBestLossStreak() {

    return text(
      'bestLossStreak',
      'BESTE VERLUSTSERIE',
      'BEST LOSS STREAK'
    );

  }


  function txtConfirmReset() {

    return text(
      'confirmReset',
      'STATISTIK ZURUECKSETZEN?',
      'RESET STATISTICS?'
    );

  }


  function txtYes() {

    return text(
      'yes',
      'JA',
      'YES'
    );

  }


  function txtNo() {

    return text(
      'no',
      'NEIN',
      'NO'
    );

  }


  function txtRobco() {

    return text(
      'robco',
      'ROBCO INDUSTRIES (TM)',
      'ROBCO INDUSTRIES (TM)'
    );

  }


  /*
   * ============================================================
   * STATISTIK ANZEIGEN
   * ============================================================
   */

  function drawStats() {

    h.reset().clear();


    h.setColor(3);

    h.setFontAlign(
      -1,
      0
    );


    /*
     * ----------------------------------------------------------
     * HEADER
     * ----------------------------------------------------------
     */

    h.setFont(
      'Monofonto23'
    );


    h.drawString(
      txtRobco(),
      20,
      25
    );


    h.setFont(
      'Monofonto18'
    );


    h.drawString(
      txtStatsTitle(),
      20,
      55
    );


    /*
     * ----------------------------------------------------------
     * STATISTIK
     * ----------------------------------------------------------
     */

    h.setFont(
      'Monofonto16'
    );


    /*
     * KOPF
     */

    h.drawString(
      txtFront(),
      35,
      95
    );


    h.drawString(
      String(
        value(
          app.stats.heads
        )
      ),
      300,
      95
    );


    /*
     * ZAHL
     */

    h.drawString(
      txtBackSide(),
      35,
      125
    );


    h.drawString(
      String(
        value(
          app.stats.tails
        )
      ),
      300,
      125
    );


    /*
     * ----------------------------------------------------------
     * GEWINNSERIEN
     * ----------------------------------------------------------
     */

    h.drawString(
      txtCurrentWinStreak(),
      35,
      165
    );


    h.drawString(
      String(
        value(
          app.stats.currentWinStreak
        )
      ),
      300,
      165
    );


    h.drawString(
      txtBestWinStreak(),
      35,
      195
    );


    h.drawString(
      String(
        value(
          app.stats.bestWinStreak
        )
      ),
      300,
      195
    );


    /*
     * ----------------------------------------------------------
     * VERLUSTSERIEN
     * ----------------------------------------------------------
     */

    h.drawString(
      txtCurrentLossStreak(),
      35,
      225
    );


    h.drawString(
      String(
        value(
          app.stats.currentLossStreak
        )
      ),
      300,
      225
    );


    h.drawString(
      txtBestLossStreak(),
      35,
      255
    );


    h.drawString(
      String(
        value(
          app.stats.bestLossStreak
        )
      ),
      300,
      255
    );


    /*
     * ----------------------------------------------------------
     * NORMALES MENÜ
     * ----------------------------------------------------------
     */

    h.setFont(
      'Monofonto14'
    );


    /*
     * ZURÜCK
     */

    if (
      selected === 0
    ) {

      h.drawString(
        '> ' + txtBack(),
        35,
        285
      );

    } else {

      h.drawString(
        '  ' + txtBack(),
        35,
        285
      );

    }


    /*
     * STATISTIK ZURÜCKSETZEN
     */

    if (
      selected === 1
    ) {

      h.drawString(
        '> ' + txtResetStats(),
        35,
        305
      );

    } else {

      h.drawString(
        '  ' + txtResetStats(),
        35,
        305
      );

    }


    /*
     * ----------------------------------------------------------
     * RESET-BESTÄTIGUNG
     * ----------------------------------------------------------
     */

    if (resetConfirm) {

      h.reset().clear();


      h.setColor(3);

      h.setFontAlign(
        -1,
        0
      );


      /*
       * HEADER
       */

      h.setFont(
        'Monofonto23'
      );


      h.drawString(
        txtRobco(),
        20,
        25
      );


      /*
       * RESET-FRAGE
       */

      h.setFont(
        'Monofonto18'
      );


      h.drawString(
        txtConfirmReset(),
        20,
        65
      );


      /*
       * JA / NEIN
       */

      h.setFont(
        'Monofonto16'
      );


      /*
       * JA ausgewählt
       */

      if (
        selected === 0
      ) {

        h.drawString(
          '> ' + txtYes(),
          60,
          130
        );


        h.drawString(
          '  ' + txtNo(),
          60,
          165
        );

      }


      /*
       * NEIN ausgewählt
       */

      else {

        h.drawString(
          '  ' + txtYes(),
          60,
          130
        );


        h.drawString(
          '> ' + txtNo(),
          60,
          165
        );

      }

    }


    /*
     * ----------------------------------------------------------
     * DISPLAY
     * ----------------------------------------------------------
     */

    h.flip();


    Pip.lastFlip =
      getTime();

  }


  /*
   * ============================================================
   * STATISTIK ZURÜCKSETZEN
   * ============================================================
   */

  function resetStats() {

    app.stats.heads = 0;

    app.stats.tails = 0;


    app.stats.currentWinStreak = 0;

    app.stats.bestWinStreak = 0;


    app.stats.currentLossStreak = 0;

    app.stats.bestLossStreak = 0;


    /*
     * Sofort dauerhaft speichern.
     */

    saveStats();

  }


  /*
   * ============================================================
   * KNOB 1
   * ============================================================
   */

  function onKnob1(dir) {


    /*
     * ----------------------------------------------------------
     * KNOB DREHEN
     * ----------------------------------------------------------
     */

    if (dir) {

      selected += dir;


      /*
       * RESET-BESTÄTIGUNG
       */

      if (resetConfirm) {

        if (
          selected < 0
        ) {

          selected = 1;

        }


        if (
          selected > 1
        ) {

          selected = 0;

        }

      }


      /*
       * NORMALES MENÜ
       */

      else {

        if (
          selected < 0
        ) {

          selected =
            menuItems.length - 1;

        }


        if (
          selected >=
          menuItems.length
        ) {

          selected = 0;

        }

      }


      drawStats();

      return;

    }


    /*
     * ----------------------------------------------------------
     * KNOB DRÜCKEN
     * ----------------------------------------------------------
     */


    /*
     * RESET-BESTÄTIGUNG
     */

    if (resetConfirm) {


      /*
       * JA
       */

      if (
        selected === 0
      ) {

        resetStats();


        resetConfirm = false;

        selected = 0;


        drawStats();


        return;

      }


      /*
       * NEIN
       */

      if (
        selected === 1
      ) {

        resetConfirm = false;

        selected = 0;


        drawStats();


        return;

      }

    }


    /*
     * ----------------------------------------------------------
     * NORMALES STATISTIK-MENÜ
     * ----------------------------------------------------------
     */


    /*
     * ZURÜCK
     */

    if (
      selected === 0
    ) {

      saveStats();


      app.go(
        app.scenes.MENU
      );


      return;

    }


    /*
     * STATISTIK ZURÜCKSETZEN
     */

    if (
      selected === 1
    ) {

      resetConfirm = true;

      selected = 0;


      drawStats();


      return;

    }

  }


  /*
   * ============================================================
   * INPUT
   * ============================================================
   */

  Pip.onExclusive(
    'knob1',
    onKnob1
  );


  /*
   * ============================================================
   * START
   * ============================================================
   */

  drawStats();


  /*
   * ============================================================
   * CLEANUP
   * ============================================================
   */

  return {

    remove: function () {


      /*
       * Letzte Speicherung.
       */

      saveStats();


      /*
       * Event Listener entfernen.
       */

      Pip.removeListener(
        'knob1',
        onKnob1
      );


      /*
       * Display zurücksetzen.
       */

      h.reset().clear();

      h.flip();

    }

  };


});