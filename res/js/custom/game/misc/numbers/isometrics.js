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
	var y = CursY + OffsetY;

	var Column = ( y / Length ) + ( x / Width );
	var Row = ( y / Length ) - ( x / Width );

	return {
		r: Math.round( Row ),
		c: Math.round( Column )
	}
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
	return {
		x: Math.round((( row - column ) * ( width / 2 ))),
		y: Math.round(( row + column ) * ( length / 2 ))
	};
}

/** WORKING
 * Adds local offset to position data
 * @param Pos
 * @param Offset
 * @returns {{x: *, y: *}|*}
 */
function addOffset(Pos, Offset){
	return {
		x: Pos.x + Offset.x,
		y: Pos.y + Offset.y
	};
}

/***
 * returns the amount of whole vertical tiles with a given height that fit on the screen
 * @param PixelHeight
 * @param TileHeigth
 * @returns {number}
 */
function verticalTiles(PixelHeight, TileHeigth){
	return ~~( PixelHeight / TileHeigth );
}

/***
 * returns the amount of horizontal tiles that fit on screen with a given width
 * @param PixelWidth
 * @param TileWidth
 * @returns {number}
 */
function horizontalTiles(PixelWidth, TileWidth){
	return ~~( PixelWidth / TileWidth );
}

/** TODO BROKEN - cartesian math does not work with ISO grids
 * given start and end positions returns the radian
 * @param start.x, start.y
 * @param end.x, end.y
 * @returns {number} radians
 */
function getAnglefromTile(start, end){

	return getAngle(start.c, start.r, end.c, end.r);
}

/** TODO non-working
 * returns the radians direction of 2 isometric locations
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns {number}
 */
function getISOAngle(a, b, c, d) {
	// creates the delta slope
	var delta = { // Here is where its most likely broken
		x: c - a,
		y: d - b
	};

	var theta = Math.atan2(delta.y, delta.x);

	// if the thata is a negative number ads a full circle of radians to so it creates a positive number at the same position
	if (theta < 0)
		theta += 2 * Math.PI;

	return theta;
}

/** TODO needs to be redone
 * returns the distance between 2 points on the same isometric plane
 * @param start
 * @param end
 * @returns {*}
 */
function getISODistance(start, end){
	return Math.sqrt( Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
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