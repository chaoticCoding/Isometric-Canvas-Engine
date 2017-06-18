/**
 * canvas
 ***/
var canvasClass = function(id){
	var _Canvas  = {};
	var _Context = {};
	var _Rect	 = {};

	var _Width = 0;
	var _Height = 0;

	// if ID has been defined then load canvas from ID
	if(typeof id !== 'undefined') {

		loadCanvas(id);
	}


	/**
	 * Creates a new Canvas Class/Object for use
	 * @param id
	 */
	function create(id, show){
		_Canvas = document.createElement('canvas');
		_Canvas.id = id;

		attachContexts();

		if(show){

			var tmp = document.getElementById('canDebug');
			tmp.appendChild(_Canvas);
		}

		console.log("New canvas:" + _Canvas.id);



	}

	/**
	 * loads a existing canvas into the canvas system
	 * @param id
	 */
	function loadCanvas(id){
		if(typeof id === 'object'){
			_Canvas = id;
			console.log("loaded canvas:" + _Canvas.id);
		} else {

			_Canvas = document.getElementById(id);
			console.log("loaded canvas:" + _Canvas.id);

		}
		attachContexts();
	}

	/**
	 * Registers the Canvas Context and Client objects
	 */
	function attachContexts(){

		_Context = _Canvas.getContext('2d');
	//	console.log("loaded context:" + _Context);

		_Rect = _Canvas.getBoundingClientRect();
	//	console.log("loaded Canvas bounding Rect:" + _Rect);
	}

	/**
	 * Resizes canvas
	 * @param width
	 * @param height
	 */
	function Resize( w, h ){

		_Width = w;
		_Height = h;
		_Canvas.width = _Width;
		_Canvas.height = _Height;
		_Canvas.style.width = _Width + "px";
		_Canvas.style.height = _Height + "px";

	}

	/**
	 * Clears content from canvas
	 ***/
	function clear(){
		_Context.clearRect (0, 0, _Width, _Height);
	}

	/**
	 * Functions for returning size of canvas
	 * @returns {number}
	 * @constructor
	 */
	function Width(){
		return _Width;
	}

	function Height(){
		return _Height;
	}

	function Canvas(){
		return _Canvas;
	}

	function Context(){
		return _Context;
	}

	// Returns Public functions
	return{
		create: create,
		loadCanvas: loadCanvas,
		Width: Width,
		Height: Height,
		Resize: Resize,
		clear: clear,

		Canvas: Canvas,
		Context: Context,

	}
};