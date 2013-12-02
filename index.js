var spin = require('uxer/spin')

var appendCSS = require('./appendCSS')
var fs = require('fs')
var controlBox = fs.readFileSync('./public/controls.html', 'utf8')
var dial = fs.readFileSync('./public/dial.html', 'utf8')
var css = fs.readFileSync('./public/controls.css', 'utf8')

appendCSS(css)

var dummy = document.createElement('div')
dummy.innerHTML = controlBox
controlBox = dummy.firstChild
document.body.appendChild(controlBox)

module.exports = paramify

function paramify(params){

    var keys = Object.keys(params)

    keys.forEach(function(key, i){
	params[key] = params[key].value
	dummy.innerHTML = dial;
	var xdial = dummy.firstChild
	controlBox.appendChild(xdial);
	var knob = xdial.getElementsByClassName('knob')[0]
	spin(knob)
	knob.spinDegree = 0;
	knob.addEventListener('spin', function(evt){
//	    console.log(params[key])
	    params[key] = evt.detail.degree
	    this.spinDegree += evt.detail.delta
	    this.style['-webkit-transform'] = 'rotateZ('+(this.spinDegree)+'deg)'	  
	})

	controlBox.appendChild(dummy.firstChild)    
    })
    
    return params

}
