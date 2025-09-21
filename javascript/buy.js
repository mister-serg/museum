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

// document.addEventListener("DOMContentLoaded", () => {
//     const dateInput = document.getElementById("datepicker");
//     const dropDownDateSVG = document.querySelector(".dropDownDate");

//     // Получаем текущую дату
//     const today = new Date();

//     // Функция для проверки, является ли день вторником
//     const isTuesday = (date) => {
//         return date.getDay() === 2; // 2 - это вторник
//     };

//     // Сохраняем экземпляр flatpickr в переменную
//     const fp = flatpickr(dateInput, {
//         dateFormat: "d.m.Y",
//         altInput: true,
//         altFormat: "d.m.Y",
//         altInputClass: "date-input",
//         closeOnSelect: false,
//         minDate: today,
//         disable: [
//             isTuesday // Используем функцию для отключения вторников
//         ]
//     });

//     let isOpen = false;

//     dropDownDateSVG.addEventListener("click", (event) => {
//         event.stopPropagation();
//         if (isOpen) {
//             fp.close();
//             isOpen = false;
//         } else {
//             fp.open();
//             isOpen = true;
//         }
//     });

//     fp.on("selected", () => {
//         isOpen = false;
//     });

//     document.addEventListener("click", (event) => {
//         if (
//             !dateInput.contains(event.target) &&
//             !dropDownDateSVG.contains(event.target)
//         ) {
//             if (isOpen) {
//                 fp.close();
//                 isOpen = false;
//             }
//         }
//     });
// });

// Прописываем обработчик события click на SVG для открытия календаря
document.addEventListener("DOMContentLoaded", () => {
    const dateContainer = document.querySelector(".date");
    const dateInput = document.getElementById("datepicker");
    const dropDownDateSVG = document.querySelector(".dropDownDate");

    // Получаем текущую дату
    const today = new Date();

    // Функция для проверки, является ли день вторником
    const isTuesday = (date) => date.getDay() === 2; // 2 - вторник

    // Создаём/получаем элемент для сообщения об ошибке (под контейнером .date)
    let errorEl = dateContainer.querySelector(".error-message");
    if (!errorEl) {
        errorEl = document.createElement("div");
        errorEl.className = "error-message";
        errorEl.id = "date-error";
        errorEl.setAttribute("aria-live", "polite");
        errorEl.setAttribute("role", "status");
        // Размещаем после контейнера (чтобы не ломать существующую структуру)
        dateContainer.appendChild(errorEl);
    }

    // Помощник: установить состояние ошибки (message = "" => валидно)
    function setInvalidState(message) {
        // Видимый input, который создаёт flatpickr при altInput: true
        const visible = fp && fp.altInput ? fp.altInput : dateInput;

        if (message) {
            visible.classList.add("invalid");
            visible.setAttribute("aria-invalid", "true");
            errorEl.textContent = message;
        } else {
            visible.classList.remove("invalid");
            visible.setAttribute("aria-invalid", "false");
            errorEl.textContent = "";
        }
    }

    // Проверка — пустое значение => ошибка
    function validateRequired() {
        const value = (fp && fp.input ? fp.input.value : dateInput.value).trim();
        if (value.length === 0) {
            return "This field is required.";
        }
        return "";
    }

    // Сохраняем экземпляр flatpickr в переменную
    const fp = flatpickr(dateInput, {
        dateFormat: "d.m.Y",
        altInput: true,
        altFormat: "d.m.Y",
        altInputClass: "date-input",
        closeOnSelect: false,
        minDate: today,
        clickOpens: false, // предотвращаем открытие по клику в input
        disable: [isTuesday],
        onChange(selectedDates, dateStr, instance) {
            // Если есть значение — убираем ошибку
            const msg = validateRequired();
            if (!msg) {
                setInvalidState("");
            } else {
                // Если пользователь очистил дату — показываем сообщение
                setInvalidState(msg);
            }
            console.log(`Selected dates: ${dateStr}`);
        }
    });

    let isOpen = false;

    // Подключаем события к видимому input (altInput) — он уже должен существовать
    const attachAltInputListeners = () => {
        const visible = fp && fp.altInput ? fp.altInput : dateInput;

        // input событие — интерактивная проверка
        visible.addEventListener("input", () => {
            const msg = validateRequired();
            setInvalidState(msg);
        });

        // blur — финальная проверка
        visible.addEventListener("blur", () => {
            const msg = validateRequired();
            setInvalidState(msg);
        });
    };

    attachAltInputListeners();

    // Открытие/закрытие календаря только по клику на SVG
    dropDownDateSVG.addEventListener("click", (event) => {
        event.stopPropagation();
        if (isOpen) {
            fp.close();
            isOpen = false;
            // при закрытии проверяем обязательность
            const msg = validateRequired();
            setInvalidState(msg);
        } else {
            fp.open();
            isOpen = true;
        }
    });

    // Закрываем при клике вне input/altInput и svg
    document.addEventListener("click", (event) => {
        const target = event.target;
        const altInput = fp.altInput;

        const clickedInsideInput = fp.input && fp.input.contains(target);
        const clickedInsideAltInput = altInput && altInput.contains(target);
        const clickedInsideSvg = dropDownDateSVG && dropDownDateSVG.contains(target);

        if (!clickedInsideInput && !clickedInsideAltInput && !clickedInsideSvg) {
            if (isOpen) {
                fp.close();
                isOpen = false;
                // Проверяем обязательность при закрытии
                const msg = validateRequired();
                setInvalidState(msg);
            }
        }
    });

    // При отправке формы — дополнительная проверка (если поле внутри формы)
    const form = dateInput.closest("form");
    if (form) {
        form.addEventListener("submit", (ev) => {
            const msg = validateRequired();
            setInvalidState(msg);
            if (msg) {
                ev.preventDefault();
                // Фокусируем видимый input
                const visible = fp && fp.altInput ? fp.altInput : dateInput;
                visible.focus();
            }
        });
    }
});

