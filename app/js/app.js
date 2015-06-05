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
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();

	// Filter portfolio
	$('.portfolio').mixItUp();

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
	
})();
