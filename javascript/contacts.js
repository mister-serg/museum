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
      burger.style.display = "block"; // Показываем гамбургер на малых экранах
    } else {
      burger.style.display = "none"; // Скрываем гамбургер на больших экранах
      menuAdaptive.style.display = "none"; // Обязательно прячем меню на больших экранах
    }
  }

  // Первоначальная проверка размеров экрана при загрузке страницы
  checkScreenSize();

  // Нажатие на бургур-меню
  burger.addEventListener("click", toggleMenu);

  // Проверка изменений размеров окна
  window.addEventListener("resize", checkScreenSize);
});