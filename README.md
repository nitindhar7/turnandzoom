![turnandzoom](https://forrst-production.s3.amazonaws.com/multiposts/images/13505/original.png?1349589564)

A Javascript widget that allows you to rotate an image 360 degrees and zoom on any angle

### Getting `turnandzoom`

Download and include turnandzoom-X.X.X.js to your webpage.

```html
<script type="text/javascript" src="turnandzoom-X.X.X.js"></script>
```

`turnandzoom` runs on jQuery/jQueryUI and requires them to be included in your webpage.

### Using `turnandzoom`

In your markup:

```html
<script type="text/javascript" src="jquery-1.7.2.js"></script>
<script type="text/javascript" src="jquery-ui-1.8.22.js"></script>
<script type="text/javascript" src="turnandzoom-X.X.X.js"></script>

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

Options:

- `height`: in 'px'
- `width`: in 'px'
- `slider`: Json object with:

  - `background`: Slider rail
  - `handleBackground`: Slider handle background
  - `height`: Slider rail height in 'px'

And a few variations:

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

### Upcoming Features

- Border settings for widget and slider
- Zooming capability
- Jump to certain values
- Progress/Regress arrows

### Compatability

- jQuery (1.7.2+)
- jQuery UI (1.8.22+)
- Chrome Version 22.0.1229.79

### Contribute

Feel free to submit patches that we well tested and well documented. Make to mention the versions of browsers tested on and version of dependency libraries used.

### Reporting Bugs

Feel free to open up an issue to report a bug. 