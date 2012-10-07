(function($) {
    $.fn.turnandzoom = function(options) {
    	var settings = $.extend({
    		'width': 400,
    		'height': 450,
    		'border': {
    			'show': true,
    			'color': '#EEE',
    			'width': 1
    		},
    		'slider': {
    			'background': '#CCC',
        		'width': 350,
        		'height': 50,
        		'handleBackground': '#EEE',
        		'handleWidth': 50
    		}
    	}, options);

    	var slider = createSlider(settings);

    	this.css({
    		'width': settings.border.show ? settings.width - (2*settings.border.width) : settings.width,
    		'height': settings.border.show ? settings.height - (2*settings.border.width) : settings.height//,
    		//'border'
    	})

    	this.append(slider);

    	var images = this.find('img');
    	images.each(function(i) {
    		if (settings.border.show) {
    			$(this).css({
    				'width': '-=' + (2*settings.border.width),
    				'height': '-=' + (2*settings.border.width)
    			})
    		}

    		if(i != 0) {
    			$(this).hide();
    		}
    	});

    	$("#" + this[0].id + " .turnandzoom-slider").slider({
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

    	$("#" + this[0].id + " .turnandzoom-slider .ui-slider-handle").css({
    		'position': 'absolute',
    		'margin-left': -25,
    		'width': settings.slider.handleWidth,
    		'height': settings.sliderHeight,
    		'background': settings.slider.handleBackground
    	});
    };
})(jQuery);

function createSlider(settings) {
	var slider = document.createElement('div');
	slider.className = "turnandzoom-slider";
	slider.style.position = 'relative';
	slider.style.margin = 'auto';
	slider.style.background = settings.slider.background;
	slider.style.width = settings.sliderWidth;
	slider.style.height = settings.sliderHeight;
	return slider;
}