export function loadTruck(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>Truck Collection</h1>
    </section>

    <section class="car-promo">
      <div class="car-text">
        <h2 class="car-title">Powerful Truck</h2>
        <p>Heavy duty power<br>Massive cargo space<br>Work ready!</p>
        <a href="#" class="btn-own">Own Today</a>
      </div>
      <img src="/images/vehicles/wrangler.jpg" alt="Truck" class="car-img">
    </section>

    <section class="info-section">
      <div class="reviews">
        <h2>Truck Reviews</h2>
        <ul>
          <li>"Best work truck I've owned!" (5/5)</li>
          <li>"Incredible towing capacity." (5/5)</li>
          <li>"Tough as nails!" (5/5)</li>
          <li>"Perfect for the job site." (4/5)</li>
        </ul>
      </div>

      <div class="upgrades">
        <h2>Truck Upgrades</h2>
        <div class="grid">
          <div class="upgrade-item">
            <img src="/images/upgrades/flux-cap.png" alt="Bed Liner">
            <a href="#">Bed Liner</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/flame.jpg" alt="Tonneau Cover">
            <a href="#">Tonneau Cover</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/bumper_sticker.jpg" alt="Winch">
            <a href="#">Winch</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/hub-cap.jpg" alt="Steel Bumper">
            <a href="#">Steel Bumper</a>
          </div>
        </div>
      </div>
    </section>
  `;
}