(function (app) {

    // ============================================================
    // ROBCO BOTTLE CAP-FLIP
    // BOTTLECAPGRAPHICS.JS
    //
    // Pip-Boy kompatible Kronkorken-Grafik
    //
    // VORDERSEITE:
    // - gezackter Kronkorkenrand
    // - innere Ringe
    // - gewölbte Oberfläche
    // - NUKA / COLA
    // - Glanz
    // - Abnutzung
    //
    // INNENSEITE:
    // - matte Metallfläche
    // - Prägungsringe
    // - keine Schrift
    // - kein Glanz
    //
    // SEITENANSICHT:
    // - dünne Metallkappe
    // - gewölbte Deckelflächen
    // - ausgeprägter Kronkorkenrand
    // - Crimp-Falten
    //
    // ANIMATION:
    // - Vorderseite
    // - Drehung
    // - Seitenkante
    // - Innenseite
    // - Rückdrehung
    // - Vorderseite
    //
    // Keine Farbverläufe
    // Keine Füllungen
    // Keine komplexen Vektoreffekte
    // ============================================================


    // ============================================================
    // POSITION
    // ============================================================

    const CX = 240;
    const CY = 150;


    // ============================================================
    // GRÖSSEN
    // ============================================================

    const CAP_R = 40;
    const TOOTH_R = 46;


    // ============================================================
    // ZACKEN
    // ============================================================

    function getZackenPoints(scaleX) {

        const points = [];

        const teeth = 24;

        for (
            let i = 0;
            i < teeth * 2;
            i++
        ) {

            const angle =
                (-90 + (360 / (teeth * 2)) * i)
                * Math.PI / 180;


            const radius =
                (i % 2 === 0)
                    ? TOOTH_R
                    : CAP_R;


            points.push({

                x:
                    CX +
                    Math.cos(angle) *
                    radius *
                    scaleX,

                y:
                    CY +
                    Math.sin(angle) *
                    radius

            });

        }

        return points;
    }


    // ============================================================
    // ZACKENRAND
    // ============================================================

    function drawJaggedOuter(scaleX) {

        const points =
            getZackenPoints(scaleX);


        for (
            let i = 0;
            i < points.length;
            i++
        ) {

            const a =
                points[i];

            const b =
                points[
                    (i + 1) %
                    points.length
                ];


            h.drawLine(

                a.x,
                a.y,

                b.x,
                b.y

            );

        }

    }


    // ============================================================
    // INNERE RINGE
    // ============================================================

    function drawInnerRings(scaleX) {

        if (scaleX === 1) {

            h.drawCircle(
                CX,
                CY,
                40
            );

            h.drawCircle(
                CX,
                CY,
                37
            );

            h.drawCircle(
                CX,
                CY,
                33
            );

            return;
        }


        drawEllipse(
            40,
            0,
            scaleX
        );


        drawEllipse(
            37,
            0,
            scaleX
        );


        drawEllipse(
            33,
            0,
            scaleX
        );

    }


    // ============================================================
    // ELLIPSE
    // ============================================================

    function drawEllipse(
        radius,
        offsetY,
        scaleX
    ) {

        const segments = 24;

        let previous = null;


        for (
            let i = 0;
            i <= segments;
            i++
        ) {

            const angle =
                (360 / segments) *
                i *
                Math.PI / 180;


            const point = {

                x:
                    CX +
                    Math.cos(angle) *
                    radius *
                    scaleX,

                y:
                    CY +
                    offsetY +
                    Math.sin(angle) *
                    radius

            };


            if (previous !== null) {

                h.drawLine(

                    previous.x,
                    previous.y,

                    point.x,
                    point.y

                );

            }


            previous = point;

        }

    }


    // ============================================================
    // GEWÖLBTE PRÄGUNG
    // ============================================================

    function drawEmbossing(scaleX) {

        // obere gebogene Prägung

        drawEllipseArc(
            27,
            -3,
            scaleX,
            205,
            335
        );


        // untere gebogene Prägung

        drawEllipseArc(
            27,
            3,
            scaleX,
            25,
            155
        );


        // innere obere Prägung

        drawEllipseArc(
            13,
            0,
            scaleX,
            205,
            335
        );

    }


    // ============================================================
    // ELLIPSEN-ABSCHNITT
    // ============================================================

    function drawEllipseArc(
        radius,
        offsetY,
        scaleX,
        startAngle,
        endAngle
    ) {

        const segments = 10;

        let previous = null;


        for (
            let i = 0;
            i <= segments;
            i++
        ) {

            const angle =
                (
                    startAngle +
                    (
                        (endAngle - startAngle)
                        / segments
                    ) *
                    i
                )
                *
                Math.PI / 180;


            const point = {

                x:
                    CX +
                    Math.cos(angle) *
                    radius *
                    scaleX,

                y:
                    CY +
                    offsetY +
                    Math.sin(angle) *
                    radius

            };


            if (previous !== null) {

                h.drawLine(

                    previous.x,
                    previous.y,

                    point.x,
                    point.y

                );

            }


            previous = point;

        }

    }


    // ============================================================
    // GLANZ
    //
    // Nur auf der VORDERSEITE.
    //
    // Die Innenseite besitzt KEINE Glanzlinien.
    // ============================================================

    function drawGloss(scaleX) {

        // --------------------------------------------------------
        // HAUPTREFLEX OBEN
        // --------------------------------------------------------

        h.drawLine(
            CX - 25 * scaleX,
            CY - 27,
            CX - 16 * scaleX,
            CY - 31
        );


        h.drawLine(
            CX - 16 * scaleX,
            CY - 31,
            CX - 5 * scaleX,
            CY - 32
        );


        h.drawLine(
            CX - 5 * scaleX,
            CY - 32,
            CX + 6 * scaleX,
            CY - 30
        );


        h.drawLine(
            CX + 6 * scaleX,
            CY - 30,
            CX + 14 * scaleX,
            CY - 26
        );


        // --------------------------------------------------------
        // ZWEITER REFLEX
        // --------------------------------------------------------

        h.drawLine(
            CX - 30 * scaleX,
            CY - 20,
            CX - 25 * scaleX,
            CY - 25
        );


        h.drawLine(
            CX - 25 * scaleX,
            CY - 25,
            CX - 19 * scaleX,
            CY - 28
        );


        // --------------------------------------------------------
        // REFLEX OBEN RECHTS
        // --------------------------------------------------------

        h.drawLine(
            CX + 19 * scaleX,
            CY - 21,
            CX + 24 * scaleX,
            CY - 18
        );


        h.drawLine(
            CX + 24 * scaleX,
            CY - 18,
            CX + 27 * scaleX,
            CY - 14
        );


        // --------------------------------------------------------
        // REFLEX LINKS
        // --------------------------------------------------------

        h.drawLine(
            CX - 33 * scaleX,
            CY - 7,
            CX - 29 * scaleX,
            CY - 11
        );


        h.drawLine(
            CX - 29 * scaleX,
            CY - 11,
            CX - 25 * scaleX,
            CY - 13
        );


        // --------------------------------------------------------
        // REFLEX RECHTS
        // --------------------------------------------------------

        h.drawLine(
            CX + 28 * scaleX,
            CY - 5,
            CX + 31 * scaleX,
            CY - 1
        );


        // --------------------------------------------------------
        // KLEINE REFLEXPUNKTE
        // --------------------------------------------------------

        h.drawCircle(
            CX - 28 * scaleX,
            CY - 27,
            1
        );


        h.drawCircle(
            CX + 26 * scaleX,
            CY - 12,
            1
        );


        h.drawCircle(
            CX - 32 * scaleX,
            CY - 4,
            1
        );

    }


    // ============================================================
    // NUKA-COLA VORDERSEITE
    //
    // Kein Rahmen.
    //
    // Die Schrift wird nur angezeigt, wenn die Vorderseite
    // ausreichend sichtbar ist.
    // ============================================================

    function drawNuka(scaleX) {

        // --------------------------------------------------------
        // Außenrand
        // --------------------------------------------------------

        drawJaggedOuter(scaleX);


        // --------------------------------------------------------
        // Innere Ringe
        // --------------------------------------------------------

        drawInnerRings(scaleX);


        // --------------------------------------------------------
        // Metallprägung
        // --------------------------------------------------------

        drawEmbossing(scaleX);


        // --------------------------------------------------------
        // Glanz
        // --------------------------------------------------------

        drawGloss(scaleX);


        // --------------------------------------------------------
        // SCHRIFT WÄHREND DER DREHUNG AUSBLENDEN
        // --------------------------------------------------------

        if (scaleX < 0.85) {

            return;
        }


        // --------------------------------------------------------
        // NUKA
        // --------------------------------------------------------

        h.setFont("Monofonto16")
            .setFontAlign(0, 0)
            .drawString(
                "NUKA",
                CX,
                CY - 8
            );


        // --------------------------------------------------------
        // COLA
        // --------------------------------------------------------

        h.setFont("Monofonto16")
            .setFontAlign(0, 0)
            .drawString(
                "COLA",
                CX,
                CY + 8
            );

    }


    // ============================================================
    // ABNUTZUNG
    // ============================================================

    function drawWear(scaleX) {

        // oben links

        h.drawLine(
            CX - 35 * scaleX,
            CY - 10,
            CX - 31 * scaleX,
            CY - 12
        );


        // oben rechts

        h.drawLine(
            CX + 31 * scaleX,
            CY - 8,
            CX + 34 * scaleX,
            CY - 6
        );


        // unten links

        h.drawLine(
            CX - 32 * scaleX,
            CY + 13,
            CX - 28 * scaleX,
            CY + 15
        );


        // unten rechts

        h.drawLine(
            CX + 29 * scaleX,
            CY + 14,
            CX + 34 * scaleX,
            CY + 12
        );

    }


    // ============================================================
    // MATTE INNENSEITE
    //
    // KEINE SCHRIFT
    // KEIN GLANZ
    //
    // Nur matte Metallprägung.
    // ============================================================

    function drawInside(scaleX) {

        // --------------------------------------------------------
        // Außenrand
        // --------------------------------------------------------

        drawJaggedOuter(scaleX);


        // --------------------------------------------------------
        // innere Ringe
        // --------------------------------------------------------

        drawInnerRings(scaleX);


        // --------------------------------------------------------
        // matte innere Prägungsringe
        // --------------------------------------------------------

        drawEllipse(
            27,
            0,
            scaleX
        );


        drawEllipse(
            11,
            0,
            scaleX
        );


        // --------------------------------------------------------
        // kurze Prägesegmente
        // --------------------------------------------------------

        const embossAngles = [

            -90,
            -60,
            -30,
              0,
             30,
             60,
             90,
            120,
            150,
            180,
            210,
            240

        ];


        for (
            let i = 0;
            i < embossAngles.length;
            i++
        ) {

            const rad =
                embossAngles[i] *
                Math.PI / 180;


            const r1 = 17;
            const r2 = 24;


            h.drawLine(

                CX +
                Math.cos(rad) *
                r1 *
                scaleX,

                CY +
                Math.sin(rad) *
                r1,


                CX +
                Math.cos(rad) *
                r2 *
                scaleX,

                CY +
                Math.sin(rad) *
                r2

            );

        }

    }


    // ============================================================
    // KRONKORKEN-SEITENANSICHT
    //
    // NEUE VERSION
    //
    // Der Kronkorken wird nicht mehr wie ein Reifen dargestellt.
    //
    // Stattdessen:
    //
    // - dünne Metallkappe
    // - leicht gewölbte Deckelflächen
    // - nach außen stehender Rand
    // - typische Crimp-Falten
    // - umgebogene Metallkante
    //
    // Die Mitte bleibt schmal.
    // ============================================================

    function drawEdge() {

        // --------------------------------------------------------
        // GRUNDABMESSUNGEN
        // --------------------------------------------------------

        const top =
            CY - 43;

        const bottom =
            CY + 43;


        // eigentliche Dicke der Kappe

        const innerLeft =
            CX - 4;

        const innerRight =
            CX + 4;


        // äußerer Rand

        const outerLeft =
            CX - 9;

        const outerRight =
            CX + 9;


        // --------------------------------------------------------
        // OBERE METALLFLÄCHE
        //
        // Nur leicht gewölbt.
        // --------------------------------------------------------

        h.drawLine(
            innerLeft,
            top,
            CX - 2,
            CY - 45
        );


        h.drawLine(
            CX - 2,
            CY - 45,
            CX,
            CY - 46
        );


        h.drawLine(
            CX,
            CY - 46,
            CX + 2,
            CY - 45
        );


        h.drawLine(
            CX + 2,
            CY - 45,
            innerRight,
            top
        );


        // --------------------------------------------------------
        // UNTERE METALLFLÄCHE
        // --------------------------------------------------------

        h.drawLine(
            innerLeft,
            bottom,
            CX - 2,
            CY + 45
        );


        h.drawLine(
            CX - 2,
            CY + 45,
            CX,
            CY + 46
        );


        h.drawLine(
            CX,
            CY + 46,
            CX + 2,
            CY + 45
        );


        h.drawLine(
            CX + 2,
            CY + 45,
            innerRight,
            bottom
        );


        // --------------------------------------------------------
        // LINKE SEITENWAND
        //
        // Der Rand steht etwas nach außen.
        // --------------------------------------------------------

        h.drawLine(
            innerLeft,
            top,
            CX - 7,
            CY - 36
        );


        h.drawLine(
            CX - 7,
            CY - 36,
            outerLeft,
            CY - 24
        );


        h.drawLine(
            outerLeft,
            CY - 24,
            outerLeft,
            CY + 24
        );


        h.drawLine(
            outerLeft,
            CY + 24,
            CX - 7,
            CY + 36
        );


        h.drawLine(
            CX - 7,
            CY + 36,
            innerLeft,
            bottom
        );


        // --------------------------------------------------------
        // RECHTE SEITENWAND
        // --------------------------------------------------------

        h.drawLine(
            innerRight,
            top,
            CX + 7,
            CY - 36
        );


        h.drawLine(
            CX + 7,
            CY - 36,
            outerRight,
            CY - 24
        );


        h.drawLine(
            outerRight,
            CY - 24,
            outerRight,
            CY + 24
        );


        h.drawLine(
            outerRight,
            CY + 24,
            CX + 7,
            CY + 36
        );


        h.drawLine(
            CX + 7,
            CY + 36,
            innerRight,
            bottom
        );


        // --------------------------------------------------------
        // INNERER RAND
        //
        // Zeigt den Übergang zwischen Deckelfläche und Rand.
        // --------------------------------------------------------

        h.drawLine(
            innerLeft,
            CY - 39,
            innerRight,
            CY - 39
        );


        h.drawLine(
            innerLeft,
            CY + 39,
            innerRight,
            CY + 39
        );


        // ========================================================
        // CRIMP-FALTEN
        //
        // Typische Falten eines Kronkorkens.
        // Die Falten sitzen am äußeren Rand.
        // ========================================================

        const folds = [

            -34,
            -28,
            -22,
            -16,
            -10,
             -4,
              2,
              8,
             14,
             20,
             26,
             32

        ];


        for (
            let i = 0;
            i < folds.length;
            i++
        ) {

            const y =
                CY + folds[i];


            // ----------------------------------------------------
            // LINKE FALTE
            // ----------------------------------------------------

            if (i % 2 === 0) {

                h.drawLine(
                    CX - 7,
                    y,
                    CX - 12,
                    y + 3
                );


                h.drawLine(
                    CX - 12,
                    y + 3,
                    CX - 8,
                    y + 6
                );

            } else {

                h.drawLine(
                    CX - 8,
                    y,
                    CX - 12,
                    y + 3
                );

            }


            // ----------------------------------------------------
            // RECHTE FALTE
            // ----------------------------------------------------

            if (i % 2 === 0) {

                h.drawLine(
                    CX + 7,
                    y,
                    CX + 12,
                    y + 3
                );


                h.drawLine(
                    CX + 12,
                    y + 3,
                    CX + 8,
                    y + 6
                );

            } else {

                h.drawLine(
                    CX + 8,
                    y,
                    CX + 12,
                    y + 3
                );

            }

        }


        // ========================================================
        // AUSGEPRÄGTER OBERER RAND
        // ========================================================

        h.drawLine(
            CX - 7,
            CY - 36,
            CX - 11,
            CY - 39
        );


        h.drawLine(
            CX - 11,
            CY - 39,
            CX - 8,
            CY - 42
        );


        h.drawLine(
            CX + 7,
            CY - 36,
            CX + 11,
            CY - 39
        );


        h.drawLine(
            CX + 11,
            CY - 39,
            CX + 8,
            CY - 42
        );


        // ========================================================
        // AUSGEPRÄGTER UNTERER RAND
        // ========================================================

        h.drawLine(
            CX - 7,
            CY + 36,
            CX - 11,
            CY + 39
        );


        h.drawLine(
            CX - 11,
            CY + 39,
            CX - 8,
            CY + 42
        );


        h.drawLine(
            CX + 7,
            CY + 36,
            CX + 11,
            CY + 39
        );


        h.drawLine(
            CX + 11,
            CY + 39,
            CX + 8,
            CY + 42
        );


        // ========================================================
        // KLEINE METALLKANTEN
        // ========================================================

        h.drawLine(
            CX - 8,
            CY - 18,
            CX - 11,
            CY - 16
        );


        h.drawLine(
            CX + 8,
            CY - 18,
            CX + 11,
            CY - 16
        );


        h.drawLine(
            CX - 8,
            CY + 16,
            CX - 11,
            CY + 18
        );


        h.drawLine(
            CX + 8,
            CY + 16,
            CX + 11,
            CY + 18
        );

    }


    // ============================================================
    // STAR / LEGENDÄR
    // ============================================================

    function drawStar() {

        drawJaggedOuter(1);

        drawInnerRings(1);


        // Stern

        h.drawLine(
            CX,
            CY - 20,
            CX + 7,
            CY - 6
        );


        h.drawLine(
            CX + 7,
            CY - 6,
            CX + 22,
            CY - 6
        );


        h.drawLine(
            CX + 22,
            CY - 6,
            CX + 10,
            CY + 3
        );


        h.drawLine(
            CX + 10,
            CY + 3,
            CX + 15,
            CY + 19
        );


        h.drawLine(
            CX + 15,
            CY + 19,
            CX,
            CY + 10
        );


        h.drawLine(
            CX,
            CY + 10,
            CX - 15,
            CY + 19
        );


        h.drawLine(
            CX - 15,
            CY + 19,
            CX - 10,
            CY + 3
        );


        h.drawLine(
            CX - 10,
            CY + 3,
            CX - 22,
            CY - 6
        );


        h.drawLine(
            CX - 22,
            CY - 6,
            CX - 7,
            CY - 6
        );


        h.drawLine(
            CX - 7,
            CY - 6,
            CX,
            CY - 20
        );

    }


    // ============================================================
    // ANIMATIONS-FRAMES
    //
    // 0 = komplette Vorderseite
    // 1 = Vorderseite wird schmaler
    // 2 = Seitenkante
    // 3 = matte Innenseite
    // 4 = Seitenkante
    // 5 = Vorderseite kommt zurück
    // 6 = Vorderseite größer
    // 7 = fast komplett
    // 8 = komplette Vorderseite
    // ============================================================

    function drawFrame(frame) {

        // --------------------------------------------------------
        // FRAME 0
        // komplette Vorderseite
        // --------------------------------------------------------

        if (frame === 0) {

            drawNuka(1);

            drawWear(1);

            return;
        }


        // --------------------------------------------------------
        // FRAME 1
        // Vorderseite beginnt zu drehen
        // --------------------------------------------------------

        if (frame === 1) {

            drawNuka(0.82);

            return;
        }


        // --------------------------------------------------------
        // FRAME 2
        // Seitenkante
        // --------------------------------------------------------

        if (frame === 2) {

            drawEdge();

            return;
        }


        // --------------------------------------------------------
        // FRAME 3
        // Innenseite
        // --------------------------------------------------------

        if (frame === 3) {

            drawInside(1);

            return;
        }


        // --------------------------------------------------------
        // FRAME 4
        // Seitenkante
        // --------------------------------------------------------

        if (frame === 4) {

            drawEdge();

            return;
        }


        // --------------------------------------------------------
        // FRAME 5
        // Vorderseite kommt zurück
        // --------------------------------------------------------

        if (frame === 5) {

            drawNuka(0.82);

            return;
        }


        // --------------------------------------------------------
        // FRAME 6
        // Vorderseite wird größer
        // --------------------------------------------------------

        if (frame === 6) {

            drawNuka(0.90);

            return;
        }


        // --------------------------------------------------------
        // FRAME 7
        // fast vollständige Vorderseite
        // --------------------------------------------------------

        if (frame === 7) {

            drawNuka(0.96);

            return;
        }


        // --------------------------------------------------------
        // FRAME 8
        // komplette Vorderseite
        // --------------------------------------------------------

        drawNuka(1);

        drawWear(1);

    }


    // ============================================================
    // ÖFFENTLICHE SCHNITTSTELLE
    // ============================================================

    return {

        drawFrame: function (frame) {

            drawFrame(frame);

        },


        drawNuka: function () {

            drawNuka(1);

        },


        drawInside: function () {

            drawInside(1);

        },


        drawEdge: function () {

            drawEdge();

        },


        drawStar: function () {

            drawStar();

        },


        drawCapEdges: function () {

            drawJaggedOuter(1);

        },


        drawCapDetails: function () {

            drawInnerRings(1);

            drawEmbossing(1);

        }

    };

});