var solver = require('beezy')
var touchdown = require('touchdown')
var findPos = require('./findPosition')

module.exports = function(p){
  var parEl = parent(p.el)
  var curves = p.value 
  var canvas = canv()//document.createElement('canvas')
  parEl.appendChild(canvas)
  
  var draw = function(){
    var ctx = canvas.getContext('2d')
    var solve = solver(curves)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.moveTo(0, canvas.height)
    ctx.beginPath()
    ctx.translate(.5, .5)
    ctx.lineWidth = 5
    ctx.lineColor = 'yellow'
    for(var x = 0; x < canvas.width; x+=1 ){
      var s = solve( x / canvas.width)
      ctx.lineTo(s[0] * canvas.width, (1 - s[1]) * canvas.height)
    }
    ctx.stroke()
  }
  var dots = []

  var done = false
  donce()

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
      console.log(e)
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
          var dot = handle(e, canvas.pos, i)
          touchdown.start(dot)
          dot.addEventListener('touchdown', function(){
            document.body.style.cursor = 'none'
          })
          dot.addEventListener('liftoff', function(){
            document.body.style.cursor = 'pointer'
          })
          dot.addEventListener('deltavector', function(e){
            window.requestAnimationFrame(function(){
              dot.style.left = e.detail.x - pas[0]  + window.scrollX - 15 + 'px'
              dot.style.top =  e.detail.y - pas[1]  + window.scrollY - 15 + 'px'
              curves[i][0] = (e.detail.x  - (canvas.pos[0] - window.scrollX)) / canvas.width
              curves[i][1] = (canvas.height - e.detail.y + (canvas.pos[1] - window.scrollY)) / canvas.height
              draw()
            })
          })
          parEl.appendChild(dot)
        })(e, i)
      })
    
    
    }, 10)
  }

  return parEl

  function parent(el){
    var node = el || document.createElement('div')
    var $ = node.style
//    $.width = 400 + 'px'
//    $.height = 244 + 'px'
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
    node.width = parseFloat(window.getComputedStyle(parEl).width)
    $.width  = node.width + 'px'
    node.height = parseFloat(window.getComputedStyle(parEl).height)
    $.height = node.height + 'px'
    //$.border = '3px solid black'
    $.boxSizing = 'border-box'
    $.backgroundColor ='#eee'
    $.backgroundImage = 'linear-gradient(45deg, gray 25%, transparent 25%, transparent 75%, gray 75%, gray), linear-gradient(45deg, gray 25%, transparent 25%, transparent 75%, gray 75%, gray)'
    $.backgroundSize='30px 30px'
    $.backgroundPosition = '0 0, 15px 15px'

    return node

  }

  function handle(vec, pos, i){

    var c = ['red', 'green', 'yellow', 'blue']
    var node = document.createElement('div')
    var $ = node.style
    var r = 15
    node.classList.add('handle')
    $.height = $.width = r+'px'
    $.position = 'absolute'
    $.border = '3px solid black'
    $.background = c[i] 
    $.borderRadius = '50% 50%'
    $.zIndex = '100'
    var pas = findPos(parEl)
    console.log(pas, parseInt(canvas.height))
    $.left = vec[0] * parseInt(canvas.width) - r + 'px'
    $.top = (1 - vec[1]) * parseInt(canvas.height) - r +  'px'
    return node

  }

}


