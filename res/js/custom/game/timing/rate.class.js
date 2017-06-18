/**
 * Created by shawn on 7/18/14.
 */

/**
 * Timer Class
 ***/
rateClass = function(){
	var ps = 0; // Per second
	var lastLoop = new Date; // Last update time

	/**
	 * updates how may times in a given second can this call be made
	 *
	 * @returns {number} ps
	 ***/
	 function tick(){
		var thisLoop = new Date;

		ps = 1000 /(thisLoop - lastLoop);

		lastLoop = thisLoop;

		return ps;
	}

	/**
	 * returns the last rate
	 *
	 * @returns {number}
	 ***/
	 function rate(){
		return ps;
	}

	/**
	 * Returns public functions
	 */
	return({
		tick: tick,
		rate: rate
	})

};
