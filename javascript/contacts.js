// document.addEventListener("DOMContentLoaded", () => {
//   const burger = document.querySelector(".burger");
//   const menuAdaptive = document.querySelector(".menu-adaptive");

//   function toggleMenu() {
//     if (menuAdaptive.style.display === "flex") {
//       menuAdaptive.style.display = "none"; // Скрываем меню
//     } else {
//       menuAdaptive.style.display = "flex"; // Показываем меню
//     }
//   }

//   function checkScreenSize() {
//     if (window.innerWidth >= 0 && window.innerWidth <= 1024) {
//       burger.style.display = "block"; // Показываем гамбургер на малых экранах
//     } else {
//       burger.style.display = "none"; // Скрываем гамбургер на больших экранах
//       menuAdaptive.style.display = "none"; // Обязательно прячем меню на больших экранах
//     }
//   }

//   // Первоначальная проверка размеров экрана при загрузке страницы
//   checkScreenSize();

//   // Нажатие на бургур-меню
//   burger.addEventListener("click", toggleMenu);

//   // Проверка изменений размеров окна
//   window.addEventListener("resize", checkScreenSize);
// });
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