var spin = require('uxer/spin')
var raf = require('./raf.js')

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

  var p = copyObject(params, {})
  console.log(p)

  keys.forEach(function(key, i){
    params[key] = params[key].value
    dummy.innerHTML = dial;
    var xdial = dummy.firstChild
    controlBox.appendChild(xdial);
    var h4 = document.createElement('h4');
    h4.textContent = key
    var knob = xdial.getElementsByClassName('knob')[0]
    xdial.insertBefore(h4, knob)
    spin(knob)
    knob.spinDegree = 0;
    var rqf = raf()
    knob.addEventListener('spin', function(evt){
      var x = params[key] + ((evt.detail.delta / 360) * p[key]['gain']) 
      // p[key].interval * evt.detail.clockwise
      x = Math.min(p[key].max, x)
      x = Math.max(p[key].min, x)
      console.log(x)
      params[key] = x
      this.spinDegree += evt.detail.delta
      var self = this;
      rqf(function(){
        self.style['-webkit-transform'] = 'rotateZ('+(self.spinDegree)+'deg)'	  
      })
    })


    controlBox.appendChild(dummy.firstChild)    
  })
    
    return params

}


function copyObject(a,b){

    for(var x in a){

      b[x] = a[x]

    }

    return b

}
