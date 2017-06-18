/** WORKING
 * Returns the new position given a radius to travel, and a angel in Radians
 * @param x
 * @param y
 * @param radius
 * @param angle
 * @returns {{x: *, y: *}}
 */
function moveAlongAngel(x, y, radius, angle){

	return {
		x:  x + radius  * Math.cos( angle ),
		y:  y + radius  * Math.sin( angle )

	};
}

/** WORKING
 * returns Radian given know Degree
 *
 * @param degree
 * @returns {number}
 */
function DegreetoRadians( degree ){
	return degree * ( Math.PI / 180)

}

/** WORKING3
 * returns Degree given a know Radian
 *
 * @param radians
 * @returns {number}
 */
function RadianstoDegree( radians ){
	return radians * ( 180 / Math.PI );
}

/**
 * returns radians given a fraction in circle
 *
 * @param slices
 * @returns {number}
 */
function fractureCircle(slices){
		return ( 1 / slices ) * ( 2 * Math.PI )
}

/**
 * returns how many multiple of slices that a radian is
 *
 * @param slices
 * @param radians
 * @returns {number}
 */
function findSlice(slices, radians) {
	var s = fractureCircle(slices);
	var n =  ~~(  (radians + (s/8)) / fractureCircle(slices)  );

	return n < slices ? n : slices-1;
}

/** WORKING
 * given start and end positions returns the radian
 * @param start.x, start.y
 * @param end.x, end.y
 * @returns {number} radians
 */
function getAnglefromPixel(start, end){

	return getAngle(start.x, start.y, end.x, end.y);

}
/** WORKING
 * Returns the angle Theta given start and end points on a cartesian grid
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns {number}
 */
function getAngle(a, b, c, d){
	// creates the delta slope
	var delta = {
		x: c - a ,
		y: d - b
	};
//	var len = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

	var theta = Math.atan2(delta.y, delta.x);

// if the thata is a negative number ads a full circle of radians to so it creates a positive number at the same position
	if (theta < 0)
		theta += 2 * Math.PI;

	return theta;
}


/**
 * returns the distance between 2 points on the same cartesian plane
 *
 * @param start
 * @param end
 * @returns {number}
 */
function getDistance(start, end){
	return Math.sqrt( Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
}


/***
 * returns object speed given a delta
 *
 * @param del : Milliseconds
 * @param speed : rate per Milliseconds
 * @returns {number}
 */
function calcSpeed(del, velocity) {
	return ( velocity * del ) * ( 60 / 1000 ); // frames/ms
}