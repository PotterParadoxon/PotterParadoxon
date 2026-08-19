(function (app) {

    let screen = 0;
    let selected = 0;


    /*
     * ============================================================
     * SPRACHE
     * ============================================================
     *
     * app.text() bleibt die zentrale Sprachquelle.
     *
     * Falls ein Key in DE.JS / EN.JS fehlt, wird automatisch
     * der passende Fallback verwendet.
     *
     * ============================================================
     */

    function text(key, german, english) {

        let language = "DE";


        /*
         * Aktuelle Sprache feststellen
         */

        try {

            if (
                app.getLanguage &&
                app.getLanguage() === "EN"
            ) {

                language = "EN";

            }

        } catch (e) {}


        /*
         * Übersetzung aus DE.JS / EN.JS versuchen
         */

        try {

            const translated =
                app.text(key);


            /*
             * Nur verwenden, wenn app.text()
             * tatsächlich eine Übersetzung gefunden hat.
             */

            if (
                translated &&
                translated !== key
            ) {

                return translated;

            }

        } catch (e) {}


        /*
         * Sicherer Fallback
         */

        if (
            language === "EN"
        ) {

            return english;

        }


        return german;

    }


    /*
     * ============================================================
     * SPRACHTEXTE
     * ============================================================
     */

    function txtRobco() {

        return text(
            "robco",
            "ROBCO INDUSTRIES (TM)",
            "ROBCO INDUSTRIES (TM)"
        );

    }


    function txtSettings() {

        return text(
            "settings",
            "EINSTELLUNGEN",
            "SETTINGS"
        );

    }


    function txtLanguage() {

        return text(
            "language",
            "SPRACHE",
            "LANGUAGE"
        );

    }


    function txtBack() {

        return text(
            "back",
            "ZURUECK",
            "BACK"
        );

    }


    function txtGerman() {

        return text(
            "german",
            "DEUTSCH",
            "GERMAN"
        );

    }


    function txtEnglish() {

        return text(
            "english",
            "ENGLISCH",
            "ENGLISH"
        );

    }


    function txtSelected() {

        return text(
            "selected",
            "AUSGEWAEHLT",
            "SELECTED"
        );

    }


    /*
     * ============================================================
     * EINSTELLUNGEN
     * ============================================================
     */

    function drawSettings() {

        h.reset().clear();

        h.setColor(3);
        h.setFontAlign(-1, 0);


        /*
         * HEADER
         */

        h.setFont("Monofonto23")
            .drawString(
                txtRobco(),
                20,
                30
            );


        /*
         * TITEL
         */

        h.setFont("Monofonto18")
            .drawString(
                txtSettings(),
                20,
                65
            );


        /*
         * EINTRÄGE
         */

        h.setFont("Monofonto16");


        /*
         * SPRACHE
         */

        h.drawString(
            (selected === 0 ? "> " : "  ") +
            txtLanguage(),
            30,
            115
        );


        /*
         * ZURÜCK
         */

        h.drawString(
            (selected === 1 ? "> " : "  ") +
            txtBack(),
            30,
            155
        );


        h.flip();

        Pip.lastFlip =
            getTime();

    }


    /*
     * ============================================================
     * SPRACHAUSWAHL
     * ============================================================
     */

    function drawLanguage() {

        h.reset().clear();

        h.setColor(3);
        h.setFontAlign(-1, 0);


        /*
         * HEADER
         */

        h.setFont("Monofonto23")
            .drawString(
                txtRobco(),
                20,
                30
            );


        /*
         * TITEL
         */

        h.setFont("Monofonto18")
            .drawString(
                txtLanguage(),
                20,
                65
            );


        /*
         * SPRACHEN
         */

        h.setFont("Monofonto16");


        /*
         * DEUTSCH
         */

        h.drawString(
            (selected === 0 ? "> " : "  ") +
            txtGerman(),
            30,
            115
        );


        /*
         * ENGLISCH
         */

        h.drawString(
            (selected === 1 ? "> " : "  ") +
            txtEnglish(),
            30,
            155
        );


        h.flip();

        Pip.lastFlip =
            getTime();

    }


    /*
     * ============================================================
     * HAUPT-DRAW
     * ============================================================
     */

    function draw() {

        if (
            screen === 0
        ) {

            drawSettings();

        } else {

            drawLanguage();

        }

    }


    /*
     * ============================================================
     * AUSWAHL BESTÄTIGT
     * ============================================================
     */

    function showSelected(selectedText) {

        h.reset().clear();

        h.setColor(3);
        h.setFontAlign(-1, 0);


        /*
         * HEADER
         */

        h.setFont("Monofonto23")
            .drawString(
                txtLanguage(),
                20,
                40
            );


        /*
         * AUSWAHL
         */

        h.setFont("Monofonto18")
            .drawString(
                selectedText,
                20,
                90
            );


        h.flip();

        Pip.lastFlip =
            getTime();


        /*
         * Nach einer Sekunde zurück
         */

        setTimeout(function() {

            screen = 0;

            selected = 0;

            draw();

        }, 1000);

    }


    /*
     * ============================================================
     * KNOB 1
     * ============================================================
     */

    function onKnob1(dir) {


        /*
         * --------------------------------------------------------
         * KNOB DREHEN
         * --------------------------------------------------------
         */

        if (dir) {

            selected += dir;


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


            draw();

            return;

        }


        /*
         * --------------------------------------------------------
         * KNOB DRÜCKEN
         * --------------------------------------------------------
         */


        /*
         * ========================================================
         * EINSTELLUNGEN
         * ========================================================
         */

        if (
            screen === 0
        ) {


            /*
             * ----------------------------------------------------
             * SPRACHE
             * ----------------------------------------------------
             */

            if (
                selected === 0
            ) {

                screen = 1;

                selected = 0;

                draw();

                return;

            }


            /*
             * ----------------------------------------------------
             * ZURÜCK
             * ----------------------------------------------------
             */

            if (
                selected === 1
            ) {

                app.go(
                    app.scenes.MENU
                );

                return;

            }

        }


        /*
         * ========================================================
         * SPRACHAUSWAHL
         * ========================================================
         */

        else {


            /*
             * ----------------------------------------------------
             * DEUTSCH
             * ----------------------------------------------------
             */

            if (
                selected === 0
            ) {

                /*
                 * Sprache umschalten
                 */

                app.setLanguage(
                    "DE"
                );


                /*
                 * Bestätigungstext wird
                 * NACH dem Umschalten erzeugt.
                 *
                 * Dadurch kommt garantiert die
                 * deutsche Übersetzung zum Einsatz.
                 */

                showSelected(
                    txtGerman() +
                    " " +
                    txtSelected()
                );


                return;

            }


            /*
             * ----------------------------------------------------
             * ENGLISH
             * ----------------------------------------------------
             */

            if (
                selected === 1
            ) {

                /*
                 * Sprache umschalten
                 */

                app.setLanguage(
                    "EN"
                );


                /*
                 * Bestätigungstext wird
                 * NACH dem Umschalten erzeugt.
                 */

                showSelected(
                    txtEnglish() +
                    " " +
                    txtSelected()
                );


                return;

            }

        }

    }


    /*
     * ============================================================
     * KNOB REGISTRIEREN
     * ============================================================
     */

    Pip.onExclusive(
        "knob1",
        onKnob1
    );


    /*
     * ============================================================
     * INITIAL DISPLAY
     * ============================================================
     */

    draw();


    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */

    return {

        remove: function() {

            Pip.removeListener(
                "knob1",
                onKnob1
            );


            h.reset().clear();

            h.flip();

        }

    };

})