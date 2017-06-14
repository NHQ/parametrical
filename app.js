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
  gain: 
    { type: 'dial', value: 1, name: 'gain', mag: 10, min:-1, max: 11, el: model.children[0] },
  amod: 
    { type: 'dial', value: 1/8, step: 1/8, mag: 1, el: model.children[1] }
})

