turnandzoom ![turnandzoom](./data/turnandzoom.png)
===================================

A Javascript widget that allows you to rotate an image 360 degrees and zoom on any angle

### Getting `turnandzoom`

Download and include turnandzoom-X.X.X.js to your webpage.

```html
<script type="text/javascript" src="turnandzoom-X.X.X.js"></script>
```

`turnandzoom` runs on jQuery/jQueryUI and requires them to be included in your webpage.

### Using `turnandzoom`

In you markup:

```html
<script type="text/javascript" src="jquery-1.7.2.js"></script>
<script type="text/javascript" src="jquery-ui-1.8.22.js"></script>
<script type="text/javascript" src="turnandzoom.js"></script>

...

<div id="widget">
    <img src="a.jpg" />
    <img src="b.jpg" />
    <img src="c.jpg" />
</div>
```

In your javascript:

```javascript
$("#widget").turnandzoom();
```

A few variations:

```javascript
// A different sized widget
$("#widget").turnandzoom({
    'width': 300,
    'height': 300
});

// Add color to the slider
$("#widget").turnandzoom({
    'slider': {
        'background': 'blue'
    }
});

// Change the height of the slider
$("#widget").turnandzoom({
    'slider': {
        'height': 20
    }
});
```

### Built using

- jQuery (1.7.2)
- jQuery UI (1.8.22)

### Contribute

Feel free to submit patches that we well tested and well documented. Make to mention the versions of browsers tested on and version of dependency libraries used.

### Reporting Bugs

Feel free to open up an issue to report a bug. 