# THIS MODULE IS NOT READY YET

# Parametrical

Parametric is an instant front-end for your app.  You give it your parameters; it gives you a multi-touch enabled, cross device compatible front-end.  An ugly one!

Use with [browserify](https://github.com/substack/node-browserify) + [brfs](https://github.com/substack/brfs)

```
npm install parametrical
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
```js
var paramify = require('parametric')
var params = {
    frequency: {
        value: 440, // A0
        interval: Math.pow(2, 1/12), // one equal tempered note
        min: 0,  
        max: 440 * 2 * 2 * 2,
	type: 'float'
    }	
}
params = paramify(params)
var synth = function(time){
    return Math.sin(time * Math.PI * 2 * params.frequency)
}
```
Parametric will append a control panel to your document.body.  That control panel will have a spinning dial.  When you spin, frequency changes!

The spinning dial is the only interaction included in this release.  Soon it will have sliders, XY panels, tap, ON/OFF, rotate, pinch-zoom and others.

## param params
Options for your parameters:
#### value
the initial value of your param
####interval
the interval (rate of change) for change for your param values.

You can pass another param object here, which will create another param node which will modify the interval value of the parent parameter.

You can pass an array of any values (strings or numbers), and they will become the only parameter options.
####min
the minimum allowable value for your param
####max
the maximal value for your param
####type 
a string value of 'float', 'integer', 'string' or 'boolean'
otherwise your type will be coerced with typeof $value