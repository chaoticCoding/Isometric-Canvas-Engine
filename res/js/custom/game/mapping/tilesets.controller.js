/**
 * Tilesets
 * @type {*|extend}
 ***/
var game = game || {};
game.maping = game.maping || {};

game.maping.Tilesets = (function(){
	var _Tilesets = {};

	console.log("Loading Tilesets");
	//
	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.map.getTilesets,
		//data: sData,
		success: function(rData) {
			for (var key in rData.tilesets) {
				if (rData.tilesets.hasOwnProperty(key)) {
					var obj = rData.tilesets[key];

					tData = obj.data;
					obj.tileData = [];

					//delete obj.data;
					for (var tile in tData) {

						obj.tileData[tData[tile].id] = tData[tile];
					}
					// TODO switch from g.
					obj.image = game.resources.newImage(obj.src, obj.Name);

                    _Tilesets[obj.id] = obj;

//					console.log("tilesets");
//					console.log(_Tilesets);
				}
			}

				//window.Error.log(this._Tilesets);

		},
		error:  function (xhr, ajaxOptions, thrownError){
			this.updateError(xhr.statusText, ajaxOptions, thrownError);
		},
	});

    function get(ID){
        return _Tilesets[ID];
    }
	/** TODO
	 * Return Public functions
	 */
	return{
        get: get,
	}
})();
