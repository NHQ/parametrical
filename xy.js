var xyify = require('../uxer/xygrid')

module.exports = function(p, cb){
  if(!cb) cb = function(){}
  var el = createNode()
  if(p && p.style){
    for(var style in p) el.style[style] = p.style[style]
  }
  xyify(el, function(nxy, xy, off){
    //console.log(nxy, xy)
    //el.firstChild.style.display = off ? 'none' : 'inline-block'
    //el.firstChild.style.left = xy[0] - 4.5+ 'px'
    //el.firstChild.style.top = xy[1] - 4.5 + 'px'
    cb(nxy)
    update(xy)
  }, p.value)

  return el

  function update(xy){
    console.log(xy)
    var ctx = el.getContext('2d')
    ctx.clearRect(0,0, el.width, el.height)
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(xy[0], 0)
    ctx.lineTo(xy[0], el.width)
    ctx.moveTo(0, xy[1])
    ctx.lineTo(el.height, xy[1])
    ctx.stroke()
  }


}

function createNode(){
  var node = document.createElement('canvas')
  node.width = 122
  node.height = 122
  node.style.width = node.width + 'px'
  node.style.height = node.height + 'px'
  node.style.border = '7px solid black'
  node.style.display = 'inline-flex'
  node.style.boxSizing = 'border-box'
  node.style.userSelect = 'none'
  return node
}

function dot(){
  var d = document.createElement('div')
  d.style.width = d.style.height = '9px'
  d.style.border = '3px solid black'
  d.style.boxSizing = 'border-box'
  d.style.borderRadius = '50% 50%'
  d.style.backgroundColor = 'OrangeRed'
  d.style.display = 'none'
  d.style.backgroundOpacity = .5
  d.style.position = 'absolute'
  d.style.boxSizing = 'border-box'
  return d
}
