/***
*
* Controllers for requesting Animation Frames from different browsers
*
* by Shawn Palmer, Chaotic Coding, Inc.
***/

(function () {

	//window.requestAnimationFrame(callback);       // Firefox 23 / IE 10 / Chrome / Safari 7 (incl. iOS)
	//window.mozRequestAnimationFrame(callback);    // Firefox < 23
	//window.webkitRequestAnimationFrame(callback); // Older versions of Safari / Chrome
	//window.msRequestAnimationFrame(callback) 		// Older versions of IE
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	/**
	 * Timer based fallbacks
	 */
	if( window.requestAnimationFrame ) {
		console.log("Native Animation found!");
	} else{
		console.log("Using Timer Animations!");
		var lastTime = 0;

		window.requestAnimationFrame = function( callback, element ){
			var currTime = new Date().getTime();
			var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

			var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
			lastTime = currTime + timeToCall;
			return id;

		}

		window.cancelAnimationFrame = function( id ){
			clearTimeout( id );
		}
	}
}());