<?php
/***
* to be enabled in prod if server doesn't use mod_deflate will start gz compression on all pages
***/
//ob_start("ob_gzhandler");
//ob_start("compress");

/***
* starts session on all pages
***/
session_start();

/***
 * Enable or disabling debugging functions
 ***/
define("DebugEnable",		1);

/***
* User Statuses & constants
*	0 - user disabled
*	1 - user awaiting validation
*	2 - user active / completed validation
*	3 - 
*	4 - 
*	5 - 
*	6 - 
*	7 - 
*	8 - 
*	9 - user suspended
***/
define("UserStatus_disabled",		0);
define("UserStatus_validating",		1);
define("UserStatus_active",			2);
define("UserStatus_suspended",		9);

/***
* Login Actions
*	20 - User Action - Registering new user
*	21 - User Action - Login
*	22 - User Action - Password reset
*	23 - User Action - logout
*	24 - User Action - 
*	25 - User Action - 
*	26 - User Action - 
*	27 - User Action - 
*	28 - User Action - 
*	29 - User Action - account validation
***/
define("ActRegister",		20);
define("ActLogin",			21);
define("ActPwdRst",			22);
define("ActLogout",			23);
define("ActGetProfile",		24);
define("ActSetProfile",		25);
define("ActValidate",		29);

/***
* Map Actions
*	10 - Map Action - request all map
*	11 - Map Action - request data for map
*	12 - Map Action - request tilesets
*	13 - Map Action - request tileData
*	14 - Map Action - 
*	15 - Map Action -
*	16 - Map Action - 
*	17 - Map Action - 
*	18 - Map Action - 
*	19 - Map Action - update data
***/
define("getMaps",				10);
define("getMapData",			11);
define("getTilesets",			12);
define("getTileData",			13);
define("getMapDefaults",		14);
//define("",		15);
//define("",		16);
//define("",		17);
define("updateTileTSolidity",	18);
define("updateTileType",		19);

/***
 * error responses
 ***/
define("errorBadRequest",		400); // Bad Request
define("errorUnauthorized",		401); // Unauthorized
define("errorForbidden",		403); // Forbidden
define("errorNotFound",			404); // Not Found
define("errorTimeout",			408); // Timeout
define("unknownError",			999); // ServerError

/***
* Map Default display size
***/
define("MapDefaultWidth",		25); // Default Map Size X Axis
define("MapDefaultLength",		25); // Default Map Size Y Axis

/***
* Global for storing Connected DB object
***/
$db_link = null;
$response = array();

/***
* function for creating new DB object if global object is already created then returns said object
* should be called by
* global $db_link;	
*	if(!$db_link)
*		$db_link = GetPDOConnection();
***/
function GetPDOConnection() {
	global $db_link;
	
	if( $db_link ) {
		return $db_link;
		
	} else {
			
		try{
			$dbhost = "localhost";
			$dbname = "game";
			$dbuser = "game";
			$dbpass = "FRFF6sLHCY3wRTYP";
			
			$db_link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);


			$db_link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $db_link;
			
		} catch(PDOException $e) {  
			$response['error'] = $e->getMessage();

            return false;
		}
	}
}

/***
* Function for retrieving vars stored in the vars Table. returns associated array of all found objects
***/
function getVar($key) {
	
	global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("SELECT * FROM `vars` WHERE  `key` LIKE  '$key%'");
	$result = $stmt->execute();
	
	if ($result && $stmt->rowCount() > 0) {
		return $stmt->fetchAll();
	} else {
		return false;
	}

}

/*** // TODO
* Function for updating existing var stored in the vars table
***/
function updateVar($key, $value) {

	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();
		
	$stmt = $db_link->prepare("UPDATE table SET field='value'");

	$stmt->execute();
	
}

/*** // TODO
* Function for creating new var to be stored in the vars table
***/
function insertVar($key, $value) {

	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();
		
	$stmt = $db_link->prepare("INSERT INTO table(firstname, lastname) VAULES('John', 'Doe')");
	$stmt->execute();
	
	$insertId = $db_link->lastInsertId();	
}

/*** // TODO
* Combo for updating/creating vars
***/
function setVar($key, $value){
	
}

/***
* Function for stripping comments and whitespaces from css
***/
function compress_css($buffer) {
	/* remove comments */
    $buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
	
	/* remove tabs, spaces, new lines, etc. */
    $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);
	
	/* remove unnecessary spaces */
    $buffer = str_replace('{ ', '{', $buffer);
    $buffer = str_replace(' }', '}', $buffer);
    $buffer = str_replace('; ', ';', $buffer);
    $buffer = str_replace(', ', ',', $buffer);
    $buffer = str_replace(' {', '{', $buffer);
    $buffer = str_replace('} ', '}', $buffer);
    $buffer = str_replace(': ', ':', $buffer);
    $buffer = str_replace(' ,', ',', $buffer);
    $buffer = str_replace(' ;', ';', $buffer);
    
	return $buffer;
}

/***
* Function for stripping comments and whitespaces from javacript
***/
function compress_JS($buffer){
	/* remove comments */
    $buffer = preg_replace(`\/\/.*|\/\*.*?\*\/`, '', $buffer);
	
	/* remove tabs, spaces, new lines, etc. */
    $buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);
	
	/* remove unnecessary spaces */
    /*$buffer = str_replace('{ ', '{', $buffer);
    $buffer = str_replace(' }', '}', $buffer);
    $buffer = str_replace('; ', ';', $buffer);
    $buffer = str_replace(', ', ',', $buffer);
    $buffer = str_replace(' {', '{', $buffer);
    $buffer = str_replace('} ', '}', $buffer);
    $buffer = str_replace(': ', ':', $buffer);
    $buffer = str_replace(' ,', ',', $buffer);
    $buffer = str_replace(' ;', ';', $buffer);*/
    
	return $buffer;
}

/*** TODO
 * Verifying user sessions
 ***/
function validateSesson(){
	/* Disabled for Testing
	if(isset($_SESSION['id']) && $_SESSION['id'] > 0) {
		return true;

	}else{

		$data = array(
			'errorNum' => errorUnauthorized,
			'errorDesc' => '',
		);

		$response['error'] = $data;

		if(DebugEnable == 1 ){ $response['postData'] = $_POST; };

		print json_encode($response);

		return false;
	}*/
	return true;
}

/*** TODO
 * Validate user has premission for action
 ***/
function validateAction($action){
	return true;
}