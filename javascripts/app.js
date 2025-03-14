// Foundation JavaScript
$(document).foundation();

// Mobile menu toggle
$(document).ready(function() {
  // Toggle mobile menu
  $('.toggle-topbar.menu-icon a').on('click', function(event) {
    event.preventDefault();
    
    // Toggle expanded class on top-bar
    $(this).closest('.top-bar').toggleClass('expanded');
    
    // Toggle expanded class on top-bar-section
    $('.top-bar-section').toggleClass('expanded');
    
    console.log('Mobile menu toggled', $('.top-bar-section').hasClass('expanded'));
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