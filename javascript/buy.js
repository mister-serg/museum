// document.addEventListener("DOMContentLoaded", () => {
//   const burger = document.querySelector(".burger");
//   const menu = document.querySelector(".menu");

//   burger.addEventListener("click", () => {
//     // Для диапазона 769-1024px
//     if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
//       menu.classList.toggle("active");
//     }

//     // Для диапазона 421-768px
//     if (window.innerWidth >= 421 && window.innerWidth <= 768) {
//       menu.classList.toggle("active");
//     }
//   });

//   // Добавляем обработчик изменения размера окна
//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 1024 || window.innerWidth < 420) {
//       menu.classList.remove("active");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  function toggleMenu() {
    menu.classList.toggle("active");
  }

  function checkScreenSize() {
    if (window.innerWidth >= 0 && window.innerWidth <= 1024) {
      burger.style.display = "block";
    } else {
      burger.style.display = "none";
      menu.classList.remove("active"); // Скрываем меню при выходе из диапазона
    }
  }

  // Первоначальная проверка размеров экрана при загрузке страницы
  checkScreenSize();

  // Нажатие на бургур-меню
  burger.addEventListener("click", toggleMenu);

  // Проверка изменений размеров окна
  window.addEventListener("resize", checkScreenSize);
});