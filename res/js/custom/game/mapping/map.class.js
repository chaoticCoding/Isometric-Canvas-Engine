/**
 *
 * @returns {{}}
 * @constructor
 */
MapClass = function(id){
    /** TODO
     * Active Map ID if map id is passed set map _ID or just load map 1
     */
    var _ID = !isNaN(id) ? id : 1;

	/** TODO
	 * Current position on the map
	 */
	var MapPos = {
		x: 0,
		y: 0,
	};

	var me = "fuck uou!";

	/** TODO
	 * window size of map tiles to request
	 */
	var MapSize = {
		width: 25,
		height: 25,
	};

	/** TODO
	 * stores all loaded map defaults once loaded they don't need to be loaded again.
	 */
	var mapDefaults = {};

	/** TODO
	 * Storage for Active Map tile Data
	 */
	var mapData = {};

	var ready = false;
	/**
	 * Changes Active map, and updates position to default values.
	 * @param mapID
	 *
	 */
	if(!isNaN(id))
		changeMap(id);

	function changeMap(mapID){

		console.log("loading new Map");
		_ID = mapID;

		getmapDefaults();

        refreshMapData();

	}

	/** TODO
	 * returns the active maps default positional data
	 */
	function getmapDefaults(){
		// Post Data for map
		var sData = {
			ID: [ _ID ],

		};

		this.ready = false;

		$.ajax({
			method: 'POST',
			dataType: "json",
			url: actions.map.getMaps,
			data: sData,
			success: function(data) {
				mapDefaults = data.map;

				console.log("Maps loaded: " + sData.ID);
				//console.log(mapDefaults);

			},
			error:  function (xhr, ajaxOptions, thrownError){
				updateError(xhr.statusText, ajaxOptions, thrownError);
			},
		});
	}

	/** TODO
	 * Purges all existing map data then calls for new data
	 */
	function refreshMapData(){
		mapData = {}; // purges the existing map data
		appendMapData(); // calls request for map data

	}

	/** TODO
	 * updates existing map data with new information (for windowing) overwriting existing data when needed
	 */
	function appendMapData(){

		// gets Data for what area to draw
		var sData = {
			mapID:	_ID,

			xAxis:	MapPos.x,
			yAxis:	MapPos.y,

			width:	MapSize.width,
			height:	MapSize.height,

		};

		ready = false;

		$.ajax({
			method: 'POST',
			dataType: "json",
			url: actions.map.getMapData,
			data: sData,
			success: function(data) {
//				console.log("MapData loaded");
//				console.debug(data);

				if( data.map ) { // ensures some mapdata has been loaded
					// Total length of map data pre-storing the length boosts performance
					var ml = Object.keys(data.map).length;
					//var ml = data.map.length;

//					console.log("AJAX map Len: " + ml);

					var tMap = [];

					//mt currently itt of map data
					// Iterates over transmitted map data and converts the 1d array to a 3 position array, also inits the arrays as needed
					for(var mt = 0; mt < ml; mt++) {

						// makes sure that array spaces is available for new element, if not creates empty array
						if(typeof tMap[data.map[mt].layer] !== 'object'){
							tMap[data.map[mt].layer] = [];
						}

						// makes sure that array spaces is available for new element, if not creates empty array
						if(typeof tMap[data.map[mt].layer][data.map[mt].row]  !== 'object'){
							tMap[data.map[mt].layer][data.map[mt].row]  = [];
						}

						// loads map tile data into array position z,x,y.
						tMap[data.map[mt].layer][data.map[mt].row][data.map[mt].column] = data.map[mt];

					}

					var mll = tMap.length;

					var count = 0;
					// draw the lowest layer of tiles then build up
					for( var l = 0; l < mll; l++ ) {

						if(typeof  tMap[l] == 'object') { // check to make sure that there is not a null layer
							var mrl = tMap[l].length - 1; // width of world TODO add null protection

							//loops x backwards thought the tiles to draw them back to front
							for( var r = mrl; r > 0; r-- ) {
								var mcl = tMap[l][r].length - 1; // dept of the world TODO add null protection

								//loops y backwards thought the tiles to draw them back to front
								for( var c = mcl; c > 0; c-- ) {

                                    count++	;
								}
							}

						}
					}

					if(ml == count) { // good map load
						mapData = tMap;

						ready = true;
						game.maping.updateStatus(true)

						redraw = true;
						//draw(); //TODO-testing  remove when this is to kick off the draw function once before the main draw loop is runing
					}

				}

			},
			error:  function (xhr, ajaxOptions, thrownError){
				this.updateError(xhr.statusText, ajaxOptions, thrownError);
			},
		});
	}

	/**
	 *
	 ***/
	function update() {

	}

	/** TODO-Bug only draws a fix dept
	 *
	 ***/
	function draw( toCanvas) {

		if (ready == true) {

			var tilesetID = mapDefaults[_ID].tileset;
			var tileset = game.maping.Tilesets.get(tilesetID);

			// Map z Length
			var mll = mapData.length;

			//TODO Replaces hard limits with min and max boundries
			//Window.game.Boundaries.maxColumn.c
			// draw the lowest layer of tiles then build up
			for ( var l = 0; l < mll; l++ ) {
				if ( typeof  mapData[l] == 'object' ) { // check to make sure that there is not a null layer
					// Map row Length
					var mrl = mapData[l].length - 1; // width of world

					//loops x backwards thought the tiles to draw them back to front
					for ( var r = mrl; r > 0; r-- ) {
						if ( typeof  mapData[l][r] == 'object' ) { // check to make sure that there is not a null layer
							//Map y Length
							var mcl = mapData[l][r].length - 1; // dept of the world TODO add null protection

							//loops y backwards thought the tiles to draw them back to front
							for (var c = mcl; c > 0; c--) {
								if ( typeof  mapData[l][r][c] == 'object' ) { // check to make sure that there is not a null layer
									// get the Tile we are currently working with
									var map_tile = mapData[l][r][c]; // current map tile

									var cur_tile = tileset.tileData[map_tile.type]; // current tileset tile

									var draw = addOffset(TranslateMatrixToPixel(r, c, cur_tile.width, cur_tile.length), game.core.Offset, game.core.Offset);

									drawImageByCenter(toCanvas, game.resources.getImage(tileset.image), draw.x, draw.y, cur_tile.offsetWidth, cur_tile.offsetLength, cur_tile.width, cur_tile.length);
								}
							}
						}
					}
				}

			}

			return true; // Draw as been completed returns true

		} else {

			return false; // Draw was skipped return false

		}
	}

	/** TODO
	 * return Public Functions
	 */
	return{
        draw: draw,
        update: update,
        changeMap: changeMap,

	}

};