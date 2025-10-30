// script.js
const cars = {
  custom: {
    name: "DMC DeLorean",
    description: ["3 Cup holders", "Superman doors", "Fuzzy dice!"],
    image: "/images/vehicles/delorean.jpg",
    upgrades: ["Flux Capacitor", "Flame Decals", "Bumper Stickers", "Hub Caps"],
    reviews: [
      "So fast it's almost like traveling in time. (4/5)",
      "Coolest ride on the road. (4/5)",
      "I'm feeling McFly! (5/5)",
      "The most futuristic ride of our day. (4/5)",
      "80's livin and I love it! (5/5)"
    ]
  },
  sedan: {
    name: "CSE Sedan",
    description: ["Luxury interior", "Advanced GPS", "Smart Braking"],
    image: "/images/vehicles/sedan.jpg",
    upgrades: ["Leather Seats", "Sound System", "Sunroof", "Alloy Wheels"],
    reviews: [
      "Comfort meets performance. (5/5)",
      "Quietest ride ever! (4/5)",
      "Fuel efficient and stylish. (5/5)"
    ]
  }
  // puedes añadir SUV, Truck, etc.
};

// Elementos HTML
const hero = document.querySelector(".hero-content");

// Función para renderizar un auto
function renderCar(carKey) {
  const car = cars[carKey];
  hero.innerHTML = `
    <h1>Welcome to CSE Motors!</h1>
    <div class="car-promo">
      <div class="car-text">
        <h2>${car.name}</h2>
        <p>${car.description.join("<br>")}</p>
        <a href="#" class="btn">Own Today</a>
      </div>
      <img src="${car.image}" alt="${car.name}" class="car-img">
    </div>
  `;

  document.querySelector(".upgrades h2").textContent = `${car.name} Upgrades`;
  const grid = document.querySelector(".upgrades .grid");
  grid.innerHTML = car.upgrades.map(u => `
    <div class="upgrade-item">
      <img src="/images/vehicles/no-image.png" alt="${u}">
      <a href="#">${u}</a>
    </div>
  `).join("");

  document.querySelector(".reviews h2").textContent = `${car.name} Reviews`;
  const ul = document.querySelector(".reviews ul");
  ul.innerHTML = car.reviews.map(r => `<li>${r}</li>`).join("");
}

// Eventos del navbar
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const carType = e.target.textContent.toLowerCase(); // custom, sedan, etc.
    renderCar(carType);
  });
});

// Mostrar un auto por defecto al cargar
renderCar("custom");
