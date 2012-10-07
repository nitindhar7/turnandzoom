turnandzoom - Create beautiful 360-degree zooming widgets
=========================================================

A Javascript widget that allows you to rotate an image 360 degrees and zoom on any angle

### Getting the library

Download and include turnandzoom-X.X.X.js to your webpage.

    <script type="text/javascript" src="..."></script>

`turnandzoom` runs on jQuery/jQueryUI and requires them to be included in your webpage.

### Using `turnandzoom`

In you markup:

    <div id="widget">
        <img src="a.jpg" />
        <img src="b.jpg" />
        <img src="c.jpg" />
    </div>

In your javascript:

    $("#widget").turnandzoom();

A few variations:

    // A different sized widget
    $("#widget").turnandzoom({
        'width': 300,
        'height': 300
    });

    // Add color to the slider
    $("#widget").turnandzoom({
        'sliderBackground': 'blue'
    });

### Built Using

- jQuery 1.7.2
- jQuery UI 1.8.22

### Bug Reports

Feel free to report bugs to:

- nitindhar7 (AT) yahoo com