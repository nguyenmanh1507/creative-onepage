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

			// Ajax contact form
			var contactForm = $('#contact-form');
			var formWrap = contactForm.closest('.content-wrap');

			contactForm.submit(function() {
				$.ajax({
					url: '//formspree.io/nguyenmanh1507@gmail.com',
					method: 'POST',
					data: {
						name: $('#cf-name').val(),
						email: $('#cf-email').val(),
						message: $('#cf-message').val()
					},
					beforeSend: function() {
						formWrap.addClass('is-submit');
					},
					success: function() {
						formWrap.removeClass('is-submit');
						contactForm.hide();
						$('#modalTitle').text('Thank you! I\'ll reply you soon.');
						window.setTimeout(function() {
							$('.close-reveal-modal').click();
						}, 2000);
					},
					dataType: 'json'
				});
				return false;
			});


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
	// Create array of styler
	var styles = [{'featureType':'all','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':'-100'},{'invert_lightness':true},{'lightness':'11'},{'gamma':'1.27'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'landscape.man_made','elementType':'all','stylers':[{'hue':'#ff0000'},{'visibility':'simplified'},{'invert_lightness':true},{'lightness':'-10'},{'gamma':'0.54'},{'saturation':'45'}]},{'featureType':'poi.business','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'saturation':'75'},{'lightness':'24'},{'gamma':'0.70'},{'invert_lightness':true}]},{'featureType':'poi.government','elementType':'all','stylers':[{'hue':'#ff0000'},{'visibility':'simplified'},{'invert_lightness':true},{'lightness':'-24'},{'gamma':'0.59'},{'saturation':'59'}]},{'featureType':'poi.medical','elementType':'all','stylers':[{'visibility':'simplified'},{'invert_lightness':true},{'hue':'#ff0000'},{'saturation':'73'},{'lightness':'-24'},{'gamma':'0.59'}]},{'featureType':'poi.park','elementType':'all','stylers':[{'lightness':'-41'}]},{'featureType':'poi.school','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'invert_lightness':true},{'saturation':'43'},{'lightness':'-16'},{'gamma':'0.73'}]},{'featureType':'poi.sports_complex','elementType':'all','stylers':[{'hue':'#ff0000'},{'saturation':'43'},{'lightness':'-11'},{'gamma':'0.73'},{'invert_lightness':true}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':'45'},{'lightness':'53'},{'gamma':'0.67'},{'invert_lightness':true},{'hue':'#ff0000'},{'visibility':'simplified'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'saturation':'38'},{'lightness':'-16'},{'gamma':'0.86'}]}];

	var styledMap = new google.maps.StyledMapType(styles, {name: 'Styled Map'});

  var mapOptions = {
    zoom: 16,
    scrollwheel: false,
    // draggable: false,
    center: {lat: 45.478135, lng: 9.123812},
    mapTypeContronlOptions: {
    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

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
