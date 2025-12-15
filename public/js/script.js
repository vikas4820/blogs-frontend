/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
  'use strict';

  // Preloader js
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  //  Search Form Open
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
    setTimeout(function () {
      $('.search-box').focus();
    }, 400);
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // tab
  $('.tab-content')
    .find('.tab-pane')
    .each(function (idx, item) {
      var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
        title = $(this).attr('title');
      navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
    });

  $('.code-tabs ul.nav-tabs').each(function () {
    $(this).find('li:first').addClass('active');
  });

  $('.code-tabs .tab-content').each(function () {
    $(this).find('div:first').addClass('active');
  });

  $('.nav-tabs a').click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest('.code-tabs'),
      tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
  });

  // Accordions
  $('.collapse')
    .on('shown.bs.collapse', function () {
      $(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus');
    })
    .on('hidden.bs.collapse', function () {
      $(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus');
    });

  //easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      }
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });

  // back to top button
  $('#scrollTop').click(function (e) {
    e.preventDefault();
    $('html,body').animate(
      {
        scrollTop: 0,
      },
      1500,
      'easeInOutExpo'
    );
  });

  //post slider
  $('.post-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    prevArrow: "<button type='button' class='prevArrow'><i class='ti-angle-left'></i></button>",
    nextArrow: "<button type='button' class='nextArrow'><i class='ti-angle-right'></i></button>",
  });

  // All side menu item click event
  $('#sidebar .side-menu.top li a').each(function () {
    const $li = $(this).parent();
    $(this).on('click', function () {
      $('#sidebar .side-menu.top li').each(function () {
        $(this).removeClass('active');
      });
      $li.addClass('active');
    });
  });

  // TOGGLE SIDEBAR
  $('#content nav .bx.bx-menu').on('click', function () {
    $('#sidebar').toggleClass('hide');
  });

  // Adjust sidebar on page load and resize
  function adjustSidebar() {
    if ($(window).width() <= 576) {
      $('#sidebar').addClass('hide').removeClass('show');
    } else {
      $('#sidebar').removeClass('hide').addClass('show');
    }
  }

  $(window).on('load resize', adjustSidebar);

  // Arama butonunu toggle etme
  $('#content nav form .form-input button').on('click', function (e) {
    if ($(window).width() < 768) {
      e.preventDefault();
      $('#content nav form').toggleClass('show');
      const searchButtonIcon = $('#content nav form .form-input button .bx');
      if ($('#content nav form').hasClass('show')) {
        searchButtonIcon.removeClass('bx-search').addClass('bx-x');
      } else {
        searchButtonIcon.removeClass('bx-x').addClass('bx-search');
      }
    }
  });

  // Dark Mode Switch
  $('#switch-mode').on('change', function () {
    if (this.checked) {
      $('body').addClass('dark');
    } else {
      $('body').removeClass('dark');
    }
  });

  // Notification Menu Toggle
  $('.notification').on('click', function () {
    $('.notification-menu').toggleClass('show');
    $('.profile-menu').removeClass('show'); // Close profile menu if open
  });

  // Profile Menu Toggle
  $('.profile').on('click', function () {
    $('.profile-menu').toggleClass('show');
    $('.notification-menu').removeClass('show'); // Close notification menu if open
  });

  // Close menus if clicked outside
  $(window).on('click', function (e) {
    if (!$(e.target).closest('.notification').length && !$(e.target).closest('.profile').length) {
      $('.notification-menu').removeClass('show');
      $('.profile-menu').removeClass('show');
    }
  });

  // Menülerin açılıp kapanması için fonksiyon
  function toggleMenu(menuId) {
    var $menu = $('#' + menuId);
    var $allMenus = $('.menu');

    // Diğer tüm menüleri kapat
    $allMenus.not($menu).hide();

    // Tıklanan menü varsa aç, yoksa kapat
    if ($menu.css('display') === 'none' || $menu.css('display') === '') {
      $menu.show();
    } else {
      $menu.hide();
    }
  }

  // Başlangıçta tüm menüleri kapalı tut
  $(document).ready(function () {
    $('.menu').hide();
  });
})(jQuery);
