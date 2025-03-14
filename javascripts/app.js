// Foundation JavaScript
$(document).foundation();

// Mobile menu toggle
$(document).ready(function() {
  // Make the entire hamburger icon area clickable
  $('.toggle-topbar.menu-icon').on('click', function(event) {
    // Toggle expanded class on top-bar
    $(this).closest('.top-bar').toggleClass('expanded');
    
    // Toggle expanded class on top-bar-section
    $('.top-bar-section').toggleClass('expanded');
    
    // Force menu to be visible when expanded
    if ($('.top-bar-section').hasClass('expanded')) {
      $('body').css('overflow', 'hidden'); // Prevent scrolling behind menu
      $('.top-bar-section').css({
        'display': 'block',
        'visibility': 'visible',
        'position': 'fixed',
        'z-index': '999999'
      });
    } else {
      $('body').css('overflow', '');
    }
    
    console.log('Mobile menu toggled', $('.top-bar-section').hasClass('expanded'));
    return false; // Cancel default behavior
  });
  
  // Also handle the link click separately
  $('.toggle-topbar.menu-icon a').on('click', function(event) {
    event.preventDefault();
    $(this).parent().click(); // Trigger the parent click handler
    return false;
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