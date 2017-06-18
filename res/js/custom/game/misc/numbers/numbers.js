/**
 * Random number generator
 * @param Min
 * @param Max
 * @returns {number}
 * @constructor
 */
function Random (Min, Max){
	return Math.floor(( Math.random() * Max) + Min );
}