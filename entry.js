var paramify = require('./')

var params = {

    x : {
	value: 0,
	type: 'float',
	interval: .01,
	min: 0,
	max: 1
    },
    y : {
	value: 100,
	tpye: 'integer',
	interval: 1,
	min: 1,
	max: 101
    }
}

params = paramify(params)

setInterval(function(){
    for(var z in params){
	console.log(params[z])
    }
},1001)
