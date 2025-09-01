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
  burger.addEventListener("click", toggleMenu);

  // Изменение размера окна
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 || window.innerWidth > 768) {
      // За пределами границ меню всегда скрыто
      menuAdaptive.style.display = "none";

      // Устанавливаем соответствующие состояния других блоков
      textContainer.style.display = "block";
      imageContainer.style.display = "block";
      carousel.style.display = "flex";
      welcomeGallery.style.display = "none";
      socialNetwork.style.display = "none";
    }
  });
});

// Слайдер
document.addEventListener("DOMContentLoaded", () => {
  const circleElement = document.querySelector(
    ".explore-img-child-line-circle"
  );
  const exploreImgChild = document.querySelector(".explore-img-child");
  const exploreImgEre = document.querySelector(".explore-img-ere");

  let dragging = false;
  let startX, clientX, originalLeft;

  // Размеры окружности и контейнера
  const circleRect = circleElement.getBoundingClientRect();
  const parentWidth = exploreImgChild.parentNode.offsetWidth;

  // Общие функции для обработки событий
  function handleStart(event) {
    event.preventDefault(); // Предотвращаем стандартные реакции браузера
    dragging = true;
    startX = event.type.includes("touch") // Если событие касается (touch)
      ? event.touches[0].pageX // Берём координату касания
      : event.pageX; // Иначе берём координату мыши
    originalLeft = parseFloat(getComputedStyle(exploreImgChild).left) || 0;
    circleElement.style.cursor = "grabbing";
  }

  function handleMove(event) {
    if (!dragging) return;
    event.preventDefault(); // Предотвращаем прокрутку страницы

    const clientXValue = event.type.includes("touch") // Если событие касается (touch)
      ? event.touches[0].pageX // Берём координату касания
      : event.pageX; // Иначе берём координату мыши

    const deltaX = clientXValue - startX;
    const newLeft = originalLeft + deltaX;

    // Ограничиваем перемещение элементами контейнера
    const boundedLeft = Math.max(
      0, // Минимальная позиция слева
      Math.min(newLeft, parentWidth - circleRect.width / 6) // Максимальная позиция справа
    );

    // Применяем новую позицию
    exploreImgChild.style.left = `${boundedLeft}px`;

    // Пересчёт clip-path относительно центра окружности
    const centerOfCircle = boundedLeft + circleRect.width / 5; // Центр окружности
    const relativeCenter = centerOfCircle / parentWidth;
    const centerPointPercent = relativeCenter * 100 + "%";

    exploreImgEre.style.clipPath = `polygon(0 0, ${centerPointPercent} 0, ${centerPointPercent} 100%, 0 100%)`;
  }

  function handleEnd() {
    dragging = false;
    circleElement.style.cursor = "";
  }

  // Обработчики событий для мыши
  circleElement.addEventListener("mousedown", handleStart);
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);

  // Обработчики событий для сенсорных устройств
  circleElement.addEventListener("touchstart", handleStart, { passive: false });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd);
});