var ui = require('./yindex')
var insert = require('insert-css')

var fs = require('fs')
var html = fs.readFileSync('./module.html')
var css = fs.readFileSync('./module.css')

insert(css)
document.body.innerHTML = html;
// thats mod element 
var model = document.querySelector('.module')
var st = ui({
  time: 
    { type: 'dial', value: 0, name: 'time', mag: 100, el: model.children[0] },
  tempo : 
    { type: 'dial', value: 72 / 60 * 4 / 5, name: 'tempo', mag: 1, el: model.children[1] },
  delay: 
    { type: 'dial', value: 4, name: 'delay', mag: 1, min: 1, max: Infinity, step: 1, el: model.children[2] }
})

let master = new AudioContext
let jsynth = require('jsynth')
$ = require('../polysynth/cheatcode')

var iir = $.iir(2)

let delay = $.jdelay(master.sampleRate * st.state.tempo / 4, .5, .5)

jsynth(master, function(t){
  t *= st.state.tempo
  t += st.state.time
  return delay(iir(sin(333 / 2 * wmod_(wmod_(12, 4, t, 1/32), wmod_(6, 2, t, 1/16), t, 1/4)) * amod(.5, .5, 1/4) / 4
  + sin(wmod_(222 - 4, 4, t, 1/64) * wmod_(wmod_(6, 3, t, 1/3/2/2/2/2/2), wmod_(12, 4, t, 1/4/2/2/2/2), t, 1/6)) * amod(.2, .3, 1/12) / 4
  + tri(333 + tri(amod_(amod(6, 1/2, 1/32/2/2/2/2/2/2/2/2), 2/2/2/2/2/2, t, 1/32/2/2/2/2/2/2))) * amod_(.5, .5, t * 3 / 2 , 1/4) * 2
  + tri(111 + tri(amod_(amod(2, 1/6, 1/32/2/2/2/2/2/2/2/2), 1/64/2/2/2, t, 1/32/2/2/2/2/2/2))) * amod_(.5, .5, t * 3 / 2, 1/6) * 2), master.sampleRate * st.state.tempo * st.state.delay, 1/8, 1)

  function tri (x) { return tri_(x,t) }
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }

  function amod_(c, r, t, f){ return c + r * ((Math.log((1.0001 + sin(f, t)) * 50) / Math.log(10))/2-2) }
  function wmod_(c, r, t, f){ return c + Math.floor(r * ((Math.log((1.0001 + sin(f, t)) * 50) / Math.log(10))/2-2)) }
  function amod(c, r, f){ return c + r * ((Math.log((1.0001 + sin(f)) * 50) / Math.log(10))/2-2) }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sin_ (x, t) { return Math.sin(2 * Math.PI * t * x) }
}).connect(master.destination)

