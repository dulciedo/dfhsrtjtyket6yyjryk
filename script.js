(() => {
  // ===== Audio =====
  const bgMusic = document.getElementById("bgmusic");
  const swanSound = document.getElementById("swanSound");
  const tinkSound = document.getElementById("tinkSound");
  const rengSound = document.getElementById("rengSound");

  const playAudio = (audio, restart = false) => {
    if (!audio) {
      return;
    }
    if (restart) {
      audio.currentTime = 0;
    }
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  // ===== normalclick start music + change text =====
  const normalClick = document.getElementById("normalclick");
  if (normalClick) {
    normalClick.addEventListener("click", () => {
      if (bgMusic) {
        bgMusic.loop = true;
        bgMusic.volume = 0.85;
        playAudio(bgMusic, bgMusic.paused);
      }
      normalClick.textContent = "_Remain as you are, my princess!_";
    });
  }


  // ===== umbrella click sound =====
  const umbrella = document.getElementById("umbrella");
  if (umbrella) {
    umbrella.addEventListener("click", () => {
      if (!rengSound) {
        return;
      }
      rengSound.volume = 0.95;
      playAudio(rengSound, true);
    });
  }


  // ===== fan click sound =====
  const fan = document.getElementById("fan");
  if (fan) {
    fan.addEventListener("click", () => {
      if (!tinkSound) {
        return;
      }
      tinkSound.volume = 0.95;
      playAudio(tinkSound, true);
    });
  }


    // ===== swan click sound =====
  const swan = document.getElementById("swan");
  if (swan) {
    swan.addEventListener("click", () => {
      if (!swanSound) {
        return;
      }
      swanSound.volume = 0.95;
      playAudio(swanSound, true);
    });
  }


  // ===== cursor sparkle =====
  //mix: purple, yellow, pink, blue.
  const sparklePalette = ["#7d56b1", "#d1b65c", "#ffa7da", "#7fb4ec"];
  const whiteDustPalette = ["#ffffff", "#f7fbff", "#fffef6"];
  let lastSparkleAt = 0;

  // Small random sparkle properties.
  const randomBetween = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Create one sparkle
  const spawnSparkle = (x, y, options = {}) => {
    const {
      color = pick(sparklePalette),
      sizeMin = 1.1,
      sizeMax = 3.2,
      driftX = 20,
      driftY = 22,
      spinRange = 22,
      lifeMin = 900,
      lifeMax = 1400,
    } = options;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty("--sparkle-color", color);
    sparkle.style.setProperty("--size", `${randomBetween(sizeMin, sizeMax).toFixed(1)}px`);
    sparkle.style.setProperty("--dx", `${randomBetween(-driftX, driftX).toFixed(1)}px`);
    sparkle.style.setProperty("--dy", `${randomBetween(-driftY, driftY).toFixed(1)}px`);
    sparkle.style.setProperty("--spin", `${randomBetween(-spinRange, spinRange).toFixed(0)}deg`);
    sparkle.style.setProperty("--tilt", `${randomBetween(-85, 85).toFixed(0)}deg`);
    sparkle.style.setProperty("--life", `${randomBetween(lifeMin, lifeMax).toFixed(0)}ms`);
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
  };

  // Extra white dust layer
  const spawnWhiteDust = (x, y) => {
    spawnSparkle(x, y, {
      color: pick(whiteDustPalette),
      sizeMin: 0.7,
      sizeMax: 2.3,
      driftX: 22,
      driftY: 26,
      spinRange: 14,
      lifeMin: 1000,
      lifeMax: 1700,
    });
  };

  //mouse pointer
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      const now = performance.now();
      if (now - lastSparkleAt < 9) {
        return;
      }
      lastSparkleAt = now;

      spawnSparkle(event.clientX, event.clientY);
      spawnSparkle(
        event.clientX + randomBetween(-18, 18),
        event.clientY + randomBetween(-18, 18)
      );
      spawnSparkle(
        event.clientX + randomBetween(-20, 20),
        event.clientY + randomBetween(-20, 20)
      );
      if (Math.random() > 0.1) {
        spawnSparkle(
          event.clientX + randomBetween(-30, 30),
          event.clientY + randomBetween(-30, 30)
        );
      }
      if (Math.random() > 0.35) {
        spawnSparkle(
          event.clientX + randomBetween(-36, 36),
          event.clientY + randomBetween(-36, 36)
        );
      }

      // "dust stream" effect.
      for (let i = 0; i < 4; i += 1) {
        spawnWhiteDust(
          event.clientX + randomBetween(-28, 28),
          event.clientY + randomBetween(-28, 28)
        );
      }
      if (Math.random() > 0.08) {
        spawnWhiteDust(
          event.clientX + randomBetween(-46, 46),
          event.clientY + randomBetween(-46, 46)
        );
      }
      if (Math.random() > 0.28) {
        spawnWhiteDust(
          event.clientX + randomBetween(-50, 50),
          event.clientY + randomBetween(-50, 50)
        );
      }
    },
    { passive: true }
  );

  // ===== draggable text on letter =====
  const letter = document.getElementById("letter");
  const slide5 = document.querySelector(".slide5");
  const draggableSelector = [
    ".sen13",
    ".sen13_1",
    ".sen13_2",
    ".sen13_3",
    ".sen13_3_1",
    ".sen13_3_2",
    ".sen13_3_3",
    ".sen13_4",
    ".sen14",
    ".sen14_1",
    ".sen14_2",
    ".sen14_3",
  ].join(", ");

  if (letter && slide5) {
    document.querySelectorAll(draggableSelector).forEach((el) => {
      makeDraggable(el, letter, slide5);
    });
  }

  //drag function
  function makeDraggable(el, letterBox, fallbackParent) {
    el.classList.add("drag-letter");

    let dragState = null;

    // Keep movement
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const endDrag = (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) {
        return;
      }
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      el.classList.remove("is-dragging");
      dragState = null;
    };

    el.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const parent = el.offsetParent || fallbackParent;
      const parentRect = parent.getBoundingClientRect();
      const letterRect = letterBox.getBoundingClientRect();
      const currentRect = el.getBoundingClientRect();

      const minX = letterRect.left - parentRect.left;
      const minY = letterRect.top - parentRect.top;
      const maxX = Math.max(minX, letterRect.right - parentRect.left - currentRect.width);
      const maxY = Math.max(minY, letterRect.bottom - parentRect.top - currentRect.height);

      dragState = {
        pointerId: event.pointerId,
        parentRect,
        offsetX: event.clientX - currentRect.left,
        offsetY: event.clientY - currentRect.top,
        minX,
        maxX,
        minY,
        maxY,
      };

      el.style.left = `${currentRect.left - parentRect.left}px`;
      el.style.top = `${currentRect.top - parentRect.top}px`;
      el.style.right = "auto";
      el.style.bottom = "auto";
      el.classList.add("is-dragging");
      el.setPointerCapture(event.pointerId);

      event.preventDefault();
    });

    el.addEventListener("pointermove", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) {
        return;
      }

      const nextLeft = clamp(
        event.clientX - dragState.parentRect.left - dragState.offsetX,
        dragState.minX,
        dragState.maxX
      );
      const nextTop = clamp(
        event.clientY - dragState.parentRect.top - dragState.offsetY,
        dragState.minY,
        dragState.maxY
      );

      el.style.left = `${nextLeft}px`;
      el.style.top = `${nextTop}px`;
    });

    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  }
})();
