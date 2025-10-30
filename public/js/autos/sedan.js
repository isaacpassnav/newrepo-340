export function loadSedan(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>Sedan Collection</h1>
    </section>

    <section class="car-promo">
      <div class="car-text">
        <h2 class="car-title">Luxury Sedan</h2>
        <p>Premium comfort<br>Fuel efficient<br>Family friendly!</p>
        <a href="#" class="btn-own">Own Today</a>
      </div>
      <img src="/images/vehicles/no-image.png" alt="Sedan" class="car-img">
    </section>

    <section class="info-section">
      <div class="reviews">
        <h2>Sedan Reviews</h2>
        <ul>
          <li>"Perfect for daily commute." (4/5)</li>
          <li>"Smooth and comfortable ride." (5/5)</li>
          <li>"Great gas mileage!" (4/5)</li>
          <li>"Spacious interior." (4/5)</li>
        </ul>
      </div>

      <div class="upgrades">
        <h2>Sedan Upgrades</h2>
        <div class="grid">
          <div class="upgrade-item">
            <img src="/images/upgrades/flux-cap.png" alt="Leather Seats">
            <a href="#">Leather Seats</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/flame.jpg" alt="Sunroof">
            <a href="#">Sunroof</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/bumper_sticker.jpg" alt="Sound System">
            <a href="#">Sound System</a>
          </div>
          <div class="upgrade-item">
            <img src="/images/upgrades/hub-cap.jpg" alt="Alloy Wheels">
            <a href="#">Alloy Wheels</a>
          </div>
        </div>
      </div>
    </section>
  `;
}