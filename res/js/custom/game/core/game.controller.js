/*
* Core object for game
***/
var game = game || {};

window.game = game;

game.core = (function( ) {

	console.log("game load");

	/** TODO
	 * game framerate metrics
	 ***/
	var fps = new rateClass();
	var fTick = new tickClass(60);

	/** TODO
	 * game clockrate metrics
	 ***/
	var tps = new rateClass();

	/**
	 * Game frame clock
	 * @type {TimerClass}
	 */
	var Timer =	new TimerClass();
	/**
	 * drawing screen offset
	 ***/
	var Offset = {
		x: -50,
		y: -50,
	};

	/** TODO
	 * map location info
	 ***/
	var map = {
		/**
		 *
		 ***/
		Pos: {
			x: 0,
			y: 0,
		},

		/**
		 *
		 ***/
		size: {
			width: 25,
			height: 25,
		}
	};

	// the active boundaries of a visible world
	var Boundaries = {};

	/**
	 *
	 ***/
	var isFullscreen = false;
	var isVisable = true;

	/**
	 * storage for game
	 ***/
	var Resources =	{};
	var Canvas = {};

	var Runc = 0;

	var obj = {};

	var redraw = true;
	/**
	 * Initializes game object and fills in the defaults
	 ***/
	function init(canvas){
		Runc = 0;
		console.log("Starting Game Engine");

		Canvas = game.canvases.Register(canvas);

		game.maping.init();
		game.Entities.init();

		//this.Entities = new EntityController(this);

		Timer = new TimerClass();

		//this.Resources = new resourcesClass(this);
		//this.grids = new gridsClass(this);

		game.Input.initKeyboard();
		game.Input.initMouse();
		//game.Input.initWindow();


		var cWidth = 	game.canvases.Width;
		var cHeight = 	game.canvases.Height;

		var cwCenter = cWidth / 2;
		var chCenter = cHeight / 2;

		slideViewport(cwCenter, 0);

		identifyBoundaries();
	}

	/**
	 *
	 ***/
	function setup(){

		game.maping.setup(1);
		game.Entities.setup();


		//game.Input.bind(this.Input.KEY.M, this.Input.ACTIONs.KeyDOWN, jQuery.proxy(function(){console.log(this.Maps);}, this));

		// full screen bindings
		game.Input.bind(game.Input.KEY.F, game.Input.ACTIONs.KeyUP, function(){
			if(isFullscreen){
				isFullscreen = false;

				document.webkitExitFullscreen();

			} else {
				isFullscreen = true;

				Canvas.Canvas().webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome

			}
			resize();
		});



		//binding for controlling mapPosition
		game.Input.bind(game.Input.KEY.UP_ARROW,	game.Input.ACTIONs.KeyDOWN,function(){
			slideViewport(0, 5);

			identifyBoundaries();

			return false;
		});
		game.Input.bind(game.Input.KEY.DOWN_ARROW,	game.Input.ACTIONs.KeyDOWN, function(){
			slideViewport(0, -5);

			identifyBoundaries();

			return false;
		});
		game.Input.bind(game.Input.KEY.LEFT_ARROW,	game.Input.ACTIONs.KeyDOWN, function(){
			slideViewport(5, 0);

			identifyBoundaries();

			return false;
		});
		game.Input.bind(game.Input.KEY.RIGHT_ARROW,	game.Input.ACTIONs.KeyDOWN, function(){
			slideViewport(-5, 0);

			identifyBoundaries();

			return false;
		});

		// binding for controlling map ZOOM
		/*this.Input.bind(this.Input.KEY.ADD,			this.Input.ACTIONs.KeyDOWN, jQuery.proxy(function(){
		 this.zoom += 0.1;
		 }, this));
		 this.Input.bind(this.Input.KEY.SUBSTRACT,	this.Input.ACTIONs.KeyDOWN, jQuery.proxy(function(){
		 this.zoom += -0.1;
		 }, this));*/

		game.canvases.Resize(800,800);

	}

	/**
	 * function for moving the viewport a few pixels, Triggers Redraw
	 * @param x
	 * @param y
	 ***/
	function slideViewport(x, y){

		// updates offset
		Offset.x += !isNaN(x) ? x : 0;
		Offset.y += !isNaN(y) ? y : 0;

		//triggers redraw
		redraw = true;

	}

	/**
	 * function for moving viewport to a new area, Triggers Redraw
	 * @param x
	 * @param y
	 */
	function moveViewPort(x, y){

		// updates offset
		Offset.x = x;
		Offset.y = y;

		//triggers redraw
		redraw = true;

	}

	/** TODO doesn't always get the Height correct on full screen
	 * resize game canvas with to fill space
	 ***/
	function resize(){
		console.log("Canvas resizing");

		if(isFullscreen) {
			var w = $(window).width();
			var h = $(window).height();

		} else {
			w = Canvas.Canvas().parentNode.offsetWidth;
			h = Canvas.Canvas().parentNode.offsetHeight

		}
		game.canvases.Resize(w,h);

		redraw = true;

		console.log("h:" + h +  ", w:" + w);

	};

	/**
	 *
	 ***/
	function startAni(){
		console.log("Starting Animations");

		run(0);
		draw(Timer.getSeconds());

	};

	/**
	 * main game loop
	 ***/
	function run(){
		update();

		setTimeout(function(){
			if(isVisable === true)
				run();

		}, 1);
	}

	/**
	 * function for updating in game objects before drawing on to the screen
	 ***/
	function update(){
		Timer.update();

		tps.tick(); // Clockrate Ticks
		var yd = 0;
		var xd = 0;

		// TODO Test code for cursor & Loation tracking
		// if mouse is off canvas
		if (game.Input._Mouse.target != "CANVAS") {

			// Limits mouse area to canvas
			if(Canvas.Canvas().offsetTop > game.Input._Mouse.y){
				yd = 0;
			}else if((Canvas.Canvas().offsetTop + Canvas.Height() + window.pageYOffset) < game.Input._Mouse.y ){
				yd = Canvas.Height();
			}else{
				yd = game .Input._Mouse.y - Canvas.offsetTop; // - window.pageYOffset;
			}

			if(Canvas.Canvas().offsetLeft > game.Input._Mouse.x){
				xd = 0;
			}else if(( Canvas.Canvas().offsetLeft + Canvas.Width() + window.pageXOffset) < game.Input._Mouse.x){
				xd = Canvas.Width();
			}else{
				xd = game.Input._Mouse.x - Canvas.Canvas().offsetLeft; // - window.pageXOffset;
			}

		} else {
			xd =	game.Input._Mouse.x;
			yd =	game.Input._Mouse.y;
		}


		var tmp = {
			x:		xd,
			y:		yd,
			size:	5,
			rad:	2 * Math.PI,
		};
		// end test function

		obj = tmp;

		game.Entities.update( Timer.Now() );

		//this.entities[0].update(this.context);

	}

	/**
	 * function for draw in game objects to screen
	 ***/
	function draw(){
		// Updates counters
		Timer.update(); fTick.udpate(); fps.tick();

	// Clears canvas
		Canvas.clear();

		// Requests maps to be drawn do this before anything else!
		redraw = !game.maping.draw(Canvas, Timer.Now(), redraw);

		game.Entities.draw(Canvas, Timer.Now(), redraw);

		// Fills in Game info
		Canvas.Context().fillStyle = '#000000';
		Canvas.Context().font = '14px sans';
		Canvas.Context().fillText ("Run Time: " + (Timer.getRunTime()) , 10, 20);;
		Canvas.Context().fillText ("x: " +  game.Input._Mouse.x + ", y:" + game.Input._Mouse.y , 10, 40);
		Canvas.Context().fillText ("xOffset: " +  Offset.x + ", yOffset:" + Offset.y , 10, 60);
		Canvas.Context().fillText ("tps: " + tps.rate() + ", fps: " + fps.rate() , 10, 80);

		Canvas.Context().fillText ("min Row: " + Boundaries.minRow + ", Col: " + Boundaries.minColumn , 10, 100);
		Canvas.Context().fillText ("max Row: " + Boundaries.maxRow + ", Col: " + Boundaries.maxColumn , 10, 120);

		Canvas.Context().beginPath();
		Canvas.Context().arc(obj.x, obj.y, obj.size, 0, obj.rad, false);
		Canvas.Context().fillStyle = 'red';

		Canvas.Context().lineWidth = 1;
		Canvas.Context().strokeStyle = '#003300';
		Canvas.Context().stroke();

		Canvas.Context().fill();


		// Requests browser to draw next frame based on browser calcs for 59-60 frames per second
		window.requestAnimationFrame(function(){
			if(isVisable === true)
				draw();
		});

	};

	function MousePos(){
		return{
			x: obj.x,
			y: obj.y
		}
	}
	/**
	 * Identify Boundaries
	 */
	function identifyBoundaries(){
		tmp = {
			minColumn: TranslatePixelToMatrix(0, 0, 64, 32,  Offset.x, Offset.y).c,
			maxRow: TranslatePixelToMatrix(Canvas.Height , 0, 64, 32,  Offset.x, Offset.y).r,
			minRow:	TranslatePixelToMatrix(0, Canvas.Width, 64, 32,  Offset.x, Offset.y).r,
			maxColumn:	TranslatePixelToMatrix(Canvas.Height, Canvas.Width, 64, 32,  Offset.x, Offset.y).c,
		};

		// Prevents negative tiles because they will never exist
		tmp.minColumn = tmp.minColumn > 0 ?  tmp.minColumn : 0;
		tmp.maxRow = tmp.maxRow > 0 ?  tmp.maxRow : 0;
		tmp.minRow = tmp.minRow > 0 ?  tmp.minRow : 0;
		tmp.maxColumn = tmp.maxColumn > 0 ?  tmp.maxColumn : 0;

		Boundaries = tmp;
	}

	/** TODO
	 * Function for registering init hooks
	 * @param t
	 * @constructor
	 */
	function RegisterInit( t ){

	}

	/**
	 * Changes the visability of the game
	 * @param status
	 * @returns {boolean}
	 */
	function visibility(status){
		if(typeof status === 'boolean')
			isVisable = status;

		return isVisable;
	}

	/**
	 * Returns Public functions
	 */
	return {
		init: init,
		setup: setup,
		startAni: startAni,

		MousePos: MousePos,
		Offset: Offset,

		Timer: Timer,
		visibility: visibility,

		slideViewport: slideViewport,
		identifyBoundaries: identifyBoundaries,

		tps: tps,
		fps: fps,
		fTick: fTick,

	}


})();

