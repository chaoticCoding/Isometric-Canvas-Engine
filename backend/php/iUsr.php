<?php
	include_once("iCommon.php");
/** TODO
 * Migrate to HOOK based system and separate into additional files
 */


/**
* Submits new user Registration
* Expects $data array returns ID of row created
* 	$data = array( 'username' => '',
*				'RealName' => '',
*				'pass' => '',
*				'email' => ''
*			);
***/
function userRegister($data){
	global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
	try {

		$stmt = $db_link->prepare("INSERT INTO `game`.`usr` (`id`, `uuid`, `RealName`, `username`, `password`, `email_address`, `last_ip`, `last_login`, `created`, `last_updated`) VALUES  (null,  UUID(), :RealName, :username, md5(:pass), :email, :usrIP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);");
		$stmt->execute($data);
	} catch (Exception $e) {
		return array('db' => $db_link, 'error' => $e);

	}
	return array('db' => $db_link);
	//return $db_link->lastInsertId();	
}	

/**
* Sends user Login
* Expects $data array, returns ID if user is found else returns false
*	$data = array(
*			':usr' => '',
*			':pwd' => ''
*		);
*
***/
function userSendLogin($data){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("SELECT * FROM `usr` WHERE `username` = :usr AND  `password` = MD5(:pwd) LIMIT 1");
	
	$stmt->execute($data);
	
	if ($stmt->rowCount() > 0) {
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row;
	}else{
		return false;
	}
}

/**
* gets profile of user based on $data
* Expects $data array, returns ID if user is found else returns false
*	$data = array(
*			'id' => ''
*		);
*
***/
function userGetProfile($data){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("SELECT * FROM `usr` WHERE `id` = :id LIMIT 1");
	
	$stmt->execute($data);
	
	if ($stmt->rowCount() > 0) {
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row;
	}else{
		return false;
	}
}

/**
* updates user last Login information
* Expects $data array, returns ID if user is found else returns false
*	$data = array(
*			':usrID' => '',
*			':IP' => ''
*		);
*
***/
function userUpdateLogin($data){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("UPDATE `usr` SET `last_ip` = :IP WHERE `id` = :usrID LIMIT 1");
	
	$stmt->execute($data);
	
	if ($stmt->rowCount() > 0) {
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row['id'];
	}else{
		return false;
	}
}

/** TODO INCOMPLETE
* validates user based for invalid charitors
***/
function validate_user($user){
	
	if(strlen($user) <= 25 && strlen($user) > 4){
		$pattern = '/^[a-zA-Z0-9]{4,25}$/';
	
		if(preg_match($pattern, $user)){ // username contains nothing invalid
			
		}else{// username contains invalid characters 
			
		}
	}else{// username too long or too short
		if(strlen($user) > 4){// username too long
			
		}else{// username too short
			
		}
	}
}

/** TODO INCOMPLETE
* validates email address based on regex pattern
***/
function validate_email($email){
	
	$pattern = '/\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}\b/';

	if(preg_match($pattern, $email)){
		
	}else{// email does not match pattern 
		
	}
}

/** TODO INCOMPLETE
* validates password based on lenght must be longer then 6 but less then 25
***/
function validate_password($password){
	if(strlen($password) <= 25 && strlen($password) > 6){
	
	}else{// password too long or too short
		if(strlen($password) > 6){// password too long
			
		}else{// password too short
			
		}
	}
}

/** TODO
* Checks for existing user if found returns DB ID , if no user is found returns false;
***/
function exists_user($user){
	global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("SELECT `id` FROM `usr` WHERE `username` LIKE '$user' LIMIT 1");
	$result = $stmt->execute();
	
	if ($stmt->rowCount() > 0) {
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row['id'];
	}else{
		return false;
	}
}

/** TODO
* Checks for existing email address if found returns DB ID , if no email is found returns false;
***/
function exists_email($email){
	global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
	
	$stmt = $db_link->prepare("SELECT `id` FROM `usr` WHERE `email_address` LIKE '$email' LIMIT 1");
	$result = $stmt->execute();
	
	if ($result && $stmt->rowCount() > 0) {
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row['id'];
	}else{
		return false;
	}
}

/** TODO
* Statuses of new user validations
*	0 - completed
*	1 - new/pending
*	2 - sent
*	3 - resent
*	4 - 
*	9 - time expired
***/

/** TODO UNTESTED
* Function for creating and storing user validation data
***/
function createuserValidation($data){
	global $db_link;

	if(!$db_link)
		$db_link = GetPDOConnection();

	$stmt = $db_link->prepare("INSERT INTO `game`.`usrValidation` (`user`, `key`, `Created`, `ip_Started`, `status`) VALUES  ( :username, UUID(), CURRENT_TIMESTAMP, :usrIP, 1);");
	$stmt->execute($data);

}

/** TODO UNTESTED
* Function for completing user validation
***/
function completeValidation($data){
	global $db_link;
	
	if(!$db_link)
		$db_link = GetPDOConnection();
		
	$stmt = $db_link->prepare("UPDATE `game`.`usrValidation` SET `status`='0' WHERE `user`=':usr' AND `key`=':key'");
	$stmt->execute($data);
	
	$count = $stmt->rowCount();
	
	if($count > 0){
		return $count;
	}else{
		return false;
	}
}