document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('_includes/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-include').innerHTML = data;
    });
  
  // Load footer
  fetch('_includes/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-include').innerHTML = data;
    });
});
