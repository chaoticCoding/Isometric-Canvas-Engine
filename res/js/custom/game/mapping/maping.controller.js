//------------ Map class ------------
/**
* Core functions for world mapping
***/

var game = game || {};

game.maping = (function(){
	console.log("Creating New Mapping system");

	// is the map class ready
	var ready = false;

    /** TODO
     * Available maps for fast switching
     */
	var _Maps = {};
    var aID = 1; // Active Map ID

	// Tileset Storage
	//var _Tilesets = {};

	var _ShadowMap = {};

	// canvas for storing pre-drawn map
	function init() {
		_ShadowMap = game.canvases.New("ShadowMap", false); // Set to true for testing-
		console.log("Map init");
		console.log(_ShadowMap);
	}
    /** TODO
     *
     * @param id
     ***/
	function setup(id) {
        aID = id;
		console.debug("loading map: " + aID);

        _Maps[aID] = new MapClass(aID);

		//this.updateMapPos();
		//this.requestMapData();
	}

    /** TODO
     * requst all maps to repull data / posibly out of sync
     ***/
	function requestMapData() {

	}

    /** TODO move looping code into mapObject
     *
     ***/
	function update() {
		/*var lzc = this.layers.length;
		
		// draw the lowest layer of tiles then build up
		for(var z = 0; z < lzc; z++) {
			if(this.layers[z]) {
				var lxc = this.layers[z].length-1;

				//loops x backwards thought the tiles to draw them back to frount
				for(var x = 1; x < lxc; x++) {
					var lyc = this.layers[z][x].length-1;
					
					//loops y backwards thought the tiles to draw them back to frount
					for(var y = 1; y < lyc; y++) {


					}
				}	
			}
		}*/
	}

    /** TODO move looping code into mapObject
     *
     ***/
	function draw(mainContext, timeNow, redraw) {
		var t = true;

		if (redraw) {
			_ShadowMap.clear();
//TODO don't send proerities seperatly
			t =  _Maps[aID].draw(_ShadowMap);

		}else {
		}

		mainContext.Context().drawImage(_ShadowMap.Canvas(), 0, 0);

		return t;

	}

    /** TODO
     *
     * @param data
     ***/
	function updateMap(data) {

	}

    /** TODO
     *
     * @param statusText
     * @param ajaxOptions
     * @param thrownError
     ***/
	function updateError(statusText, ajaxOptions, thrownError) {
		actions.Debug(statusText);
		actions.Debug(ajaxOptions);
		actions.Debug(thrownError);
	}

	function updateStatus(status){
		ready = status;
	}
	/** TODO
	 * Returns Public functions
	 */
	return {
		init: init,
		setup: setup,
        update: update,
		updateStatus: updateStatus,
        draw: draw,

		_ShadowMap:_ShadowMap,

        updateMap: updateMap,
	};

})();

