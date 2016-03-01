var ui = require('./yindex')

var st = ui({
  gain: 
    { type: 'dial', value: 1, name: 'gain', mag: 10, min:-1, max: 11 },
  amod: 
    { type: 'dial', value: 1/8, step: 1/8, mag: 1 },
  xy: 
    { type: 'xy', range: [-1, -1, 1, 1]},
  wah:
    { type: 'button', name: 'wahwah', false: 0, true: 1, value: 0 },
  fire:
    { type: 'shot', name: 'wahwah', false: 0, true: 1, value: 0 },
  bpm:
    { type: 'bpm', name: 'bpm tap', false: 0, true: 1, value: 0 },
  timbre2:
    { type: 'amod', name: 'timbre2', value: [[0,0], [1/4, 1], [3/4, 1/2], [1,0]] }
})

console.log(st)



var sidebar = document.createElement('div')
$ = sidebar.style
$.display = 'flex'
$.flexDirection = 'row'
$.flexWrap = 'wrap'
$.justifyContent = 'space-around'
$.width = '33%'
$.height = '100%'
document.body.appendChild(sidebar)
st.forEach(function(e){
  sidebar.appendChild(e)
})
