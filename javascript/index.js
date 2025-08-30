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

// document.addEventListener("DOMContentLoaded", () => {
//   const circleElement = document.querySelector('.explore-img-child-line-circle');
//   const exploreImgChild = document.querySelector('.explore-img-child');
//   const exploreImgEre = document.querySelector('.explore-img-ere');

//   let dragging = false;
//   let startX, clientX, originalLeft;

//   // Размеры окружности и контейнера
//   const circleRect = circleElement.getBoundingClientRect();
//   const circleCenterX = circleRect.x + circleRect.width / 2; // Центр окружности
//   const parentWidth = exploreImgChild.parentNode.offsetWidth;

//   // Начало движения (при нажатии мышью)
//   circleElement.addEventListener('mousedown', e => {
//     dragging = true;
//     startX = e.clientX;
//     originalLeft = parseFloat(getComputedStyle(exploreImgChild).left) || 0;
//   });

//   // Перемещение мыши
//   document.addEventListener('mousemove', e => {
//     if (!dragging) return;

//     // Получаем новые координаты перемещения
//     const deltaX = e.clientX - startX;
//     const newLeft = originalLeft + deltaX;

//     // Ограничиваем перемещение элементами контейнера
//     const boundedLeft = Math.max(
//       0,                                // Минимальная позиция слева
//       Math.min(newLeft, parentWidth - circleRect.width)  // Максимальная позиция справа
//     );

//     // Применяем новую позицию
//     exploreImgChild.style.left = `${boundedLeft}px`;

//     // Пересчёт clip-path относительно центра окружности
//     const relativeCenter = (boundedLeft + circleRect.width / 2) / parentWidth;
//     const centerPointPercent = relativeCenter * 100 + '%';

//     exploreImgEre.style.clipPath = `polygon(0 0, ${centerPointPercent} 0, ${centerPointPercent} 100%, 0 100%)`;
//   });

//   // Завершение движения (отпускаем кнопку мыши)
//   document.addEventListener('mouseup', () => {
//     dragging = false;
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const circleElement = document.querySelector('.explore-img-child-line-circle');
//   const exploreImgChild = document.querySelector('.explore-img-child');
//   const exploreImgEre = document.querySelector('.explore-img-ere');

//   let dragging = false;
//   let startX, clientX, originalLeft;

//   // Размеры окружности и контейнера
//   const circleRect = circleElement.getBoundingClientRect();
//   const parentWidth = exploreImgChild.parentNode.offsetWidth;

//   // Начало движения (при нажатии мышью)
//   circleElement.addEventListener('mousedown', e => {
//     dragging = true;
//     startX = e.clientX;
//     originalLeft = parseFloat(getComputedStyle(exploreImgChild).left) || 0;
//   });

//   // Перемещение мыши
//   document.addEventListener('mousemove', e => {
//     if (!dragging) return;

//     // Получаем новые координаты перемещения
//     const deltaX = e.clientX - startX;
//     const newLeft = originalLeft + deltaX;

//     // Ограничиваем перемещение элементами контейнера
//     const boundedLeft = Math.max(
//       0,                                    // Мин. позиция слева
//       Math.min(newLeft, parentWidth - circleRect.width)  // Макс. позиция справа
//     );

//     // Применяем новую позицию
//     exploreImgChild.style.left = `${boundedLeft}px`;

//     // Пересчёт clip-path относительно центра окружности
//     const relativeCenter = (boundedLeft + circleRect.width / 2) / parentWidth;
//     const centerPointPercent = relativeCenter * 100 + '%';

//     exploreImgEre.style.clipPath = `polygon(0 0, ${centerPointPercent} 0, ${centerPointPercent} 100%, 0 100%)`;
//   });

//   // Завершение движения (отпускаем кнопку мыши)
//   document.addEventListener('mouseup', () => {
//     dragging = false;
//   });
// });

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

  // Начало движения (при нажатии мышью)
  circleElement.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    originalLeft = parseFloat(getComputedStyle(exploreImgChild).left) || 0;
    circleElement.style.cursor = "grabbing";
  });

  // Перемещение мыши
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    // Получаем новые координаты перемещения
    const deltaX = e.clientX - startX;
    const newLeft = originalLeft + deltaX;

    // Ограничиваем перемещение элементами контейнера
    const boundedLeft = Math.max(
      0, // Минимальная позиция слева
      Math.min(newLeft, parentWidth - circleRect.width / 6) // Максимальная позиция справа
    );

    // Применяем новую позицию
    exploreImgChild.style.left = `${boundedLeft}px`;

    // Пересчёт clip-path относительно центра окружности
    const centerOfCircle = boundedLeft + circleRect.width / 5; // НАСТОЯЩИЙ ЦЕНТР ОКРУЖНОСТИ
    const relativeCenter = centerOfCircle / parentWidth;
    const centerPointPercent = relativeCenter * 100 + "%";

    exploreImgEre.style.clipPath = `polygon(0 0, ${centerPointPercent} 0, ${centerPointPercent} 100%, 0 100%)`;
  });

  // Завершение движения (отпускаем кнопку мыши)
  document.addEventListener("mouseup", () => {
    dragging = false;
    circleElement.style.cursor = '';
  });
});

// Добавление тайлов (фонов карты)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Добавление маркеров
const marker1 = L.marker([48.86091, 2.3364]).addTo(map);
const marker2 = L.marker([48.8602, 2.3333]).addTo(map);
const marker3 = L.marker([48.8607, 2.3397]).addTo(map);
const marker4 = L.marker([48.8619, 2.333]).addTo(map);
const marker5 = L.marker([48.8625, 2.3365]).addTo(map);
