
/**
 *
 * @param ctx: Canvas 2d Context
 * @param cx: center x
 * @param cy: center y
 * @param w: width
 * @param h: height
 * @param sw: stroke width
 * @param ss: stroke style
 */
function drawEllipseByCenter(toCanvas, cx, cy, w, h, sw, ss) {
	drawEllipse(toCanvas, cx - ( w / 2.0 ),  cy - ( h / 2.0 ), w, h, sw, ss);
}

/**
 *
 * @param ctx: Canvas 2d Context
 * @param x: x start
 * @param y: x start
 * @param w: width
 * @param h: height
 * @param sw: stroke width
 * @param ss: stroke style
 */
function drawEllipse(toCanvas, x, y, w, h, sw, ss) {
	var kappa = .5522848,
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle

	toCanvas.Context().beginPath();

	toCanvas.Context().strokeStyle = ss;
	toCanvas.Context().lineWidth = sw;
	toCanvas.Context().moveTo(x, ym);
	toCanvas.Context().bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	toCanvas.Context().bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	toCanvas.Context().bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	toCanvas.Context().bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

	toCanvas.Context().stroke();
}

/**
 *
 * @param ctx
 * @param x
 * @param y
 * @param radius
 * @param angle
 * @param sw
 * @param ss
 */
function drawAngle(toCanvas, x, y, radius, angle, sw, ss){
	var end = moveAlongAngel(x, y, radius, angle);

	toCanvas.Context().beginPath();

	toCanvas.Context().strokeStyle = ss;
	toCanvas.Context().lineWidth = sw;
	toCanvas.Context().moveTo(x, y);
	toCanvas.Context().lineTo(end.x, end.y);

	toCanvas.Context().stroke();
}

/**
 *
 * @param toContext
 * @param Pos
 * @param Width
 * @param Heigh
 * @param rotation
 */
function drawBounding(toCanvas, Pos, Width, Height, rotation){

	drawEllipseByCenter(toCanvas, Pos.x, Pos.y, Width, Height, 2, '#ff0000');
	drawAngle(toCanvas, Pos.x, Pos.y, Height, rotation, 2, '#ff0000');
}

/**
 *
 * @param toCanvas
 * @param image
 * @param PosX
 * @param PosY
 * @param SpriteX
 * @param SpriteY
 * @param width
 * @param height
 */
function drawImage(toCanvas, image, PosX, PosY, SpriteX, SpriteY, width, height){

	if ((PosX + width > 0 && PosY + width > 0) && (PosX < toCanvas.Width() + width && PosY < toCanvas.Height() + height)) {

		toCanvas.Context().drawImage(
			image,
			SpriteX,  // X Pos of sprite on sprite sheet
			SpriteY, // Y Pos of sprite on sprite sheet
			width, // width of sprite on sprite sheet
			height, // height of sprite on sprite sheet
			PosX, // X Pos on canvas to draw
			PosY, // Y Pos on canvas to draw
			width, // width to draw sprite on canvas
			height // height to draw sprite on canvas
		);
	} else {
		//console.log(PosX, PosY, width, height);
	}
}

/**
 *
 * @param toCanvas
 * @param image
 * @param PosX
 * @param PosY
 * @param SpriteX
 * @param SpriteY
 * @param width
 * @param height
 */
function drawImageByCenter(toCanvas, image, PosX, PosY, SpriteX, SpriteY, width, height){
	drawImage(toCanvas, image, PosX - ( width / 2 ), PosY - ( height / 2 ), SpriteX, SpriteY, width, height);

}

/**
 * basic draw functions for arcs
 *
 * @param toCanvas
 * @param x
 * @param y
 * @param radius
 * @param startAngle
 * @param endAngle
 * @param counterClockwise
 * @param width
 * @param ss
 */
function drawArc(toCanvas, x, y, radius, startAngle, endAngle, counterClockwise,width, ss){

	toCanvas.Context().beginPath();
	toCanvas.Context().arc(x, y, radius, startAngle, endAngle, counterClockwise);
	toCanvas.Context().lineWidth = width;
	toCanvas.Context().strokeStyle = ss;
	toCanvas.Context().stroke();
}

/** TODO healthbar does not empty correctly. is not correctly displayed if ration is smaller then 4/200
 * function for drawing arc based health bar
 *
 * @param toCanvas
 * @param PosX
 * @param PosY
 * @param unitWidth
 * @param Health
 * @param maxHealth
 */
function drawHeathBar(toCanvas, PosX, PosY, unitWidth, Health, maxHealth){
	var radius = unitWidth / 2;

	var HP = ( Health / maxHealth); // Health Percentage

	var startAngle = .40 * Math.PI;
	var startInner = .40 * (Math.PI * 0.97);

	var endAngle = startAngle - 3/4 * Math.PI;
	var endInner = startAngle - ((3/4 * Math.PI) * 0.97);

	var endHP = startAngle - (((3/4 * Math.PI) * 0.97) * HP);

	drawArc(toCanvas, PosX, PosY, radius, startAngle, endAngle, true, 16, "Black");
	drawArc(toCanvas, PosX, PosY, radius, startInner, endInner, true, 10, "Red");
	drawArc(toCanvas, PosX, PosY, radius, startInner, endHP, true, 10, "Green");
}