// ------------------------------------------------------------------------------

// ---------------------- Прописываем валидацию формы NAME ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.querySelector(".name");
  const errorEl = document.getElementById("name-error");

  // Регэкс: лат/кириллица, пробел, дефис, апостроф; без цифр и спецсимволов
  const nameRegex = /^[A-Za-zА-Яа-яЁё'\- ]+$/;
  const MIN_LEN = 2;
  const MAX_LEN = 50;

  // Возвращает текст ошибки (англ.) или пустую строку, если всё ок
  function getValidationMessage(value) {
    const v = value.trim();

    if (v.length === 0) {
      return "This field is required.";
    }
    if (v.length < MIN_LEN) {
      return `Name must be at least ${MIN_LEN} characters.`;
    }
    if (v.length > MAX_LEN) {
      return `Name must be at most ${MAX_LEN} characters.`;
    }
    if (!nameRegex.test(v)) {
      return "Only letters, spaces, hyphens and apostrophes are allowed.";
    }
    return "";
  }

  function setInvalidState(message) {
    if (message) {
      nameInput.classList.add("invalid");
      nameInput.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      nameInput.classList.remove("invalid");
      nameInput.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
    }
  }

  // Валидация в реальном времени
  nameInput.addEventListener("input", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Финальная проверка при потере фокуса
  nameInput.addEventListener("blur", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // При отправке формы — дополнительная проверка (если поле внутри формы)
  const form = nameInput.closest("form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      const msg = getValidationMessage(nameInput.value);
      setInvalidState(msg);
      if (msg) {
        ev.preventDefault();
        nameInput.focus();
      }
    });
  }
});
// ------------------------------------------------------------------------------

// ------------ Прописываем валидацию формы E-MAIL ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const emailContainer = document.querySelector(".email-conteiner");
  const emailInput = emailContainer.querySelector(".email");
  let errorEl = document.getElementById("email-error");

  // Если элемент ошибки отсутствует — создаём (на случай, если HTML не содержит)
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = "email-error";
    errorEl.className = "error-message";
    errorEl.setAttribute("aria-live", "polite");
    errorEl.setAttribute("role", "status");
    emailContainer.appendChild(errorEl);
  }

  const MAX_LEN = 254; // практический максимум для email
  // Простая проверка формата email (не пытаться покрыть все RFC-случаи)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getValidationMessage(value) {
    const v = value.trim();

    if (v.length === 0) {
      return "This field is required.";
    }
    if (v.length > MAX_LEN) {
      return `Email must be at most ${MAX_LEN} characters.`;
    }
    if (!emailRegex.test(v)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  function setInvalidState(message) {
    if (message) {
      emailInput.classList.add("invalid");
      emailInput.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      emailInput.classList.remove("invalid");
      emailInput.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
    }
  }

  // Реакция на ввод (live validation)
  emailInput.addEventListener("input", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Финальная проверка при потере фокуса
  emailInput.addEventListener("blur", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Валидация при отправке формы (если поле находится внутри формы)
  const form = emailInput.closest("form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      const msg = getValidationMessage(emailInput.value);
      setInvalidState(msg);
      if (msg) {
        ev.preventDefault();
        emailInput.focus();
      }
    });
  }
});
// -------------------------------------------------------------------------------------

