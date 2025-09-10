// Скрипты страницы (объединённый файл)

// -------------------- Адаптивное меню --------------------
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menuAdaptive = document.querySelector(".menu-adaptive");
  const textContainer = document.querySelector(".text-container");
  const carousel = document.querySelector(".carousel");
  const imageContainer = document.querySelector(".image-container");
  const welcomeGallery = document.querySelector(".welcome-gallery");
  const socialNetwork = document.querySelector(".social-network");

  // Функция для переключения меню
  function toggleMenu() {
    if (menuAdaptive.style.display === "flex") {
      menuAdaptive.style.display = "none";
    } else {
      menuAdaptive.style.display = "flex";
    }

    // Дополнительная логика для каждого диапазона
    if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      if (menuAdaptive.style.display === "flex") {
        textContainer.style.display = "none";
      } else {
        textContainer.style.display = "block";
      }
    }

    if (window.innerWidth <= 768) {
      if (menuAdaptive.style.display === "flex") {
        textContainer.style.display = "none";
        imageContainer.style.display = "none";
        carousel.style.display = "none";
        welcomeGallery.style.display = "flex";
        socialNetwork.style.display = "flex";
      } else {
        textContainer.style.display = "block";
        imageContainer.style.display = "flex";
        carousel.style.display = "flex";
        welcomeGallery.style.display = "none";
        socialNetwork.style.display = "none";
      }
    }
  }

  // Клики на бургер
  if (burger) burger.addEventListener("click", toggleMenu);

  // Изменение размера окна — исправлена логика (раньше условие было некорректным)
  window.addEventListener("resize", () => {
    // Если ширина больше 1024 — скрываем adaptive-меню и возвращаем блоки в десктопное состояние
    if (window.innerWidth > 1024) {
      if (menuAdaptive) menuAdaptive.style.display = "none";

      if (textContainer) textContainer.style.display = "block";
      if (imageContainer) imageContainer.style.display = "block";
      if (carousel) carousel.style.display = "flex";
      if (welcomeGallery) welcomeGallery.style.display = "none";
      if (socialNetwork) socialNetwork.style.display = "none";
    }
  });
});

// -------------------------------------------------------------------------------

// Скрипт для карусели в секции "Welcome"
document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.querySelector('.image-container');
  if (!imageContainer) return;

  const images = Array.from(imageContainer.querySelectorAll('img'));
  const total = images.length;

  const numFst = document.querySelector('.numbers-fst p');
  const numScnd = document.querySelector('.numbers-scnd p');
  const squares = Array.from(document.querySelectorAll('.squares .square'));
  const arrowRight = document.querySelector('.arrow-right');
  const arrowLeft = document.querySelector('.arrow-left');

  if (squares.length < total) {
    console.warn('Количество .square меньше количества изображений:', squares.length, 'vs', total);
  }

  const formatNumber = (idx) => String(idx + 1).padStart(2, '0');

  let current = 0;

  function showSlide(index) {
    index = (index + total) % total;

    images.forEach((img, i) => {
      img.style.display = (i === index) ? 'block' : 'none';
    });

    if (numFst) numFst.textContent = formatNumber(index);
    if (numScnd) numScnd.textContent = String(total).padStart(2, '0');

    squares.forEach((sq, i) => {
      if (i === index) sq.classList.add('golden');
      else sq.classList.remove('golden');
    });

    current = index;
  }

  showSlide(current);

  if (arrowRight) {
    arrowRight.addEventListener('click', () => {
      showSlide(current + 1);
    });
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
      showSlide(current - 1);
    });
  }

  squares.forEach((sq, idx) => {
    sq.addEventListener('click', () => showSlide(idx));
  });
});

// -------------------------------------------------------------------------------

