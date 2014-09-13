var spin = require('uxer/spin')
var raf = require('./raf.js')

var appendCSS = require('./appendCSS')
var fs = require('fs')
var controlBox = fs.readFileSync('./public/controls.html', 'utf8')
var dial = fs.readFileSync('./public/dial.html', 'utf8')
var css = fs.readFileSync('./public/controls.css', 'utf8')

appendCSS(css)

module.exports = paramify

function paramify(params, el){

  var dummy = document.createElement('div')
  dummy.innerHTML = controlBox
  cBox = dummy.firstChild
  el.appendChild(cBox)
  
  var keys = Object.keys(params)

  var p = params//copyObject(params, {})

  keys.forEach(function(key, i){
    dummy.innerHTML = dial;
    var xdial = dummy.firstChild
    cBox.appendChild(xdial);
    var h4 = document.createElement('h1');
    var input = document.createElement('h1')
    input.type = 'text'
    input.value = input.textContent = params[key].value.toString()
    input.style.textAlign = h4.style.textAlign = 'center'
    input.style.border = input.style.outline = 'none'
    h4.textContent = params[key].name || key 
    params[key] = params[key].value
    var knob = xdial.getElementsByClassName('knob')[0]
    xdial.appendChild(h4)//, knob)
    xdial.insertBefore(input, knob)
    spin(knob)
    knob.spinDegree = 0;
    var rqf = raf()
    knob.addEventListener('spin', function(evt){
      var x = params[key] + ((evt.detail.delta / 360) * p[key]['gain']) 
      //window.getSelection().removeAllRanges()
      x = Math.min(p[key].max, x)
      x = Math.max(p[key].min, x)
      this.spinDegree += evt.detail.delta
      var self = this;
      rqf(function(){
        self.style['-webkit-transform'] = 'rotateZ('+(self.spinDegree)+'deg)'  
        params[key] = x
        input.textContent = x
      })
    })


    cBox.appendChild(dummy.firstChild)    
  })
    
    return params

}


function copyObject(a,b){

    for(var x in a){

      b[x] = a[x]

    }

    return b

}
