<?php
include_once(__DIR__ . '/../php/iCommon.php');
include_once(__DIR__ . '/../php/iMap.php');

/**
 * Ensures that there is an active session
 */
if(validateSesson()) {

	// Trap for no commands, as it less expensive to set it ahead of time and then change the value then to check to see if a value was set
	$Action = getMaps;

	// Empty place holder for expected responses
	$response = '';

	// array for storing data bing sent to the server!
	$sData = array();

	if( DebugEnable == 1 ){ // if debug functions are enabled return information received in POST and Get.
		$response['postData'] = $_POST;
		$response['getData'] = $_GET;
	};

	// Makes sure that there is GET data
	if( $_GET ){
		// if there is a action reset $Action to the new value
		if(isset($_GET['Action'])) {
			$Action = (int)$_GET['Action'];
			
		}

		if(validateAction($Action)){
			// if debug functions are enabled return information about what actions are going to be taken.
			if( DebugEnable == 1 ){
				$response['Action'] = $Action;

			}

			/***
			 * returns All Maps
			 ***/
			if( $Action == getMaps ) {
				$ID = $_POST['ID'];

				// if ID sent is array loop through all of them, if not just return the one.
				if( is_array ($ID) ){
					foreach ($ID  as &$i) {
						$data = array(
 							'id' => $i
						);

						$response['map'][$i] = getMap($data)[0];
					}
				}else{ // its a string
					$response['map'][$ID] = getMap($ID)[0];

				}


			/***
			 * returns requested map data within range
			 ***/
			} elseif( $Action == getMapData ) {
				$sData['mapID'] = isset($_POST['mapID']) ? $_POST['mapID'] : 1;

				$sData['row'] = isset($_POST['row']) ? $_POST['row'] : 0;

				$sData['column'] = isset($_POST['column']) ? $_POST['column'] : 0;

				$width = isset($_POST['width']) ? $_POST['width'] : MapDefaultWidth;

				$height = isset($_POST['height']) ? $_POST['height'] : MapDefaultLength;

				$sData['xMax'] = $sData['row'] + $width;

				$sData['yMax'] = $sData['column'] + $height ;

				$response['map'] = getMapData($sData);

			/***
			 * returns All tilesets
			 ***/
			} elseif( $Action == getTilesets ) {
				// retrieves tilesets
				$response['tilesets'] = getTilesets($sData);

				// retrieves data for each tileset
				foreach ($response['tilesets'] as &$tileset) {
					$rData['tileset'] = $tileset[id];
					$tileset['data'] = getTileData($rData);
				}

			/***
			 * returns tilesetData for given ID
			 ***/
			} elseif( $Action == getTileData ) {

				$sData['tileset'] = isset($_POST['tileset'])? $_POST['tileset'] : 1;

				$response['tilesets'] = getTileData($sData);

			/*** TODO remove defaults and setup better verification for inputs
			 * change mapData Type
			 ***/
			} elseif( $Action == updateTileType ) {

				$sData['mapID'] = isset($_POST['mapID']) ? $_POST['mapID'] : 1;

				$sData['row'] = isset($_POST['row']) ? $_POST['row'] : 2;

				$sData['column'] = isset($_POST['column']) ? $_POST['column'] : 2;

				$sData['layer'] = isset($_POST['layer']) ? $_POST['layer'] : 1;

				$sData['type'] = isset($_POST['type']) ? $_POST['type'] : 2;

				changeMapDataType($sData);

			/*** TODO remove defaults and setup better verification for inputs
			 * change mapData Solidity
			 ***/
			} elseif( $Action == updateTileTSolidity ) {

				$sData['mapID'] = isset($_POST['mapID']) ? $_POST['mapID'] : 1;

				$sData['row'] = isset($_POST['row']) ? $_POST['row'] : 2;

				$sData['column'] = isset($_POST['column']) ? $_POST['column'] : 2;

				$sData['layer'] = isset($_POST['layer']) ? $_POST['layer'] : 1;

				$sData['solid'] = isset($_POST['solid']) ? $_POST['solid'] : 0;

				changeMapDataSolidity($sData);

			/***
			 * Something Stupid happened
			 ***/
			} else {
				$response['error'] = array('error' => unknownError, 'errorDesc' => "Stupid PHP, or drunk shawn!");

			}

			/***
			 * Debug reporting
			 ***/
			if( DebugEnable == 1 ){ // if debug functions are enabled return information about what actions are going to be taken.
				$response['sData'] = $sData;

			}

			// sends response data back as JSON.
			print json_encode($response, JSON_NUMERIC_CHECK | JSON_FORCE_OBJECT); //TODO is force object needed

		/*** TODO
		 * User does not have permission for needed action
		 */
		} else {

		}
	/*** TODO
	 * no request data was sent
	 ***/
	} else {

	}
}