// Слайдер (drag circle)
document.addEventListener("DOMContentLoaded", () => {
  const circleElement = document.querySelector(
    ".explore-img-child-line-circle"
  );
  const exploreImgChild = document.querySelector(".explore-img-child");
  const exploreImgEre = document.querySelector(".explore-img-ere");

  if (!circleElement || !exploreImgChild || !exploreImgEre) return;

  let dragging = false;
  let startX, clientX, originalLeft;

  const circleRect = circleElement.getBoundingClientRect();
  const parentWidth = exploreImgChild.parentNode.offsetWidth;

  function handleStart(event) {
    event.preventDefault();
    dragging = true;
    startX = event.type.includes("touch") ? event.touches[0].pageX : event.pageX;
    originalLeft = parseFloat(getComputedStyle(exploreImgChild).left) || 0;
    circleElement.style.cursor = "grabbing";
  }

  function handleMove(event) {
    if (!dragging) return;
    event.preventDefault();

    const clientXValue = event.type.includes("touch") ? event.touches[0].pageX : event.pageX;
    const deltaX = clientXValue - startX;
    const newLeft = originalLeft + deltaX;

    const boundedLeft = Math.max(0, Math.min(newLeft, parentWidth - circleRect.width / 6));

    exploreImgChild.style.left = `${boundedLeft}px`;

    const centerOfCircle = boundedLeft + circleRect.width / 5;
    const relativeCenter = centerOfCircle / parentWidth;
    const centerPointPercent = relativeCenter * 100 + "%";

    exploreImgEre.style.clipPath = `polygon(0 0, ${centerPointPercent} 0, ${centerPointPercent} 100%, 0 100%)`;
  }

  function handleEnd() {
    dragging = false;
    circleElement.style.cursor = "";
  }

  circleElement.addEventListener("mousedown", handleStart);
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);

  circleElement.addEventListener("touchstart", handleStart, { passive: false });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd);
});

// ---------------- Gallery fullscreen drag ----------------
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".gallery-container-img");
  const gradient = galleryContainer && galleryContainer.querySelector(".gradient");
  if (!galleryContainer || !gradient) return;

  let isDragging = false;
  let startY = 0;
  let startScrollY = 0;
  let pointerId = null;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const maxScroll = () => Math.max(0, galleryContainer.scrollHeight - galleryContainer.clientHeight);

  const updateGradient = () => {
    if (isDragging || galleryContainer.scrollTop > 0) {
      gradient.style.opacity = "0";
    } else {
      gradient.style.opacity = "1";
    }
  };

  const startDrag = (clientY) => {
    isDragging = true;
    startY = clientY;
    startScrollY = galleryContainer.scrollTop;
    galleryContainer.classList.add("dragging");
    galleryContainer.style.cursor = "grabbing";
    updateGradient();
  };

  const moveDrag = (clientY) => {
    if (!isDragging) return;
    const delta = startY - clientY;
    const newScroll = clamp(startScrollY + delta, 0, maxScroll());
    galleryContainer.scrollTop = newScroll;
    updateGradient();
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    pointerId = null;
    galleryContainer.classList.remove("dragging");
    galleryContainer.style.cursor = "grab";
    updateGradient();
  };

  const onPointerMove = (e) => moveDrag(e.clientY);
  const onPointerUp = (e) => {
    if (galleryContainer.releasePointerCapture && e.pointerId != null) {
      try { galleryContainer.releasePointerCapture(e.pointerId); } catch {}
    }
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerUp);
    endDrag();
  };

  galleryContainer.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    pointerId = e.pointerId ?? null;
    if (galleryContainer.setPointerCapture && pointerId != null) {
      try { galleryContainer.setPointerCapture(pointerId); } catch {}
    }
    startDrag(e.clientY);
    document.addEventListener("pointermove", onPointerMove, { passive: false });
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
  });

  let lastTouchId = null;
  const onTouchMove = (e) => {
    e.preventDefault();
    const t = e.touches[0];
    if (t) moveDrag(t.clientY);
  };
  const onTouchEnd = () => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
    document.removeEventListener("touchcancel", onTouchEnd);
    lastTouchId = null;
    endDrag();
  };
  galleryContainer.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      lastTouchId = e.touches[0].identifier;
      startDrag(e.touches[0].clientY);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
      document.addEventListener("touchcancel", onTouchEnd);
    }
  }, { passive: true });

  const onMouseMove = (e) => moveDrag(e.clientY);
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    endDrag();
  };
  galleryContainer.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientY);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  galleryContainer.addEventListener("dragstart", (e) => e.preventDefault());

  galleryContainer.addEventListener("scroll", updateGradient);
  updateGradient();
});

