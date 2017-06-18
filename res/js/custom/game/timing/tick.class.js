/**
 * Basic counter class
 * @param max
 * @returns {{rate: rate, udpate: update, reset: reset}}
 */

var tickClass = function(max){
	var _Tick = 0;
	var _Max = max;

	function update(){
		if(_Tick >= _Max)
			_Tick = 0;

		//console.log(_Tick, _Max);

		return ++_Tick;
	}

	function rate(){
		return _Tick;
	}

	function reset(){
		_Tick = 0;
	}

	return {
		rate: rate,
		udpate: update,
		reset: reset

	}

}