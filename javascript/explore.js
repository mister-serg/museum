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