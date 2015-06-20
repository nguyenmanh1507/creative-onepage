'use strict';
/*global google */

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();

			/*
			Custom JS
			*/

			// Detect browser unsupport css blend mode
			if(typeof window.getComputedStyle(document.body).backgroundBlendMode === 'undefined') {
			  document.documentElement.className += ' no-background-blend-mode';
			}

			// Filter portfolio
			$('.portfolio').mixItUp();

			// Simple Smooth scroll
			var link = $('.jumbotron__arrow-down, .top-bar-section a');
			var duration = 800;

			link.on('click', function() {
				var target = $(this).attr('href');

				$('html, body').animate({
					scrollTop: $(target).offset().top
				}, duration);

				return false;
			});

			// Scroll to top
			var scrollToTop = $('#scroll-to-top');
			var checkPoint = $('#site-intro').offset().top;

			$(window).scroll(function() {
				if ($(this).scrollTop() > checkPoint) {
					scrollToTop.addClass('is-visible');
				} else {
					scrollToTop.removeClass('is-visible');
				} 
			});

			scrollToTop.on('click', function() {
				$('html, body').animate({
					scrollTop: 0
				}, duration);
				return false;
			});

			// Wow!!!
			var wow = new WOW({
				mobile: false,
				offset: 100
			});

			wow.init();

			// animate skill
			var skill = $('#skills');

			// animate funfact number
			var funfact = $('#funfact');

			var countUp = function(selector) {

				selector.find('.counter').each(function() {

					var $t = $(this);

					var waypoint = $t.waypoint({
						handler: function(direction) {

							if(direction === 'down' && $t.hasClass('counter')) {

								$t.closest('div').find('.meter').css('width', $t.data('number') + '%');

								$t.animateNumber({
									number: $t.data('number')
								}, 2000);

								$t.removeClass('counter');

							}

						},
						offset: 'bottom-in-view'
					});

				});

			};

			countUp(skill);
			countUp(funfact);


			/*
			End Custom JS
			*/

		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();

/*

Google Map

*/

function initialize() {
  var mapOptions = {
    zoom: 17,
    scrollwheel: false,
    // draggable: false,
    center: {lat: 45.478135, lng: 9.123812} 
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  infowindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    map: map,
    // Define the place with a location, and a query string.
    place: {
      location: {lat: 45.478135, lng: 9.123812},
      query: 'San Siro Stadium'

    },
    // Attributions help users find your site again.
    attribution: {
      source: 'Google Maps JavaScript API',
      webUrl: 'https://developers.google.com/maps/'
    }
  });

  // Construct a new InfoWindow.
  var infowindow = new google.maps.InfoWindow({
    content: 'Creative Company'
  });

  infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);
