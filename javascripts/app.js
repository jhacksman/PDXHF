// Foundation JavaScript
$(document).foundation();

// Mobile menu toggle - simplified and reliable implementation
document.addEventListener('DOMContentLoaded', function() {
  // Direct DOM access for more reliable handling
  var hamburger = document.querySelector('.toggle-topbar.menu-icon');
  var topBar = document.querySelector('.top-bar');
  var menu = document.querySelector('.top-bar-section');
  
  // Simple toggle function
  function toggleMenu(event) {
    // Prevent any default action
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // First, remove any hide-nav class that might be preventing display
    var navigation = document.getElementById('navigation');
    if (navigation) {
      navigation.classList.remove('hide-nav');
    }
    
    // Toggle classes
    topBar.classList.toggle('expanded');
    menu.classList.toggle('expanded');
    
    // Force visibility when expanded
    if (menu.classList.contains('expanded')) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      menu.style.display = 'block';
      menu.style.visibility = 'visible';
      menu.style.opacity = '1';
      menu.style.transform = 'none';
      menu.style.position = 'fixed';
      menu.style.zIndex = '999999';
    } else {
      document.body.style.overflow = '';
      // Don't hide immediately, let CSS transitions work
      setTimeout(function() {
        if (!menu.classList.contains('expanded')) {
          menu.style.display = '';
        }
      }, 300);
    }
    
    console.log('Menu toggled', menu.classList.contains('expanded'));
    return false;
  }
  
  // Attach click handler to the hamburger icon AND its child link
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    
    // Also handle the link click
    var hamburgerLink = hamburger.querySelector('a');
    if (hamburgerLink) {
      hamburgerLink.addEventListener('click', toggleMenu);
    }
  }
  
  // Also use jQuery for redundancy
  $('.toggle-topbar.menu-icon, .toggle-topbar.menu-icon a').on('click', function(event) {
    event.preventDefault();
    toggleMenu();
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