// -------------------- Прописываем валидацию формы PHONE ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const phoneContainer = document.querySelector(".phone-conteiner");
  const phoneInput = phoneContainer.querySelector(".phone");
  let errorEl = document.getElementById("phone-error");

  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = "phone-error";
    errorEl.className = "error-message";
    errorEl.setAttribute("aria-live", "polite");
    errorEl.setAttribute("role", "status");
    phoneContainer.appendChild(errorEl);
  }

  // Разрешенные символы: цифры, пробелы, +, -, ( ), точки
  const allowedCharsRegex = /^[+\d\s().-]+$/;
  const MIN_DIGITS = 7;
  const MAX_DIGITS = 15;

  function countDigits(value) {
    return (value.match(/\d/g) || []).length;
  }

  function getValidationMessage(value) {
    const v = value.trim();

    if (v.length === 0) {
      return "This field is required.";
    }

    if (!allowedCharsRegex.test(v)) {
      return "Only digits, spaces, +, parentheses, hyphens and dots are allowed.";
    }

    const digits = countDigits(v);
    if (digits < MIN_DIGITS || digits > MAX_DIGITS) {
      return `Phone number must contain between ${MIN_DIGITS} and ${MAX_DIGITS} digits.`;
    }

    // Доп. проверка: не слишком длинная строка (на случай злоупотреблений)
    if (v.length > 30) {
      return "Phone number is too long.";
    }

    return "";
  }

  function setInvalidState(message) {
    if (message) {
      phoneInput.classList.add("invalid");
      phoneInput.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      phoneInput.classList.remove("invalid");
      phoneInput.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
    }
  }

  // Live validation
  phoneInput.addEventListener("input", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Final check on blur
  phoneInput.addEventListener("blur", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Form submit validation
  const form = phoneInput.closest("form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      const msg = getValidationMessage(phoneInput.value);
      setInvalidState(msg);
      if (msg) {
        ev.preventDefault();
        phoneInput.focus();
      }
    });
  }
});
// -------------------------------------------------------------------------------------

// --------------- Прописываем клик и валидацию формы TICKET TYPE ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".ticketType-conteiner");
  if (!container) return;

  const input = container.querySelector(".ticketType");
  const toggle = container.querySelector(".dropDownTicketType");
  const list = document.getElementById("tickettype-list");
  const options = Array.from(list.querySelectorAll(".tickettype-option"));
  const errorEl = document.getElementById("ticketType-error");

  // Удобная функция для установки состояния ошибки
  function setInvalidState(message) {
    if (message) {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.classList.remove("invalid");
      input.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
    }
  }

  // Валидация: обязательное поле
  function getValidationMessage(value) {
    if (!value || value.trim().length === 0) {
      return "This field is required.";
    }
    return "";
  }

  // Открыть/закрыть список
  function openList() {
    list.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
    // сброс aria-selected и фокус на первую опцию
    options.forEach(opt => opt.setAttribute("aria-selected", "false"));
    options[0]?.focus();
  }
  function closeList() {
    list.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  }
  function toggleList() {
    if (list.classList.contains("show")) closeList();
    else openList();
  }

  // При клике на svg-toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleList();
  });
  // Доступность: открыть по Enter/Space
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      toggleList();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      openList();
    }
  });

  // Клик по опции
  options.forEach(opt => {
    opt.addEventListener("click", (e) => {
      const value = opt.getAttribute("data-value") || opt.textContent.trim();
      input.value = value;
      setInvalidState(getValidationMessage(input.value));
      // Отметить выбранную опцию (для aria)
      options.forEach(o => o.setAttribute("aria-selected", "false"));
      opt.setAttribute("aria-selected", "true");
      closeList();
      input.focus();
    });

    // Клавиши для опций (Enter/Esc/Arrow)
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        opt.click();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        closeList();
        toggle.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const idx = options.indexOf(opt);
        const next = options[idx + 1] || options[0];
        next.focus();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const idx = options.indexOf(opt);
        const prev = options[idx - 1] || options[options.length - 1];
        prev.focus();
        return;
      }
    });
  });

  // Закрыть при клике вне
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      closeList();
    }
  });

  // Esc при фокусе на документе
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeList();
    }
  });

  // Live validation
  input.addEventListener("input", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Final check on blur
  input.addEventListener("blur", (e) => {
    const msg = getValidationMessage(e.target.value);
    setInvalidState(msg);
  });

  // Validation on form submit (если внутри формы)
  const form = input.closest("form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      const msg = getValidationMessage(input.value);
      setInvalidState(msg);
      if (msg) {
        ev.preventDefault();
        input.focus();
      }
    });
  }
});
// -------------------------------------------------------------------------------------

