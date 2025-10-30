export function loadSUV(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>SUV Collection</h1>
    </section>

    <section class="car-promo">
      <div class="car-text">
        <h2 class="car-title">Adventure SUV</h2>
        <p>All-terrain capability<br>Spacious interior<br>Built tough!</p>
        <a href="#" class="btn-own">Own Today</a>
      </div>
      <img src="/images/vehicles/survan.jpg" alt="SUV" class="car-img">
    </section>

    <section class="info-section">
      <div class="reviews">
        <h2>SUV Reviews</h2>
        <ul>
          <li>"Perfect for family adventures!" (5/5)</li>
          <li>"Handles any terrain with ease." (5/5)</li>
          <li>"So much cargo space!" (4/5)</li>
          <li>"Feels safe and secure." (5/5)</li>
        </ul>
      </div>

      <div class="upgrades">
        <h2>SUV Upgrades</h2>
        <div class="grid">
          <div class="upgrade-item">
            <img src="/images/upgrades/flux-cap.png" alt="Roof Rack">
            <a href="#">Roof Rack</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/flame.jpg" alt="Tow Package">
            <a href="#">Tow Package</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/bumper_sticker.jpg" alt="Off-road Tires">
            <a href="#">Off-road Tires</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/hub-cap.jpg" alt="Lift Kit">
            <a href="#">Lift Kit</a>
          </div>
        </div>
      </div>
    </section>
  `;
}