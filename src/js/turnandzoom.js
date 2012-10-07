(function($) {
    $.fn.turnandzoom = function(options) {
    	var settings = $.extend({
    		'width': 400,
    		'height': 450,
    		'sliderBackground': '#CCC'
    	}, options);

    	var slider = createSlider(settings);

    	this.css({
    		'width': settings.width,
    		'height': settings.height,
    	})

    	this.append(slider);

    	var images = this.find('img');
    	images.each(function(i) {
    		if(i != 0) {
    			$(this).addClass('turnandzoom-hidden');
    		}
    	});

    	$("#" + this[0].id + " .turnandzoom-slider").slider({
    		min: 0,
			max: images.length-1,
			step: 1,
			slide: function(event, ui) {
				images.each(function(i) {
		    		$(this).addClass('turnandzoom-hidden');
		    	});
				images[ui.value].className = "";
			}
    	});
    };
})(jQuery);

function createSlider(settings) {
	var slider = document.createElement('div');
	slider.className = "turnandzoom-slider";
	slider.style.background = settings.sliderBackground;
	slider.style.position = 'relative';
	slider.style.margin = 'auto';
	slider.style.width = settings.width - 50;
	slider.style.height = 50;
	return slider;
}