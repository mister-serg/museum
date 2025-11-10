// Прописываем обработчик события click на бургер для открытия календаря
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
// -------------------------------------------------------------------------------------------

// -------------- Прописываем обработчик события click для открытия календаря ----------------
document.addEventListener("DOMContentLoaded", () => {
  const dateContainer = document.querySelector(".date");
  const dateInput = document.getElementById("datepicker");
  const dropDownDateSVG = document.querySelector(".dropDownDate");
  const resDateTxt = document.querySelector('.res-date-txt'); // Элемент для вывода отформатированной даты

  const today = new Date();

  // Проверка, что дата — не вторник
  const isTuesday = (date) => date.getDay() === 2;

  // Создаём/получаем элемент для сообщения об ошибке
  let errorEl = dateContainer.querySelector(".error-message");
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.className = "error-message";
    errorEl.id = "date-error";
    errorEl.setAttribute("aria-live", "polite");
    errorEl.setAttribute("role", "status");
    dateContainer.appendChild(errorEl);
  }

  function setInvalidState(message) {
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

  function validateRequired() {
    const value = (fp && fp.input ? fp.input.value : dateInput.value).trim();
    if (value.length === 0) {
      return "This field is required.";
    }
    return "";
  }

  function formatDateLong(date) {
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayMonth = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });
    const year = date.getFullYear();
    return `${weekday}, ${dayMonth}, ${year}`;
  }

  function syncCalendarWidth() {
    const calendarContainer = fp.calendarContainer;
    const visibleInput = fp.altInput || fp.input;
    if (calendarContainer && visibleInput) {
      const inputWidth = visibleInput.getBoundingClientRect().width;
      calendarContainer.style.width = `${inputWidth}px`;
    }
  }

  // Инициализация flatpickr
  const fp = flatpickr(dateInput, {
    dateFormat: "d.m.Y",
    altInput: true,
    altFormat: "d.m.Y",
    altInputClass: "date-input",
    closeOnSelect: false,
    minDate: today,
    clickOpens: false,
    disable: [isTuesday],
    onChange(selectedDates, dateStr) {
      const msg = validateRequired();
      if (!msg) {
        setInvalidState("");
      } else {
        setInvalidState(msg);
      }

      if (selectedDates.length) {
        const formatted = formatDateLong(selectedDates[0]);
        if (resDateTxt) {
          resDateTxt.textContent = formatted;
        }
      } else if (resDateTxt) {
        resDateTxt.textContent = '';
      }
    },
    onOpen() {
      syncCalendarWidth();
    },
  });

  // Синхронизируем ширину календаря при инициализации
  syncCalendarWidth();

  let isOpen = false;

  // Назначаем обработчики на видимый input (altInput)
  const attachAltInputListeners = () => {
    const visible = fp && fp.altInput ? fp.altInput : dateInput;

    visible.addEventListener("input", () => {
      const msg = validateRequired();
      setInvalidState(msg);
    });

    visible.addEventListener("blur", () => {
      const msg = validateRequired();
      setInvalidState(msg);
    });
  };

  attachAltInputListeners();

  // Переключатель открытия/закрытия по клику на svg
  dropDownDateSVG.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isOpen) {
      fp.close();
      isOpen = false;
      const msg = validateRequired();
      setInvalidState(msg);
    } else {
      fp.open();
      isOpen = true;
    }
  });

  // Закрываем календарь при клике вне
  document.addEventListener("click", (event) => {
    const target = event.target;
    const altInput = fp.altInput;
    const calendarContainer = fp.calendarContainer;

    const clickedInsideInput = fp.input && fp.input.contains(target);
    const clickedInsideAltInput = altInput && altInput.contains(target);
    const clickedInsideSvg = dropDownDateSVG && dropDownDateSVG.contains(target);
    const clickedInsideCalendar = calendarContainer && calendarContainer.contains(target);

    if (!clickedInsideInput && !clickedInsideAltInput && !clickedInsideSvg && !clickedInsideCalendar) {
      if (isOpen) {
        fp.close();
        isOpen = false;
        const msg = validateRequired();
        setInvalidState(msg);
      }
    }
  });

  // Проверка при отправке формы
  const form = dateInput.closest("form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      const msg = validateRequired();
      setInvalidState(msg);
      if (msg) {
        ev.preventDefault();
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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  // Новый элемент, в который будет помещено выбранное значение
  const resultSpan = document.querySelector('.res-exhibition-txt');

  // Запрещаем прямой ввод текста
  input.readOnly = true;

  // Изначально выставляем значение по умолчанию
  input.value = "Temporary exhibition";

  // Функции для открытия и закрытия списка
  function openList() {
    list.classList.remove("hide");
    list.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
    options[0].focus();
  }

  function closeList() {
    list.classList.remove("show");
    list.classList.add("hide");
    toggle.setAttribute("aria-expanded", "false");
  }

  function isListOpen() {
    return list.classList.contains("show");
  }

  // Переключение списка
  function toggleList() {
    if (isListOpen()) {
      closeList();
    } else {
      openList();
    }
  }

  // Выбор опции из списка
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const selectedOptionText =
        opt.getAttribute("data-value") || opt.textContent.trim();

      input.value = selectedOptionText;
      closeList();
      input.focus();

      // Обновляем текст в результирующем элементе
      resultSpan.textContent = selectedOptionText;
    });

    opt.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
        case " ": {
          e.preventDefault();
          opt.click();
          break;
        }
        case "Escape": {
          e.preventDefault();
          closeList();
          input.focus();
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          const index = options.indexOf(opt);
          const nextOpt = options[(index + 1) % options.length];
          nextOpt.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const index = options.indexOf(opt);
          const prevOpt = options[index ? index - 1 : options.length - 1];
          prevOpt.focus();
          break;
        }
      }
    });
  });

  // Обработчик клика по иконке: переключаем видимость списка
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // чтобы клик не дошёл до документа и не закрыл список сразу
    toggleList();
  });

  // Закрываем список при клике вне контейнера
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      closeList();
    }
  });

  // Закрываем список при нажатии Escape, если он открыт
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isListOpen()) {
      closeList();
      input.focus();
    }
  });

  // Изначально установим значение в res-exhibition-txt
  resultSpan.textContent = input.value;
});
// -------------------------------------------------------------------------------------

