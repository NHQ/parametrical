var solver = require('../beezy')
var touchdown = require('../touchdown')
var findPos = require('./findPosition')

module.exports = function(p){
  var curves = p.value
  var canvas = canv()//document.createElement('canvas')
  var parEl = parent()

  parEl.appendChild(canvas)
  
  var draw = function(){
    var ctx = canvas.getContext('2d')
    var solve = solver(curves)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.moveTo(0, canvas.height)
    ctx.beginPath()
    for(var x = 0; x < canvas.width; x+= 1){
      ctx.lineTo(x, (1 - solve( x / canvas.width)) * canvas.height)
    }
    ctx.stroke()
  }
  var dots = []

  var done = false

  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(e){
          console.log(e)
      if(e.type === 'childList') {
        if(e.addedNodes[0] == parEl) {
          observer.disconnect()
          donce()
        }
      }
    })
  })

  //observer.observe(document.body, {childList: true})

  observeDown(document.body, parEl, function(el){
    console.log(el)
  })

  function observeDown(pa, el, cb){
    var obs = new MutationObserver(function(mutations){
      mutations.forEach(function(e){
        donce()
      })
    })
    obs.observe(pa, {childList: true})
  }

  function donce(){
    if(done) return
    done = true
    canvas.pos = findPos(canvas)
    draw()
    var pas = findPos(parEl)
    setTimeout(function(){
    
      curves.forEach(function(e, i){
        ;(function(e, i){
          canvas.pos = findPos(canvas)
          var dot = handle(e, canvas.pos)
          touchdown.start(dot)
          dot.addEventListener('touchdown', function(){
            document.body.style.cursor = 'none'
          })
          dot.addEventListener('liftoff', function(){
            document.body.style.cursor = 'pointer'
          })
          dot.addEventListener('deltavector', function(e){
            window.requestAnimationFrame(function(){
              dot.style.left = e.detail.x - pas[0]  + window.scrollX - 6 + 'px'
              dot.style.top =  e.detail.y - pas[1]  + window.scrollY - 6 + 'px'
              console.log(e.detail.offsetX)
              curves[i][0] = (e.detail.x  - (canvas.pos[0] - window.scrollX)) / canvas.width
              curves[i][1] = (canvas.height - e.detail.y + (canvas.pos[1] - window.scrollY)) / canvas.height
              draw()
              console.log(curves[i])
            })
          })
          parEl.appendChild(dot)
        })(e, i)
      })
    
    
    }, 1000)
  }

  return parEl

  function parent(){
    var node = document.createElement('div')
    var $ = node.style
    $.width = 400 + 'px'
    $.height = 244 + 'px'
    $.border = '3px solid black'
    $.display = 'inline-flex'
    $.alignItems =  'center'
    $.justifyContent = 'center'
    $.boxSizing = 'border-box'
    $.position = 'relative'
    return node
  }

  function canv(){
    var node = document.createElement('canvas')
    var $ = node.style
    node.width = 244
    $.width  = node.width + 'px'
    node.height = 122
    $.height = node.height + 'px'
    $.border = '3px solid purple'
    $.boxSizing = 'border-box'
    $.background = 'green'
    //$.position = 'absolute'
    //$.left = 22 + 'px'
    //$.top = 66 + 'px'
    return node

  }

  function handle(vec, pos){
    var node = document.createElement('div')
    var $ = node.style
    $.height = $.width = '12px'
    $.position = 'absolute'
    $.background = 'hsla(317, 90%, 30%, 1)'
    $.borderRadius = '50% 50%'
    $.zIndex = '100'
    $.boxSizing = 'border-box'
    $.cursor = 'pointer'
    var pas = findPos(parEl)
    $.left = vec[0] * canvas.width + pos[0] - pas[0] - 6 + 'px'
    $.top = pos[1] + canvas.height - canvas.height * vec[1] - pas[1] - 6 +  'px'
    console.log($.top)
    return node

  }

}


