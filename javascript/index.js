document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const textContainer = document.querySelector(".text-container");
  const carousel = document.querySelector(".carousel");
  const imageContainer = document.querySelector(".image-container");
  const welcomeGallery = document.querySelector(".welcome-gallery");
  const socialNetwork = document.querySelector(".social-network");

  burger.addEventListener("click", () => {
    // Для диапазона 769-1024px
    if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      menu.classList.toggle("active");
      if (menu.classList.contains("active")) {
        textContainer.style.display = "none";
      } else {
        textContainer.style.display = "block";
      }
    }

    // Для диапазона 421-768px
    if (window.innerWidth >= 421 && window.innerWidth <= 768) {
      menu.classList.toggle("active");
      if (menu.classList.contains("active")) {
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
  });

  // Добавляем обработчик изменения размера окна
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 || window.innerWidth < 420) {
      menu.classList.remove("active");
      textContainer.style.display = "block";
      imageContainer.style.display = "block";
      carousel.style.display = "flex";
      welcomeGallery.style.display = "none";
      socialNetwork.style.display = "none";
    }
  });
});

// Инициализация карты
const map = L.map("map").setView([48.86091, 2.3364], 16.5);

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
