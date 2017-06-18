/**
 *
 * @type {*|extend}
 ***/
gridsClass = canvasClass.extend({
	//size of the grid
	grid: {
		Width: 64,
		Height: 32,
	},

	/**
	 *
	 */
	init: function(p){
		this.new("gridsCanvas", true);
		console.log("grids");
		console.log(this);
		this.draw();
	},

	/**
	 *
	 */
	draw: function(){
		start = [];
		start.x = this.grid.Width/2;
		start.y = this.grid.Height/2;
		count = [];

		count.x = Math.ceil((this.Width / this.grid.Width)+1)*21;

		this.clear();

		for(x = 0; x < count.x; x ++){

			this._Context.moveTo(start.x , 0);
			this._Context.lineTo(0, start.y);

			start.x += this.grid.Width;
			start.y += this.grid.Height;
		}

		start.x = this.grid.Width/2;
		start.y = this.grid.Height/2;
		this._Context.stroke();


	/*	this._Context.beginPath();
		this._Context.moveTo(this.pos.start.x , 0);
		this._Context.lineTo(0, this.pos.start.y);
		this._Context.lineTo(this.grid.Width / 2, this.grid.Height);
		this._Context.lineTo(this.grid.Width, this.grid.Height / 2);
		this._Context.lineTo(this.grid.Width / 2, 0);*/
	}
});