var ui = require('./yindex')
var insert = require('insert-css')
var cstyle = require('../see-style')

var master = new AudioContext
var sr = master.sampleRate

var jsynth = require('jsynth')
var $ = require('../polysynth/cheatcode')

var fs = require('fs')
var html = fs.readFileSync('./module.html', 'utf8')
var css = fs.readFileSync('./module.css', 'utf8')
insert(css)
document.body.innerHTML = html;
var model = document.querySelector('.module')
cstyle.square(model, {square: 4})
var env, dur = 1, del, start = false, fq 


var st = ui({
  gain: 
    { type: 'dial', value: .333, name: 'gain', mag: 1/10, min:0, max: 11, el: model.children[1] },
  amod: 
    { type: 'dial', value: 1/2, step: 1/8, mag: 1, el: model.children[2] },
  xy: {type: 'xy', range:[-1,-1,1,1], el: model.children[0], name: 'ps'},
  xy22: {type: 'xy', range:[-1,-1,1,1], el: model.children[4], name: 'ps2'},
  env: {type: 'bezier', value: [[0,0],[0,1],[.33, .33],[.66, .66],[.1,1],[1,0]], el: model.children[5], name: 'thumb'}
}, function(v, e){
  //console.log(e, v)
  am = {}
  am.curves = v//st.state.amod
  dur = am.dur = 1
  env = $.env([st.state.env], [dur])
  del = $.jdelay(1, .59, .9)
  console.log(v,e, st.state)
  fq = 440/2
  if(!start){
    start = true
  
  }
})
var compressor = master.createDynamicsCompressor()
compressor.threshold.value = -30;
compressor.knee.value = -20;
compressor.ratio.value = 12*2;

var gen = new $.chrono
var T = 0
console.log($.midi)
$.midi("Q49 MIDI 1", {index:0}).on('data', function(d, t){
  console.log(d)
  var fq = $.teoria.note.fromMIDI(d[1]).fq()
  scale = $.westerns.upscale(fq, 'ionian', 8, 12).filter((e,i) => (i + 1) % 3 === 1 ? true : false)//.filter(Boolean)
  //return del(tone  * env(t % 1),Math.floor(sr * dur / (100 * st.state.gain)), .9, .9)
  console.log(st.state.env, st.state.gain)
  var ti = T
  if(d[0]==144)
  gen.set(T, function(t, s, i){
    return tone = $.gtone(t-ti, fq, 0, 5, [1,2,4,8,16,32], 5, $.ph.sine, $.amod(0, 0, t * 60 / 60, fq)) * $.amod(.5, st.state.amod, t-ti, st.state.gain)// * $.winfunk.hamming((t-ti), fq)) 
  }, {curves: [st.state.env], durations: [st.state.gain]})
})
jsynth(master, function(t,s,i){
  T = t
  return gen.tick(t, s, i)
}, 512).connect(compressor)
compressor.connect(master.destination)





console.log(st)
