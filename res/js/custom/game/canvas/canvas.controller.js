/***
 *
 * Controllers for requesting Animation Frames from different browsers
 *
 * Developed by Shawn Palmer, Chaotic Coding
 ***/
var game = game || {};

game.canvases = (function(){
	var _Canvases = {};

	// Global size properties
	var Width = 800;
	var Height = 800;

	var _NextID = 0;

	console.log("new Canvas controller");

	/**
	 *
	 * @param id
	 * @param show
	 * @returns {*}
	 * @constructor
	 */
	function New(id, show){
		var cID = NextID();

		_Canvases[cID] = new canvasClass();
		_Canvases[cID].create(id, show);

		return _Canvases[cID];

	}

	/**
	 *
	 * @param id
	 * @returns {*}
	 * @constructor
	 */
	function Register(id){
		var cID = NextID();
		_Canvases[cID] = new canvasClass(id);
		return _Canvases[cID];
	}

	/**
	 *
	 * @param w
	 * @param h
	 * @constructor
	 */
	function Resize(w, h){

		//updates the controllers sizes
		Width = !isNaN(w) ? w : 800;
		Height = !isNaN(h) ? h : 800;

		// loops thought each element and resizes them
		for (var c in _Canvases){
			if(_Canvases.hasOwnProperty(c))
				_Canvases[c].Resize(Width, Height);
		}

	}

	/**
	 *
	 * @returns {number}
	 * @constructor
	 */
	function NextID(){
		return ++_NextID;
	}

	/**
	 * Returns public functions
	 */
	return {
		New: New,
		Register: Register,
		Resize: Resize,

		Width: Width,
		Height: Height,
	}

})();