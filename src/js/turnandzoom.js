(function($) {
    $.fn.turnandzoom = function(options) {
        var images = this.find('img');
    	var settings = createSettings(options);
    	applyWidgetStyle(this, images, settings);
        generateWidgetComponents(this, images, settings);
        enableSlider(this, images);
        enableZoom(this, images, settings);

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
	    'position': 'relative',
	    'overflow': 'hidden',
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

function createViewport(settings) {
    var viewport = document.createElement('div');
    viewport.className = "turnandzoom-viewport";
    viewport.style.position = "relative";
    viewport.style.margin = "auto";
    viewport.style.width = settings.width;
    viewport.style.height = settings.height - settings.slider.height;
    return viewport;
}

function applyWidgetStyle(widget, images, settings) {
	// Apply styles to widget
	widget.css({
	    'position': settings.position,
	    'overflow': settings.overflow,
		'width': settings.width,
		'height': settings.height
	});

	// Apply styles to widget images
	images.each(function(i) {
		$(this).css({
			'width': settings.width,
			'height': settings.height - settings.slider.height
		});
		if(i != 0) {
			$(this).hide();
		}
	});
}

function generateWidgetComponents(widget, images, settings) {
    // Generate HTML for slider with some basic properties
    var slider = createSlider(settings);

    // Generate HTML for viewport with some basic properties
    var viewport = createViewport(settings);

    // Auto-generate viewport in widget and move images into it
    widget.append(viewport);
    images.each(function(i) {
        $(viewport).append(images[i]);
    });

    // Auto-generate slider in widget
    widget.append(slider);
}

function enableSlider(widget, images) {
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

function enableZoom(widget, images, settings) {
    var viewport = widget.find('.turnandzoom-viewport');
    var activeImage = viewport.find('img:visible');
    var halfWidth = activeImage.width()/2;
    var halfHeight = activeImage.height()/2;

    // Apply zooming
    $(viewport).hover(
        function() {
            $(activeImage).css({
                'width': settings.width*2,
                'height': settings.height*2
            });
            $(this).mousemove(function(e) {
                var left = e.offsetX;
                var top = e.offsetY;
                var deltaX = halfWidth - left;
                var deltaY = halfHeight - top;
                $(activeImage).css({
                    'margin-left': deltaX * 2,
                    'margin-top': deltaY * 2
                });
                e.preventDefault();
            });
        }, 
        function() {
            $(this).unbind('mousemove');
            $(activeImage).css({
                'margin-left': 0,
                'margin-top': 0,
                'width': settings.width,
                'height': settings.height - settings.slider.height
            });
        }
    );
}