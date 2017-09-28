var ui = require('./yindex')
var insert = require('insert-css')
var cstyle = require('../see-style')

var fs = require('fs')
var html = fs.readFileSync('./module.html', 'utf8')
var css = fs.readFileSync('./module.css', 'utf8')
insert(css)
document.body.innerHTML = html;
// thats mod element 
var model = document.querySelector('.module')
cstyle(model)
var st = ui({
  gain: 
    { type: 'dial', value: 1, name: 'gain', mag: 10, min:-1, max: 11, el: model.children[1] },
  amod: 
    { type: 'dial', value: 1/8, step: 1/8, mag: 1, el: model.children[2] },
  xy: {type: 'xy', range:[-1,-1,1,1], el: model.children[4], name: 'ps'},
  xy22: {type: 'xy', range:[-1,-1,1,1], el: model.children[5], name: 'ps2'},
  env: {type: 'bezier', value: [[0,0],[0,1],[.5, .5], [1,1],[1,0]], el: model.children[0], name: 'thumb'}
})


console.log(st)
