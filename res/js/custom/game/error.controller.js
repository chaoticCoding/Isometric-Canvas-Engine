/** TODO Extend error to server side logging for future debugging.
 * Error Controller class
 *
 * by Shawn Palmer, Chaotic Coding, Inc.
 */
(function( window, undefined ) {
	console.log("Error Service started");
	/** TODO
	 * handel's window.Error
	 * @param lvl
	 * @param msg
	 * @constructor
	 */
	Error = function(lvl, msg){
		if(lvl == "log"){
			this.Error.log(msg);

		}else if(lvl == "warn"){
			this.Error.warn(msg);

		}else if(lvl == "debug"){
			this.Error.debug(msg);

		}else if(lvl == "error"){
			this.Error.error(msg);

		}else if(lvl == "assert"){
			this.Error.assert(msg);

		}else{
			this.Error.log(lvl +": " +msg);
		}

	}
	/** TODO
	 * handel's window.Error.log
	 * @param msg
	 */
	Error.log = function(msg){
		console.log(msg);

	};

	/** TODO
	 * handel's window.Error.debug
	 * @param msg
	 */
	Error.debug = function(msg){
		console.log(msg);

	};

	/** TODO
	 * handel's window.Error.warn
	 * @param msg
	 */
	Error.warn = function(msg){
		console.log(msg);

	};
	/** TODO
	 * handel's window.Error.warn
	 * @param msg
	 */
	Error.error = function(msg){
		console.error(msg);

	};
	/** TODO
	 * handel's window.Error.warn
	 * @param msg
	 */
	Error.assert = function(msg){
		console.assert(msg);

	};

	window.Error = Error;
}(window));