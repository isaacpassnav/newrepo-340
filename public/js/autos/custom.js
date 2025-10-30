export function loadCustom(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>Custom Vehicles</h1>
    </section>

    <section class="car-promo">
      <div class="car-text">
        <h2 class="car-title">Custom Ride</h2>
        <p>Personalized design<br>Unique modifications<br>One of a kind!</p>
        <a href="#" class="btn-own">Own Today</a>
      </div>
      <img src="/images/vehicles/no-image.png" alt="Custom Vehicle" class="car-img">
    </section>

    <section class="info-section">
      <div class="reviews">
        <h2>Custom Vehicle Reviews</h2>
        <ul>
          <li>"Absolutely unique design!" (5/5)</li>
          <li>"Turns heads everywhere." (4/5)</li>
          <li>"Worth every penny!" (5/5)</li>
        </ul>
      </div>

      <div class="upgrades">
        <h2>Custom Upgrades</h2>
        <div class="grid">
          <div class="upgrade-item">
            <img src="/images/upgrades/flux-cap.png" alt="Custom Paint">
            <a href="#">Custom Paint</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/flame.jpg" alt="Body Kit">
            <a href="#">Body Kit</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/bumper_sticker.jpg" alt="LED Lights">
            <a href="#">LED Lights</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/hub-cap.jpg" alt="Custom Wheels">
            <a href="#">Custom Wheels</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