// -------------------- Счётчики для контейнера entry-tickets --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('.ticketType');
  const basicPriceContainer = document.querySelector('.child-entry-tickets-basic .child-entry-tickets-price');
  const seniorPriceContainer = document.querySelector('.child-entry-tickets-senior .child-entry-tickets-price');

  // Базовые элементы счётчиков
  const basicMinusBtn = document.querySelector('.basic-minus');
  const basicValueField = document.querySelector('.basic-value');
  const basicPlusBtn = document.querySelector('.basic-plus');

  const seniorMinusBtn = document.querySelector('.senior-minus');
  const seniorValueField = document.querySelector('.senior-value');
  const seniorPlusBtn = document.querySelector('.senior-plus');

  // Функция обновления цен в зависимости от значения input
  function updatePrices() {
    if (input.value === 'Permanent exhibition') {
      basicPriceContainer.innerHTML = 'Basic 18+ (150 &#8364;)';
      seniorPriceContainer.innerHTML = 'Senior 65+ (80 &#8364;)';
    } else {
      basicPriceContainer.innerHTML = 'Basic 18+ (20 &#8364;)';
      seniorPriceContainer.innerHTML = 'Senior 65+ (10 &#8364;)';
    }
  }

  // Обновляем цены при загрузке страницы
  updatePrices();

  // Обновляем цены при выборе из выпадающего списка
  const dropdownOptions = document.querySelectorAll('.tickettype-option');

  dropdownOptions.forEach(option => {
    option.addEventListener('click', () => {
      input.value = option.dataset.value || option.textContent.trim();
      updatePrices();
    });
  });

  // Реакция на изменение поля input
  input.addEventListener('change', updatePrices);

  // Обработчики для кнопок счётчиков

  // Для взрослых (Basic 18+)
  basicMinusBtn.addEventListener('click', () => {
    let count = parseInt(basicValueField.textContent);
    if (count > 0) {
      basicValueField.textContent = count - 1;
    }
  });

  basicPlusBtn.addEventListener('click', () => {
    let count = parseInt(basicValueField.textContent);
    basicValueField.textContent = count + 1;
  });

  // Для пожилых (Senior 65+)
  seniorMinusBtn.addEventListener('click', () => {
    let count = parseInt(seniorValueField.textContent);
    if (count > 0) {
      seniorValueField.textContent = count - 1;
    }
  });

  seniorPlusBtn.addEventListener('click', () => {
    let count = parseInt(seniorValueField.textContent);
    seniorValueField.textContent = count + 1;
  });
});
// --------------------------------------------------------------------------------------

