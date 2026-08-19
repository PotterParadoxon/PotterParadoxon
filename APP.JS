(function () {

  const HOLOTAPE_DIR = 'HOLO/RCBCF/';

  let scene = null;
  let currentLanguage = 'DE';
  let languageData = null;


  /*
   * Sprache laden
   */

  function loadLanguage(language) {

    let file;

    if (language === 'EN') {
      file = 'EN.JS';
    } else {
      file = 'DE.JS';
      language = 'DE';
    }

    try {

      languageData = eval(
        fs.readFileSync(
          HOLOTAPE_DIR + file
        )
      );

      currentLanguage = language;

      return true;

    } catch (e) {

      currentLanguage = 'DE';

      try {

        languageData = eval(
          fs.readFileSync(
            HOLOTAPE_DIR + 'DE.JS'
          )
        );

        return true;

      } catch (fallbackError) {

        languageData = {};
        return false;

      }

    }

  }


  /*
   * Deutsche Sprache beim Start laden
   */

  loadLanguage('DE');


  /*
   * Application object
   */

  const app = {

    scenes: {

      BOOT: 'BOOT.JS',
      MENU: 'MENU.JS',
      GAME: 'GAME.JS',
      STATS: 'STATS.JS',
      SETTINGS: 'SETTINGS.JS'

    },


    /*
     * Übersetzung abrufen
     */

    text: function (key) {

      if (
        languageData &&
        languageData[key]
      ) {

        return languageData[key];

      }

      return key;

    },


    /*
     * Sprache ändern
     */

    setLanguage: function (language) {

      if (
        language === 'DE' ||
        language === 'EN'
      ) {

        return loadLanguage(language);

      }

      return false;

    },


    /*
     * Aktuelle Sprache abrufen
     */

    getLanguage: function () {

      return currentLanguage;

    },


    /*
     * Szene laden
     */

    go: function (file) {

      try {

        /*
         * Alte Szene entfernen
         */

        if (
          scene &&
          scene.remove
        ) {

          scene.remove();

        }


        /*
         * Neue Szene laden
         */

        scene = eval(
          fs.readFileSync(
            HOLOTAPE_DIR + file
          )
        )(app);


      } catch (e) {

        h.reset().clear();

        h.setColor(3)

          .setFont('Monofonto23')

          .setFontAlign(0, 0)

          .drawString(
            'UNABLE TO LOAD',
            240,
            140
          );


        h.setFont('Monofonto14')

          .drawString(
            HOLOTAPE_DIR + file,
            240,
            175
          );


        h.flip();

        Pip.lastFlip = getTime();


        try {

          console.log(
            'RCBCF loader error: ' +
            e.message
          );

        } catch (logError) {}

      }

    },


    /*
     * Zurück zum Hauptmenü
     */

    backToMenu: function () {

      this.go(
        this.scenes.MENU
      );

    }

  };


  /*
   * Start Boot-Sequenz
   */

  app.go(
    app.scenes.BOOT
  );


  /*
   * Application descriptor
   */

  return {

    id: 'RCBCF',

    notDefault: true,

    fullscreen: true,


    remove: function () {

      if (
        scene &&
        scene.remove
      ) {

        scene.remove();

        scene = null;

      }


      /*
       * Sprachdaten freigeben
       */

      languageData = null;

    }

  };

});