var jsynth = require('../../jsynth')
var master = new webkitAudioContext()

var paramify = require('./')

var params = {

    frequency : {
	value: 440,
	type: 'float',
	interval: Math.pow(2, 1/12),
	min: 0,
	max: 440 * 2 * 2 * 2
    },
    amplitude : {
	value: 1,
	tpye: 'integer',
	interval: .01,
	min: 0,
	max: 1
    }
}

params = paramify(params)

var synth = jsynth(master, dsp)
synth.connect(master.destination)
console.log(synth)
function dsp(time){

    return Math.sin(time * Math.PI * 2 * params.frequency) * params.amplitude

}