// ---------------- Gallery adaptive (vertical drag) ----------------
document.addEventListener("DOMContentLoaded", () => {
  const galContAdaptive = document.querySelector(".gallery-container-img-adaptive");
  const gradient = galContAdaptive && galContAdaptive.querySelector(".gradient");
  if (!galContAdaptive || !gradient) return;

  let isDragging = false;
  let startY = 0;
  let startScrollY = 0;
  let pointerId = null;

  const updateGradient = () => {
    if (isDragging || galContAdaptive.scrollTop > 0) {
      gradient.style.opacity = "0";
    } else {
      gradient.style.opacity = "1";
    }
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const y = e.clientY;
    galContAdaptive.scrollTop = startScrollY + (startY - y);
    updateGradient();
  };

  const finishDrag = () => {
    isDragging = false;
    galContAdaptive.classList.remove("dragging");
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", finishDrag);
    document.removeEventListener("pointercancel", finishDrag);
    if (pointerId !== null && galContAdaptive.releasePointerCapture) {
      try { galContAdaptive.releasePointerCapture(pointerId); } catch {}
    }
    pointerId = null;
    galContAdaptive.style.cursor = "grab";
    updateGradient();
  };

  galContAdaptive.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    isDragging = true;
    galContAdaptive.classList.add("dragging");
    startY = e.clientY;
    startScrollY = galContAdaptive.scrollTop;
    pointerId = e.pointerId;
    if (galContAdaptive.setPointerCapture) {
      try { galContAdaptive.setPointerCapture(pointerId); } catch {}
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", finishDrag);
    document.addEventListener("pointercancel", finishDrag);
    galContAdaptive.style.cursor = "grabbing";
    updateGradient();
  });

  galContAdaptive.addEventListener("dragstart", (e) => e.preventDefault());
  galContAdaptive.addEventListener("scroll", updateGradient);
  updateGradient();
});
// ------------------------------------------------------------------------------------

// -------------------- Карта (Leaflet) — исправленная логика зума --------------------
(function () {
  // Функция выбора зума по ширине
  function getZoomForWidth(w) {
    if (w >= 1920) return 17;
    if (w >= 1024) return 16.4; // дробный зум допустим при zoomSnap: 0
    if (w >= 768) return 20;
    return 15; // значение для экранов < 768
  }

  // Создаем карту после загрузки DOM
  document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return; // если контейнера нет — пропускаем

    const initialZoom = getZoomForWidth(window.innerWidth);

    // Создаём карту и разрешаем дробный зум через zoomSnap: 0
    const map = L.map('map', { zoomSnap: 0 }).setView([48.86091, 2.3364], initialZoom);

    // Добавление тайлов (фонов карты)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Добавление маркеров
    L.marker([48.86091, 2.3364]).addTo(map);
    L.marker([48.8602, 2.3333]).addTo(map);
    L.marker([48.8607, 2.3397]).addTo(map);
    L.marker([48.8619, 2.333]).addTo(map);
    L.marker([48.8625, 2.3365]).addTo(map);

    // Дебаунс для ресайза
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newZoom = getZoomForWidth(window.innerWidth);
        // Если хотите плавно центрироваться — используйте map.setView(map.getCenter(), newZoom, {animate: true});
        if (map && typeof map.setZoom === 'function') {
          map.setZoom(newZoom);
        }
      }, 150);
    });
  });
})();

// ------------------------------------------------------------------------------------

// Конец файла
