/**
 *
 * @type {*|extend}
 ***/
imageClass = function(obj){
    var ready	=		false;
    var src		=		obj.url;
    var name	=		obj.name;
    var img		=		new Image();

	//Adds event listener, listening to load events on event laoded sets readyto true
	img.addEventListener("load", function() {ready = true;}, false);

	// Starts image load
	img.src = obj.url;

	//Returns public functions
	return{
		ready: ready,
		src: src,
		name: name,
		img: img
	}
};