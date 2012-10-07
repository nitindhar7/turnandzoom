(function($) {
    $.fn.turnandzoom = function(options) {
    	var settings = createSettings(options);

    	applyWidgetStyle(this, settings);

    	$("#" + this[0].id + " .turnandzoom-slider .ui-slider-handle").css({
    		'position': 'absolute',
    		'margin-left': '-=' + (settings.slider.handleWidth/2),
    		'width': settings.slider.handleWidth,
    		'height': settings.slider.height,
    		'background': settings.slider.handleBackground
    	});
    };
})(jQuery);

function validateOptions(options) {
	if(options) {
		if(options.slider) {
			if(options.slider.handleHeight) {
				delete options.slider.handleHeight;
			}
			if(options.slider.handleWidth) {
				delete options.slider.handleWidth;
			}
			if(options.slider.width) {
				delete options.slider.width;
			}
		}
	}
	return options;
}

function createDefaultSettings() {
	return {
		'width': 400,
		'height': 400,
		'slider': {
			'background': '#CCC',
    		'height': 50,
    		'handleBackground': '#EEE'
		}
	};
}

function createSettings(options) {
	// Make sure that passed in options make sense
	var options = validateOptions(options);
	
	// Fetch default settings
	var defaultSettings = createDefaultSettings();
	
	// Merge defaults recursively with options
	var settings = $.extend(true, defaultSettings, options);

	// Adjust widget height based on slider height
	settings.height += settings.slider.height;
	
	// Adjust slider handle height based on slider height
	settings.slider.handleHeight = settings.slider.height;

	// Adjust slider handle width based on slider handle height
	settings.slider.handleWidth = settings.slider.handleHeight;

	// Set slider width to widget width
	settings.slider.width = settings.width - settings.slider.handleWidth;

	return settings;
}

function createSlider(settings) {
	var slider = document.createElement('div');
	slider.className = "turnandzoom-slider";
	slider.style.position = 'relative';
	slider.style.margin = 'auto';
	slider.style.background = settings.slider.background;
	slider.style.width = settings.slider.width;
	slider.style.height = settings.slider.height;
	return slider;
}

function applyWidgetStyle(widget, settings) {
	// Generate HTML for slider with some basic properties
	var slider = createSlider(settings);

	// Apply styles to widget
	widget.css({
		'width': settings.width,
		'height': settings.height
	});
	

	// Auto-generate slider in widget
	widget.append(slider);

	// Apply styles to widget images
	var images = widget.find('img');
	images.each(function(i) {
		$(this).css({
			'width': settings.width,
			'height': settings.height
		})
		if(i != 0) {
			$(this).hide();
		}
	});

	// Create slider functionality
	$("#" + widget[0].id + " .turnandzoom-slider").slider({
		min: 0,
		max: images.length-1,
		step: 1,
		slide: function(event, ui) {
			images.each(function(i) {
	    		$(this).hide();
	    	});
			images[ui.value].style.display = 'block';
		}
	});
}