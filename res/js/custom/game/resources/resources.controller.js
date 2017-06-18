/**
* Resource Manager class
***/
var game = game || {};

game.resources = (function(){
	console.log("Starting resources handler");

	// Container for file types we know how to handle
	var fileTypes =	{
		images:  ["jpg", "jpeg", "png", "gif"],
		sounds: ["mp3", "ogg", "wav"]
	};

	// Hook container for all loaded files
	var files ={
		images: {},
		sounds: {},
	};

	// Container for future IDstorage
	var next = {
		image: 0,
		sounds: 0,
	};

	// status of all files can be used as a fast check for loading
    var loaded = false;

	/**
	 * returns the next ID for a given file type
	 * @param type
	 * @returns {number}
	 */
    function nextID(type){
	    return ++next[type];
    }

    /**
	 * new resource for unknown file type
	 * @param obj
	 ***/
	function newObject( obj ){
		obj.extention = getExtentionfromURL( obj.url );
		obj.name = getNamefromURL( obj.url );

		// Handle as image
		if(fileTypes['images'].indexOf( obj.extention ) != -1) {
			files['images'][obj.name] = new imageClass( obj );
			console.log("new img: " + obj.url);

		// Handle as sound
		}else if(fileTypes['sounds'].indexOf( obj.extention ) != -1){
			files['sound'][name] = new soundClass( obj.url );
			console.log("new sound: " + obj.url);

		// No handler for file type
		}else{
			console.warn("no handler for file :" + obj.url);
			
		}
		
	}

	/**
	 * loads new image into objects
	 *
	 * @param path
	 * @returns {*}
	 */
	function newImage( Path , Name){
		var tmp = {
			ID: nextID("image"),
			url: Path,
			name: Name,

		};

		files['images'][tmp.ID] = new imageClass(tmp);

		return tmp.ID;
	}

	/**
	 * retrieves image from files array
	 *
	 * @param id
	 * @returns {null|Image}
	 */
	function getImage( id ){
		return files['images'][id].img;
	}

	/**
	 * Returns the image object from the name
	 * @param name
	 * @returns {imageClass.img|*}
	 */
	function getImageByName ( name ){
		for(i in files['images']){
			if( files['images'].hasOwnProperty( i ) ){
				if( files['images'][id].name == name){
					return  files['images'][id].img;
					break;
				}
			}
		}
	}

	/** TODO Untested
	 * Returns a the ID of a image resources given its name
	 * @param name
	 * @returns {*}
	 */
	function getImageIDByName(name){
		for(i in files['images']){
			if( files['images'].hasOwnProperty( i ) ){
				if( files['images'][id].name == name){
					return  id;
					break;
				}
			}
		}

	}

	/** TODO
	 * Returns the ID of an image resource given its URI
	 * @param URI
	 * @returns {*}
	 */
	function getImageIDByURL( URI ){

	}

    return {
        newObject: newObject,
        newImage: newImage,

        getImage: getImage,
		getImageByName: getImageByName,

    }
})();




