// Для клика на burger
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
// -----------------------------------------------------------------------------------------------------------

// --------------------------- Для видео-карусели -----------------------
document.addEventListener("DOMContentLoaded", () => {
    // Отправляем запрос на получение данных из JSON-файла
    fetch("./video.json")
        .then(response => response.json()) // Парсим JSON
        .then(data => {
            // Извлекаем массив видео из полученного JSON
            const videosData = data.videos;

            const slidesEl = document.querySelector('.slides');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');

            // Массив ссылок на все видео
            const allVideos = [];

            // Генерация видео слайдов
            videosData.forEach(video => {
                const li = document.createElement('li');
                li.classList.add('slide');

                const videoEl = document.createElement('video');
                videoEl.src = video.url;
                videoEl.poster = video.poster;
                videoEl.controls = true;
                videoEl.autoplay = false;
                videoEl.loop = false;
                videoEl.setAttribute('playsinline', '');

                // Добавляем описание
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('video-description');
                descriptionDiv.textContent = video.title;
                li.appendChild(descriptionDiv);

                // Добавляем событие для исчезновения описания через 2 секунды после начала воспроизведения
                videoEl.addEventListener('play', () => {
                    setTimeout(() => {
                        descriptionDiv.style.display = 'none';
                    }, 2000);
                });

                // При паузе видео показываем описание снова
                videoEl.addEventListener('pause', () => {
                    clearTimeout(hideDescTimer); // очищаем таймер, если описание уже планировалось скрыть
                    descriptionDiv.style.display = ''; // показываем описание
                });

                // Таймер для повторного скрытия описания через 2 секунды после паузы
                let hideDescTimer;
                videoEl.addEventListener('playing', () => {
                    hideDescTimer = setTimeout(() => {
                        descriptionDiv.style.display = 'none';
                    }, 2000);
                });

                // Добавляем видео в массив
                allVideos.push({ element: videoEl, description: descriptionDiv });

                li.appendChild(videoEl);
                slidesEl.appendChild(li);
            });

            let currentSlide = 0;

            // Функция остановки всех активных видео
            function stopPlayingVideos() {
                allVideos.forEach(({ element }) => {
                    if (!element.paused) {
                        element.pause();
                    }
                });
            }

            // Функция для смены слайдов
            function changeSlide(offset) {
                stopPlayingVideos(); // Остановка всех видео перед изменением слайда

                const newSlide = currentSlide + offset;

                // Проверяем, достигли ли конца списка
                if (newSlide >= videosData.length) {
                    currentSlide = 0; // Переход на первый слайд мгновенно
                    slidesEl.style.transition = 'none'; // отключаем анимацию
                    slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
                } else if (newSlide < 0) {
                    currentSlide = videosData.length - 1; // Переход на последний слайд мгновенно
                    slidesEl.style.transition = 'none'; // отключаем анимацию
                    slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
                } else {
                    currentSlide = newSlide;

                    // Плавный переход между соседними видео
                    slidesEl.style.transition = 'transform 2s ease';
                    slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            }

            // Обработчики кнопок
            prevBtn.addEventListener('click', () => changeSlide(-1));
            nextBtn.addEventListener('click', () => changeSlide(1));
        })
        .catch(error => console.error("Ошибка при загрузке данных:", error));
});
// -----------------------------------------------------------------------------------------------------------