// --------------- Прописываем клик и валидацию формы CARD NUMBER ----------------------
// document.addEventListener("DOMContentLoaded", () => {
//   const cardInput = document.querySelector(".cardNumber");

//   if (cardInput) {
//     cardInput.addEventListener("blur", validateCardNumber); // проверка при потере фокуса
//     cardInput.addEventListener("input", formatCardNumber); // форматирование при вводе
//     cardInput.addEventListener("focus", resetValidation); // очистка ошибки при повторном заходе
//   } else {
//     console.error("Не найден элемент с классом cardNumber!");
//   }

//   // Валидация номера карты
//   function validateCardNumber() {
//     const value = this.value.trim().replace(/\s+/g, ''); // Убираем пробелы
//     const regex = /^(\d){16}$/; // Ровно 16 цифр

//     if (!regex.test(value)) {
//       this.classList.add("invalid"); // Добавляем класс при ошибке
//     } else {
//       this.classList.remove("invalid"); // Убираем класс при успешной проверке
//     }
//   }

//   // Обнуление ошибки при повторном входе в поле
//   function resetValidation() {
//     this.classList.remove("invalid"); // Убираем красный цвет при повторном заходе
//   }

//   // Функционал для автоматического расстановки пробелов после каждых 4-х цифр
//   function formatCardNumber(e) {
//     let rawValue = e.target.value.replace(/[^0-9]+/g, ""); // Оставляем только цифры

//     if (rawValue.length > 16) {
//       rawValue = rawValue.slice(0, 16); // Только 16 цифр
//     }

//     let formattedValue = "";
//     for (let i = 0; i < rawValue.length; i++) {
//       formattedValue += rawValue.charAt(i);
//       if ((i + 1) % 4 === 0 && i !== rawValue.length - 1) {
//         formattedValue += " "; // Пробел после каждых 4-х цифр
//       }
//     }

//     e.target.value = formattedValue;
//   }
// });
// // -------------------------------------------------------------------------------------

// // --------------- Прописываем клик и валидацию формы CARD EXPIRY ----------------------
// document.addEventListener("DOMContentLoaded", () => {
//   const validityInput = document.querySelector(".cardValidity");

//   if (validityInput) {
//     validityInput.addEventListener("blur", validateExpiryDate); // проверка при потере фокуса
//     validityInput.addEventListener("input", formatExpiryDate); // форматирование при вводе
//     validityInput.addEventListener("focus", resetValidation); // очистим ошибку при повторном входе
//   } else {
//     console.error("Не найден элемент с классом cardValidity!");
//   }

//   // Валидация срока действия
//   function validateExpiryDate() {
//     const value = this.value.trim().replace(/[^0-9\s\/\-]/g, ""); // Оставляем только цифры, пробелы и слэш
//     const parts = value.split(/[\s\/]+/); // Разделение по пробелам и слэшу

//     if (parts.length !== 2) {
//       this.classList.add("invalid"); // Недостаточно данных для проверки
//       return;
//     }

//     const month = parseInt(parts[0], 10);
//     const year = parseInt(parts[1], 10);

//     // Получаем текущий год (получаем последние две цифры)
//     const currentYearFull = new Date().getFullYear();
//     const currentYearShort = String(currentYearFull).slice(-2);

//     // Проверка месяца и года
//     if (
//       !(month >= 1 && month <= 12) ||                         // Проверка месяца
//       !(year >= Number(currentYearShort)) ||                   // Год должен быть не меньше текущего
//       (year === Number(currentYearShort) && month < (new Date().getMonth() + 1)) // Если год текущий, месяц должен быть не меньше текущего
//     ) {
//       this.classList.add("invalid"); // Добавляем класс при ошибке
//     } else {
//       this.classList.remove("invalid"); // Убираем класс при успешной проверке
//     }
//   }

