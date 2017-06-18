/**
 * Timer Class
 ***/
TimerClass = function(){
	var start = new Date;

	var ldate = new Date;

	var _Delta = 0;

	console.log("New Timer started: " + start);

	/**
	 * Timer update
	 ***/
	function update() {
		var tdate = new Date();
		_Delta = tdate.getTime() - ldate.getTime();

		ldate = tdate;

		return _Delta;
	}

	/**
	 * Returns how long the timer has been runing from last update.
	 * @returns {number}
	 */
	function getRunTime(){
		return ldate.getTime() - start.getTime();
	}

	/** Resets Timer
	 *
	 */
	function reset(){
		start = new Date();
	}

	/** Returns how long timer has been running in Milliseconds
	 *
	 * @returns {number}
	 */
	function getMilliseconds(){
		return start.getTime();
	}

	/** Returns how long timer has been running in seconds
	 *
	 * @returns {number}
	 */
	function getSeconds(){
		return Math.round( start.getTime() / 1000);
	}

	function delta(){
		return _Delta;
	}

	function Now(){
		return ldate;
	}


	return {
		getSeconds: getSeconds,
		getMilliseconds: getMilliseconds,
		update: update,

		getRunTime: getRunTime,
		Now: Now,
		reset: reset,

		delta: delta,
	}
};
