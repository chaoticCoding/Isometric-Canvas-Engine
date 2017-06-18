<?php
	include_once("iCommon.php");

/*** TODO Untested
* creates a map in the database with details from the $data object
* Expects $data array returns array of map returned
* 	$data = array( 
*		'xSize' => '',
*		'ySize' => '',
*	);
***/
function createMap($data){
global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();

	//prepare_map(IN in_mapID int(5), in_width int(5), in_length int(5), in_baseTile int(3))
	$stmt = $db_link->prepare('CALL prepare_map(:mapID, :width, :lenght, :baseTile)');

	$stmt->execute($data);
}

/*** Works as expected June 29
 * Gets gets requested Map
 *
 * Expects $data array, returns array of Maps returned
 * 	$data = array(
 * 		'id' => int
 *	);
 ***/
function getMap($data){
global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
			
	$stmt = $db_link->prepare('SELECT * FROM `Maps` WHERE `id` = :id ORDER BY `id` ASC');
			
	$stmt->execute($data);
	$rs = $stmt->fetchAll(PDO::FETCH_ASSOC);

	return $rs;

}

/*** Works as expected June 30
 * Gets mapData from DB given mapID
 *
 * Expects $data array, returns array of found tileData
 * 	$data = array(
 *		'mapID' => '',
 *	);
 ***/
function getMapData($data){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	try {
		$stmt = $db_link->prepare('SELECT * FROM `mapData` WHERE `row` >= :row AND `row` <= :xMax AND `column` >= :column AND `column` <= :yMax AND `mapID` = :mapID ORDER BY `layer` ASC, `row` ASC, `column` ASC');

		$stmt->execute($data);
		$rs = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $rs ;

	} catch(PDOException $e) {
		return $this->pack('dbError', $e->getMessage());

	}
}

/*** Works as expected June 30
 * Gets all tilesets from DB
 *
 * Expects $data array, returns array of found tilesets
 * 	$data = array(
 *	);
 ***/
function getTilesets( $data ){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	$stmt = $db_link->prepare('SELECT * FROM `tilesets` ORDER BY `id` ASC');

	$stmt->execute( $data );
	$rs = $stmt->fetchAll( PDO::FETCH_ASSOC );

	return $rs;

}

/*** Works as expected June 30
 * Gets tileData from DB given ID
 *
 * Expects $data array, returns array of found tileData
 * 	$data = array(
		'tileset' => '',
 *	);
 ***/
function getTileData( $data ){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	$stmt = $db_link->prepare('SELECT * FROM `tileData` WHERE `tileset` = :tileset ORDER BY `id` ASC');

	$stmt->execute($data);
	$rs = $stmt->fetchAll(PDO::FETCH_ASSOC);

	return $rs;

}

/*** Works as expected June 30
 * updates mapData type given the y,x,z, mapID location
 *
 * Expects $data array, returns array of found tileData
 * 	$data = array(
 * 		'mapID' => '',
 *		'row'  => '',
 *		'column'  => '',
 *		'layer'  => '',
 *		'type'  => '',
 *	);
 ***/
function changeMapDataType( $data ){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	$stmt = $db_link->prepare('UPDATE `mapData` SET `type` = :type WHERE `row` = :row AND `column` = :column AND `layer` = :layer AND `mapID` = :mapID');

	$stmt->execute($data);

	//return $rs;

}

/*** Works as expected June 30
 * updates mapData type given the y,x,z, mapID location
 *
 * Expects $data array, returns array of found tileData
 * 	$data = array(
 * 		'mapID' => '',
 *		'row'  => '',
 *		'column'  => '',
 *		'layer'  => '',
 *		'solid' => '',
 *	);
 ***/
function changeMapDataSolidity( $data ){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	$stmt = $db_link->prepare('UPDATE `mapData` SET `solid` = :solid WHERE `row` = :row AND `column` = :column AND `layer` = :layer AND `mapID` = :mapID');

	$stmt->execute($data);

	//return $rs;

}