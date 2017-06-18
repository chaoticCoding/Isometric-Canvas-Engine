var w = window;


/** WORKING
 * returns Tile Position given a pixel position
 *
 * @param CursX : cursor x Position
 * @param CursY : cursor y Position
 * @param Width : Tile Width
 * @param Length : Tile Length
 * @param OffsetX : offset positions
 * @param OffsetY :
 *
 * @constructor
 ***/
function TranslatePixelToMatrix( CursX, CursY, Width, Length, OffsetX, OffsetY){
	var x = CursX + OffsetX;
	var y = CursY - OffsetY;

	var Column = (y / Length) + (x / Width);
	var Row = (y / Length) - (x / Width);

	return { r: Math.round(Row), c: Math.round(Column) }
}

/** WORKING
 * returns the pixel location of a tile given its location
 *
 * @param x : tile x Position
 * @param y : Tile y Position
 * @param w : tile Width
 * @param l : Tile Length
 * @constructor
 ***/
function TranslateMatrixToPixel(row, column, width, length){
	var Draw = {
		x: Math.round(((row - column) * (width / 2))),
		y: Math.round((row + column) * (length / 2))
	}

	return Draw;
}

/**
 * Adds local offset to position data
 * @param Pos
 * @param Offset
 * @returns {{x: *, y: *}|*}
 */
function addOffset(Pos, Offset){
	nPos = {
		x: Pos.x + Offset.x,
		y: Pos.y + Offset.y
	};

	return nPos;

}

/** TODO Translate function testing Should be redone as unit tests
 *
 * @type {{x: number, y: number}}
 */
/*
	Offset = { x:200, y:1300 };
	tdraw = TranslateMatrixToPixel(12, 12, 64, 32, Offset.x, Offset.y);
	console.log(tdraw);
	tMatrix = TranslatePixelToMartix(tdraw.x, tdraw.y, 64, 32, Offset.x, Offset.y);
	console.log(tMatrix);
*/


/**
 * Returns the new position given a radius to travel, and a angel in Radians
 * @param x
 * @param y
 * @param radius
 * @param angle
 * @returns {{x: *, y: *}}
 */
function moveAlongAngel(x, y, radius, angle){
	var end = {
		x: x + radius * Math.cos(angle),
		y: y + radius * Math.sin(angle),
	};

	return end;
}

/**
 * returns Radian given know Degree
 *
 * @param degree
 * @returns {number}
 */
function degreetoradians(degree){
	return degree *(Math.PI/180)

}

/**
 * returns Degree given a know Radian
 *
 * @param radians
 * @returns {number}
 */
function radianstodegree(radians){
	return radians * (180/Math.PI);
}

/**
 * returns radians given a fraction in circle
 *
 * @param slices
 * @returns {number}
 */
function fractureCircle(slices){
	return (1 / slices) * (2 * Math.PI)
}
/**
 * given start and end positions returns the radian
 * @param start.x, start.y
 * @param end.x, end.y
 * @returns {number} radians
 */
function getAngle(start, end){

	var x = start.y - end.y;
	var y = end.x - start.x;

	var a = - Math.atan2(x, y); // needs to be a negative because negative math is fun!

	return a;
}

function findSlice(s, rad){
	return ~~(rad  / fractureCircle(s));
}

/**
 * returns object speed given a delta
 * @param del : in Milliseconds
 * @param speed : rate per Milliseconds
 * @returns {number}
 */
function calcSpeed(del, speed) {

	return (speed * del) * (60 / 1000); // frames/ms
}

/**
 * returns the amount of whole vertical tiles with a given height that fit on the screen
 * @param p
 * @param w
 * @returns {number}
 */
function verticalTiles(p, h){
	return ~~( p / w);
}

/**
 * returns the amount of horizontal tiles that fit on screen with a given width
 * @param p
 * @param h
 * @returns {number}
 */
function horizontalTiles(p, w){
	 return ~~( p / h);

 }