//   // Форматирование ввода (автоматически ставит слэш после месяца)
//   function formatExpiryDate(e) {
//     let rawValue = e.target.value.replace(/[^0-9]+/g, ""); // Оставляем только цифры

//     if (rawValue.length > 4) {
//       rawValue = rawValue.slice(0, 4); // Только 4 цифры
//     }

//     let formattedValue = "";
//     if (rawValue.length > 2) {
//       formattedValue = `${rawValue.substring(0, 2)} / ${rawValue.substring(2)}`;
//     } else {
//       formattedValue = rawValue;
//     }

//     e.target.value = formattedValue;
//   }

//   // Сброс ошибки при повторном входе в поле
//   function resetValidation() {
//     this.classList.remove("invalid"); // Убираем красный цвет при повторном заходе
//   }
// });

// -------------- Прописываем клик и валидацию для карты ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const cardInput = document.querySelector(".cardNumber");
  const expiryInput = document.querySelector(".cardValidity");
  const holderInput = document.querySelector(".cardholderName");

  if (cardInput && expiryInput && holderInput) {
    cardInput.addEventListener("blur", validateCardNumber);
    cardInput.addEventListener("input", formatCardNumber);
    cardInput.addEventListener("focus", resetValidation);

    expiryInput.addEventListener("blur", validateExpiryDate);
    expiryInput.addEventListener("input", formatExpiryDate);
    expiryInput.addEventListener("focus", resetValidation);

    holderInput.addEventListener("blur", validateHolderName);
    holderInput.addEventListener("input", allowLettersSpacesDashes); // новое событие input
    holderInput.addEventListener("focus", resetValidation);
  } else {
    console.error("Один из элементов не найден!");
  }

  // Валидация номера карты
  function validateCardNumber() {
    const value = this.value.trim().replace(/\s+/g, '');
    const regex = /^(\d){16}$/;

    if (!regex.test(value)) {
      this.classList.add("invalid");
    } else {
      this.classList.remove("invalid");
    }
  }

  // Валидация срока действия карты
  function validateExpiryDate() {
    const value = this.value.trim().replace(/[^0-9\s\/\-]/g, "");
    const parts = value.split(/[\s\/]+/);

    if (parts.length !== 2) {
      this.classList.add("invalid");
      return;
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    const currentYearFull = new Date().getFullYear();
    const currentYearShort = String(currentYearFull).slice(-2);

    if (
      !(month >= 1 && month <= 12) ||
      !(year >= Number(currentYearShort)) ||
      (year === Number(currentYearShort) && month < (new Date().getMonth() + 1))
    ) {
      this.classList.add("invalid");
    } else {
      this.classList.remove("invalid");
    }
  }

  // Валидация имени владельца карты
  function validateHolderName() {
    const value = this.value.trim();
    const regex = /^[A-Za-z\s\-]{2,50}$/;

    if (!regex.test(value)) {
      this.classList.add("invalid");
    } else {
      this.classList.remove("invalid");
    }
  }

  // Форматирование номера карты
  function formatCardNumber(e) {
    let rawValue = e.target.value.replace(/[^0-9]+/g, "");

    if (rawValue.length > 16) {
      rawValue = rawValue.slice(0, 16);
    }

    let formattedValue = "";
    for (let i = 0; i < rawValue.length; i++) {
      formattedValue += rawValue.charAt(i);
      if ((i + 1) % 4 === 0 && i !== rawValue.length - 1) {
        formattedValue += " ";
      }
    }

    e.target.value = formattedValue;
  }

  // Форматирование срока действия
  function formatExpiryDate(e) {
    let rawValue = e.target.value.replace(/[^0-9]+/g, "");

    if (rawValue.length > 4) {
      rawValue = rawValue.slice(0, 4);
    }

    let formattedValue = "";
    if (rawValue.length > 2) {
      formattedValue = `${rawValue.substring(0, 2)} / ${rawValue.substring(2)}`;
    } else {
      formattedValue = rawValue;
    }

    e.target.value = formattedValue;
  }

  // Обнуление ошибки при повторном входе в поле
  function resetValidation() {
    this.classList.remove("invalid");
  }

  // Разрешаем только латинские буквы, пробелы и дефисы
  function allowLettersSpacesDashes(e) {
    const cleanedValue = e.target.value.replace(/[^A-Za-z\s\-]/g, ""); // Оставляем только буквы, пробелы и дефисы
    e.target.value = cleanedValue;
  }
});