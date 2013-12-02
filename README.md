# Parametric

Parametric is an instant front-end for your app.  You give it your parameters; it gives you a multi-touch enabled, cross device compatible front-end.  An ugly one!

```
npm install parametric
```

## How To Use

Say you have an audio function that has some parameters.  In this example, the parameter is frequency:

```js
var frequency = 440;
var synth = function(time){
    return Math.sin(time * Math.PI * 2 * frequency)
}
```
With Parametric, do the following:
```
var paramify = require('parametric')
var params = {
    frequency: {
        value: 440,
	interval: Math.pow(2, 1/12),
	min: 0,
	max: 440 * 2 * 2 * 2
    }	
}
params = paramify(params)
var synth = function(time){
    return Math.sin(time * Math.PI * 2 * params.frequency)
}
```
Parametric will append a control panel to your document.body.  That control panel will have a spinning dial.  When you spin, frequency changes!

The spinning dial is the only interaction included in this release.  Soon it will have sliders, XY panels, tap, ON/OFF, rotate, pinch-zoom and others.
