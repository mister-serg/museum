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

// document.addEventListener("DOMContentLoaded", () => {
//   flatpickr("#datepicker", {
//     dateFormat: "d.m.Y", // Формат даты dd.mm.yyyy
//     altInput: true,
//     altFormat: "d.m.Y",
//     altInputClass: "date-input",
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const dateInput = document.getElementById("datepicker");
//   const dropDownDateSVG = document.querySelector(".dropDownDate");

//   // Сохраняем экземпляр flatpickr в переменную
//   const fp = flatpickr(dateInput, {
//     dateFormat: "d.m.Y",
//     altInput: true,
//     altFormat: "d.m.Y",
//     altInputClass: "date-input",
//   });

//   // Теперь используем сохраненный экземпляр для открытия календаря
//   dropDownDateSVG.addEventListener("click", () => {
//     if (fp.isOpen) {
//       fp.close();
//     } else {
//       fp.open();
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const dateInput = document.getElementById("datepicker");
//   const dropDownDateSVG = document.querySelector(".dropDownDate");

//   // Сохраняем экземпляр flatpickr в переменную
//   const fp = flatpickr(dateInput, {
//     dateFormat: "d.m.Y",
//     altInput: true,
//     altFormat: "d.m.Y",
//     altInputClass: "date-input",
//     // Отключаем автоматическое закрытие
//     closeOnSelect: false,
//   });

//   // Создаем переменную для отслеживания состояния
//   let isOpen = false;

//   // Обработчик для SVG
//   dropDownDateSVG.addEventListener("click", (event) => {
//     event.stopPropagation();
//     if (isOpen) {
//       fp.close();
//       isOpen = false;
//     } else {
//       fp.open();
//       isOpen = true;
//     }
//   });

//   // Обработчик для закрытия при выборе даты
//   fp.on("selected", () => {
//     isOpen = false;
//   });

//   // Обработчик для закрытия при клике вне поля
//   document.addEventListener("click", (event) => {
//     if (
//       !dateInput.contains(event.target) &&
//       !dropDownDateSVG.contains(event.target)
//     ) {
//       if (isOpen) {
//         fp.close();
//         isOpen = false;
//       }
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const dateInput = document.getElementById("datepicker");
//   const dropDownDateSVG = document.querySelector(".dropDownDate");

//   // Получаем текущую дату
//   const today = new Date();

//   // Сохраняем экземпляр flatpickr в переменную
//   const fp = flatpickr(dateInput, {
//     dateFormat: "d.m.Y",
//     altInput: true,
//     altFormat: "d.m.Y",
//     altInputClass: "date-input",
//     closeOnSelect: false,
//     // Блокируем выбор прошедших дат
//     minDate: today,
//   });

//   let isOpen = false;

//   dropDownDateSVG.addEventListener("click", (event) => {
//     event.stopPropagation();
//     if (isOpen) {
//       fp.close();
//       isOpen = false;
//     } else {
//       fp.open();
//       isOpen = true;
//     }
//   });

//   fp.on("selected", () => {
//     isOpen = false;
//   });

//   document.addEventListener("click", (event) => {
//     if (
//       !dateInput.contains(event.target) &&
//       !dropDownDateSVG.contains(event.target)
//     ) {
//       if (isOpen) {
//         fp.close();
//         isOpen = false;
//       }
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("datepicker");
    const dropDownDateSVG = document.querySelector(".dropDownDate");

    // Получаем текущую дату
    const today = new Date();

    // Функция для проверки, является ли день вторником
    const isTuesday = (date) => {
        return date.getDay() === 2; // 2 - это вторник
    };

    // Сохраняем экземпляр flatpickr в переменную
    const fp = flatpickr(dateInput, {
        dateFormat: "d.m.Y",
        altInput: true,
        altFormat: "d.m.Y",
        altInputClass: "date-input",
        closeOnSelect: false,
        minDate: today,
        disable: [
            isTuesday // Используем функцию для отключения вторников
        ]
    });

    let isOpen = false;

    dropDownDateSVG.addEventListener("click", (event) => {
        event.stopPropagation();
        if (isOpen) {
            fp.close();
            isOpen = false;
        } else {
            fp.open();
            isOpen = true;
        }
    });

    fp.on("selected", () => {
        isOpen = false;
    });

    document.addEventListener("click", (event) => {
        if (
            !dateInput.contains(event.target) &&
            !dropDownDateSVG.contains(event.target)
        ) {
            if (isOpen) {
                fp.close();
                isOpen = false;
            }
        }
    });
});

