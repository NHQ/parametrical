module.exports = function(){

  var raf = window.requestAnimationFrame

  var call = null

  function caller(time){
    if(call) call(time)
    raf(caller)
  }

  raf(caller)

  return function(fn){
    call = fn
  }
}

