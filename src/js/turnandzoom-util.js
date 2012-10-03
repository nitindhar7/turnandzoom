/**
 * jQuery event bindings happen to always include a .fix(), which,
 * while not an overtly slow function or anything, can stack up
 * with a ton of calls used during 'mousemove' or 'scroll'
 *
 * Adapted from work by John Resig.
 *
 * @param obj
 * @param type
 * @param fn
 */
function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function() {
        	obj['e' + type + fn](window.event);
        }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else {
        obj.addEventListener(type, fn, false);
    }
};

/**
 * Document Me
 *
 * @param obj
 * @param type
 * @param fn
 */
function removeEvent(obj, type, fn) {
    try {
        if ( obj.detachEvent ) {
            obj.detachEvent('on'+type, obj[type+fn]);
            obj[type+fn] = null;
        } else {
            obj.removeEventListener(type, fn, false);
        }
    }
    catch (err) {}
};

/**
 * Written because .css() in jQuery 1.2.6 isn't the fastest thing
 * in the world when fired a bunch during, say, 'mousemove'
 *
 * @param element to style
 * @param styles has to be a key-value map like:
 *        <pre>
 *            styles = {
 *                'width': 200,
 *                'height': 100,
 *                ...
 *            }
 *        </pre>
 *        where the value of attributes such as width, height, etc is just
 *        a number without unit.
 */
function applyCSS(element, styles) {
    var val, suffixes;

    suffixes = {
        'left': 'px',
        'top': 'px',
        'right': 'px',
        'bottom': 'px',
        'width': 'px',
        'height': 'px',
        'margin': 'px',
        'padding': 'px'
    };

    for (var prop in styles) {
        if (styles.hasOwnProperty(prop))
        {
            val = styles[prop] + (suffixes[prop] || '');
            if (element.style[prop] !== undefined) {
            	element.style[prop] = val;
            } else if (element[prop] !== undefined) {
            	element[prop] = val;
            }
        }
    }
};