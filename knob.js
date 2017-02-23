var spin = require('../uxer/spinx')

module.exports = function(param, cb){
  if(param === undefined) param = function(){}
  if(typeof param === 'function'){
    cb = param
    param = {}
  }
  var knob = createKnob()
  if(param.style){
    for(var style in param.style){
      knob.style[style] = param.style[style]
    }
  }

  knob.addEventListener('DOMNodeInserted', function(evt){
    var amplitude = 0
    setTimeout(function(){
      spin(knob, function(_delta){
        //console.log(total * 180 / Math.PI)
        amplitude = amplitude + -_delta 
        cb(-_delta, amplitude / Math.PI / 2)
        ;(function(el, _delta){
          //onsole.log(_delta, amplitude / Math.PI / 2)
          window.requestAnimationFrame(function(){
            el.style.transform = 'rotateZ('+ (amplitude * 180 / Math.PI ) + 'deg)'
        })})(knob, _delta)
      })
    }, 1000)
    
  }, false)

  return knob

}

function createKnob(){
  var circle = document.createElement('div')
  circle.style.width = circle.style.height = '122px'
  circle.style.border = '13px solid black'
  circle.style.boxSizing = 'border-box'
  circle.style.borderTopColor = 'yellow'
  circle.style.borderRadius = '50% 50%'
  circle.style.display = 'inline-block'

  return circle

}