// -------------------- счётчики для контейнера results-tickets -------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Получаем элементы для отображения значений
  const basicQuantitySpan = document.querySelector('.basic-quantity');
  const seniorQuantitySpan = document.querySelector('.senior-quantity');

  // Получаем элементы с количеством билетов
  const basicValue = document.querySelector('.basic-value');
  const seniorValue = document.querySelector('.senior-value');

  // Элемент с названием экспозиции
  const resExhibitionTxt = document.querySelector('.res-exhibition-txt');

  // Элементы для отображения общей суммы
  const basicPrice = document.querySelector('.basic-price');
  const seniorPrice = document.querySelector('.senior-price');

  // Элемент для отображения итоговой суммы
  const totalPriceNum = document.querySelector('.total-price-num');

  // Элементы для изменения содержания
  const firstResultTxt = document.querySelector('.results-tickets-child-fst-txt');
  const secondResultTxt = document.querySelector('.results-tickets-child-snd-txt');

  // Первоначальное обновление значений
  updateValues();

  // Обновляем значения на странице
  function updateValues() {
    basicQuantitySpan.textContent = basicValue.textContent;
    seniorQuantitySpan.textContent = seniorValue.textContent;

    // Проверяем текущее значение и обновляем тексты
    if (resExhibitionTxt.textContent === 'Permanent exhibition') {
      firstResultTxt.textContent = 'Basic 18+ (150 €)';      
      secondResultTxt.textContent = 'Senior 65+ (80 €)';

      // Рассчитываем суммы
      basicPrice.textContent = calculateTotal(basicValue.textContent, 150);
      seniorPrice.textContent = calculateTotal(seniorValue.textContent, 80);
    } else {
      firstResultTxt.textContent = 'Basic 18+ (20 €)';
      secondResultTxt.textContent = 'Senior 65+ (10 €)';

      // Если другое значение экспозиции, вычисляем по обычной цене
      basicPrice.textContent = calculateTotal(basicValue.textContent, 20);
      seniorPrice.textContent = calculateTotal(seniorValue.textContent, 10);
    }

    // Высчитываем итоговую сумму
    totalPriceNum.textContent = calculateGrandTotal(
      basicPrice.textContent,
      seniorPrice.textContent
    );
  }

  // Функция для расчета суммы
  function calculateTotal(count, pricePerUnit) {
    const quantity = parseInt(count);
    return quantity * pricePerUnit;
  }

  // Функция для расчета итоговой суммы
  function calculateGrandTotal(firstSum, secondSum) {
    const total = parseFloat(firstSum) + parseFloat(secondSum);
    return total; // Возвращаем сумму с символом валюты
  }

  // Обновляем значения при клике на плюс/минус
  document.querySelectorAll('.basic-minus, .basic-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      updateValues(); // Обновляем значения после изменения
    });
  });

  document.querySelectorAll('.senior-minus, .senior-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      updateValues(); // Обновляем значения после изменения
    });
  });

  // Дополнительно следим за изменением экспозиции
  const input = document.querySelector('.ticketType');
  input.addEventListener('change', () => {
    resExhibitionTxt.textContent = input.value; // Обновляем текст в res-exhibition-txt
    updateValues(); // Обновляем тексты
  });

  // Обновляем при выборе из выпадающего списка
  const dropdownOptions = document.querySelectorAll('.tickettype-option');
  dropdownOptions.forEach(option => {
    option.addEventListener('click', () => {
      input.value = option.dataset.value || option.textContent.trim();
      resExhibitionTxt.textContent = input.value; // Обновляем текст в res-exhibition-txt
      updateValues(); // Обновляем тексты
    });
  });
});
// --------------------------------------------------------------------------------------

