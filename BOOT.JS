(function () {
  let timer = null;
  let menuTimer = null;
  let step = 0;
  let ready = false;
  let cursorVisible = true;
  const bootLines = [
    'ROBCO INDUSTRIES (TM)',
    'TERMLINK PROTOCOL',
    '',
    'ROBCO SYSTEM BIOS',
    'COPYRIGHT 2042-2077 ROBCO INDUSTRIES',
    '',
    'MEMORY CHECK ........ OK',
    'CPU CHECK ........... OK',
    'I/O CHECK ........... OK',
    '',
    'INITIALIZING HOLOTAPE',
    'LOADING ROBCO BOTTLE CAP-FLIP SYSTEM'
  ];
  function drawBoot() {
    h.reset().clear();
    h.setColor(3);
    h.setFontAlign(-1, 0);
    /* Header */ h.setFont('Monofonto23');
    h.drawString('ROBCO INDUSTRIES (TM)', 20, 25);
    h.setFont('Monofonto16');
    /* READY SCREEN */ if (ready) {
      let y = 55;
      for (let i = 0; i < bootLines.length; i++) {
        h.drawString(bootLines[i], 20, y);
        y += 19;
      }
      h.drawString('SYSTEM READY' + (cursorVisible ? '_' : ''), 20, 285);
      h.flip();
      Pip.lastFlip = getTime();
      return;
    }
    /* Normal boot sequence */ let y = 55;
    for (let i = 0; i < bootLines.length; i++) {
      if (i <= step) {
        h.drawString(bootLines[i], 20, y);
      }
      y += 19;
    }
    /* Loading bar */ if (step >= bootLines.length - 1) {
      let progress = Math.min(step - (bootLines.length - 2), 10);
      let bar = '';
      for (let i = 0; i < 10; i++) {
        if (i < progress) {
          bar += '#';
        } else {
          bar += '-';
        }
      }
      h.drawString('[' + bar + ']', 20, 285);
    }
    h.flip();
    Pip.lastFlip = getTime();
  }
  function nextStep() {
    step++;
    /* * Boot sequence complete */ if (step >= bootLines.length + 9) {
      ready = true;
      clearInterval(timer);
      timer = null;
      drawBoot();
      /* * Blink SYSTEM READY cursor */ timer = setInterval(blinkCursor, 500);
      /* * Wait 2 seconds on the * SYSTEM READY screen, * then open MENU.JS. */ menuTimer =
        setTimeout(function () {
          /* * Stop cursor blinking */ if (timer !== null) {
            clearInterval(timer);
            timer = null;
          }
          /* * Open main menu */ app.go(app.scenes.MENU);
        }, 2000);
      return;
    }
    drawBoot();
  }
  function blinkCursor() {
    cursorVisible = !cursorVisible;
    drawBoot();
  }
  /* Start boot sequence */ drawBoot();
  timer = setInterval(nextStep, 350);
  /* Cleanup */ return {
    id: 'RCBCF',
    notDefault: true,
    fullscreen: true,
    remove: function () {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      if (menuTimer !== null) {
        clearTimeout(menuTimer);
        menuTimer = null;
      }
      h.reset().clear();
      h.flip();
    }
  };
});
