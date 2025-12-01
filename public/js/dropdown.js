document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('accountDropdown');
  const dropdownMenu = document.getElementById('dropdownMenu');
  
  if (dropdownToggle && dropdownMenu) {

    dropdownToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
      dropdownToggle.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        dropdownToggle.classList.remove('active');
      }
    });
    
    // Cerrar dropdown al hacer click en un item
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
        dropdownToggle.classList.remove('active');
      });
    });
  }
});