// ------------------------- Прописываем валидацию для карты ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const cardInput = document.querySelector(".cardNumber");
  const expiryInput = document.querySelector(".cardValidity");
  const holderInput = document.querySelector(".cardholderName");
  const cvcInput = document.querySelector(".cvc-cvv"); // Добавляем селектор для поля CVV/CVC

  if (cardInput && expiryInput && holderInput && cvcInput) {
    cardInput.addEventListener("blur", validateCardNumber);
    cardInput.addEventListener("input", formatCardNumber);
    cardInput.addEventListener("focus", resetValidation);

    expiryInput.addEventListener("blur", validateExpiryDate);
    expiryInput.addEventListener("input", formatExpiryDate);
    expiryInput.addEventListener("focus", resetValidation);

    holderInput.addEventListener("blur", validateHolderName);
    holderInput.addEventListener("input", allowLettersSpacesDashes);
    holderInput.addEventListener("focus", resetValidation);

    cvcInput.addEventListener("blur", validateCVC); // проверка при потере фокуса
    cvcInput.addEventListener("input", formatCVV); // форматирование при вводе
    cvcInput.addEventListener("focus", resetValidation);
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

  // Валидация CVV/CVC
  function validateCVC() {
    const value = this.value.trim();
    const regex = /^\d{3}$/; // Ровно 3 цифры

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

  // Форматирование CVV/CVC
  function formatCVV(e) {
    let rawValue = e.target.value.replace(/[^0-9]+/g, ""); // Оставляем только цифры

    if (rawValue.length > 3) {
      rawValue = rawValue.slice(0, 3); // Только 3 цифры
    }

    e.target.value = rawValue;
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
// ---------------------------------------------------------------------------------------------

// Создаем функцию, которая показывает всплывающее окно с результатом
function showPopup(successfulPurchase) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = successfulPurchase
    ? "<p>The purchase was completed successfully!</p>"
    : "<p>Please fill in all fields!</p>";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.className = "close-popup-btn";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  // Автоматически скрываем поп-ап через 5 секунд
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 5000);
}
// ---------------------------------------------------------------------------------------------

// Функция очистки всех полей формы
function clearInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => input.value = "");
}
// ---------------------------------------------------------------------------------------------

// Добавляем обработчик события DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const buyButton = document.querySelector(".buy-button");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      // Проверяем сумму покупок
      const totalPriceNum = document.querySelector(".total-price-num");
      const totalAmount = parseFloat(totalPriceNum.textContent);

      // Проверяем, что сумма больше нуля
      if (totalAmount > 0) {
        // Проверяем все поля на наличие классов "invalid"
        const allFields = document.querySelectorAll("input, .ticketType");
        const hasErrors = [...allFields].some(field => field.classList.contains("invalid"));
        
        // Дополнительно проверяем каждое поле на обязательность
        const emptyOrInvalidFields = [...allFields].some(field => {
          const val = field.value.trim();
          return (val.length === 0 || field.classList.contains("invalid"));
        });

        if (!emptyOrInvalidFields && !hasErrors) {
          // Покупка успешна!
          showPopup(true);
          clearInputs();
        } else {
          // Есть ошибки валидации или пустые поля
          showPopup(false);
        }
      } else {
        // Общая сумма нулевая
        showPopup(false);
      }
    });
  }
});

// Стили для всплывающего окна
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .popup {
      position: fixed;
      z-index: 9999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fefefe;
      padding: 20px;
      border: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .close-popup-btn {
      margin-top: 10px;
      padding: 5px 10px;
      cursor: pointer;
      background-color: #710707;
      color: white;
      border: none;
    }
  </style>
`);