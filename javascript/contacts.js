document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menuAdaptive = document.querySelector(".menu-adaptive");

  function toggleMenu() {
    if (menuAdaptive.style.display === "flex") {
      menuAdaptive.style.display = "none"; // Скрываем меню
    } else {
      menuAdaptive.style.display = "flex"; // Показываем меню
    }
  }

  function checkScreenSize() {
    if (window.innerWidth >= 0 && window.innerWidth <= 1024) {
      burger.style.display = "block"; // Показываем бургер на малых экранах
    } else {
      burger.style.display = "none"; // Скрываем бургер на больших экранах
      menuAdaptive.style.display = "none"; // Всегда прячем меню на больших экранах
    }

    // Проверяем особые условия для сокрытия меню при изменении размера окна
    if (
      (window.innerWidth < 1024 && menuAdaptive.style.display !== "none") ||
      (window.innerWidth < 768 && menuAdaptive.style.display !== "none")
    ) {
      menuAdaptive.style.display = "none"; // Автоматически скрываем меню при смене размера окна
    }
  }

  // Первоначальная проверка размеров экрана при загрузке страницы
  checkScreenSize();

  // Нажатие на бургур-меню
  burger.addEventListener("click", toggleMenu);

  // Проверка изменений размеров окна
  window.addEventListener("resize", checkScreenSize);
});

// Создание карты
const screenWidth = window.innerWidth;

// Создание карты с адаптивным масштабом
let zoomLevel;
if (screenWidth >= 1920) {
  zoomLevel = 17;
} else if (screenWidth >= 1024) {
  zoomLevel = 16.4;
} else if (screenWidth >= 768) {
  zoomLevel = 20;
} else {
  zoomLevel = 20; // Значение по умолчанию для меньших экранов
}

const map = L.map('map').setView([48.86091, 2.3364], zoomLevel);

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
