/**
 * Document Me
 */
var turnandzoom_grid = {

    /**
     * Document Me
     */
    create: function(id, divisor) {
        var el, len, img;

        el = document.getElementById(id);

        if (!el) {
            return false;
        }

        if (el && el.firstChild && el.firstChild.nodeName == 'IMG') {
            return el;
        } else {
            el.innerHTML = '';
            len = Math.pow(divisor, 2);
            for (var i = 0; i < len; i++) {
                img = document.createElement('img');
                img.id = 'image_zoom_grid_expose_block_' + i;
                el.appendChild(img);
            }
            return el;
        }
    },

    /**
     * Document Me
     */
    grid: function(nodes, divisor, unitWidth, unitHeight) {
        var grid, offsetLeft, offsetTop;

        grid = [];

        for (var i = 0; i < nodes.length; i++) {
            offsetLeft = unitWidth * (i % divisor);
            offsetTop = unitHeight * (Math.floor(i / divisor) % divisor);
            grid.push({
                'left': offsetLeft,
                'top': offsetTop
            });
        }

        return grid;
    },

    /**
     * Usage:
     *
     * <pre>
     *     var someVar = turnandzoom_grid.find('some_DOM_element_ID', {
     *         divisor: Integer,
     *         frameWidth: Integer,
     *         frameHeight: Integer,
     *         reticleWidth: Integer,
     *         reticleHeight: Integer,
     *         percentX: Float,
     *         percentY: Float,
     *         onImageInView: function(index) {
     *             // do something with 'this' (an image), probably give it a new src value!
     *         }
     *         onImageLoad: function(e) { // 'this' now refers to the image that loaded
     *             // do something with 'this' (an image), probably display it!
     *         },
     *         onImageError: function(e) { // 'this' now refers to the image whose src didn't resolve with a 200 HTTP response code
     *             // do something with 'this' (an image), probably hide it =( =( =( =( =(
     *         }
     *     });
     * </pre>
     **/
    find: function(id, config, x, y) {
        var el, grid, kids, nodes, node, bucket;

        el = this.create(id, config.divisor);

        if (!el) {
            return false;
        }

        kids = el.childNodes;

        var unitWidth = config.frameWidth / config.divisor;
        var unitHeight = config.frameHeight / config.divisor;

        if (!jQuery(el).data('image_zoom_grid')) {
            grid = this.grid(kids, config.divisor, unitWidth, unitHeight);
            jQuery(kids).load(config.onImageLoad).error(config.onImageError);
            jQuery(el).data('image_zoom_grid', grid);
        } else {
            grid = jQuery(el).data('image_zoom_grid', grid);
        }

        var posX = config.percentX * (config.frameWidth - config.reticleWidth);
        var posY = config.percentY * (config.frameHeight - config.reticleHeight);

        bucket = [];

        for (var i = 0; i < grid.length; i++) {
            node = grid[i];
            if (node.left > (posX - unitWidth) &&             // if some...
                node.left < (posX + config.reticleWidth) &&   // part...
                node.top > (posY - unitHeight) &&             // of it...
                node.top < (posY + config.reticleHeight)      // is visible...
            ) {
                bucket.push(kids[i]);                         // then make it known
                config.onImageInView.call(kids[i], i);        // and do something with it
            }
        }

        return bucket;
    },

    /**
     * Document Me
     */
    destroy: function(id) {
        jQuery('#' + id).empty().data('image_zoom_grid', false);
    }

};