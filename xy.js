var xywify = require('../uxer/xygrid')

module.exports = function(cb){
  var el = createNode()
  xyify(el, function(xy){
    cb && cb(xy)
  })
  return el
}

function createNode(){
  var node = document.createElement('div')
  node.style.width = '200px'
  node.style.height = '200px'
  node.style.border = '7px solid OrangeRed'
  node.style.display = 'inline'
}
