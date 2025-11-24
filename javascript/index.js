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

// --------------------- section Video ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".video-carousel");
  const pointsContainer = document.querySelector(".points-video-carousel");
  const pointNodes = pointsContainer
    ? Array.from(pointsContainer.children)
    : [];

  const arrows = document.querySelectorAll(
    ".small-video-carousel .arrow-video-carousel"
  );
  const leftArrow = arrows[0];
  const rightArrow = arrows[1];

  if (!carousel || !pointsContainer || !leftArrow || !rightArrow) return;

  function findActivePointIndex() {
    return pointNodes.findIndex((p) => p.classList.contains("black-point"));
  }

  function setActivePoint(idx) {
    pointNodes.forEach((p, i) => {
      if (i === idx) p.classList.add("black-point");
      else p.classList.remove("black-point");
    });
  }

  // безопасный обмен данных (poster + источники) между двумя <video> элементами
  function swapVideoContent(vA, vB) {
    if (!vA || !vB) return;

    // Остановим оба видео
    try {
      vA.pause();
    } catch {}
    try {
      vB.pause();
    } catch {}

    // Сохраняем метаданные
    const aPoster = vA.getAttribute("poster") || "";
    const bPoster = vB.getAttribute("poster") || "";

    const aSources = Array.from(vA.querySelectorAll("source")).map((s) => ({
      src: s.getAttribute("src") || s.src,
      type: s.type || "",
    }));
    const bSources = Array.from(vB.querySelectorAll("source")).map((s) => ({
      src: s.getAttribute("src") || s.src,
      type: s.type || "",
    }));

    // Очистим текущие <source>
    vA.querySelectorAll("source").forEach((n) => n.remove());
    vB.querySelectorAll("source").forEach((n) => n.remove());

    // Помещаем источники B в A
    bSources.forEach((sObj) => {
      const s = document.createElement("source");
      s.src = sObj.src;
      if (sObj.type) s.type = sObj.type;
      vA.appendChild(s);
    });

    // Помещаем источники A в B
    aSources.forEach((sObj) => {
      const s = document.createElement("source");
      s.src = sObj.src;
      if (sObj.type) s.type = sObj.type;
      vB.appendChild(s);
    });

    // Поменяем poster
    if (bPoster) vA.setAttribute("poster", bPoster);
    else vA.removeAttribute("poster");
    if (aPoster) vB.setAttribute("poster", aPoster);
    else vB.removeAttribute("poster");

    // Обновим атрибуты управления: главный (vA) — controls, маленький (vB) — без controls
    vA.setAttribute("controls", "");
    vB.removeAttribute("controls");

    // Сброс состояния и загрузка новых source
    try {
      vA.load();
      vA.currentTime = 0;
    } catch {}
    try {
      vB.load();
      vB.currentTime = 0;
    } catch {}
  }

  // Переключаем вправо: main <-> first, затем первый элемент переносим в конец
  function rotateRight() {
    const mainVideo = document.querySelector(".video-main video");
    const firstItem = carousel.querySelector(
      ".video-carousel-item:first-child"
    );
    if (!mainVideo || !firstItem) return;
    const firstVideo = firstItem.querySelector("video");
    if (!firstVideo) return;

    swapVideoContent(mainVideo, firstVideo);

    // Убедимся, что для carousel-элемента видим youtube-icon / текст / лого (т.к. теперь там может быть видео из main)
    const yi = firstItem.querySelector(".youtube-icon");
    const logo = firstItem.querySelector(".logo-louvre");
    const txt = firstItem.querySelector(".item-txt");
    if (yi) yi.style.display = "block";
    if (logo) logo.style.display = "block";
    if (txt) txt.style.display = "block";

    // Перемещаем первый элемент в конец
    carousel.appendChild(firstItem);

    // Обновляем индикатор
    const curr = findActivePointIndex();
    const next = curr === -1 ? 0 : (curr + 1) % pointNodes.length;
    setActivePoint(next);
  }

  // Переключаем влево: last -> beginning, затем swap с main
  function rotateLeft() {
    const mainVideo = document.querySelector(".video-main video");
    const lastItem = carousel.querySelector(".video-carousel-item:last-child");
    if (!mainVideo || !lastItem) return;
    const lastVideo = lastItem.querySelector("video");
    if (!lastVideo) return;

    // Перед тем как поставить последний в начало — сначала переместим элемент в начало
    carousel.insertBefore(lastItem, carousel.firstElementChild);

    // Теперь первыйItem — это тот, который был lastItem
    const newFirst = carousel.querySelector(".video-carousel-item:first-child");
    const newFirstVideo = newFirst.querySelector("video");

    swapVideoContent(mainVideo, newFirstVideo);

    // Скрываем youtube-icon и т.п. у карусельного элемента, если нужно — но в маленьком виде они должны быть видны
    const yi = newFirst.querySelector(".youtube-icon");
    const logo = newFirst.querySelector(".logo-louvre");
    const txt = newFirst.querySelector(".item-txt");
    if (yi) yi.style.display = "block";
    if (logo) logo.style.display = "block";
    if (txt) txt.style.display = "block";

    // Обновляем индикатор (сдвиг влево)
    const curr = findActivePointIndex();
    const prev =
      curr === -1 ? 0 : (curr - 1 + pointNodes.length) % pointNodes.length;
    setActivePoint(prev);
  }

  // Навешиваем обработчики
  rightArrow.addEventListener("click", () => {
    const playBtn = document.querySelector(".video-main .play-button");
    if (playBtn) playBtn.style.display = "block";
    rotateRight();
  });
  leftArrow.addEventListener("click", () => {
    const playBtn = document.querySelector(".video-main .play-button");
    if (playBtn) playBtn.style.display = "block";
    rotateLeft();
  });

  // (опционально) клавиши влево/вправо на клавиатуре
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") rotateRight();
    if (e.key === "ArrowLeft") rotateLeft();
  });

  // Устанавливаем активный элемент при загрузке страницы
  setActivePoint(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const playButton = document.querySelector(".play-button");

  playButton.addEventListener("click", () => {
    video
      .play()
      .then(() => {
        playButton.style.display = "none";
      })
      .catch((error) => {
        console.error("Ошибка при воспроизведении видео:", error);
      });
  });

  video.addEventListener("ended", () => {
    playButton.style.display = "block";
    video.load(); // Обновляем видео для отображения poster
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все элементы
  const videoElements = document.querySelectorAll(".video-element");
  const youtubeIcons = document.querySelectorAll(".youtube-icon");
  const logoLouvres = document.querySelectorAll(".logo-louvre");
  const itemTxts = document.querySelectorAll(".item-txt");

  // Перебираем элементы
  videoElements.forEach((video, index) => {
    const youtubeIcon = youtubeIcons[index];
    const logoLouvre = logoLouvres[index];
    const itemTxt = itemTxts[index];

    // Добавляем обработчик клика
    youtubeIcon.addEventListener("click", () => {
      // Воспроизводим видео
      video
        .play()
        .then(() => {
          // Скрываем иконку после начала воспроизведения
          youtubeIcon.style.display = "none";
          logoLouvre.style.display = "none";
          itemTxt.style.display = "none";
          // Добавляем атрибут controls
          video.setAttribute("controls", "");
        })
        .catch((error) => {
          console.error("Ошибка при воспроизведении видео:", error);
        });
    });

    // Добавляем обработчик окончания воспроизведения
    video.addEventListener("ended", () => {
      // Показываем иконку после окончания видео
      youtubeIcon.style.display = "block";
      logoLouvre.style.display = "block";
      itemTxt.style.display = "block";
      // Возвращаем poster и убираем controls
      video.removeAttribute("controls");
      video.load(); // Обновляем видео для отображения poster
    });
  });
});
// ---------------------------------------------------------------

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

// // ---------------------BUY TICKETS ---------------------
// document.addEventListener('DOMContentLoaded', () => {
//     // Получаем элементы
//     const basicValueElement = document.querySelector('.basic-value');
//     const seniorValueElement = document.querySelector('.senior-value');
//     const basicMinus = document.querySelector('.basic-minus');
//     const basicPlus = document.querySelector('.basic-plus');
//     const seniorMinus = document.querySelector('.senior-minus');
//     const seniorPlus = document.querySelector('.senior-plus');
//     const priceElement = document.querySelector('.price');
//     const radioButtons = document.querySelectorAll('input[name="color"]');
    
//     // Получаем начальные значения как числа
//     let basicValue = parseInt(basicValueElement.innerText);
//     let seniorValue = parseInt(seniorValueElement.innerText);
//     let currentType = 'Permanent exhibition'; // начальное значение
    
//     // Функция для обновления общей суммы
//     function updateTotal() {
//         let totalValue = 0;
        
//         if (currentType === 'Permanent exhibition') {
//             totalValue = basicValue * 150 + seniorValue * 80;
//         } else if (currentType === 'Temporary exhibition') {
//             totalValue = basicValue * 20 + seniorValue * 10;
//         }
        
//         priceElement.innerText = `Total € ${totalValue}`;
//     }
    
//     // Обработчик для радио-кнопок
//     radioButtons.forEach(radio => {
//         radio.addEventListener('change', () => {
//             currentType = radio.value;
//             updateTotal();
//         });
//     });
    
//     // Обработчик для кнопкок
//     basicPlus.onclick = () => {
//         basicValue++;
//         basicValueElement.innerText = basicValue;
//         updateTotal();
//     };

//     basicMinus.onclick = () => {
//         if (basicValue > 0) {
//             basicValue--;
//             basicValueElement.innerText = basicValue;
//             updateTotal();
//         }
//     };
    
//     seniorPlus.onclick = () => {
//         seniorValue++;
//         seniorValueElement.innerText = seniorValue;
//         updateTotal();
//     };

//     seniorMinus.onclick = () => {
//         if (seniorValue > 0) {
//             seniorValue--;
//             seniorValueElement.innerText = seniorValue;
//             updateTotal();
//         }
//     };
    
//     // Инициализируем начальное значение
//     updateTotal();
// });
document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const basicValueElement = document.querySelector('.basic-value');
    const seniorValueElement = document.querySelector('.senior-value');
    const basicMinus = document.querySelector('.basic-minus');
    const basicPlus = document.querySelector('.basic-plus');
    const seniorMinus = document.querySelector('.senior-minus');
    const seniorPlus = document.querySelector('.senior-plus');
    const priceElement = document.querySelector('.price');
    const radioButtons = document.querySelectorAll('input[name="color"]');

    // Установим стартовые значения при первой загрузке
    let initialDataSet = false;

    // Если нет данных в localStorage, устанавливаем стандартные значения
    if (!localStorage.getItem('basicTickets')) {
        localStorage.setItem('basicTickets', '1'); // Стандартные билеты
        localStorage.setItem('seniorTickets', '1'); // Билеты старше 65+
        localStorage.setItem('selectedExhibition', 'Permanent exhibition'); // Постоянная выставка
        initialDataSet = true;
    }

    // Получаем текущие значения из localStorage
    let basicValue = parseInt(localStorage.getItem('basicTickets'));
    let seniorValue = parseInt(localStorage.getItem('seniorTickets'));
    let currentType = localStorage.getItem('selectedExhibition');

    // Если данные установлены впервые, помечаем соответствующие элементы
    if (initialDataSet) {
        radioButtons.forEach(radio => {
            if (radio.value === currentType) {
                radio.checked = true;
            }
        });
    }

    // Обновляем отображаемое значение полей
    basicValueElement.innerText = basicValue;
    seniorValueElement.innerText = seniorValue;

    // Функция для обновления общей суммы
    function updateTotal() {
        let totalValue = 0;
        
        if (currentType === 'Permanent exhibition') {
            totalValue = basicValue * 150 + seniorValue * 80;
        } else if (currentType === 'Temporary exhibition') {
            totalValue = basicValue * 20 + seniorValue * 10;
        }
        
        priceElement.innerText = `Total € ${totalValue}`;
    }

    // Обработчик для радио-кнопок
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            currentType = radio.value;
            localStorage.setItem('selectedExhibition', currentType); // Сохраняем выбранный тип выставки
            updateTotal();
        });
    });

    // Обработчик для кнопки "+" базовой категории
    basicPlus.onclick = () => {
        basicValue++;
        basicValueElement.innerText = basicValue;
        localStorage.setItem('basicTickets', basicValue); // Сохраняем новую величину базовых билетов
        updateTotal();
    };

    // Обработчик для кнопки "-" базовой категории
    basicMinus.onclick = () => {
        if (basicValue > 0) {
            basicValue--;
            basicValueElement.innerText = basicValue;
            localStorage.setItem('basicTickets', basicValue); // Сохраняем новую величину базовых билетов
            updateTotal();
        }
    };

    // Обработчик для кнопки "+" старшей категории
    seniorPlus.onclick = () => {
        seniorValue++;
        seniorValueElement.innerText = seniorValue;
        localStorage.setItem('seniorTickets', seniorValue); // Сохраняем новую величину старших билетов
        updateTotal();
    };

    // Обработчик для кнопки "-" старшей категории
    seniorMinus.onclick = () => {
        if (seniorValue > 0) {
            seniorValue--;
            seniorValueElement.innerText = seniorValue;
            localStorage.setItem('seniorTickets', seniorValue); // Сохраняем новую величину старших билетов
            updateTotal();
        }
    };

    // Инициализация общего значения цены
    updateTotal();
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
