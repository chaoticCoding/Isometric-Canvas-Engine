
var game = game || {};

game.Entities = (function(){

	// last id used. should always be greater then 0.
	var _lastId = 0;

	//typing?
	var types = {
		map: 0,
		objects: 1,
		buildings: 2,
		creatures: 3
	};

	var Actions ={
		maps:{

		},
		objects:{

		},
		buildings:{

		},
		creatures:{
			hover: 0,


		}
	}

	// storage to all entites
	var _Entities = {};

	/**
	 *
	 */
	function init(){
		console.log("Starting Entity Controller");

	}

	function setup(){
		var tID = game.resources.newImage("res/imgs/units/wyvern_fire.png", "wyvern_fire");

		var settings = {
			imagePath: "res/imgs/units/wyvern_fire.png",
			imageID: tID,
			cells: 7,
			framesPerCell: 6,
			rotations: 8,
			Width: 256,
			Height: 256	,
			slowDistance: 5,
			accel: .002,
			MaxSpeed: 5,
			mass: 5000,

		};

	var te = 0;

		tmp[te++] = New(10, 10, settings);
		tmp[te++] = New(5, 5, settings);


	}

	/**
	 *
	 * @returns {number}
	 */
	function nextID(){

		return ++_lastId;
	}

	/**
	 *
	 * @param Entity
	 */
	function New(tr, tc, settings){
		var eID = nextID();

		_Entities[eID] = new EntityClass(eID, tr, tc, settings);

		return _Entities[eID];
	}

	/** TODO
	 *
	 * @param Entitiy
	 */
	function register(id, Entitiy){

	}

	/** TODO
	 *
	 */
	function draw(toCanvas, timeNow ){
		//TODO
		// loops thought each element and request they draw
		for (var e in _Entities) {
			if(_Entities.hasOwnProperty((e)))
				_Entities[e].draw(toCanvas, timeNow );
		}
	}

	/**
	 *
	 */
	function update(timeNow){
		// loops thought each element and request they update

		for (var e in _Entities) {

			_Entities[e].update(timeNow);
		}
	}

	return{
		init:init,
		setup:setup,
		New:New,
		register:register,
		draw:draw,
		update:update,

	}

})();

