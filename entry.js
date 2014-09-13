var amod = require('amod')
var oz = require('oscillators')
var jdelay = require('jdelay')
var jsynth = require('jsynth')
var master = new webkitAudioContext()

var paramify = require('./')

var p = {
      f : {
      value: .5,//master.sampleRate,
      type: 'float',
      gain: 1,
      interval: 0,
      min: 0,
      max: 1
    },
      a: {
      value: 4,
      tpye: 'integer',
      gain: 1,
      min: 0,
      max: 24
    }
}

paramify(p)
var delay = jdelay(master.sampleRate, .25, .75)
var synth = jsynth(master, dsp)
synth.connect(master.destination)
function dsp(time){
  return oz.sine(time, 330) * amod(p.f,1 - p.f, time, Math.floor(p.a))
}

