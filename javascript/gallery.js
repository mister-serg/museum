// document.addEventListener("DOMContentLoaded", () => {
//   const carouselTrack = document.querySelector(".carousel-track"); // трек карусели
//   const prevButton = document.querySelector(".carousel-prev"); // кнопка назад
//   const nextButton = document.querySelector(".carousel-next"); // кнопка вперед
//   let currentSlide = 0; // номер текущего активного кадра

//   // Чтение данных из JSON-файла
//   fetch("artworks.json")
//     .then((response) => response.json())
//     .then((artworks) => {
//       // Динамическое создание карточек изображений на основе полученных данных
//       artworks.forEach((artwork, index) => {
//         const slide = document.createElement("div");
//         slide.classList.add("carousel-slide");

//         const img = document.createElement("img");
//         img.src = artwork.imageUrl;
//         img.alt = artwork.title;

//         const caption = document.createElement("div");
//         caption.classList.add("carousel-caption");
//         caption.innerHTML = `
//                     <h2>${artwork.title}</h2>
//                     <p>Author: ${artwork.artist}<br>Period: ${artwork.period}</p>
//                 `;

//         slide.appendChild(img);
//         slide.appendChild(caption);
//         carouselTrack.appendChild(slide);
//       });

//       // Количество слайдов
//       const totalSlides = carouselTrack.childElementCount;

//       // Переход на следующий кадр
//       nextButton.addEventListener("click", () => {
//         if (currentSlide < totalSlides - 1) {
//           currentSlide++; // Только если ещё есть последующие слайды
//           updateCarousel();
//         }
//       });

//       // Переход на предыдущий кадр
//       prevButton.addEventListener("click", () => {
//         if (currentSlide > 0) {
//           currentSlide--; // Только если ещё есть предыдущие слайды
//           updateCarousel();
//         }
//       });

//       // Изначально выставляем активную карточку
//       updateCarousel();
//     })
//     .catch((error) => console.error("Ошибка при чтении JSON:", error));

//   // Функция для обновления видимости кадров
//   function updateCarousel() {
//     const offset = -currentSlide * 100;
//     carouselTrack.style.transform = `translateX(${offset}%)`;
//   }
// });
// -------------------- Адаптивное меню --------------------
  const burger = document.querySelector(".burger");
  const menuAdaptive = document.querySelector(".menu-adaptive");
  // const textContainer = document.querySelector(".text-container");
  // const carousel = document.querySelector(".carousel");
  // const imageContainer = document.querySelector(".image-container");
  // const welcomeGallery = document.querySelector(".welcome-gallery");
  // const socialNetwork = document.querySelector(".social-network");

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
        // textContainer.style.display = "none";
      } else {
        // textContainer.style.display = "block";
      }
    }

    if (window.innerWidth <= 768) {
      if (menuAdaptive.style.display === "flex") {
        // textContainer.style.display = "none";
        // imageContainer.style.display = "none";
        // carousel.style.display = "none";
        // welcomeGallery.style.display = "flex";
        // socialNetwork.style.display = "flex";
      } else {
        // textContainer.style.display = "block";
        // imageContainer.style.display = "flex";
        // carousel.style.display = "flex";
        // welcomeGallery.style.display = "none";
        // socialNetwork.style.display = "none";
      }
    }
  }

  // Клики на бургер
  if (burger) burger.addEventListener("click", toggleMenu);

  // Изменение размера окна — исправлена логика (раньше условие было некорректным)
  window.addEventListener("resize", () => {
    // Если ширина больше 1024 — скрываем adaptive-меню и возвращаем блоки в десктопное состояние
    if (window.innerWidth > 1024) {
      if (menuAdaptive) {menuAdaptive.style.display = "none";}

      // if (textContainer) textContainer.style.display = "block";
      // if (imageContainer) imageContainer.style.display = "block";
      // if (carousel) carousel.style.display = "flex";
      // if (welcomeGallery) welcomeGallery.style.display = "none";
      // if (socialNetwork) socialNetwork.style.display = "none";
    }
  });

// -------------------------------------------------------------------------------

// -----------------------------Карусель----------------------
document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.querySelector(".carousel-track"); // трек карусели
  const prevButton = document.querySelector(".carousel-prev"); // кнопка назад
  const nextButton = document.querySelector(".carousel-next"); // кнопка вперед
  let currentSlide = 1; // стартуем с первой реальной позиции (позиция 1 — первый настоящий слайд)

  // Чтение данных из JSON-файла
  fetch("artworks.json")
    .then((response) => response.json())
    .then((artworks) => {
      // Создание копии первого и последнего слайдов
      const firstSlideClone = createSlideFromArtwork(artworks[0]); // первая копия
      const lastSlideClone = createSlideFromArtwork(artworks[artworks.length - 1]); // последняя копия

      // Основной массив слайдов
      carouselTrack.appendChild(firstSlideClone); // добавляем первую копию

      // добавляем основной список слайдов
      for (let i = 0; i < artworks.length; i++) {
        const slide = createSlideFromArtwork(artworks[i]);
        carouselTrack.appendChild(slide);
      }

      // завершающая копия последнего слайда
      carouselTrack.appendChild(lastSlideClone);

      // общее количество слайдов (включая две копии)
      const totalSlides = carouselTrack.childElementCount;

      // Переход на следующий кадр
      nextButton.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= totalSlides - 1) {
          // Если достигли последнего слайда, мигом прыгаем к началу (первому реальному слайду)
          currentSlide = 1;
          carouselTrack.style.transitionDuration = "0ms";
        } else {
          carouselTrack.style.transitionDuration = "1.5s";
        }
        updateCarousel();
      });

      // Переход на предыдущий кадр
      prevButton.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide <= 0) {
          // Если вернулись к первой копии, моментально переходим к последнему настоящему слайду
          currentSlide = totalSlides - 2;
          carouselTrack.style.transitionDuration = "0ms";
        } else {
          carouselTrack.style.transitionDuration = "1.5s";
        }
        updateCarousel();
      });

      // Изначально активируем первую настоящую позицию
      updateCarousel();
    })
    .catch((error) => console.error("Ошибка при чтении JSON:", error));

  // Функция для создания слайда из объекта artwork
  function createSlideFromArtwork(artwork) {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    const img = document.createElement("img");
    img.src = artwork.imageUrl;
    img.alt = artwork.title;

    const caption = document.createElement("div");
    caption.classList.add("carousel-caption");
    caption.innerHTML = `
      <h2>${artwork.title}</h2>
      <p>Author: ${artwork.artist}<br>
      Period: ${artwork.period}<br>
      Year: ${artwork.year}
      </p>
    `;

    slide.appendChild(img);
    slide.appendChild(caption);
    return slide;
  }

  // Функция для обновления видимости кадров
  function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }
});