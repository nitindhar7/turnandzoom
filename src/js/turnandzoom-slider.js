var turnandzoom = {

    create: function(id, options, styles) {
        var scrollbar, html, trackBoundaries, trackLength, sliderLength, elements, e, startCoord, startPosition, scrollPercentage, unadjustedSnaps, adjustedSnaps, snapIncrement, scroll_to_new_position, record_mouse_move;

        scrollbar = document.getElementById(id);
        if (!scrollbar) {
            console.debug("[turnandzoom] No element found for id: " + id);
            return;
        }

        options = jQuery.extend({
            boundingLength: 500,
            innerLength: 1000,
            thickness: 16,
            percentageSnap: false,
            vertical: true,
            onScroll: function() {}
        }, options);

        styles = jQuery.extend({
            'overflow': 'hidden',
            'position': 'relative',
            'width': options.vertical ? options.thickness : options.boundingLength,
            'height': options.vertical ? options.boundingLength : options.thickness
        }, styles);

        jQuery(scrollbar).addClass('faux_scrollbar');
        applyCSS(scrollbar, styles);

        html = '';
        html += '<div id="' + id + '_regress_arrow" class="faux_scrollbar_arrow regress_arrow"></div>';
        html += '<div id="' + id + '_slider" class="faux_scrollbar_slider"><div class="faux_scrollbar_slider_left"></div><div class="faux_scrollbar_slider_center"></div><div class="faux_scrollbar_slider_right"></div></div>';
        html += '<div id="' + id + '_progress_arrow" class="faux_scrollbar_arrow progress_arrow"></div>';

        scrollbar.innerHTML = html;

        elements = {
            regress_arrow: null,
            slider: null,
            progress_arrow: null
        };

        for (e in elements) {
            if (elements.hasOwnProperty(e)) {
                elements[e] = document.getElementById(id + '_' + e);
                elements[e].onselectstart = function() {
                    return false;
                }
            }
        }
        jQuery(scrollbar).data('custom_scrollbar_elements', elements);

        // assignment of dimensions!
        styles = {
            'width': options.thickness,
            'height': options.thickness,
            'position': 'absolute',
            'left': options.vertical ? 0 : options.thickness,
            'top': options.vertical ? options.thickness : 0
        };
        trackLength = (options.boundingLength - (options.thickness * 2));
        sliderLength = (trackLength / options.innerLength) * trackLength;
        if (sliderLength > trackLength) {
            sliderLength = trackLength;
        }
        styles[options.vertical ? 'height' : 'width'] = sliderLength;
        jQuery(elements.slider);
        applyCSS(elements.slider, styles);

        trackBoundaries = [options.thickness, (options.thickness + trackLength - sliderLength)];

        styles = {
            'width': options.thickness,
            'height': options.thickness,
            'position': 'absolute'
        };

        if (options.percentageSnap !== false) {
            unadjustedSnaps = Math.floor(100 / options.percentageSnap);
            adjustedSnaps = unadjustedSnaps + 1;
            snapIncrement = Math.floor(trackLength * (unadjustedSnaps / adjustedSnaps) * options.percentageSnap / 100);
        }

        // useful to keep track of current scroll percentage
        scrollPercentage = 0;

        // event handling
        scroll_to_new_position = function(newPosition, animate, force) {
            var newScrollPercentage, destinationStyles, snapReduction;
            if (newPosition < trackBoundaries[0]) {
                newPosition = trackBoundaries[0];
            }
            else if (newPosition > trackBoundaries[1]) {
                newPosition = trackBoundaries[1];
            }

            newScrollPercentage = ((newPosition - trackBoundaries[0]) / (trackBoundaries[1] - options.thickness)) * 100;
            newScrollPercentage = Math.round(newScrollPercentage * 100) / 100; // round to 00.00 accuracy
            if (options.percentageSnap !== false) {
                snapReduction = newScrollPercentage % options.percentageSnap;
                newScrollPercentage -= snapReduction;
                newPosition = (newScrollPercentage / options.percentageSnap) * snapIncrement + options.thickness;
            }

            destinationStyles = {
                'left': options.vertical ? 0 : newPosition,
                'top': options.verical ? newPosition : 0
            };
            if (scrollPercentage != newScrollPercentage) {
                scrollPercentage = newScrollPercentage;
                !animate ? applyCSS(elements.slider, destinationStyles) : jQuery(elements.slider).animate(destinationStyles, 'fast');
                options.onScroll(newScrollPercentage);
            }
        };
        jQuery(document.body).mouseup(function() {
            removeEvent(document.body, 'mousemove', record_mouse_move);
        });

         jQuery(elements.slider).mousedown(function(e) {
                e.preventDefault();
                if (document.selection && document.selection.empty) {
                    document.selection.empty() ;
                }
                else if (window.getSelection) {
                    var sel = window.getSelection();
                    if(sel && sel.removeAllRanges) {
                        sel.removeAllRanges();
                    }
                }
                startCoord = e['client' + (options.vertical ? 'Y' : 'X')];
                startPosition = parseInt(elements.slider.style[options.vertical ? 'top' : 'left'], 10);
                addEvent(document.body, 'mousemove', record_mouse_move);
            });


        if (options.percentageSnap !== false) {
            jQuery(elements.slider).mouseup(function() {
                var index = Math.floor(scrollPercentage / options.percentageSnap);
                custom_scrollbar.scroll_to_percent(id, index * options.percentageSnap);
            });
        }
        record_mouse_move = function(e) {
            var delta = e['client' + (options.vertical ? 'Y' : 'X')] - startCoord;
            scroll_to_new_position(startPosition + delta);
            return false;
        };
        jQuery([elements.regress_arrow, elements.progress_arrow]).click(function(e) {
            var regress = (this == elements.regress_arrow);
            if (options.percentageSnap !== false) {
                var index = Math.floor(scrollPercentage / options.percentageSnap);
                index += regress ? -1 : 1;
                custom_scrollbar.scroll_to_percent(id, index * options.percentageSnap);
            }
            else {
                var startPosition = parseInt(elements.slider.style[options.vertical ? 'top' : 'left'], 10);
                scroll_to_new_position( startPosition + ((regress ? -1 : 1) * 40) ); // go -40 or +40 from where you are currently
            }
        });
        jQuery(scrollbar).click(function(e) {
            if (e.target == scrollbar) { // ignore clicks on the scrollbar arrows and slider, we want clicks on the "track" only
                var startPosition, clickedPosition;
                startPosition = parseInt(elements.slider.style[options.vertical ? 'top' : 'left'], 10);
                clickedPosition = e['page' + (options.vertical ? 'Y' : 'X')] - jQuery(this).offset()[options.vertical ? 'top' : 'left'];
                scroll_to_new_position( startPosition + (clickedPosition < startPosition ? -200 : 200) ); // go -200 or +200 from where you are currently
            }
        });
        jQuery(scrollbar).bind('custom_scrollbar_set_scroll_position', function(e, percent) {
            scroll_to_new_position( (trackBoundaries[1] - trackBoundaries[0]) * (percent / 100) + trackBoundaries[0] );
        });
    },

    scroll_to_percent: function(id, percent) {
        jQuery('#' + id).trigger('custom_scrollbar_set_scroll_position', [percent]);
    }
};