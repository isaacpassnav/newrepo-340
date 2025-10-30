import { loadCustom } from './autos/custom.js';
import { loadSedan } from './autos/sedan.js';
import { loadSUV } from './autos/suv.js';
import { loadTruck } from './autos/truck.js';

function loadHome(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>Welcome to CSE Motors!</h1>
    </section>

    <section class="car-promo">
      <div class="car-text">
        <h2 class="car-title">DMC Delorean</h2>
        <p>3 Cup holders<br>Superman doors<br>Fuzzy dice!</p>
        <a href="#" class="btn-own">Own Today</a>
      </div>
      <img src="/images/vehicles/delorean.jpg" alt="DMC Delorean" class="car-img">
    </section>

    <section class="info-section">
      <div class="reviews">
        <h2>DMC Delorean Reviews</h2>
        <ul>
          <li>"So fast it's almost like traveling in time." (4/5)</li>
          <li>"Coolest ride on the road." (4/5)</li>
          <li>"I'm feeling McFly!" (5/5)</li>
          <li>"The most futuristic ride of our day." (4/5)</li>
          <li>"80's livin and I love it!" (5/5)</li>
        </ul>
      </div>

      <div class="upgrades">
        <h2>Delorean Upgrades</h2>
        <div class="grid">
          <div class="upgrade-item">
            <img src="/images/upgrades/flux-cap.png" alt="Flux Capacitor">
            <a href="#">Flux Capacitor</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/flame.jpg" alt="Flame Decals">
            <a href="#">Flame Decals</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/bumper_sticker.jpg" alt="Bumper Stickers">
            <a href="#">Bumper Stickers</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/hub-cap.jpg" alt="Hub Caps">
            <a href="#">Hub Caps</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initRender() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mainContent = document.getElementById('main-content');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const type = link.getAttribute('data-type') || link.textContent.trim().toLowerCase();

      switch (type) {
        case 'home':
          loadHome(mainContent);
          break;
        case 'custom':
          loadCustom(mainContent);
          break;
        case 'sedan':
          loadSedan(mainContent);
          break;
        case 'suv':
          loadSUV(mainContent);
          break;
        case 'truck':
          loadTruck(mainContent);
          break;
        default:
          loadHome(mainContent);
      }
    });
  });

  // Carga inicial del home
  loadHome(mainContent);
}