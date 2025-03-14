// Foundation JavaScript
$(document).foundation();

// Mobile menu toggle
$(document).ready(function() {
  $('.toggle-topbar.menu-icon a').click(function(event) {
    event.preventDefault();
    $('.top-bar-section').toggleClass('expanded');
    console.log('Mobile menu toggled', $('.top-bar-section').hasClass('expanded'));
    
    // Force redraw to ensure the menu is visible
    $('.top-bar-section').hide().show(0);
  });
  
  // Prevent dropdown parent links from navigating and toggle dropdown on click
  $('.has-dropdown > a').on('click', function(event) {
    event.preventDefault();
    
    // Close all other open dropdowns
    $('.has-dropdown').not($(this).parent()).removeClass('active-dropdown');
    
    // Toggle this dropdown
    $(this).parent().toggleClass('active-dropdown');
  });
  
  // Smooth scrolling for anchor links (not for dropdown parents)
  $('a[href^="#"]').not('.has-dropdown > a').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if(target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 800);
    }
  });
  
  // Close dropdown menus when clicking outside
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.has-dropdown').length) {
      $('.has-dropdown').removeClass('active-dropdown');
    }
  });
});