(function($) {
    $.fn.turnandzoom = function() {
    	this.append('<div id="turnandzoom-slider"></div>');

    	var images = this.find('img');
    	images.each(function(i) {
    		$(this).addClass('turnandzoom-zoom-pointer');
    		if(i != 0) {
    			$(this).addClass('turnandzoom-hidden');
    		}
    	});

    	$("#turnandzoom-slider").slider({
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