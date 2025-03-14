// Foundation JavaScript
$(document).foundation();

// Mobile dropdown handling
$(document).ready(function() {
  // Mobile dropdown handling
  $('.mobile-dropdown > a').on('click', function(event) {
    event.preventDefault();
    
    // Close all other open dropdowns
    $('.mobile-dropdown').not($(this).parent()).removeClass('active-mobile-dropdown');
    
    // Toggle this dropdown
    $(this).parent().toggleClass('active-mobile-dropdown');
    
    console.log('Mobile dropdown toggled');
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