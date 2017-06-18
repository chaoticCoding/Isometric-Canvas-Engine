/**
 * Init function for adding listener events and setup routing to the event handler function
 ***/
var EntityClass = function(id, r, c, s){
	// Poejcts ID in Entities array
	var _ID =	0;

	/**
	 * Current location in the tile map Row, Column, zLayer
	 ***/
	var tile = {
		r:	0,
		c:	0,
		l:	0
	};

	/**
	 * Entity position to move to
	 ***/
	var toTile = {
		r:	0,
		c:	0
	};

	/**
	 * Current Position of Entity in pixel
	 ***/
	var Pos = {
		x:	0,
		y:	0
	};

	/**
	 * Entity position to move to
	 ***/
	var toPos = {
		x:	0,
		y:	0
	};

	/**
	 * physical size of objects
	 * @type {{width: number, height: number, mass: number}}
	 */
	var size = {
		width:	64,
		height:	32,
		mass: 0,
	};

	var health = {
		current: 200 ,
		max: 200
	}


	// vector and velocity information, need work on breaking forces
	var velocity = 0; // current speed
	var rotation =	0; // in radians
	var acceleration =	0.001; // rate of speed increase per cycle
	var maxSpeed = 1.5; // maximum speed
	var minSpeed = 0.001; // minimun speed this entity can travel at
	var slowDistance = 5;

	// Animation
	var Animation = {
		moving: false,

		cellIndex: 1,
		cells: 60,

		framesPerCell: 5,
	};

	// Settings for Entity out size of positional and vector
	var settings = {};

	// String of all spawn information used to verify object or to clone new copy
	var spawnInfo = {};

	// last update of positional data
	var lastUpdate = new Date;

	// Sprite information
	var Sprite = {};

	// type of entity
	var type =	0;

	// can this collide with objects
	var collides =	0;

	//
	var _Dead =	false;
	var markForDeath = false;

	var _Debug = false;

	/**
	 * Init function
	 *
	 * @param x
	 * @param y
	 * @param settings
	 ***/
	init(id, r, c, s);

	function init(id, r, c, s) {
		_ID = id;

		tile.r = r;
		tile.c = c;

		Pos = TranslateMatrixToPixel(tile.r, tile.c, 64, 32);

		MergSettings(s);

		lastUpdate = game.core.Timer.Now();

		spawnInfo = JSON.stringify(s);

	}

	function NextFrame(){
		if ( Animation.cellIndex <= Animation.cells  ){
			if((game.core.fTick.rate() % Animation.framesPerCell) < 1)
				Animation.cellIndex++;
		}else{

			Animation.cellIndex = 1;
		}

		return 	Animation.cellIndex ;
	}

	function MergSettings(s){
		// push loaded settings into setting array, this over writes existing values
		settings = s;

		/*var settings = {
			imagePath: "res/imgs/units/wyvern_fire.png",
			imageID: game.resources.newImage("res/imgs/units/wyvern_fire.png", "wyvern_fire"),cells: 7,
			cells: 7,
		 	framesPerCell: 3,
			rotations: 8,
			Width: 250,
			Height: 250,
			slowDistance: 50,
			accel:.002,
			MaxSpeed: 5.

		};*/

		size.height = s.Height;
		size.width = s.Width;
		size.mass = s.mass;

		acceleration = s.accel;
		slowDistance = s.slowDistance;
		maxSpeed = s.MaxSpeed;

		Animation.cells = s.cells;
		Animation.framesPerCell = s.framesPerCell;

	}

	/**
	 * call for data update does not redraw the screen
	 * @param timeNow
	 */
	function update(timeNow) {
		if(markForDeath == true){
			kill();

		}

		if(Animation.moving !== true){
			//TODO temp function to test entity movement
			var nMove = {
				r: Random(1, 25),
				c: Random(1, 25)
				//r: 10,
				//c: 10
			};

			Move(nMove.r, nMove.c );

		}

	}

	/** TODO may need additional work because objects can slow down way too much too early
	 *
	 * @param newPos
	 */
	function Step(timeNow) {
		var delta = timeNow - lastUpdate;

		if(Animation.moving == true) {

			var distance = getDistance(Pos,toPos);

			//console.log( distance);

			if(slowDistance < distance) {
				if (velocity < maxSpeed) {
					velocity += acceleration;
				}
			} else {
				velocity -= (acceleration);
				velocity = velocity < 0.0001 ? 0.0001 : velocity;
			}

			var displacement = velocity * delta;

			if ((toPos.x != Math.round(Pos.x)) || (toPos.y != Math.round(Pos.y))) {


				var move = distance < displacement ? distance : displacement;

				Pos = moveAlongAngel(Pos.x, Pos.y, move, rotation);

			} else {
				stopAnimation()


			}
		}

		lastUpdate = timeNow;
	}

	/**
	 * Entity has become stationary
	 */
	function stopAnimation(){
		tile = toTile;
		Pos = toPos;
		velocity = 0;
		Animation.moving = false;
	}

	/**
	 * Entity should start moving to tile(r,c)
	 * @param r
	 * @param c
	 * @constructor
	 */
	function Move(r, c){
		// Updates where Entity is heading// TODO this should be sent back to the server
		toTile.r = r;
		toTile.c = c;

		// sets pixel position of where entity is headed
		toPos = TranslateMatrixToPixel(toTile.r, toTile.c, 64, 32);

		// TODO testing rotation based on tile information
		//rotation = getAnglefromTile(tile, toTile);

		// gets pixel rotation that the entity is headed in
		rotation = getAnglefromPixel(Pos, toPos);

		Animation.moving = true;
	}

	/** TODO
	 * teleport entity to new position
	 ***/
	function Teleport(r, c, l) {

	}

	/** TODO
	 *
	 ***/
	function draw(toCanvas, timeNow) {
		Step(timeNow);

		var tmpPos = addOffset(Pos, game.core.Offset);

//	rotation = getAnglefromPixel(tmpPos, game.core.MousePos());

		var frame = size.width * NextFrame();
		var orientation = findSlice(8, rotation) * size.height;

//		if (_Debug == true)
//		if(orientation == 1)
//			console.log(id, frame, findSlice(8, rotation), rotation);

		drawBounding(toCanvas, tmpPos, size.width, size.height, rotation);

		drawImageByCenter(
			toCanvas,
			game.resources.getImage(settings.imageID),
			tmpPos.x,
			tmpPos.y,
			frame,
			orientation,
			size.width,
			size.height
		);

		drawHeathBar(toCanvas,tmpPos.x,tmpPos.y,size.width,health.current,health.max);

	}

	/** TODO
	 *s
	 ***/
	function kill() {

	}

	/** TODO
	 *
	 ***/
	function destroy() {

	}


	function Debug(d){
		if(typeof d != "undefined")
			_Debug = d;

		return d;
	}

	return {
		init: init,
		update: update,
		Step: Step,
		Move: Move,
		draw: draw,
		kill: kill,
		destroy: destroy,
		Teleport: Teleport,
		Debug: Debug,

	}
};
